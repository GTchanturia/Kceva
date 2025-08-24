<!-- <script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import FileSaver from "file-saver";
    import JSZip from "jszip";

    let pdfFiles: File[] = [];
    let extractedFiles: { name: string; data: Uint8Array; type: string }[] = [];
    let outputLog = "";
    let isExtracting = false;
    let csvOnlyMode = false; // Flag to track CSV-only extraction

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
        csvOnlyMode = false;
    }

    function detectType(data: Uint8Array, name: string) {
        const text = new TextDecoder()
            .decode(data.slice(0, 2000))
            .trim()
            .toLowerCase();

        // Check for HTML first to prioritize it
        if (
            name.toLowerCase().endsWith(".html") ||
            text.startsWith("<!doctype html") ||
            text.startsWith("<html") ||
            text.includes("<body") ||
            text.includes("<div") ||
            text.includes("<p>")
        ) {
            outputLog += `  ℹ️ Detected HTML based on ${name.toLowerCase().endsWith(".html") ? "filename" : "content markers"}: ${text.slice(0, 50)}...\n`;
            return "text/html";
        }

        // Check for CSV after HTML to avoid false positives
        const csvIndicators = [",", ";", "\t"];
        if (
            name.toLowerCase().endsWith(".csv") ||
            csvIndicators.some((c) => text.includes(c)) ||
            text
                .split("\n")
                .some(
                    (line) =>
                        line.includes(",") ||
                        line.includes(";") ||
                        line.includes("\t"),
                )
        ) {
            outputLog += `  ℹ️ Detected CSV based on ${name.toLowerCase().endsWith(".csv") ? "filename" : "content markers"}: ${text.slice(0, 50)}...\n`;
            return "text/csv";
        }

        outputLog += `  ℹ️ Detected binary/other: ${text.slice(0, 50)}...\n`;
        return "application/octet-stream";
    }

    function ensureExtension(name: string, type: string) {
        if (type === "text/csv" && !name.toLowerCase().endsWith(".csv")) {
            return name + ".csv";
        }
        if (type === "text/html" && !name.toLowerCase().endsWith(".html")) {
            return name + ".html";
        }
        return name;
    }

    function deriveFileName(
        originalName: string,
        pdfName: string,
        type: string,
    ) {
        const genericPatterns = ["fichier", "attachment", "embedded"];
        if (
            type === "text/csv" &&
            genericPatterns.some((pattern) =>
                originalName.toLowerCase().includes(pattern),
            )
        ) {
            const pdfBaseName = pdfName.replace(/\.pdf$/i, "");
            outputLog += `  ℹ️ Generic filename detected (${originalName}), using PDF-based name: ${pdfBaseName}_details_facture.csv\n`;
            return `${pdfBaseName}_details_facture.csv`;
        }
        return ensureExtension(originalName, type);
    }

    function handleDuplicateName(name: string) {
        let counter = 1;
        let base = name.replace(/(\.\w+)?$/, "");
        let ext = name.match(/(\.\w+)$/)?.[0] || "";
        let newName = name;
        while (extractedFiles.find((f) => f.name === newName)) {
            newName = `${base}_${counter++}${ext}`;
            outputLog += `  ⚠️ Duplicate filename detected, renamed to: ${newName}\n`;
        }
        return newName;
    }

    async function extractFiles(csvOnly: boolean = false) {
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
        csvOnlyMode = csvOnly;
        outputLog += `Starting extraction of ${csvOnly ? "CSV files" : "files"} from ${pdfFiles.length} PDF(s)...\n`;

        for (const file of pdfFiles) {
            try {
                outputLog += `Processing: ${file.name}\n`;
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
                        if (csvOnly && type !== "text/csv") {
                            outputLog += `  ℹ️ Skipped non-CSV file: ${name} (${type})\n`;
                            continue;
                        }
                        let fileName = deriveFileName(name, file.name, type);
                        fileName = handleDuplicateName(fileName);
                        extractedFiles = [
                            ...extractedFiles,
                            { name: fileName, data: content, type },
                        ];
                        outputLog += `  ✅ Extracted: ${fileName} (${type}, ${content.length} bytes, original: ${name})\n`;
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
                                    if (csvOnly && type !== "text/csv") {
                                        outputLog += `  ℹ️ Skipped non-CSV annotation: ${name} (${type})\n`;
                                        continue;
                                    }
                                    name = deriveFileName(
                                        name,
                                        file.name,
                                        type,
                                    );
                                    name = handleDuplicateName(name);
                                    extractedFiles = [
                                        ...extractedFiles,
                                        {
                                            name,
                                            data: new Uint8Array(embedded),
                                            type,
                                        },
                                    ];
                                    outputLog += `  ✅ Extracted from annotation: ${name} (${type}, ${embedded.length} bytes, original: ${annot.fs.fileName || `page${i}_attached.bin`})\n`;
                                }
                            }
                        }
                    } catch (err) {
                        outputLog += `  ⚠️ Failed to process page ${i}: ${(err as Error).message}\n`;
                    }
                }

                pdfDoc.destroy();
            } catch (err) {
                outputLog += `❌ Failed ${file.name}: ${(err as Error).message}\n`;
            }
        }

        outputLog += extractedFiles.length
            ? `\n✅ Extraction complete! ${extractedFiles.length} ${csvOnly ? "CSV " : ""}file(s) extracted.\n`
            : `\n🔍 No ${csvOnly ? "CSV " : ""}files found.\n`;

        isExtracting = false;
    }

    function extractCSVFiles() {
        extractFiles(true); // Trigger CSV-only extraction
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
    <h2>
        📑 PDF Embedded File Extractor - This is only Front-end Tool and no data
        will be saved anywhere
    </h2>

    <div
        class="drop-area"
        role="button"
        tabindex="0"
        on:dragover={handleDragOver}
        on:drop={handleDrop}
        on:click={triggerFileInput}
        on:keydown={(e) => e.key === "Enter" && triggerFileInput()}
    >
        <p class="drop-text">Drag & drop PDF files here</p>
        <p class="or">or</p>
        <button class="select-btn">Select PDF Files</button>
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
                        <span>{file.name}</span>
                        <button
                            class="remove-btn"
                            on:click={() => removeFile(i)}>✖</button
                        >
                    </li>
                {/each}
            </ul>
        {/if}
    </div>

    <div class="actions">
        <button
            class="primary"
            on:click={() => extractFiles(false)}
            disabled={isExtracting}
        >
            📂 Extract All Files
        </button>
        <button
            class="secondary"
            on:click={extractCSVFiles}
            disabled={isExtracting}
        >
            📊 Extract CSV Only
        </button>
        <button class="danger" on:click={clearAll}>🗑 Clear All</button>
    </div>

    {#if extractedFiles.length > 0}
        <div class="download-all">
            <h3>⬇️ Bulk Download</h3>
            <button on:click={() => downloadAll("text/csv")}
                >Download All CSV (ZIP)</button
            >
            {#if !csvOnlyMode}
                <button on:click={() => downloadAll("text/html")}
                    >Download All HTML (ZIP)</button
                >
                <button on:click={() => downloadAll("application/octet-stream")}
                    >Download All Others (ZIP)</button
                >
            {/if}
        </div>

        <div class="extracted-list">
            <h3>📂 Extracted {csvOnlyMode ? "CSV " : ""}Files</h3>
            {#each extractedFiles.filter( (f) => (csvOnlyMode ? f.type === "text/csv" : true), ) as file}
                <div class="extracted-file">
                    <span
                        >{file.name}
                        <small>({file.type}, {file.data.length} bytes)</small
                        ></span
                    >
                    <button
                        class="download-btn"
                        on:click={() => downloadFile(file)}>⬇️ Download</button
                    >
                </div>
            {/each}
        </div>
    {/if}

    <div class="log-area">
        <h3>📝 Log</h3>
        <pre>{outputLog}</pre>
    </div>
</div>

<style>
    .container {
        max-width: 900px;
        margin: 2rem auto;
        font-family: system-ui, sans-serif;
        padding: 20px;
        background: #fff;
    }

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.6rem;
        color: #2c3e50;
    }

    /* Drop Zone */
    .drop-area {
        border: 2px dashed #3498db;
        border-radius: 12px;
        padding: 40px;
        text-align: center;
        margin-bottom: 20px;
        background: #f9fbfd;
        transition:
            background 0.2s,
            border 0.2s;
    }
    .drop-area:hover {
        background: #eef7ff;
        border-color: #2980b9;
    }
    .drop-text {
        font-size: 1.1rem;
        font-weight: 500;
    }
    .or {
        margin: 8px 0;
        color: #666;
    }
    .select-btn {
        padding: 8px 16px;
        border-radius: 6px;
        border: none;
        background: #3498db;
        color: white;
        cursor: pointer;
    }
    .select-btn:hover {
        background: #2980b9;
    }

    /* File List */
    .file-list ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .file-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 10px;
        margin: 5px 0;
        background: #f4f6f8;
        border-radius: 6px;
    }
    .remove-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
        color: #e74c3c;
    }

    /* Buttons */
    .actions {
        margin: 15px 0;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    button {
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        border: none;
        transition: 0.2s;
    }
    button.primary {
        background: #3498db;
        color: white;
    }
    button.primary:hover {
        background: #2980b9;
    }
    button.secondary {
        background: #2ecc71;
        color: white;
    }
    button.secondary:hover {
        background: #27ae60;
    }
    button.danger {
        background: #e74c3c;
        color: white;
    }
    button.danger:hover {
        background: #c0392b;
    }

    /* Downloads */
    .download-all,
    .extracted-list,
    .log-area {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 15px;
        background: #fafafa;
    }
    .download-all h3,
    .extracted-list h3,
    .log-area h3 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1.1rem;
        color: #34495e;
    }
    .extracted-file {
        display: flex;
        justify-content: space-between;
        padding: 6px 10px;
        margin-bottom: 5px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 6px;
    }
    .download-btn {
        background: #9b59b6;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 5px 10px;
    }
    .download-btn:hover {
        background: #8e44ad;
    }

    /* Log Area */
    .log-area {
        background: #1e1e1e;
        color: #dcdcdc;
        font-size: 13px;
        max-height: 250px;
        overflow-y: auto;
    }
    .log-area pre {
        margin: 0;
        white-space: pre-wrap;
    }
</style> -->
