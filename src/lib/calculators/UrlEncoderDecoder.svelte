<script>
    /**
     * URL Encoder/Decoder Component
     * Encode and decode URLs for web development
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
        { value: 'encode', label: 'Encode URL' },
        { value: 'decode', label: 'Decode URL' }
    ];

    // Process URL encoding/decoding
    function processUrl() {
        error = '';
        
        if (!inputText.trim()) {
            result = '';
            return;
        }

        try {
            if (operation === 'encode') {
                result = encodeURIComponent(inputText);
            } else {
                result = decodeURIComponent(inputText);
            }
        } catch (e) {
            error = 'Invalid URL encoding format';
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
        processUrl();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                URL Encoder/Decoder
            </h2>
            <p class="text-gray-600 mb-6">
                Encode and decode URLs for web development. Convert special characters 
                to URL-safe format and back to readable text.
            </p>

            <div class="space-y-6">
                <Select
                    label="Operation"
                    bind:value={operation}
                    options={operations}
                />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        {operation === 'encode' ? 'URL to Encode' : 'Encoded URL to Decode'}
                    </label>
                    <textarea
                        bind:value={inputText}
                        placeholder={operation === 'encode' ? 'Enter URL or text to encode...' : 'Enter encoded URL to decode...'}
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows="3"
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
                        {operation === 'encode' ? 'Encoded URL' : 'Decoded URL'}
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
                URL Encoding Reference
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold text-gray-800 mb-3">Common Encodings</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Space:</span>
                            <span class="font-mono">%20</span>
                        </div>
                        <div class="flex justify-between">
                            <span>& (ampersand):</span>
                            <span class="font-mono">%26</span>
                        </div>
                        <div class="flex justify-between">
                            <span>? (question mark):</span>
                            <span class="font-mono">%3F</span>
                        </div>
                        <div class="flex justify-between">
                            <span># (hash):</span>
                            <span class="font-mono">%23</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="font-semibold text-gray-800 mb-3">When to Use</h4>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div>• Query parameters with special characters</div>
                        <div>• Form data submission</div>
                        <div>• API endpoint construction</div>
                        <div>• Safe URL transmission</div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</div>