<script>
    /**
     * Water Intake Calculator Component
     * Calculate daily water intake recommendations based on various factors
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let weight = 70;
    let activityLevel = 'moderate';
    let climate = 'temperate';
    let age = 30;
    let gender = 'male';
    let pregnantOrBreastfeeding = false;

    // Results
    let dailyWaterIntake = 0;
    let glassesOfWater = 0;
    let showResults = false;

    // Activity level options
    const activityLevels = [
        { value: 'sedentary', label: 'Sedentary (little/no exercise)', multiplier: 1.0 },
        { value: 'light', label: 'Light activity (light exercise 1-3 days/week)', multiplier: 1.1 },
        { value: 'moderate', label: 'Moderate activity (moderate exercise 3-5 days/week)', multiplier: 1.2 },
        { value: 'active', label: 'Very active (hard exercise 6-7 days/week)', multiplier: 1.3 },
        { value: 'extreme', label: 'Extremely active (very hard exercise, physical job)', multiplier: 1.5 }
    ];

    // Climate options
    const climates = [
        { value: 'cold', label: 'Cold climate', multiplier: 0.9 },
        { value: 'temperate', label: 'Temperate climate', multiplier: 1.0 },
        { value: 'hot', label: 'Hot climate', multiplier: 1.2 },
        { value: 'very-hot', label: 'Very hot/humid climate', multiplier: 1.4 }
    ];

    // Gender options
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    // Calculate water intake
    function calculateWaterIntake() {
        if (weight <= 0) {
            showResults = false;
            return;
        }

        // Base calculation: 35ml per kg of body weight
        let baseIntake = weight * 35;

        // Adjust for activity level
        const activityMultiplier = activityLevels.find(level => level.value === activityLevel)?.multiplier || 1.0;
        baseIntake *= activityMultiplier;

        // Adjust for climate
        const climateMultiplier = climates.find(c => c.value === climate)?.multiplier || 1.0;
        baseIntake *= climateMultiplier;

        // Adjust for age (older adults need slightly more)
        if (age > 65) {
            baseIntake *= 1.1;
        }

        // Adjust for pregnancy/breastfeeding
        if (gender === 'female' && pregnantOrBreastfeeding) {
            baseIntake += 300; // Additional 300ml
        }

        dailyWaterIntake = baseIntake;
        glassesOfWater = baseIntake / 250; // Assuming 250ml per glass

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (weight && activityLevel && climate && age && gender) {
        calculateWaterIntake();
    }

    // Get hydration tips based on intake
    function getHydrationTips() {
        return [
            "Start your day with a glass of water",
            "Drink water before, during, and after exercise",
            "Keep a water bottle with you throughout the day",
            "Eat water-rich foods like fruits and vegetables",
            "Monitor your urine color - pale yellow indicates good hydration",
            "Increase intake during illness, hot weather, or high altitude"
        ];
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Daily Water Intake Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your personalized daily water intake recommendation based on weight, 
                activity level, climate, and other factors. Stay properly hydrated for optimal health.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    label="Age (years)"
                    bind:value={age}
                    placeholder="30"
                    min="1"
                    max="120"
                    step="1"
                />

                <Select
                    label="Gender"
                    bind:value={gender}
                    options={genderOptions}
                />

                <Select
                    label="Activity Level"
                    bind:value={activityLevel}
                    options={activityLevels}
                />

                <Select
                    label="Climate"
                    bind:value={climate}
                    options={climates}
                />

                {#if gender === 'female'}
                    <div class="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="pregnant"
                            bind:checked={pregnantOrBreastfeeding}
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label for="pregnant" class="text-sm font-medium text-gray-700">
                            Pregnant or Breastfeeding
                        </label>
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(dailyWaterIntake, 0)} ml
                    </div>
                    <div class="text-gray-600">Daily Water Intake</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(dailyWaterIntake / 1000, 1)} L
                    </div>
                    <div class="text-gray-600">Liters per Day</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(glassesOfWater, 1)}
                    </div>
                    <div class="text-gray-600">Glasses (250ml each)</div>
                </div>
            </Card>
        </div>

        <!-- Hydration Schedule -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Suggested Hydration Schedule
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div class="text-lg font-bold text-orange-600 mb-1">
                            {formatNumber(dailyWaterIntake * 0.25, 0)} ml
                        </div>
                        <div class="text-sm text-gray-700">Morning (25%)</div>
                        <div class="text-xs text-gray-500">Upon waking</div>
                    </div>

                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-lg font-bold text-blue-600 mb-1">
                            {formatNumber(dailyWaterIntake * 0.35, 0)} ml
                        </div>
                        <div class="text-sm text-gray-700">Afternoon (35%)</div>
                        <div class="text-xs text-gray-500">Throughout day</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-lg font-bold text-green-600 mb-1">
                            {formatNumber(dailyWaterIntake * 0.25, 0)} ml
                        </div>
                        <div class="text-sm text-gray-700">Evening (25%)</div>
                        <div class="text-xs text-gray-500">Before dinner</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div class="text-lg font-bold text-purple-600 mb-1">
                            {formatNumber(dailyWaterIntake * 0.15, 0)} ml
                        </div>
                        <div class="text-sm text-gray-700">Night (15%)</div>
                        <div class="text-xs text-gray-500">Before bed</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Hydration Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Hydration Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each getHydrationTips() as tip}
                        <div class="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <span class="text-blue-600 text-lg">💧</span>
                            <span class="text-blue-800 text-sm">{tip}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>