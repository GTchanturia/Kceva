<script>
    /**
     * Binary to Decimal Converter Component
     * Convert binary numbers to decimal format
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let binaryInput = '1010';

    // Results
    let decimalResult = 0;
    let hexResult = '';
    let octalResult = '';
    let showResults = false;
    let error = '';

    // Convert binary to decimal
    function convertBinaryToDecimal() {
        error = '';
        
        if (!binaryInput.trim()) {
            showResults = false;
            return;
        }

        // Validate binary input
        if (!/^[01]+$/.test(binaryInput)) {
            error = 'Invalid binary number. Use only 0s and 1s.';
            showResults = false;
            return;
        }

        try {
            decimalResult = parseInt(binaryInput, 2);
            hexResult = decimalResult.toString(16).toUpperCase();
            octalResult = decimalResult.toString(8);
            showResults = true;
        } catch (e) {
            error = 'Error converting binary number';
            showResults = false;
        }
    }

    // Auto-convert when input changes
    $: if (binaryInput) {
        convertBinaryToDecimal();
    }

    // Copy result
    async function copyResult(value) {
        try {
            await navigator.clipboard.writeText(value.toString());
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Binary to Decimal Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert binary numbers to decimal, hexadecimal, and octal formats. 
                Perfect for programming, computer science, and digital electronics.
            </p>

            <div>
                <Input
                    type="text"
                    label="Binary Number"
                    bind:value={binaryInput}
                    placeholder="1010"
                />
                
                {#if error}
                    <div class="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-700 text-sm">{error}</p>
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    {#if showResults && !error}
        <Card>
            <div class="p-6 text-center">
                <div class="text-2xl text-gray-600 mb-2">
                    {binaryInput}₂
                </div>
                <div class="text-5xl font-bold text-blue-600 mb-2">
                    {decimalResult}₁₀
                </div>
                <div class="text-lg text-gray-600">
                    Decimal
                </div>
            </div>
        </Card>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Decimal</h3>
                    <div class="text-2xl font-bold text-blue-600 mb-4">
                        {decimalResult}
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        on:click={() => copyResult(decimalResult)}
                        className="w-full"
                    >
                        Copy
                    </Button>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Hexadecimal</h3>
                    <div class="text-2xl font-bold text-green-600 mb-4">
                        {hexResult}
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        on:click={() => copyResult(hexResult)}
                        className="w-full"
                    >
                        Copy
                    </Button>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Octal</h3>
                    <div class="text-2xl font-bold text-purple-600 mb-4">
                        {octalResult}
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        on:click={() => copyResult(octalResult)}
                        className="w-full"
                    >
                        Copy
                    </Button>
                </div>
            </Card>
        </div>

        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Binary Conversion Steps
                </h3>
                
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-blue-900 mb-2">How Binary Works</h4>
                    <p class="text-blue-800 text-sm">
                        Each digit represents a power of 2, starting from 2⁰ on the right.
                    </p>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead>
                            <tr class="border-b">
                                <th class="text-left py-2">Position</th>
                                {#each binaryInput.split('').reverse() as digit, index}
                                    <th class="text-center py-2">2^{index}</th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="py-2">Binary Digit</td>
                                {#each binaryInput.split('').reverse() as digit}
                                    <td class="text-center py-2 font-mono">{digit}</td>
                                {/each}
                            </tr>
                            <tr>
                                <td class="py-2">Decimal Value</td>
                                {#each binaryInput.split('').reverse() as digit, index}
                                    <td class="text-center py-2">{digit === '1' ? Math.pow(2, index) : 0}</td>
                                {/each}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    {/if}
</div>