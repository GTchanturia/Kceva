<script>
    /**
     * Calorie Intake Calculator Component
     * Calculate daily calorie needs based on activity level and goals
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
    let goal = "maintain";

    // Results
    let bmr = 0;
    let maintenanceCalories = 0;
    let targetCalories = 0;
    let showResults = false;
    let macroBreakdown = {};

    // Gender options
    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    // Activity level options
    const activityOptions = [
        { value: 1.2, label: "Sedentary (desk job, no exercise)" },
        {
            value: 1.375,
            label: "Lightly active (light exercise 1-3 days/week)",
        },
        {
            value: 1.55,
            label: "Moderately active (moderate exercise 3-5 days/week)",
        },
        { value: 1.725, label: "Very active (hard exercise 6-7 days/week)" },
        {
            value: 1.9,
            label: "Super active (very hard exercise, physical job)",
        },
    ];

    // Goal options
    const goalOptions = [
        {
            value: "lose-aggressive",
            label: "Aggressive Weight Loss (-2 lbs/week)",
        },
        { value: "lose-moderate", label: "Moderate Weight Loss (-1 lb/week)" },
        {
            value: "lose-conservative",
            label: "Conservative Weight Loss (-0.5 lb/week)",
        },
        { value: "maintain", label: "Maintain Current Weight" },
        {
            value: "gain-conservative",
            label: "Conservative Weight Gain (+0.5 lb/week)",
        },
        { value: "gain-moderate", label: "Moderate Weight Gain (+1 lb/week)" },
        {
            value: "gain-aggressive",
            label: "Aggressive Weight Gain (+2 lbs/week)",
        },
    ];

    // Calculate calorie intake
    function calculateCalorieIntake() {
        if (weight <= 0 || height <= 0 || age <= 0) {
            showResults = false;
            return;
        }

        bmr = calculateBMR(weight, height, age, gender);
        maintenanceCalories = Math.round(bmr * activityLevel);

        // Calculate target calories based on goal
        switch (goal) {
            case "lose-aggressive":
                targetCalories = Math.round(maintenanceCalories - 1000);
                break;
            case "lose-moderate":
                targetCalories = Math.round(maintenanceCalories - 500);
                break;
            case "lose-conservative":
                targetCalories = Math.round(maintenanceCalories - 250);
                break;
            case "maintain":
                targetCalories = maintenanceCalories;
                break;
            case "gain-conservative":
                targetCalories = Math.round(maintenanceCalories + 250);
                break;
            case "gain-moderate":
                targetCalories = Math.round(maintenanceCalories + 500);
                break;
            case "gain-aggressive":
                targetCalories = Math.round(maintenanceCalories + 1000);
                break;
            default:
                targetCalories = maintenanceCalories;
        }

        // Ensure minimum calories for safety
        if (targetCalories < 1200 && gender === "female") {
            targetCalories = 1200;
        } else if (targetCalories < 1500 && gender === "male") {
            targetCalories = 1500;
        }

        // Calculate macro breakdown
        calculateMacros();

        showResults = true;
    }

    function calculateMacros() {
        // Standard macro ratios
        const proteinRatio = 0.25; // 25% protein
        const fatRatio = 0.3; // 30% fat
        const carbRatio = 0.45; // 45% carbs

        macroBreakdown = {
            protein: {
                calories: Math.round(targetCalories * proteinRatio),
                grams: Math.round((targetCalories * proteinRatio) / 4),
            },
            fat: {
                calories: Math.round(targetCalories * fatRatio),
                grams: Math.round((targetCalories * fatRatio) / 9),
            },
            carbs: {
                calories: Math.round(targetCalories * carbRatio),
                grams: Math.round((targetCalories * carbRatio) / 4),
            },
        };
    }

    // Get goal description
    function getGoalDescription(goalValue) {
        const goalOption = goalOptions.find((opt) => opt.value === goalValue);
        return goalOption ? goalOption.label : "Maintain Weight";
    }

    // Get weekly weight change
    function getWeeklyWeightChange() {
        const calorieDeficit = maintenanceCalories - targetCalories;
        const weeklyDeficit = calorieDeficit * 7;
        const weightChange = weeklyDeficit / 3500; // 3500 calories = 1 pound
        return weightChange;
    }

    // Auto-calculate when inputs change
    $: if (weight && height && age) {
        calculateCalorieIntake();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Daily Calorie Intake Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your daily calorie needs based on your goals, activity
                level, and body composition. Get personalized recommendations
                for weight loss, maintenance, or gain.
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

                <div class="md:col-span-2">
                    <Select
                        label="Goal"
                        bind:value={goal}
                        options={goalOptions}
                    />
                </div>
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
                        {formatNumber(bmr, 0)}
                    </div>
                    <div class="text-gray-600">BMR</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Calories at rest
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(maintenanceCalories, 0)}
                    </div>
                    <div class="text-gray-600">Maintenance</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Calories to maintain weight
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(targetCalories, 0)}
                    </div>
                    <div class="text-gray-600">Target Intake</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Daily calories for your goal
                    </div>
                </div>
            </Card>
        </div>

        <!-- Goal Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Your Calorie Plan
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Goal:</span>
                            <span class="font-semibold"
                                >{getGoalDescription(goal)}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Daily Target:</span>
                            <span class="font-semibold text-purple-600"
                                >{formatNumber(targetCalories, 0)} calories</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Weekly Change:</span>
                            <span
                                class="font-semibold {getWeeklyWeightChange() >
                                0
                                    ? 'text-blue-600'
                                    : getWeeklyWeightChange() < 0
                                      ? 'text-red-600'
                                      : 'text-green-600'}"
                            >
                                {getWeeklyWeightChange() > 0
                                    ? "+"
                                    : ""}{formatNumber(
                                    getWeeklyWeightChange(),
                                    1,
                                )} lbs/week
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600"
                                >Calorie Adjustment:</span
                            >
                            <span
                                class="font-semibold {targetCalories >
                                maintenanceCalories
                                    ? 'text-blue-600'
                                    : targetCalories < maintenanceCalories
                                      ? 'text-red-600'
                                      : 'text-green-600'}"
                            >
                                {targetCalories > maintenanceCalories
                                    ? "+"
                                    : ""}{formatNumber(
                                    targetCalories - maintenanceCalories,
                                    0,
                                )} calories
                            </span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">BMR:</span>
                            <span class="font-semibold"
                                >{formatNumber(bmr, 0)} calories</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600"
                                >Activity Multiplier:</span
                            >
                            <span class="font-semibold">{activityLevel}x</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Maintenance:</span>
                            <span class="font-semibold text-green-600"
                                >{formatNumber(maintenanceCalories, 0)} calories</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Change:</span>
                            <span class="font-semibold">
                                {formatNumber(
                                    getWeeklyWeightChange() * 4.33,
                                    1,
                                )} lbs/month
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Macro Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Recommended Macronutrient Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div
                        class="text-center p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-red-600 mb-2">
                            {macroBreakdown.protein?.grams}g
                        </div>
                        <div class="text-gray-700 font-medium mb-1">
                            Protein
                        </div>
                        <div class="text-sm text-gray-600">
                            {macroBreakdown.protein?.calories} calories (25%)
                        </div>
                    </div>

                    <div
                        class="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-yellow-600 mb-2">
                            {macroBreakdown.fat?.grams}g
                        </div>
                        <div class="text-gray-700 font-medium mb-1">Fat</div>
                        <div class="text-sm text-gray-600">
                            {macroBreakdown.fat?.calories} calories (30%)
                        </div>
                    </div>

                    <div
                        class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-blue-600 mb-2">
                            {macroBreakdown.carbs?.grams}g
                        </div>
                        <div class="text-gray-700 font-medium mb-1">
                            Carbohydrates
                        </div>
                        <div class="text-sm text-gray-600">
                            {macroBreakdown.carbs?.calories} calories (45%)
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-900 mb-2">
                        Macro Guidelines:
                    </h4>
                    <div class="text-sm text-gray-700 space-y-1">
                        <div>
                            <strong>Protein:</strong> Essential for muscle maintenance
                            and repair. Aim for 0.8-1.2g per kg of body weight.
                        </div>
                        <div>
                            <strong>Fat:</strong> Important for hormone production
                            and nutrient absorption. Focus on healthy fats.
                        </div>
                        <div>
                            <strong>Carbohydrates:</strong> Primary energy source.
                            Choose complex carbs for sustained energy.
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Meal Planning -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Daily Meal Distribution
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div
                        class="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                        <div class="text-lg font-bold text-orange-600 mb-1">
                            {formatNumber(targetCalories * 0.25, 0)}
                        </div>
                        <div class="text-sm text-gray-700">Breakfast (25%)</div>
                    </div>

                    <div
                        class="text-center p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                        <div class="text-lg font-bold text-green-600 mb-1">
                            {formatNumber(targetCalories * 0.35, 0)}
                        </div>
                        <div class="text-sm text-gray-700">Lunch (35%)</div>
                    </div>

                    <div
                        class="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                        <div class="text-lg font-bold text-blue-600 mb-1">
                            {formatNumber(targetCalories * 0.3, 0)}
                        </div>
                        <div class="text-sm text-gray-700">Dinner (30%)</div>
                    </div>

                    <div
                        class="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg"
                    >
                        <div class="text-lg font-bold text-purple-600 mb-1">
                            {formatNumber(targetCalories * 0.1, 0)}
                        </div>
                        <div class="text-sm text-gray-700">Snacks (10%)</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Tips and Warnings -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Guidelines
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        class="bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💡 General Tips
                        </h4>
                        <ul class="text-blue-800 text-sm space-y-1">
                            <li>
                                • Track your food intake for better accuracy
                            </li>
                            <li>• Adjust calories based on your progress</li>
                            <li>
                                • Stay hydrated (8-10 glasses of water daily)
                            </li>
                            <li>• Include variety in your diet</li>
                        </ul>
                    </div>

                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 class="font-semibold text-red-900 mb-2">
                            ⚠️ Safety Notes
                        </h4>
                        <ul class="text-red-800 text-sm space-y-1">
                            <li>
                                • Don't go below 1200 calories (women) or 1500
                                (men)
                            </li>
                            <li>
                                • Consult a healthcare provider for medical
                                conditions
                            </li>
                            <li>• Gradual changes are more sustainable</li>
                            <li>• Listen to your body's hunger cues</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>
