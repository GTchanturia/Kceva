<script>
    /**
     * BMR Calculator Component
     * Calculate Basal Metabolic Rate and daily calorie needs
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { calculateBMR } from "$lib/utils/calculations.js";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let weight = 70;
    let height = 175;
    let age = 30;
    let gender = "male";
    let activityLevel = 1.55;

    // Results
    let bmr = 0;
    let dailyCalories = 0;
    let showResults = false;

    // Gender options
    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    // Activity level options
    const activityOptions = [
        { value: 1.2, label: "Sedentary (little/no exercise)" },
        { value: 1.375, label: "Lightly active (light exercise 1-3 days/week)" },
        { value: 1.55, label: "Moderately active (moderate exercise 3-5 days/week)" },
        { value: 1.725, label: "Very active (hard exercise 6-7 days/week)" },
        { value: 1.9, label: "Super active (very hard exercise, physical job)" },
    ];

    // Calculate BMR and daily calories
    function calculateMetabolicRate() {
        if (weight <= 0 || height <= 0 || age <= 0) {
            showResults = false;
            return;
        }

        bmr = calculateBMR(weight, height, age, gender);
        dailyCalories = Math.round(bmr * activityLevel);
        showResults = true;
    }

    // Get activity level description
    function getActivityDescription(level) {
        const activity = activityOptions.find(opt => opt.value === level);
        return activity ? activity.label : "Moderate activity";
    }

    // Calculate calories for different goals
    function getCaloriesForGoal(goal) {
        switch (goal) {
            case "lose":
                return Math.round(dailyCalories - 500); // 1 lb per week
            case "gain":
                return Math.round(dailyCalories + 500); // 1 lb per week
            default:
                return dailyCalories;
        }
    }

    // Auto-calculate when inputs change
    $: if (weight && height && age) {
        calculateMetabolicRate();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                BMR Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your Basal Metabolic Rate (BMR) and daily calorie needs based on your activity level.
                BMR is the number of calories your body burns at rest.
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
                    label="Height (cm)"
                    bind:value={height}
                    placeholder="175"
                    min="1"
                    step="1"
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

                <div class="md:col-span-2">
                    <Select
                        label="Activity Level"
                        bind:value={activityLevel}
                        options={activityOptions}
                    />
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-4xl font-bold text-blue-600 mb-2">
                        {formatNumber(bmr, 0)}
                    </div>
                    <div class="text-gray-600">BMR (calories/day)</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Calories burned at rest
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-4xl font-bold text-green-600 mb-2">
                        {formatNumber(dailyCalories, 0)}
                    </div>
                    <div class="text-gray-600">Daily Calories</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Total daily energy expenditure
                    </div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Your Metabolic Profile
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Weight:</span>
                            <span class="font-semibold">{weight} kg ({formatNumber(weight * 2.20462, 1)} lbs)</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Height:</span>
                            <span class="font-semibold">{height} cm ({Math.floor(height / 30.48)}'{Math.round((height % 30.48) / 2.54)}")</span>
                            )
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Age:</span>
                            <span class="font-semibold">{age} years</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Gender:</span>
                            <span class="font-semibold capitalize">{gender}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">BMR:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(bmr, 0)} calories/day</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Activity Level:</span>
                            <span class="font-semibold">{activityLevel}x</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Daily Calories:</span>
                            <span class="font-semibold text-green-600">{formatNumber(dailyCalories, 0)} calories/day</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Weekly Calories:</span>
                            <span class="font-semibold">{formatNumber(dailyCalories * 7, 0)} calories</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Calorie Goals -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Calorie Goals for Different Objectives
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div class="text-2xl font-bold text-red-600 mb-2">
                            {formatNumber(getCaloriesForGoal("lose"), 0)}
                        </div>
                        <div class="text-gray-700 font-medium mb-1">Weight Loss</div>
                        <div class="text-sm text-gray-600">
                            -500 calories/day
                            <br />
                            (~1 lb/week loss)
                        </div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-2xl font-bold text-green-600 mb-2">
                            {formatNumber(dailyCalories, 0)}
                        </div>
                        <div class="text-gray-700 font-medium mb-1">Maintenance</div>
                        <div class="text-sm text-gray-600">
                            Current activity level
                            <br />
                            (maintain weight)
                        </div>
                    </div>

                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600 mb-2">
                            {formatNumber(getCaloriesForGoal("gain"), 0)}
                        </div>
                        <div class="text-gray-700 font-medium mb-1">Weight Gain</div>
                        <div class="text-sm text-gray-600">
                            +500 calories/day
                            <br />
                            (~1 lb/week gain)
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- BMR Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Energy Expenditure Breakdown
                </h3>

                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>BMR (Basal Metabolic Rate)</span>
                            <span>{formatNumber((bmr / dailyCalories) * 100, 1)}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                class="bg-blue-600 h-3 rounded-full" 
                                style="width: {(bmr / dailyCalories) * 100}%"
                            ></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            {formatNumber(bmr, 0)} calories - Energy for basic body functions
                        </div>
                    </div>

                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Activity & Exercise</span>
                            <span>{formatNumber(((dailyCalories - bmr) / dailyCalories) * 100, 1)}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div 
                                class="bg-green-600 h-3 rounded-full" 
                                style="width: {((dailyCalories - bmr) / dailyCalories) * 100}%"
                            ></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-1">
                            {formatNumber(dailyCalories - bmr, 0)} calories - Energy for physical activity
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- BMR Formula Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    BMR Calculation Method
                </h3>

                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 class="font-semibold text-gray-900 mb-2">Mifflin-St Jeor Equation</h4>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div><strong>For Men:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5</div>
                        <div><strong>For Women:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161</div>
                    </div>
                </div>

                <div class="text-sm text-gray-600">
                    <p class="mb-2">
                        <strong>Your calculation:</strong> 
                        BMR = 10 × {weight} + 6.25 × {height} - 5 × {age} {gender === 'male' ? '+ 5' : '- 161'} = {formatNumber(bmr, 0)} calories/day
                    </p>
                    <p>
                        <strong>Daily calories:</strong> 
                        {formatNumber(bmr, 0)} × {activityLevel} = {formatNumber(dailyCalories, 0)} calories/day
                    </p>
                </div>
            </div>
        </Card>

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Notes
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📊 Accuracy
                        </h4>
                        <p class="text-blue-800 text-sm">
                            BMR calculations are estimates. Individual metabolism can vary by ±10-15% due to genetics, muscle mass, and other factors.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Usage
                        </h4>
                        <p class="text-green-800 text-sm">
                            Use these numbers as a starting point for diet and exercise planning. Monitor your progress and adjust as needed.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>