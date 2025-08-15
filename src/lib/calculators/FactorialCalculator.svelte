<script>
    /**
     * Factorial Calculator Component
     * Calculate factorial of numbers (n!)
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let number = 5;

    // Results
    let factorial = 0;
    let steps = [];
    let showResults = false;
    let error = '';

    // Calculate factorial
    function calculateFactorial() {
        error = '';
        
        if (number === null || number === undefined) {
            showResults = false;
            return;
        }

        if (number < 0) {
            error = 'Factorial is not defined for negative numbers';
            showResults = false;
            return;
        }

        if (!Number.isInteger(number)) {
            error = 'Factorial is only defined for whole numbers';
            showResults = false;
            return;
        }

        if (number > 170) {
            error = 'Number too large - factorial would exceed JavaScript limits';
            showResults = false;
            return;
        }

        // Calculate factorial
        factorial = 1;
        steps = [];

        if (number === 0 || number === 1) {
            factorial = 1;
            steps = [`${number}! = 1 (by definition)`];
        } else {
            let calculation = '';
            for (let i = number; i >= 1; i--) {
                factorial *= i;
                calculation += i + (i > 1 ? ' × ' : '');
            }
            steps = [`${number}! = ${calculation} = ${factorial}`];
        }

        showResults = true;
    }

    // Auto-calculate when input changes
    $: if (number !== null && number !== undefined) {
        calculateFactorial();
    }

    // Get factorial applications
    function getFactorialApplications() {
        return [
            { name: 'Permutations', formula: 'P(n,r) = n!/(n-r)!', description: 'Arrangements of objects' },
            { name: 'Combinations', formula: 'C(n,r) = n!/(r!(n-r)!)', description: 'Selections of objects' },
            { name: 'Probability', formula: 'Various formulas', description: 'Statistical calculations' },
            { name: 'Series Expansion', formula: 'e^x = Σ(x^n/n!)', description: 'Mathematical analysis' }
        ];
    }

    // Get some factorial values for reference
    const factorialReference = [
        { n: 0, value: 1 },
        { n: 1, value: 1 },
        { n: 2, value: 2 },
        { n: 3, value: 6 },
        { n: 4, value: 24 },
        { n: 5, value: 120 },
        { n: 6, value: 720 },
        { n: 7, value: 5040 },
        { n: 8, value: 40320 },
        { n: 9, value: 362880 },
        { n: 10, value: 3628800 }
    ];
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Factorial Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate the factorial of any number (n!). Factorials are used in permutations, 
                combinations, probability, and many areas of mathematics.
            </p>

            <div class="max-w-md">
                <Input
                    type="number"
                    label="Number (n)"
                    bind:value={number}
                    placeholder="5"
                    min="0"
                    max="170"
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

    <!-- Results -->
    {#if showResults && !error}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-2xl text-gray-600 mb-2">
                    {number}!
                </div>
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {factorial < 1e15 ? formatNumber(factorial, 0) : factorial.toExponential(3)}
                </div>
                <div class="text-lg text-gray-600">
                    Factorial of {number}
                </div>
            </div>
        </Card>

        <!-- Calculation Steps -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Calculation Steps
                </h3>

                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="font-mono text-sm break-all">
                        {#each steps as step}
                            <div class="mb-2">{step}</div>
                        {/each}
                    </div>
                </div>

                {#if number > 1}
                    <div class="mt-4 text-sm text-gray-600">
                        <p><strong>Definition:</strong> n! = n × (n-1) × (n-2) × ... × 2 × 1</p>
                        <p><strong>Special cases:</strong> 0! = 1 and 1! = 1 by definition</p>
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Factorial Reference Table -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Factorial Reference Table
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {#each factorialReference as ref}
                        <div class="text-center p-3 rounded-lg {ref.n === number ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}">
                            <div class="font-semibold text-gray-900">{ref.n}!</div>
                            <div class="text-sm text-gray-600">{formatNumber(ref.value, 0)}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Applications -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Factorial Applications
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {#each getFactorialApplications() as app}
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">{app.name}</h4>
                            <div class="text-blue-800 text-sm mb-1 font-mono">{app.formula}</div>
                            <p class="text-blue-700 text-sm">{app.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Interesting Facts -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Factorial Facts
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">🚀 Growth Rate</h4>
                        <p class="text-purple-800 text-sm">
                            Factorials grow extremely fast! 13! is already over 6 billion, 
                            and 70! exceeds the number of atoms in the observable universe.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">🎯 Real World</h4>
                        <p class="text-green-800 text-sm">
                            If you have 10 books, there are 10! = 3,628,800 different ways 
                            to arrange them on a shelf!
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>