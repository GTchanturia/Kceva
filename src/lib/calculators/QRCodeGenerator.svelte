<script>
    import { onMount } from "svelte";
    import QRCode from "qrcode";

    let inputText = "";
    let qrCodeUrl = "";
    let errorMessage = "";

    // Function to generate QR code
    async function generateQRCode() {
        try {
            if (!inputText.trim()) {
                qrCodeUrl = "";
                errorMessage = "Please enter text or a URL";
                return;
            }

            // Generate QR code as a data URL
            qrCodeUrl = await QRCode.toDataURL(inputText, {
                width: 300,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff",
                },
            });
            errorMessage = "";
        } catch (err) {
            errorMessage = "Error generating QR code. Please try again.";
            console.error(err);
        }
    }

    // Generate QR code when input changes
    $: if (inputText) {
        generateQRCode();
    } else {
        qrCodeUrl = "";
        errorMessage = "";
    }
</script>

<div class="container mx-auto p-4 max-w-2xl">
    <h1 class="text-2xl font-bold mb-4">QR Code Generator</h1>
    <p class="text-gray-600 mb-6">
        Enter text or a URL to generate a QR code instantly.
    </p>

    <div class="mb-4">
        <label
            for="inputText"
            class="block text-sm font-medium text-gray-700 mb-2"
        >
            Text or URL
        </label>
        <input
            id="inputText"
            type="text"
            bind:value={inputText}
            placeholder="Enter text or URL (e.g., https://example.com)"
            class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    {#if errorMessage}
        <p class="text-red-500 mb-4">{errorMessage}</p>
    {/if}

    {#if qrCodeUrl}
        <div class="flex flex-col items-center">
            <img
                src={qrCodeUrl}
                alt="Generated QR Code"
                class="mb-4 max-w-full"
            />
            <a
                href={qrCodeUrl}
                download="qrcode.png"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
                Download QR Code
            </a>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        font-family: Arial, sans-serif;
    }
</style>
