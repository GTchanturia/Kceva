<script>
    import { onMount, tick } from "svelte";
    import { fade, slide } from "svelte/transition";
    import JsBarcode from "jsbarcode";

    let inputText = "";
    let barcodeImageUrl = "";
    let errorMessage = "";
    let canvas;
    let barcodeType = "CODE128";
    let barcodeWidth = 2;
    let barcodeHeight = 100;
    let displayText = true;

    // Supported barcode formats
    const barcodeTypes = ["CODE128", "EAN13", "UPC", "CODE39", "ITF"];

    // Function to generate barcode
    async function generateBarcode() {
        await tick();
        if (!inputText.trim()) {
            barcodeImageUrl = "";
            errorMessage = "Please enter text or data to generate a barcode";
            return;
        }

        try {
            // Generate barcode using JsBarcode
            JsBarcode(canvas, inputText, {
                format: barcodeType,
                width: barcodeWidth,
                height: barcodeHeight,
                displayValue: displayText,
                font: "Inter",
                textAlign: "center",
                textPosition: "bottom",
                fontSize: 20,
                background: "#f3f4f6",
                lineColor: "#000000",
                margin: 10,
            });

            // Update image URL
            barcodeImageUrl = canvas.toDataURL("image/png");
            errorMessage = "";
        } catch (err) {
            errorMessage =
                "Invalid input for selected barcode type. Please check your data.";
            console.error(err);
        }
    }

    // Generate barcode when inputs change
    $: if (
        inputText ||
        barcodeType ||
        barcodeWidth ||
        barcodeHeight ||
        displayText
    ) {
        generateBarcode();
    }

    onMount(() => {
        canvas = document.createElement("canvas");
        return () => {
            canvas = null;
        };
    });
</script>

<div
    class="bg-gray-100 text-gray-800 container mx-auto p-6 max-w-3xl rounded-lg shadow-lg"
>
    <h1 class="text-3xl font-bold mb-6">Barcode Generator</h1>
    <p class="text-gray-600 mb-6">
        Generate barcodes for products or data with customizable settings.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" in:slide>
        <div>
            <label for="inputText" class="block text-sm font-medium mb-2">
                Barcode Data
            </label>
            <input
                id="inputText"
                type="text"
                bind:value={inputText}
                placeholder="Enter data (e.g., 123456789012)"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Text or data for barcode"
            />
        </div>
        <div>
            <label for="barcodeType" class="block text-sm font-medium mb-2">
                Barcode Type
            </label>
            <select
                id="barcodeType"
                bind:value={barcodeType}
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Select barcode type"
            >
                {#each barcodeTypes as type}
                    <option value={type}>{type}</option>
                {/each}
            </select>
        </div>
        <div>
            <label for="barcodeWidth" class="block text-sm font-medium mb-2">
                Bar Width ({barcodeWidth}px)
            </label>
            <input
                id="barcodeWidth"
                type="range"
                min="1"
                max="5"
                step="0.5"
                bind:value={barcodeWidth}
                class="w-full accent-blue-500"
                aria-label="Adjust barcode bar width"
            />
        </div>
        <div>
            <label for="barcodeHeight" class="block text-sm font-medium mb-2">
                Barcode Height ({barcodeHeight}px)
            </label>
            <input
                id="barcodeHeight"
                type="range"
                min="50"
                max="200"
                bind:value={barcodeHeight}
                class="w-full accent-blue-500"
                aria-label="Adjust barcode height"
            />
        </div>
        <div class="md:col-span-2">
            <label
                for="displayText"
                class="flex items-center text-sm font-medium mb-2"
            >
                <input
                    id="displayText"
                    type="checkbox"
                    bind:checked={displayText}
                    class="mr-2 accent-blue-500"
                    aria-label="Toggle text display on barcode"
                />
                Display Text Below Barcode
            </label>
        </div>
    </div>

    <div class="flex justify-center mb-6">
        <button
            on:click={generateBarcode}
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            aria-label="Generate barcode"
        >
            Generate Barcode
        </button>
    </div>

    {#if errorMessage}
        <p class="text-red-500 mb-4 text-center" in:fade>{errorMessage}</p>
    {/if}

    {#if barcodeImageUrl}
        <div class="flex flex-col items-center" in:slide>
            <img
                src={barcodeImageUrl}
                alt="Generated Barcode"
                class="mb-4 max-w-full rounded-lg shadow-md"
                in:fade={{ duration: 300 }}
            />
            <a
                href={barcodeImageUrl}
                download="barcode.png"
                class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                aria-label="Download generated barcode"
            >
                Download Barcode
            </a>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        font-family: "Inter", Arial, sans-serif;
    }
</style>
