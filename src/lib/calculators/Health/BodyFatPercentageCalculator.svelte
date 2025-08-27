<script>
    /**
     * Body Fat Percentage Calculator Component
     * Estimate body fat percentage using various measurement methods
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let method = 'navy';
    let gender = 'male';
    let age = 30;
    let weight = 70;
    let height = 175;

    // Navy method measurements
    let neck = 38;
    let waist = 85;
    let hip = 95; // For females

    // Results
    let bodyFatPercentage = 0;
    let bodyFatCategory = '';
    let showResults = false;

    // Method options
    const methods = [
        { value: 'navy', label: 'US Navy Method (Circumference)' },
        { value: 'bmi-based', label: 'BMI-Based Estimation' }
    ];

    // Gender options
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    // Calculate body fat percentage
    function calculateBodyFat() {
        if (method === 'navy') {
            calculateNavyMethod();
        } else if (method === 'bmi-based') {
            calculateBMIMethod();
        }
    }

    function calculateNavyMethod() {
        if (neck <= 0 || waist <= 0 || (gender === 'female' && hip <= 0)) {
            showResults = false;
            return;
        }

        let bodyFat;
        if (gender === 'male') {
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }

        bodyFatPercentage = Math.max(0, bodyFat);
        bodyFatCategory = getBodyFatCategory(bodyFatPercentage, gender);
        showResults = true;
    }

    function calculateBMIMethod() {
        if (weight <= 0 || height <= 0 || age <= 0) {
            showResults = false;
            return;
        }

        const bmi = weight / Math.pow(height / 100, 2);
        
        // Deurenberg formula
        let bodyFat;
        if (gender === 'male') {
            bodyFat = 1.20 * bmi + 0.23 * age - 16.2;
        } else {
            bodyFat = 1.20 * bmi + 0.23 * age - 5.4;
        }

        bodyFatPercentage = Math.max(0, bodyFat);
        bodyFatCategory = getBodyFatCategory(bodyFatPercentage, gender);
        showResults = true;
    }

    function getBodyFatCategory(percentage, genderValue) {
        const categories = {
            male: [
                { min: 0, max: 6, category: 'Essential Fat', color: 'text-blue-600' },
                { min: 6, max: 13, category: 'Athletes', color: 'text-green-600' },
                { min: 14, max: 17, category: 'Fitness', color: 'text-green-500' },
                { min: 18, max: 24, category: 'Average', color: 'text-yellow-600' },
                { min: 25, max: 100, category: 'Obese', color: 'text-red-600' }
            ],
            female: [
                { min: 0, max: 12, category: 'Essential Fat', color: 'text-blue-600' },
                { min: 12, max: 20, category: 'Athletes', color: 'text-green-600' },
                { min: 21, max: 24, category: 'Fitness', color: 'text-green-500' },
                { min: 25, max: 31, category: 'Average', color: 'text-yellow-600' },
                { min: 32, max: 100, category: 'Obese', color: 'text-red-600' }
            ]
        };

        const genderCategories = categories[genderValue] || categories.male;
        const category = genderCategories.find(cat => percentage >= cat.min && percentage <= cat.max);
        return category || { category: 'Unknown', color: 'text-gray-600' };
    }

    // Auto-calculate when inputs change
    $: if (method && gender) {
        calculateBodyFat();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Body Fat Percentage Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Estimate your body fat percentage using proven measurement methods. 
                Choose between the US Navy circumference method or BMI-based estimation.
            </p>

            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                        label="Calculation Method"
                        bind:value={method}
                        options={methods}
                    />

                    <Select
                        label="Gender"
                        bind:value={gender}
                        options={genderOptions}
                    />
                </div>

                {#if method === 'navy'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Height (cm)"
                            bind:value={height}
                            placeholder="175"
                            min="1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Neck Circumference (cm)"
                            bind:value={neck}
                            placeholder="38"
                            min="1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Waist Circumference (cm)"
                            bind:value={waist}
                            placeholder="85"
                            min="1"
                            step="0.1"
                        />

                        {#if gender === 'female'}
                            <Input
                                type="number"
                                label="Hip Circumference (cm)"
                                bind:value={hip}
                                placeholder="95"
                                min="1"
                                step="0.1"
                            />
                        {/if}
                    </div>
                {:else if method === 'bmi-based'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Weight (kg)"
                            bind:value={weight}
                            placeholder="70"
                            min="1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Height (cm)"
                            bind:value={height}
                            placeholder="175"
                            min="1"
                            step="0.1"
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
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatNumber(bodyFatPercentage, 1)}%
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Body Fat Percentage
                </div>
                <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border {bodyFatCategory.color} bg-opacity-10">
                    {bodyFatCategory.category}
                </div>
            </div>
        </Card>

        <!-- Body Fat Categories -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Body Fat Categories for {gender === 'male' ? 'Men' : 'Women'}
                </h3>

                <div class="space-y-3">
                    {#each (gender === 'male' ? [
                        { range: '2-5%', category: 'Essential Fat', description: 'Minimum for basic physical health' },
                        { range: '6-13%', category: 'Athletes', description: 'Typical for male athletes' },
                        { range: '14-17%', category: 'Fitness', description: 'Fit, healthy appearance' },
                        { range: '18-24%', category: 'Average', description: 'Typical for average men' },
                        { range: '25%+', category: 'Obese', description: 'Associated with health risks' }
                    ] : [
                        { range: '10-13%', category: 'Essential Fat', description: 'Minimum for basic physical health' },
                        { range: '14-20%', category: 'Athletes', description: 'Typical for female athletes' },
                        { range: '21-24%', category: 'Fitness', description: 'Fit, healthy appearance' },
                        { range: '25-31%', category: 'Average', description: 'Typical for average women' },
                        { range: '32%+', category: 'Obese', description: 'Associated with health risks' }
                    ]) as category}
                        <div class="flex items-center justify-between p-3 rounded-lg {bodyFatCategory.category === category.category ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
                            <div>
                                <span class="font-medium">{category.category}</span>
                                <span class="text-sm text-gray-600 ml-2">({category.range})</span>
                            </div>
                            <span class="text-sm text-gray-500">{category.description}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Important Notes -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📊 Accuracy Note
                        </h4>
                        <p class="text-blue-800 text-sm">
                            These calculations provide estimates. For precise body composition analysis, 
                            consider DEXA scans, hydrostatic weighing, or professional assessment.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Health Focus
                        </h4>
                        <p class="text-green-800 text-sm">
                            Body fat percentage is just one health indicator. Consider overall fitness, 
                            muscle mass, and consult healthcare professionals for comprehensive assessment.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>