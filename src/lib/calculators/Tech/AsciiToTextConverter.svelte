<script>
    /**
     * ASCII to Text Converter Component
     * Convert ASCII codes to readable text
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Input values
    let asciiInput = '72 101 108 108 111';
    let textResult = '';
    let error = '';

    // Convert ASCII to text
    function convertAsciiToText() {
        error = '';
        
        if (!asciiInput.trim()) {
            textResult = '';
            return;
        }

        try {
            const asciiCodes = asciiInput
                .split(/[,\s]+/)
                .map(str => str.trim())
                .filter(str => str !== '')
                .map(str => {
                    const num = parseInt(str);
                    if (isNaN(num) || num < 0 || num > 127) {
                        throw new Error(`"${str}" is not a valid ASCII code (0-127)`);
                    }
                    return num;
                });

            textResult = asciiCodes.map(code => String.fromCharCode(code)).join('');
        } catch (e) {
            error = e.message;
            textResult = '';
        }
    }

    // Auto-convert when input changes
    $: if (asciiInput) {
        convertAsciiToText();
    }

    // Copy result
    async function copyResult() {
        try {
            await navigator.clipboard.writeText(textResult);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    // Common ASCII codes
    const commonCodes = [
        { char: 'A', code: 65 }, { char: 'B', code: 66 }, { char: 'C', code: 67 },
        { char: 'a', code: 97 }, { char: 'b', code: 98 }, { char: 'c', code: 99 },
        { char: '0', code: 48 }, { char: '1', code: 49 }, { char: '2', code: 50 },
        { char: ' ', code: 32 }, { char: '!', code: 33 }, { char: '?', code: 63 }
    ];
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                ASCII to Text Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert ASCII character codes to readable text. 
                Enter ASCII codes separated by spaces or commas.
            </p>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    ASCII Codes (0-127, separated by spaces or commas)
                </label>
                <textarea
                    bind:value={asciiInput}
                    placeholder="72 101 108 108 111"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="3"
                ></textarea>

                {#if error}
                    <div class="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-700 text-sm">{error}</p>
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Result -->
    {#if textResult && !error}
        <Card>
            <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-semibold text-gray-900">Converted Text</h3>
                    <Button variant="outline" size="sm" on:click={copyResult}>
                        📋 Copy
                    </Button>
                </div>

                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div class="text-lg font-mono">{textResult}</div>
                </div>
            </div>
        </Card>
    {/if}

    <!-- ASCII Reference -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Common ASCII Codes
            </h3>

            <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
                {#each commonCodes as item}
                    <div class="text-center p-3 bg-gray-50 rounded-lg">
                        <div class="text-lg font-mono font-bold">{item.char}</div>
                        <div class="text-sm text-gray-600">{item.code}</div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>
</div>