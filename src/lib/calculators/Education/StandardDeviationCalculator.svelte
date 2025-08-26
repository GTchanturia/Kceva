<script>
    /**
     * Standard Deviation Calculator Component
     * Calculate standard deviation and variance of data sets
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let numbersInput = '2, 4, 4, 4, 5, 5, 7, 9';
    let calculationType = 'sample';
    let numbers = [];

    // Results
    let mean = 0;
    let variance = 0;
    let standardDeviation = 0;
    let count = 0;
    let showResults = false;
    let error = '';
    let deviations = [];

    // Calculation types
    const calculationTypes = [
        { value: 'sample', label: 'Sample Standard Deviation (n-1)' },
        { value: 'population', label: 'Population Standard Deviation (n)' }
    ];

    // Parse input numbers
    function parseNumbers() {
        error = '';
        
        if (!numbersInput.trim()) {
            showResults = false;
            return;
        }

        try {
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

            if (calculationType === 'sample' && numbers.length < 2) {
                error = 'Sample standard deviation requires at least 2 values';
                showResults = false;
                return;
            }

            calculateStandardDeviation();
        } catch (e) {
            error = e.message;
            showResults = false;
        }
    }

    // Calculate standard deviation and variance
    function calculateStandardDeviation() {
        count = numbers.length;
        
        // Calculate mean
        mean = numbers.reduce((sum, num) => sum + num, 0) / count;

        // Calculate deviations from mean
        deviations = numbers.map(num => {
            const deviation = num - mean;
            return {
                value: num,
                deviation: deviation,
                squaredDeviation: deviation * deviation
            };
        });

        // Calculate variance
        const sumSquaredDeviations = deviations.reduce((sum, item) => sum + item.squaredDeviation, 0);
        const divisor = calculationType === 'sample' ? count - 1 : count;
        variance = sumSquaredDeviations / divisor;

        // Calculate standard deviation
        standardDeviation = Math.sqrt(variance);

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (numbersInput && calculationType) {
        parseNumbers();
    }

    // Add sample data
    function addSampleData(type) {
        switch (type) {
            case 'test-scores':
                numbersInput = '85, 92, 78, 96, 88, 91, 85, 89, 94, 87';
                break;
            case 'heights':
                numbersInput = '165, 170, 175, 168, 172, 169, 174, 171, 167, 173';
                break;
            case 'sales':
                numbersInput = '1200, 1350, 1100, 1450, 1250, 1300, 1150, 1400, 1320, 1280';
                break;
            case 'temperatures':
                numbersInput = '22.5, 25.1, 23.8, 26.2, 24.3, 25.7, 27.1, 23.2, 24.9, 26.0';
                break;
        }
    }

    // Get interpretation of standard deviation
    function getSDInterpretation() {
        const cv = (standardDeviation / Math.abs(mean)) * 100; // Coefficient of variation
        
        if (cv < 10) return { level: 'Low Variability', color: 'text-green-600', description: 'Data points are close to the mean' };
        if (cv < 20) return { level: 'Moderate Variability', color: 'text-yellow-600', description: 'Some spread in the data' };
        if (cv < 30) return { level: 'High Variability', color: 'text-orange-600', description: 'Significant spread in the data' };
        return { level: 'Very High Variability', color: 'text-red-600', description: 'Data points are widely scattered' };
    }

    $: sdInterpretation = showResults ? getSDInterpretation() : null;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Standard Deviation Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate standard deviation and variance to measure data spread and variability. 
                Essential for statistical analysis, quality control, and research.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Type"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Enter Numbers (separated by commas, spaces, or new lines)
                    </label>
                    <textarea
                        bind:value={numbersInput}
                        placeholder="2, 4, 4, 4, 5, 5, 7, 9"
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
                        <Button variant="outline" size="sm" on:click={() => addSampleData('test-scores')}>
                            Test Scores
                        </Button>
                        <Button variant="outline" size="sm" on:click={() => addSampleData('heights')}>
                            Heights
                        </Button>
                        <Button variant="outline" size="sm" on:click={() => addSampleData('sales')}>
                            Sales Data
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
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(standardDeviation, 4)}
                    </div>
                    <div class="text-gray-600">Standard Deviation</div>
                    <div class="text-sm text-gray-500 mt-1">
                        σ {calculationType === 'sample' ? '(s)' : '(σ)'}
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(variance, 4)}
                    </div>
                    <div class="text-gray-600">Variance</div>
                    <div class="text-sm text-gray-500 mt-1">
                        σ² {calculationType === 'sample' ? '(s²)' : '(σ²)'}
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(mean, 3)}
                    </div>
                    <div class="text-gray-600">Mean</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Average value
                    </div>
                </div>
            </Card>
        </div>

        <!-- Variability Interpretation -->
        {#if sdInterpretation}
            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold {sdInterpretation.color} mb-2">
                        {sdInterpretation.level}
                    </div>
                    <div class="text-gray-600 mb-2">
                        Coefficient of Variation: {formatNumber((standardDeviation / Math.abs(mean)) * 100, 1)}%
                    </div>
                    <div class="text-sm text-gray-500">
                        {sdInterpretation.description}
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Calculation Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Calculation Details
                </h3>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Value
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deviation from Mean
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Squared Deviation
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each deviations as item}
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatNumber(item.value, 3)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        {formatNumber(item.deviation, 3)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                        {formatNumber(item.squaredDeviation, 3)}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>

        <!-- Formulas -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Standard Deviation Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">Sample Standard Deviation</h4>
                        <div class="text-blue-800 text-sm">
                            <div class="font-mono text-lg mb-2">s = √[Σ(x - x̄)² / (n-1)]</div>
                            <div>Used when data represents a sample from a larger population</div>
                        </div>
                    </div>

                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">Population Standard Deviation</h4>
                        <div class="text-green-800 text-sm">
                            <div class="font-mono text-lg mb-2">σ = √[Σ(x - μ)² / n]</div>
                            <div>Used when data represents the entire population</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>