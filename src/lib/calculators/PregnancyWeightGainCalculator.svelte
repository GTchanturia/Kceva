<script>
    /**
     * Pregnancy Weight Gain Calculator Component
     * Track healthy weight gain during pregnancy based on BMI
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let prePregnancyWeight = 65;
    let height = 165;
    let currentWeight = 70;
    let weeksPregnant = 20;
    let pregnancyType = 'singleton';

    // Results
    let preBMI = 0;
    let bmiCategory = '';
    let recommendedGain = { min: 0, max: 0 };
    let currentGain = 0;
    let weeklyGainNeeded = 0;
    let showResults = false;

    // Pregnancy types
    const pregnancyTypes = [
        { value: 'singleton', label: 'Single Baby' },
        { value: 'twins', label: 'Twins' }
    ];

    // Calculate pregnancy weight gain
    function calculateWeightGain() {
        if (prePregnancyWeight <= 0 || height <= 0 || currentWeight <= 0 || weeksPregnant <= 0) {
            showResults = false;
            return;
        }

        // Calculate pre-pregnancy BMI
        const heightM = height / 100;
        preBMI = prePregnancyWeight / (heightM * heightM);

        // Determine BMI category and recommended weight gain
        if (preBMI < 18.5) {
            bmiCategory = 'Underweight';
            recommendedGain = pregnancyType === 'singleton' ? { min: 12.5, max: 18 } : { min: 17, max: 25 };
        } else if (preBMI < 25) {
            bmiCategory = 'Normal weight';
            recommendedGain = pregnancyType === 'singleton' ? { min: 11.5, max: 16 } : { min: 14, max: 23 };
        } else if (preBMI < 30) {
            bmiCategory = 'Overweight';
            recommendedGain = pregnancyType === 'singleton' ? { min: 7, max: 11.5 } : { min: 11, max: 19 };
        } else {
            bmiCategory = 'Obese';
            recommendedGain = pregnancyType === 'singleton' ? { min: 5, max: 9 } : { min: 11, max: 19 };
        }

        // Calculate current weight gain
        currentGain = currentWeight - prePregnancyWeight;

        // Calculate weekly gain needed for remaining weeks
        const remainingWeeks = Math.max(0, 40 - weeksPregnant);
        const targetGain = (recommendedGain.min + recommendedGain.max) / 2;
        const remainingGain = Math.max(0, targetGain - currentGain);
        weeklyGainNeeded = remainingWeeks > 0 ? remainingGain / remainingWeeks : 0;

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (prePregnancyWeight && height && currentWeight && weeksPregnant) {
        calculateWeightGain();
    }

    // Get weight gain status
    function getWeightGainStatus() {
        if (currentGain < recommendedGain.min) {
            return { text: 'Below Recommended', color: 'text-blue-600', bg: 'bg-blue-50' };
        } else if (currentGain > recommendedGain.max) {
            return { text: 'Above Recommended', color: 'text-red-600', bg: 'bg-red-50' };
        } else {
            return { text: 'Within Recommended Range', color: 'text-green-600', bg: 'bg-green-50' };
        }
    }

    $: weightStatus = showResults ? getWeightGainStatus() : null;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Pregnancy Weight Gain Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Track healthy weight gain during pregnancy based on your pre-pregnancy BMI. 
                Get personalized recommendations for optimal maternal and fetal health.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Pre-Pregnancy Weight (kg)"
                    bind:value={prePregnancyWeight}
                    placeholder="65"
                    min="30"
                    max="200"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Height (cm)"
                    bind:value={height}
                    placeholder="165"
                    min="140"
                    max="220"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Current Weight (kg)"
                    bind:value={currentWeight}
                    placeholder="70"
                    min="30"
                    max="200"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="Weeks Pregnant"
                    bind:value={weeksPregnant}
                    placeholder="20"
                    min="1"
                    max="42"
                    step="1"
                />

                <Select
                    label="Pregnancy Type"
                    bind:value={pregnancyType}
                    options={pregnancyTypes}
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Weight Gain Status -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-pink-600 mb-4">
                    {formatNumber(currentGain, 1)} kg
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Current Weight Gain
                </div>
                {#if weightStatus}
                    <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {weightStatus.color} {weightStatus.bg} border">
                        {weightStatus.text}
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Recommendations -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-blue-600 mb-2">
                        {formatNumber(recommendedGain.min, 1)} - {formatNumber(recommendedGain.max, 1)} kg
                    </div>
                    <div class="text-gray-600">Recommended Total Gain</div>
                    <div class="text-sm text-gray-500 mt-1">
                        For {bmiCategory} BMI
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-green-600 mb-2">
                        {formatNumber(weeklyGainNeeded, 2)} kg
                    </div>
                    <div class="text-gray-600">Weekly Gain Needed</div>
                    <div class="text-sm text-gray-500 mt-1">
                        For remaining weeks
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-purple-600 mb-2">
                        {formatNumber(preBMI, 1)}
                    </div>
                    <div class="text-gray-600">Pre-Pregnancy BMI</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {bmiCategory}
                    </div>
                </div>
            </Card>
        </div>

        <!-- Weight Gain Guidelines -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Weight Gain Guidelines by BMI Category
                </h3>

                <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 rounded-lg {bmiCategory === 'Underweight' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
                        <span class="font-medium">Underweight (BMI < 18.5)</span>
                        <span class="text-sm">12.5-18 kg (28-40 lbs)</span>
                    </div>
                    <div class="flex items-center justify-between p-3 rounded-lg {bmiCategory === 'Normal weight' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}">
                        <span class="font-medium">Normal Weight (BMI 18.5-24.9)</span>
                        <span class="text-sm">11.5-16 kg (25-35 lbs)</span>
                    </div>
                    <div class="flex items-center justify-between p-3 rounded-lg {bmiCategory === 'Overweight' ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}">
                        <span class="font-medium">Overweight (BMI 25-29.9)</span>
                        <span class="text-sm">7-11.5 kg (15-25 lbs)</span>
                    </div>
                    <div class="flex items-center justify-between p-3 rounded-lg {bmiCategory === 'Obese' ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}">
                        <span class="font-medium">Obese (BMI ≥ 30)</span>
                        <span class="text-sm">5-9 kg (11-20 lbs)</span>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Important Notes -->
        <Card>
            <div class="p-6 bg-pink-50 border border-pink-200">
                <h3 class="text-lg font-semibold text-pink-900 mb-2">
                    👩‍⚕️ Important Medical Information
                </h3>
                <p class="text-pink-800 text-sm">
                    These are general guidelines based on IOM recommendations. Individual needs may vary. 
                    Always consult with your healthcare provider for personalized advice during pregnancy.
                </p>
            </div>
        </Card>
    {/if}
</div>