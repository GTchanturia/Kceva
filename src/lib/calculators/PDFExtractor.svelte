<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import FileSaver from "file-saver";
    import JSZip from "jszip";

    let pdfFiles: File[] = [];
    let extractedFiles: { name: string; data: Uint8Array; type: string }[] = [];
    let outputLog = "";
    let isExtracting = false;

    let pdfjsLib: any;
    let fileInput: HTMLInputElement;

    onMount(async () => {
        if (!browser) return;
        pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
        const workerModule = await import(
            "pdfjs-dist/legacy/build/pdf.worker.min.js?url"
        );
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;
    });

    function handleDragOver(event: DragEvent) {
        event.preventDefault();
        event.dataTransfer!.dropEffect = "copy";
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        const files = Array.from(event.dataTransfer!.files).filter(
            (f) => f.type === "application/pdf",
        );
        pdfFiles = [...pdfFiles, ...files];
        outputLog += `Added ${files.length} PDF file(s)\n`;
    }

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files) return;
        const files = Array.from(input.files).filter(
            (f) => f.type === "application/pdf",
        );
        pdfFiles = [...pdfFiles, ...files];
        outputLog += `Selected ${files.length} PDF file(s)\n`;
    }

    function removeFile(index: number) {
        pdfFiles = [...pdfFiles.slice(0, index), ...pdfFiles.slice(index + 1)];
        outputLog += `Removed file from selection\n`;
    }

    function clearAll() {
        pdfFiles = [];
        extractedFiles = [];
        outputLog = "";
    }

    function detectType(data: Uint8Array, name: string) {
        const text = new TextDecoder()
            .decode(data.slice(0, 500))
            .trim()
            .toLowerCase();
        // Improved CSV detection: commas, semicolons, tabs, or line breaks
        const csvIndicators = [",", ";", "\t", "\n"];
        if (
            name.toLowerCase().endsWith(".csv") ||
            csvIndicators.some((c) => text.includes(c))
        )
            return "text/csv";
        if (
            name.toLowerCase().endsWith(".html") ||
            text.startsWith("<!doctype html") ||
            text.startsWith("<html")
        )
            return "text/html";
        return "application/octet-stream";
    }

    function ensureExtension(name: string, type: string) {
        name = name.replace(/\s+/g, "_");
        if (type === "text/csv" && !name.endsWith(".csv")) return name + ".csv";
        if (type === "text/html" && !name.endsWith(".html"))
            return name + ".html";
        return name;
    }

    function makeUniqueName(name: string) {
        let counter = 1;
        let base = name.replace(/(\.\w+)?$/, "");
        let ext = name.match(/(\.\w+)$/)?.[0] || "";
        while (extractedFiles.find((f) => f.name === name)) {
            name = `${base}(${counter++})${ext}`;
        }
        return name;
    }

    async function extractFiles() {
        if (!pdfjsLib) {
            outputLog += "PDF.js not loaded yet.\n";
            return;
        }
        if (pdfFiles.length === 0) {
            outputLog += "No PDF files selected.\n";
            return;
        }

        extractedFiles = [];
        isExtracting = true;
        outputLog += "Starting extraction...\n";

        for (const file of pdfFiles) {
            try {
                outputLog += `Processing ${file.name}...\n`;
                const arrayBuffer = await file.arrayBuffer();
                const pdfDoc = await pdfjsLib.getDocument({
                    data: new Uint8Array(arrayBuffer),
                }).promise;

                let attachments = {};
                try {
                    attachments = (await pdfDoc.getAttachments()) || {};
                    outputLog += `  🔍 Found ${Object.keys(attachments).length} attachments\n`;
                } catch (err) {
                    outputLog += `  ⚠️ getAttachments failed: ${(err as Error).message}\n`;
                }

                for (const [name, attach] of Object.entries(attachments)) {
                    const content = (attach as any).content as Uint8Array;
                    if (content) {
                        let type = detectType(content, name);
                        let fileName = ensureExtension(name, type);
                        fileName = makeUniqueName(fileName);
                        extractedFiles = [
                            ...extractedFiles,
                            { name: fileName, data: content, type },
                        ];
                        outputLog += `  ✅ Extracted: ${fileName} (${content.length} bytes)\n`;
                    }
                }

                for (let i = 1; i <= pdfDoc.numPages; i++) {
                    try {
                        const page = await pdfDoc.getPage(i);
                        const annots = await page.getAnnotations();
                        for (const annot of annots) {
                            if (
                                annot.subtype === "FileAttachment" &&
                                annot.fs
                            ) {
                                const embedded = await annot.fs.loadEmbedded();
                                if (embedded) {
                                    let name =
                                        annot.fs.fileName ||
                                        `page${i}_attached.bin`;
                                    let type = detectType(
                                        new Uint8Array(embedded),
                                        name,
                                    );
                                    name = ensureExtension(name, type);
                                    name = makeUniqueName(name);
                                    extractedFiles = [
                                        ...extractedFiles,
                                        {
                                            name,
                                            data: new Uint8Array(embedded),
                                            type,
                                        },
                                    ];
                                    outputLog += `  ✅ Extracted from annotation: ${name}\n`;
                                }
                            }
                        }
                    } catch {}
                }

                pdfDoc.destroy();
            } catch (err) {
                outputLog += `❌ Failed ${file.name}: ${(err as Error).message}\n`;
            }
        }

        outputLog += extractedFiles.length
            ? `\n✅ Extraction complete! ${extractedFiles.length} file(s) extracted.\n`
            : "\n🔍 No embedded files found.\n";

        isExtracting = false;
    }

    function downloadFile(file: {
        name: string;
        data: Uint8Array;
        type: string;
    }) {
        const blob = new Blob([file.data], { type: file.type });
        FileSaver.saveAs(blob, file.name);
        outputLog += `📥 Downloaded: ${file.name}\n`;
    }

    async function downloadAll(type: string) {
        const files = extractedFiles.filter((f) => f.type === type);
        if (files.length === 0) {
            outputLog += `No files of type ${type} found.\n`;
            return;
        }

        const zip = new JSZip();
        files.forEach((f) => zip.file(f.name, f.data));
        const blob = await zip.generateAsync({ type: "blob" });
        FileSaver.saveAs(blob, `extracted_${type.replace("/", "_")}.zip`);
        outputLog += `📥 Downloaded ${files.length} file(s) as zip for type ${type}\n`;
    }

    function triggerFileInput() {
        fileInput.click();
    }
</script>

<div class="container">
    <h2>PDF Embedded File Extractor</h2>

    <div
        class="drop-area"
        role="button"
        tabindex="0"
        on:dragover={handleDragOver}
        on:drop={handleDrop}
        on:click={triggerFileInput}
        on:keydown={(e) => e.key === "Enter" && triggerFileInput()}
    >
        <div>📄 Drag & drop PDF files here or click to select</div>
        <input
            bind:this={fileInput}
            type="file"
            multiple
            accept="application/pdf"
            on:change={handleFileSelect}
            style="display:none"
        />
    </div>

    <div class="file-list">
        {#if pdfFiles.length === 0}
            <div class="no-files">No PDF files selected.</div>
        {:else}
            <ul>
                {#each pdfFiles as file, i}
                    <li>
                        {file.name}
                        <button on:click={() => removeFile(i)}>×</button>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <button on:click={extractFiles} disabled={isExtracting}
        >Extract Embedded Files</button
    >
    <button on:click={clearAll}>Clear All</button>

    {#if extractedFiles.length > 0}
        <div class="download-all">
            <button on:click={() => downloadAll("text/csv")}
                >Download All CSV (ZIP)</button
            >
            <button on:click={() => downloadAll("text/html")}
                >Download All HTML (ZIP)</button
            >
            <button on:click={() => downloadAll("application/octet-stream")}
                >Download All Others (ZIP)</button
            >
        </div>

        <div class="extracted-list">
            <h3>Extracted Files</h3>
            {#each extractedFiles as file}
                <div class="extracted-file">
                    <span
                        >{file.name} ({file.type}, {file.data.length} bytes)</span
                    >
                    <button on:click={() => downloadFile(file)}>Download</button
                    >
                </div>
            {/each}
        </div>
    {/if}

    <div class="log-area"><pre>{outputLog}</pre></div>
</div>

<style>
    .container {
        max-width: 900px;
        margin: 0 auto;
        font-family: sans-serif;
        padding: 20px;
    }
    .drop-area {
        border: 2px dashed #3498db;
        padding: 30px;
        text-align: center;
        cursor: pointer;
        margin-bottom: 15px;
    }
    .file-list,
    .extracted-list,
    .log-area,
    .download-all {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 15px;
    }
    .download-all button {
        margin-right: 5px;
    }
    .no-files {
        color: #777;
        text-align: center;
    }
    button {
        margin: 5px 5px 5px 0;
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .extracted-file {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        padding: 4px 6px;
        background: #f9f9f9;
        border-radius: 4px;
    }
    .extracted-file span {
        flex: 1;
        margin-right: 10px;
        word-break: break-word;
    }
    .log-area {
        max-height: 200px;
        overflow-y: auto;
        background: #f4f4f4;
        padding: 10px;
    }
</style>
