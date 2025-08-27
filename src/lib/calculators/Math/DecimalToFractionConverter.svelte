<script>
    /**
     * Decimal to Fraction Converter Component
     * Convert decimal numbers to fractions with simplification
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let decimal = 0.5;

    // Results
    let numerator = 0;
    let denominator = 0;
    let simplifiedNumerator = 0;
    let simplifiedDenominator = 0;
    let showResults = false;

    // Convert decimal to fraction
    function convertDecimalToFraction() {
        if (decimal === null || decimal === undefined) {
            showResults = false;
            return;
        }

        // Handle whole numbers
        if (decimal % 1 === 0) {
            numerator = decimal;
            denominator = 1;
            simplifiedNumerator = decimal;
            simplifiedDenominator = 1;
            showResults = true;
            return;
        }

        // Convert decimal to fraction
        const decimalString = decimal.toString();
        const decimalPlaces = decimalString.split('.')[1]?.length || 0;
        
        numerator = Math.round(decimal * Math.pow(10, decimalPlaces));
        denominator = Math.pow(10, decimalPlaces);

        // Simplify the fraction
        const gcdValue = gcd(Math.abs(numerator), Math.abs(denominator));
        simplifiedNumerator = numerator / gcdValue;
        simplifiedDenominator = denominator / gcdValue;

        showResults = true;
    }

    // Greatest Common Divisor
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Auto-calculate when input changes
    $: if (decimal !== null && decimal !== undefined) {
        convertDecimalToFraction();
    }

    // Get mixed number representation
    function getMixedNumber() {
        if (Math.abs(simplifiedNumerator) < simplifiedDenominator) {
            return null;
        }
        
        const wholeNumber = Math.floor(Math.abs(simplifiedNumerator) / simplifiedDenominator);
        const remainingNumerator = Math.abs(simplifiedNumerator) % simplifiedDenominator;
        
        return {
            whole: simplifiedNumerator < 0 ? -wholeNumber : wholeNumber,
            numerator: remainingNumerator,
            denominator: simplifiedDenominator
        };
    }

    $: mixedNumber = getMixedNumber();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Decimal to Fraction Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert any decimal number to its fraction equivalent. Automatically 
                simplifies fractions and shows mixed number format when applicable.
            </p>

            <div class="max-w-md">
                <Input
                    type="number"
                    label="Decimal Number"
                    bind:value={decimal}
                    placeholder="0.5"
                    step="0.001"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {formatNumber(decimal, 6)}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {simplifiedNumerator}/{simplifiedDenominator}
                    </div>
                    {#if mixedNumber && mixedNumber.numerator > 0}
                        <div class="text-lg text-gray-600">
                            Mixed Number: {mixedNumber.whole} {mixedNumber.numerator}/{mixedNumber.denominator}
                        </div>
                    {/if}
                </div>
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
                            <span class="text-gray-600">Original Decimal:</span>
                            <span class="font-semibold">{formatNumber(decimal, 6)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Initial Fraction:</span>
                            <span class="font-semibold">{numerator}/{denominator}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Simplified Fraction:</span>
                            <span class="font-semibold text-blue-600">{simplifiedNumerator}/{simplifiedDenominator}</span>
                        </div>
                        {#if mixedNumber && mixedNumber.numerator > 0}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Mixed Number:</span>
                                <span class="font-semibold text-green-600">
                                    {mixedNumber.whole} {mixedNumber.numerator}/{mixedNumber.denominator}
                                </span>
                            </div>
                        {/if}
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Decimal Places:</span>
                            <span class="font-semibold">{decimal.toString().split('.')[1]?.length || 0}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">GCD Used:</span>
                            <span class="font-semibold">{gcd(Math.abs(numerator), Math.abs(denominator))}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Verification:</span>
                            <span class="font-semibold">{formatNumber(simplifiedNumerator / simplifiedDenominator, 6)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Percentage:</span>
                            <span class="font-semibold">{formatNumber(decimal * 100, 2)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Decimal to Fraction Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Decimal to Fraction Conversions
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each [
                        {dec: '0.5', frac: '1/2'},
                        {dec: '0.25', frac: '1/4'},
                        {dec: '0.75', frac: '3/4'},
                        {dec: '0.125', frac: '1/8'},
                        {dec: '0.2', frac: '1/5'},
                        {dec: '0.1', frac: '1/10'},
                        {dec: '0.333', frac: '1/3'},
                        {dec: '0.667', frac: '2/3'}
                    ] as common}
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{common.dec}</div>
                            <div class="text-sm text-gray-600">{common.frac}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Decimal to Fraction Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📚 Conversion Process
                        </h4>
                        <p class="text-blue-800 text-sm">
                            To convert a decimal to a fraction: count decimal places, 
                            use as denominator power of 10, then simplify by finding GCD.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🔢 Mixed Numbers
                        </h4>
                        <p class="text-green-800 text-sm">
                            When the numerator is larger than the denominator, 
                            the fraction can be written as a mixed number (whole number + fraction).
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>