<script>
    /**
     * Probability Calculator Component
     * Calculate binomial probabilities, odds, and expected values
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Inputs
    let probability = 0.5; // success probability
    let trials = 10; // number of trials
    let successes = 5; // desired successes

    // Results
    let pmf = 0; // P(X = k)
    let cdf = 0; // P(X ≤ k)
    let atleast = 0; // P(X ≥ k)
    let expected = 0; // Expected successes
    let odds = "";
    let distribution = [];
    let showResults = false;
    let error = "";

    // Utility functions
    function clampProbability(p) {
        return Math.max(0, Math.min(1, p));
    }

    function factorial(n) {
        if (n < 0) return NaN;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    function choose(n, k) {
        if (k < 0 || k > n) return 0;
        k = Math.min(k, n - k);
        let res = 1;
        for (let i = 1; i <= k; i++) {
            res *= n - (k - i);
            res /= i;
        }
        return Math.round(res);
    }

    function binomialPMF(n, k, p) {
        p = clampProbability(p);
        return choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }

    function binomialCDF(n, k, p) {
        let sum = 0;
        for (let i = 0; i <= k; i++) sum += binomialPMF(n, i, p);
        return sum;
    }

    function probabilityAtLeast(n, k, p) {
        if (k <= 0) return 1;
        return 1 - binomialCDF(n, k - 1, p);
    }

    function toOdds(p) {
        p = clampProbability(p);
        if (p === 1) return "∞ : 1";
        if (p === 0) return "0 : 1";
        return (p / (1 - p)).toFixed(4) + " : 1";
    }

    // Calculate results
    function calculate() {
        error = "";

        if (trials < 0 || successes < 0 || successes > trials) {
            error = "Invalid inputs: ensure 0 ≤ successes ≤ trials";
            showResults = false;
            return;
        }

        try {
            const p = clampProbability(probability);

            pmf = binomialPMF(trials, successes, p);
            cdf = binomialCDF(trials, successes, p);
            atleast = probabilityAtLeast(trials, successes, p);
            expected = trials * p;
            odds = toOdds(p);

            distribution = Array.from({ length: trials + 1 }, (_, i) => ({
                k: i,
                prob: binomialPMF(trials, i, p),
            }));

            showResults = true;
        } catch (e) {
            error = e.message;
            showResults = false;
        }
    }

    // Auto-calc when inputs change
    $: calculate();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Probability Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate binomial probabilities, odds, and expected values.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Probability of Success (0–1)
                    </label>
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        bind:value={probability}
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Number of Trials (n)
                    </label>
                    <Input type="number" min="0" step="1" bind:value={trials} />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Desired Successes (k)
                    </label>
                    <Input
                        type="number"
                        min="0"
                        step="1"
                        bind:value={successes}
                    />
                </div>
            </div>

            {#if error}
                <div
                    class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                    <p class="text-red-700 text-sm">{error}</p>
                </div>
            {/if}
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && !error}
        <!-- Main Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-xl font-bold text-blue-600 mb-2">
                        {formatNumber(pmf, 6)}
                    </div>
                    <div class="text-gray-600">P(X = k)</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-xl font-bold text-green-600 mb-2">
                        {formatNumber(cdf, 6)}
                    </div>
                    <div class="text-gray-600">P(X ≤ k)</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-xl font-bold text-purple-600 mb-2">
                        {formatNumber(atleast, 6)}
                    </div>
                    <div class="text-gray-600">P(X ≥ k)</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-xl font-bold text-orange-600 mb-2">
                        {formatNumber(expected, 3)}
                    </div>
                    <div class="text-gray-600">Expected Successes</div>
                </div>
            </Card>
        </div>

        <!-- Odds -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-2xl font-bold text-indigo-600 mb-2">
                    {odds}
                </div>
                <div class="text-gray-600">Odds (success : failure)</div>
            </div>
        </Card>

        <!-- Distribution -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Distribution (n = {trials}, p = {formatNumber(
                        probability,
                        2,
                    )})
                </h3>

                <div class="flex flex-wrap gap-2">
                    {#each distribution as d}
                        <span
                            class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                        >
                            k={d.k}: {formatNumber(d.prob, 4)}
                        </span>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>
