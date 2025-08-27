<script>
    /**
     * Base64 Encoder/Decoder Component
     * Encode and decode text using Base64 encoding
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Input values
    let inputText = '';
    let operation = 'encode';
    let result = '';
    let error = '';

    // Operation options
    const operations = [
        { value: 'encode', label: 'Encode to Base64' },
        { value: 'decode', label: 'Decode from Base64' }
    ];

    // Process Base64 encoding/decoding
    function processBase64() {
        error = '';
        
        if (!inputText.trim()) {
            result = '';
            return;
        }

        try {
            if (operation === 'encode') {
                result = btoa(unescape(encodeURIComponent(inputText)));
            } else {
                result = decodeURIComponent(escape(atob(inputText)));
            }
        } catch (e) {
            error = 'Invalid input for Base64 decoding';
            result = '';
        }
    }

    // Copy result to clipboard
    async function copyResult() {
        try {
            await navigator.clipboard.writeText(result);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    // Auto-process when inputs change
    $: if (inputText !== null || operation) {
        processBase64();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Base64 Encoder/Decoder
            </h2>
            <p class="text-gray-600 mb-6">
                Encode text to Base64 or decode Base64 back to readable text. 
                Useful for data transmission, web development, and API integration.
            </p>

            <div class="space-y-6">
                <Select
                    label="Operation"
                    bind:value={operation}
                    options={operations}
                />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        {operation === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
                    </label>
                    <textarea
                        bind:value={inputText}
                        placeholder={operation === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows="4"
                    ></textarea>
                </div>
            </div>
        </div>
    </Card>

    {#if result || error}
        <Card>
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-900">
                        {operation === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                    </h3>
                    {#if result}
                        <Button variant="outline" size="sm" on:click={copyResult}>
                            📋 Copy
                        </Button>
                    {/if}
                </div>

                {#if error}
                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-700">{error}</p>
                    </div>
                {:else if result}
                    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <pre class="whitespace-pre-wrap break-all text-sm font-mono">{result}</pre>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}

    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
                About Base64 Encoding
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 class="font-semibold text-blue-900 mb-2">What is Base64?</h4>
                    <p class="text-blue-800 text-sm">
                        Base64 is a binary-to-text encoding scheme that represents binary data 
                        in ASCII string format using 64 printable characters.
                    </p>
                </div>

                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 class="font-semibold text-green-900 mb-2">Common Uses</h4>
                    <p class="text-green-800 text-sm">
                        Email attachments, embedding images in HTML/CSS, 
                        API data transmission, and storing binary data in text format.
                    </p>
                </div>
            </div>
        </div>
    </Card>
</div>