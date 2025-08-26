<script>
    /**
     * Mean/Median/Mode Calculator Component
     * Calculate statistical measures of central tendency
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let numbersInput = '1, 2, 3, 4, 5, 5, 6, 7, 8, 9';
    let numbers = [];

    // Results
    let mean = 0;
    let median = 0;
    let mode = [];
    let range = 0;
    let count = 0;
    let sum = 0;
    let showResults = false;
    let error = '';

    // Parse input numbers
    function parseNumbers() {
        error = '';
        
        if (!numbersInput.trim()) {
            showResults = false;
            return;
        }

        try {
            // Split by comma, space, or newline and parse
            numbers = numbersInput
                .split(/[,\s\n]+/)
                .map(str => str.trim())
                .filter(str => str !== '')
                .map(str => {
                    const num = parseFloat(str);
                    if (isNaN(num)) {
                        throw new Error(`"${str}" is not a valid number`);
                    }
                    return num;
                });

            if (numbers.length === 0) {
                error = 'Please enter at least one number';
                showResults = false;
                return;
            }

            calculateStatistics();
        } catch (e) {
            error = e.message;
            showResults = false;
        }
    }

    // Calculate all statistics
    function calculateStatistics() {
        count = numbers.length;
        sum = numbers.reduce((acc, num) => acc + num, 0);
        
        // Mean
        mean = sum / count;

        // Median
        const sorted = [...numbers].sort((a, b) => a - b);
        if (count % 2 === 0) {
            median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
        } else {
            median = sorted[Math.floor(count / 2)];
        }

        // Mode
        const frequency = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });

        const maxFreq = Math.max(...Object.values(frequency));
        mode = Object.keys(frequency)
            .filter(key => frequency[key] === maxFreq)
            .map(key => parseFloat(key));

        // Range
        range = Math.max(...numbers) - Math.min(...numbers);

        showResults = true;
    }

    // Auto-calculate when input changes
    $: if (numbersInput) {
        parseNumbers();
    }

    // Add sample data
    function addSampleData(type) {
        switch (type) {
            case 'grades':
                numbersInput = '85, 92, 78, 96, 88, 91, 85, 89, 94, 87';
                break;
            case 'ages':
                numbersInput = '25, 30, 35, 28, 32, 29, 31, 27, 33, 26';
                break;
            case 'scores':
                numbersInput = '100, 95, 87, 92, 88, 95, 91, 89, 94, 90';
                break;
            case 'temperatures':
                numbersInput = '22, 25, 23, 26, 24, 25, 27, 23, 24, 26';
                break;
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Mean, Median & Mode Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate statistical measures of central tendency for any dataset. 
                Perfect for analyzing test scores, survey data, and research statistics.
            </p>

            <div class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Enter Numbers (separated by commas, spaces, or new lines)
                    </label>
                    <textarea
                        bind:value={numbersInput}
                        placeholder="1, 2, 3, 4, 5, 5, 6, 7, 8, 9"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows="3"
                    ></textarea>

                    {#if error}
                        <div class="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p class="text-red-700 text-sm">{error}</p>
                        </div>
                    {/if}
                </div>

                <!-- Sample Data Buttons -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Quick Sample Data</label>
                    <div class="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" on:click={() => addSampleData('grades')}>
                            Test Grades
                        </Button>
                        <Button variant="outline" size="sm" on:click={() => addSampleData('ages')}>
                            Ages
                        </Button>
                        <Button variant="outline" size="sm" on:click={() => addSampleData('scores')}>
                            Game Scores
                        </Button>
                        <Button variant="outline" size="sm" on:click={() => addSampleData('temperatures')}>
                            Temperatures
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && !error}
        <!-- Main Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(mean, 3)}
                    </div>
                    <div class="text-gray-600">Mean (Average)</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Sum ÷ Count
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(median, 3)}
                    </div>
                    <div class="text-gray-600">Median</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Middle value
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {mode.length === 1 ? formatNumber(mode[0], 3) : mode.length > 1 ? 'Multiple' : 'None'}
                    </div>
                    <div class="text-gray-600">Mode</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Most frequent
                    </div>
                </div>
            </Card>
        </div>

        <!-- Additional Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-orange-600 mb-2">
                        {count}
                    </div>
                    <div class="text-gray-600">Count</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-red-600 mb-2">
                        {formatNumber(sum, 2)}
                    </div>
                    <div class="text-gray-600">Sum</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-teal-600 mb-2">
                        {formatNumber(range, 2)}
                    </div>
                    <div class="text-gray-600">Range</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-indigo-600 mb-2">
                        {formatNumber(Math.max(...numbers), 2)}
                    </div>
                    <div class="text-gray-600">Maximum</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Statistical Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Mean (Average):</span>
                            <span class="font-semibold text-blue-600">{formatNumber(mean, 6)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Median:</span>
                            <span class="font-semibold text-green-600">{formatNumber(median, 6)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Mode:</span>
                            <span class="font-semibold text-purple-600">
                                {mode.length === 0 ? 'No mode' : mode.map(m => formatNumber(m, 3)).join(', ')}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Range:</span>
                            <span class="font-semibold">{formatNumber(range, 3)}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Count:</span>
                            <span class="font-semibold">{count} values</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Sum:</span>
                            <span class="font-semibold">{formatNumber(sum, 3)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Minimum:</span>
                            <span class="font-semibold">{formatNumber(Math.min(...numbers), 3)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Maximum:</span>
                            <span class="font-semibold">{formatNumber(Math.max(...numbers), 3)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Data Visualization -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Sorted Data
                </h3>

                <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex flex-wrap gap-2">
                        {#each [...numbers].sort((a, b) => a - b) as num, index}
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                                {formatNumber(num, 2)}
                            </span>
                        {/each}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Definitions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Statistical Definitions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">Mean</h4>
                        <p class="text-blue-800 text-sm">
                            The arithmetic average of all values. 
                            Sum of all values divided by the count.
                        </p>
                    </div>

                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">Median</h4>
                        <p class="text-green-800 text-sm">
                            The middle value when data is arranged in order. 
                            Less affected by extreme values than the mean.
                        </p>
                    </div>

                    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 class="font-semibold text-purple-900 mb-2">Mode</h4>
                        <p class="text-purple-800 text-sm">
                            The most frequently occurring value(s) in the dataset. 
                            There can be no mode, one mode, or multiple modes.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>