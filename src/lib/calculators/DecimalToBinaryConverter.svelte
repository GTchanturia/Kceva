<script>
    /**
     * Decimal to Binary Converter Component
     * Convert decimal numbers to binary format
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Input values
    let decimalInput = 10;

    // Results
    let binaryResult = '';
    let hexResult = '';
    let octalResult = '';
    let showResults = false;
    let error = '';

    // Convert decimal to binary
    function convertDecimalToBinary() {
        error = '';
        
        if (decimalInput === null || decimalInput === undefined) {
            showResults = false;
            return;
        }

        if (decimalInput < 0) {
            error = 'Please enter a non-negative number';
            showResults = false;
            return;
        }

        if (!Number.isInteger(decimalInput)) {
            error = 'Please enter a whole number';
            showResults = false;
            return;
        }

        try {
            binaryResult = decimalInput.toString(2);
            hexResult = decimalInput.toString(16).toUpperCase();
            octalResult = decimalInput.toString(8);
            showResults = true;
        } catch (e) {
            error = 'Error converting decimal number';
            showResults = false;
        }
    }

    // Auto-convert when input changes
    $: if (decimalInput !== null && decimalInput !== undefined) {
        convertDecimalToBinary();
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
                Decimal to Binary Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert decimal numbers to binary, hexadecimal, and octal formats. 
                Essential for programming, computer science, and digital systems.
            </p>

            <div>
                <Input
                    type="number"
                    label="Decimal Number"
                    bind:value={decimalInput}
                    placeholder="10"
                    min="0"
                    step="1"
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
                    {decimalInput}₁₀
                </div>
                <div class="text-5xl font-bold text-blue-600 mb-2">
                    {binaryResult}₂
                </div>
                <div class="text-lg text-gray-600">
                    Binary
                </div>
            </div>
        </Card>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Binary</h3>
                    <div class="text-2xl font-mono font-bold text-blue-600 mb-4">
                        {binaryResult}
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        on:click={() => copyResult(binaryResult)}
                        className="w-full"
                    >
                        Copy
                    </Button>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Hexadecimal</h3>
                    <div class="text-2xl font-mono font-bold text-green-600 mb-4">
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
                    <div class="text-2xl font-mono font-bold text-purple-600 mb-4">
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
    {/if}
</div>