<script>
    /**
     * Text to ASCII Converter Component
     * Convert text to ASCII character codes
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Input values
    let textInput = 'Hello';
    let asciiResult = '';

    // Convert text to ASCII
    function convertTextToAscii() {
        if (!textInput) {
            asciiResult = '';
            return;
        }

        asciiResult = textInput
            .split('')
            .map(char => char.charCodeAt(0))
            .join(' ');
    }

    // Auto-convert when input changes
    $: if (textInput !== null) {
        convertTextToAscii();
    }

    // Copy result
    async function copyResult() {
        try {
            await navigator.clipboard.writeText(asciiResult);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Text to ASCII Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert any text to ASCII character codes. 
                Perfect for programming, data encoding, and educational purposes.
            </p>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Text to Convert
                </label>
                <textarea
                    bind:value={textInput}
                    placeholder="Hello"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="3"
                ></textarea>
            </div>
        </div>
    </Card>

    <!-- Result -->
    {#if asciiResult}
        <Card>
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-900">ASCII Codes</h3>
                    <Button variant="outline" size="sm" on:click={copyResult}>
                        📋 Copy
                    </Button>
                </div>

                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div class="text-lg font-mono break-all">{asciiResult}</div>
                </div>
            </div>
        </Card>
    {/if}
</div>