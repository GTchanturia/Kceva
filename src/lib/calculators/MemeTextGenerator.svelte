<script>
    import { onMount, tick } from "svelte";
    import { fade, slide } from "svelte/transition";

    let inputText = "";
    let memeImageUrl = "";
    let errorMessage = "";
    let canvas;
    let font = "Impact";
    let fontSize = 60;
    let textColor = "#ffffff";
    let strokeColor = "#000000";
    let strokeWidth = 8;
    let position = "center";
    let backgroundImage = null;
    let imagePreview = null;
    let textEffect = "none";
    let selectedTemplate = "none";

    // Predefined meme templates
    const templates = {
        none: null,
        distracted_boyfriend: "https://i.imgur.com/8z3k4bB.jpg",
        success_kid: "https://i.imgur.com/3P1hH.jpg",
        drake: "https://i.imgur.com/2z3k4bB.jpg",
    };

    // Random style presets
    const presets = [
        {
            font: "Impact",
            textColor: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 8,
            textEffect: "shadow",
        },
        {
            font: "Helvetica",
            textColor: "#e5e7eb",
            strokeColor: "#1f2937",
            strokeWidth: 6,
            textEffect: "none",
        },
        {
            font: "Arial",
            textColor: "#ffffff",
            strokeColor: "#374151",
            strokeWidth: 10,
            textEffect: "glow",
        },
    ];

    // Function to apply random preset
    function applyRandomPreset() {
        const preset = presets[Math.floor(Math.random() * presets.length)];
        font = preset.font;
        textColor = preset.textColor;
        strokeColor = preset.strokeColor;
        strokeWidth = preset.strokeWidth;
        textEffect = preset.textEffect;
        generateMemeText();
    }

    // Function to generate meme text on canvas
    async function generateMemeText() {
        await tick();
        if (!inputText.trim()) {
            memeImageUrl = "";
            errorMessage = "Please enter text to generate an image";
            return;
        }

        const ctx = canvas.getContext("2d");
        const padding = 20;

        // Load background image if template is selected
        let bgImage = backgroundImage;
        if (selectedTemplate !== "none" && !backgroundImage) {
            bgImage = new Image();
            bgImage.crossOrigin = "anonymous";
            bgImage.src = templates[selectedTemplate];
            await new Promise((resolve) => {
                bgImage.onload = resolve;
            });
        }

        // Set canvas size
        canvas.width = bgImage ? bgImage.width : 600;
        canvas.height = bgImage ? bgImage.height : fontSize * 2 + padding * 2;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        if (bgImage) {
            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = "#f3f4f6";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Set text properties
        ctx.font = `${fontSize}px ${font}, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline =
            position === "top"
                ? "top"
                : position === "bottom"
                  ? "bottom"
                  : "middle";
        ctx.fillStyle = textColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;

        // Apply text effects
        if (textEffect === "shadow") {
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
        } else if (textEffect === "glow") {
            ctx.shadowColor = textColor;
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        } else {
            ctx.shadowBlur = 0;
        }

        // Draw text
        const x = canvas.width / 2;
        const y =
            position === "top"
                ? padding
                : position === "bottom"
                  ? canvas.height - padding
                  : canvas.height / 2;
        ctx.strokeText(inputText.toUpperCase(), x, y);
        ctx.fillText(inputText.toUpperCase(), x, y);

        // Update image URL
        memeImageUrl = canvas.toDataURL("image/png");
        errorMessage = "";
    }

    // Handle image upload
    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    backgroundImage = img;
                    imagePreview = e.target.result;
                    selectedTemplate = "none";
                    generateMemeText();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Generate meme text when inputs change
    $: if (
        inputText ||
        font ||
        fontSize ||
        textColor ||
        strokeColor ||
        position ||
        backgroundImage ||
        selectedTemplate ||
        textEffect
    ) {
        generateMemeText();
    }

    onMount(() => {
        canvas = document.createElement("canvas");
        return () => {
            canvas = null;
        };
    });
</script>

<div
    class="bg-gray-100 text-gray-800 container mx-auto p-6 max-w-4xl rounded-lg shadow-lg"
>
    <h1 class="text-3xl font-bold mb-6">Text Image Generator</h1>
    <p class="text-gray-600 mb-6">
        Create professional text images for social media and graphics.
    </p>

    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
        in:slide
    >
        <div>
            <label for="inputText" class="block text-sm font-medium mb-2">
                Text Content
            </label>
            <input
                id="inputText"
                type="text"
                bind:value={inputText}
                placeholder="Enter text (e.g., Social Media Post)"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Text content for image"
            />
        </div>
        <div>
            <label for="font" class="block text-sm font-medium mb-2">
                Font
            </label>
            <select
                id="font"
                bind:value={font}
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Select font"
            >
                <option value="Impact">Impact</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Arial">Arial</option>
                <option value="Inter">Inter</option>
            </select>
        </div>
        <div>
            <label for="fontSize" class="block text-sm font-medium mb-2">
                Font Size ({fontSize}px)
            </label>
            <input
                id="fontSize"
                type="range"
                min="20"
                max="100"
                bind:value={fontSize}
                class="w-full accent-blue-500"
                aria-label="Adjust font size"
            />
        </div>
        <div>
            <label for="position" class="block text-sm font-medium mb-2">
                Text Position
            </label>
            <select
                id="position"
                bind:value={position}
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Select text position"
            >
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
            </select>
        </div>
        <div>
            <label for="textColor" class="block text-sm font-medium mb-2">
                Text Color
            </label>
            <input
                id="textColor"
                type="color"
                bind:value={textColor}
                class="w-full h-10 border rounded-md bg-white"
                aria-label="Select text color"
            />
        </div>
        <div>
            <label for="strokeColor" class="block text-sm font-medium mb-2">
                Stroke Color
            </label>
            <input
                id="strokeColor"
                type="color"
                bind:value={strokeColor}
                class="w-full h-10 border rounded-md bg-white"
                aria-label="Select stroke color"
            />
        </div>
        <div>
            <label for="textEffect" class="block text-sm font-medium mb-2">
                Text Effect
            </label>
            <select
                id="textEffect"
                bind:value={textEffect}
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Select text effect"
            >
                <option value="none">None</option>
                <option value="shadow">Shadow</option>
                <option value="glow">Glow</option>
            </select>
        </div>
        <div>
            <label for="template" class="block text-sm font-medium mb-2">
                Template
            </label>
            <select
                id="template"
                bind:value={selectedTemplate}
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Select background template"
            >
                <option value="none">None</option>
                <option value="distracted_boyfriend"
                    >Distracted Boyfriend</option
                >
                <option value="success_kid">Success Kid</option>
                <option value="drake">Drake Hotline Bling</option>
            </select>
        </div>
        <div class="md:col-span-2 lg:col-span-1">
            <label for="backgroundImage" class="block text-sm font-medium mb-2">
                Custom Background (optional)
            </label>
            <input
                id="backgroundImage"
                type="file"
                accept="image/*"
                on:change={handleImageUpload}
                class="w-full p-2 border rounded-md bg-white"
                aria-label="Upload custom background image"
            />
            {#if imagePreview}
                <img
                    src={imagePreview}
                    alt="Background Preview"
                    class="mt-2 max-w-full h-24 object-contain rounded-md"
                    in:fade
                />
            {/if}
        </div>
    </div>

    <div class="flex justify-center gap-4 mb-6">
        <button
            on:click={applyRandomPreset}
            class="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition"
            aria-label="Apply random style preset"
        >
            Random Style
        </button>
        <button
            on:click={generateMemeText}
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            aria-label="Generate text image"
        >
            Generate Image
        </button>
    </div>

    {#if errorMessage}
        <p class="text-red-500 mb-4 text-center" in:fade>{errorMessage}</p>
    {/if}

    {#if memeImageUrl}
        <div class="flex flex-col items-center" in:slide>
            <img
                src={memeImageUrl}
                alt="Generated Text Image"
                class="mb-4 max-w-full rounded-lg shadow-md"
                in:fade={{ duration: 300 }}
            />
            <a
                href={memeImageUrl}
                download="text-image.png"
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                aria-label="Download generated text image"
            >
                Download Image
            </a>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        font-family: "Inter", Arial, sans-serif;
    }
</style>
