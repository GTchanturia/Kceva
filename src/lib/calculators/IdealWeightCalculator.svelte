<script>
    /**
     * Ideal Weight Calculator Component
     * Calculate ideal weight using various formulas and methods
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let height = 175;
    let gender = 'male';
    let frameSize = 'medium';
    let age = 30;

    // Results
    let idealWeights = {};
    let showResults = false;

    // Gender options
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    // Frame size options
    const frameSizes = [
        { value: 'small', label: 'Small Frame' },
        { value: 'medium', label: 'Medium Frame' },
        { value: 'large', label: 'Large Frame' }
    ];

    // Calculate ideal weight using multiple formulas
    function calculateIdealWeight() {
        if (height <= 0) {
            showResults = false;
            return;
        }

        const heightInches = height / 2.54; // Convert cm to inches
        const heightFeet = Math.floor(heightInches / 12);
        const remainingInches = heightInches % 12;

        idealWeights = {
            robinson: calculateRobinson(heightInches, gender),
            miller: calculateMiller(heightInches, gender),
            devine: calculateDevine(heightInches, gender),
            hamwi: calculateHamwi(heightInches, gender),
            bmi: calculateBMIRange(height)
        };

        showResults = true;
    }

    // Robinson Formula (1983)
    function calculateRobinson(heightInches, genderValue) {
        if (genderValue === 'male') {
            return 52 + 1.9 * (heightInches - 60);
        } else {
            return 49 + 1.7 * (heightInches - 60);
        }
    }

    // Miller Formula (1983)
    function calculateMiller(heightInches, genderValue) {
        if (genderValue === 'male') {
            return 56.2 + 1.41 * (heightInches - 60);
        } else {
            return 53.1 + 1.36 * (heightInches - 60);
        }
    }

    // Devine Formula (1974)
    function calculateDevine(heightInches, genderValue) {
        if (genderValue === 'male') {
            return 50 + 2.3 * (heightInches - 60);
        } else {
            return 45.5 + 2.3 * (heightInches - 60);
        }
    }

    // Hamwi Formula (1964)
    function calculateHamwi(heightInches, genderValue) {
        if (genderValue === 'male') {
            return 48 + 2.7 * (heightInches - 60);
        } else {
            return 45.5 + 2.2 * (heightInches - 60);
        }
    }

    // BMI-based range (BMI 18.5-24.9)
    function calculateBMIRange(heightCm) {
        const heightM = heightCm / 100;
        return {
            min: 18.5 * heightM * heightM,
            max: 24.9 * heightM * heightM
        };
    }

    // Get average ideal weight
    function getAverageIdealWeight() {
        const weights = [
            idealWeights.robinson,
            idealWeights.miller,
            idealWeights.devine,
            idealWeights.hamwi
        ].filter(w => w > 0);

        return weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
    }

    // Auto-calculate when inputs change
    $: if (height && gender) {
        calculateIdealWeight();
    }

    $: averageWeight = showResults ? getAverageIdealWeight() : 0;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Ideal Weight Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your ideal weight using multiple proven formulas including Robinson, 
                Miller, Devine, and Hamwi methods. Get a comprehensive weight range for optimal health.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Height (cm)"
                    bind:value={height}
                    placeholder="175"
                    min="100"
                    max="250"
                    step="0.1"
                />

                <Select
                    label="Gender"
                    bind:value={gender}
                    options={genderOptions}
                />

                <Input
                    type="number"
                    label="Age (years)"
                    bind:value={age}
                    placeholder="30"
                    min="1"
                    max="120"
                    step="1"
                />

                <Select
                    label="Frame Size"
                    bind:value={frameSize}
                    options={frameSizes}
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Average Ideal Weight -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatNumber(averageWeight, 1)} kg
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Average Ideal Weight
                </div>
                <div class="text-lg text-gray-500">
                    ({formatNumber(averageWeight * 2.20462, 1)} lbs)
                </div>
            </div>
        </Card>

        <!-- Formula Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Ideal Weight by Formula
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Robinson Formula (1983)</h4>
                            <div class="text-2xl font-bold text-blue-600">{formatNumber(idealWeights.robinson, 1)} kg</div>
                            <div class="text-sm text-blue-700">({formatNumber(idealWeights.robinson * 2.20462, 1)} lbs)</div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Miller Formula (1983)</h4>
                            <div class="text-2xl font-bold text-green-600">{formatNumber(idealWeights.miller, 1)} kg</div>
                            <div class="text-sm text-green-700">({formatNumber(idealWeights.miller * 2.20462, 1)} lbs)</div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">Devine Formula (1974)</h4>
                            <div class="text-2xl font-bold text-purple-600">{formatNumber(idealWeights.devine, 1)} kg</div>
                            <div class="text-sm text-purple-700">({formatNumber(idealWeights.devine * 2.20462, 1)} lbs)</div>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">Hamwi Formula (1964)</h4>
                            <div class="text-2xl font-bold text-orange-600">{formatNumber(idealWeights.hamwi, 1)} kg</div>
                            <div class="text-sm text-orange-700">({formatNumber(idealWeights.hamwi * 2.20462, 1)} lbs)</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- BMI-Based Range -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Healthy Weight Range (BMI 18.5-24.9)
                </h3>

                <div class="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 mb-2">
                        {formatNumber(idealWeights.bmi.min, 1)} - {formatNumber(idealWeights.bmi.max, 1)} kg
                    </div>
                    <div class="text-lg text-green-700">
                        ({formatNumber(idealWeights.bmi.min * 2.20462, 1)} - {formatNumber(idealWeights.bmi.max * 2.20462, 1)} lbs)
                    </div>
                    <div class="text-sm text-green-600 mt-2">
                        Based on healthy BMI range
                    </div>
                </div>
            </div>
        </Card>

        <!-- Important Notes -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Considerations
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📊 Multiple Formulas
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Different formulas may give varying results. The average provides a good estimate, 
                            but individual factors like muscle mass and bone density also matter.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Health Focus
                        </h4>
                        <p class="text-green-800 text-sm">
                            Ideal weight is just one health indicator. Focus on overall fitness, 
                            nutrition, and consult healthcare professionals for personalized advice.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>