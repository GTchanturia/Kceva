<script>
    /**
     * Fraction to Decimal Converter Component
     * Convert fractions to decimal numbers with detailed explanations
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let numerator = 1;
    let denominator = 2;

    // Results
    let decimal = 0;
    let percentage = 0;
    let showResults = false;
    let isRepeating = false;
    let repeatingPart = '';

    // Calculate decimal conversion
    function convertFractionToDecimal() {
        if (denominator === 0) {
            showResults = false;
            return;
        }

        decimal = numerator / denominator;
        percentage = decimal * 100;
        
        // Check for repeating decimals
        checkRepeatingDecimal();
        
        showResults = true;
    }

    function checkRepeatingDecimal() {
        // Simple check for common repeating decimals
        const commonRepeating = {
            3: '3333...',
            6: '6666...',
            7: '142857142857...'
        };
        
        if (denominator in commonRepeating && numerator === 1) {
            isRepeating = true;
            repeatingPart = commonRepeating[denominator];
        } else {
            isRepeating = false;
            repeatingPart = '';
        }
    }

    // Simplify fraction
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    function getSimplifiedFraction() {
        const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
        return {
            num: numerator / divisor,
            den: denominator / divisor
        };
    }

    // Auto-calculate when inputs change
    $: if (numerator !== null && denominator !== null) {
        convertFractionToDecimal();
    }

    $: simplified = getSimplifiedFraction();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Fraction to Decimal Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert any fraction to its decimal equivalent. Perfect for math homework, 
                cooking measurements, and everyday calculations.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Numerator (Top Number)"
                    bind:value={numerator}
                    placeholder="1"
                    step="1"
                />

                <Input
                    type="number"
                    label="Denominator (Bottom Number)"
                    bind:value={denominator}
                    placeholder="2"
                    min="1"
                    step="1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && denominator !== 0}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {numerator}/{denominator}
                        {#if simplified.num !== numerator || simplified.den !== denominator}
                            = {simplified.num}/{simplified.den}
                        {/if}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(decimal, 6)}
                    </div>
                    <div class="text-lg text-gray-600">
                        {formatNumber(percentage, 4)}%
                    </div>
                </div>

                {#if isRepeating}
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 class="font-semibold text-yellow-900 mb-2">
                            🔄 Repeating Decimal
                        </h4>
                        <p class="text-yellow-800 text-sm">
                            This fraction produces a repeating decimal: {repeatingPart}
                        </p>
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Conversion Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Original Fraction:</span>
                            <span class="font-semibold">{numerator}/{denominator}</span>
                        </div>
                        {#if simplified.num !== numerator || simplified.den !== denominator}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Simplified Fraction:</span>
                                <span class="font-semibold">{simplified.num}/{simplified.den}</span>
                            </div>
                        {/if}
                        <div class="flex justify-between">
                            <span class="text-gray-600">Decimal:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(decimal, 6)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Percentage:</span>
                            <span class="font-semibold text-green-600">{formatNumber(percentage, 4)}%</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Calculation:</span>
                            <span class="font-semibold">{numerator} ÷ {denominator}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Type:</span>
                            <span class="font-semibold">
                                {decimal % 1 === 0 ? 'Whole Number' : isRepeating ? 'Repeating Decimal' : 'Terminating Decimal'}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Rounded (2 places):</span>
                            <span class="font-semibold">{formatNumber(decimal, 2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Rounded (4 places):</span>
                            <span class="font-semibold">{formatNumber(decimal, 4)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Fractions Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Fraction to Decimal Conversions
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each [
                        {frac: '1/2', dec: 0.5},
                        {frac: '1/3', dec: 0.3333},
                        {frac: '1/4', dec: 0.25},
                        {frac: '1/5', dec: 0.2},
                        {frac: '1/6', dec: 0.1667},
                        {frac: '1/8', dec: 0.125},
                        {frac: '1/10', dec: 0.1},
                        {frac: '3/4', dec: 0.75}
                    ] as common}
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{common.frac}</div>
                            <div class="text-sm text-gray-600">{common.dec}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Fraction to Decimal Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📚 How to Convert
                        </h4>
                        <p class="text-blue-800 text-sm">
                            To convert a fraction to decimal, divide the numerator (top number) 
                            by the denominator (bottom number).
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🔄 Repeating Decimals
                        </h4>
                        <p class="text-green-800 text-sm">
                            Some fractions create repeating decimals (like 1/3 = 0.333...). 
                            These are often written with a bar over the repeating digits.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>