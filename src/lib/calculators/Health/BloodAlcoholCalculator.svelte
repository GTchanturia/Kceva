<script>
    /**
     * Blood Alcohol Calculator Component
     * Estimate blood alcohol content and sobering time
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let weight = 70;
    let gender = "male";
    let drinks = 3;
    let drinkSize = "standard";
    let timeElapsed = 2;

    // Results
    let bac = 0;
    let soberTime = 0;
    let legalStatus = "";
    let showResults = false;

    // Gender options
    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];

    // Drink size options (alcohol content in grams)
    const drinkSizes = [
        { value: "standard", label: "Standard Drink (14g alcohol)", grams: 14 },
        { value: "beer", label: "Beer (12 oz, 5% ABV)", grams: 14 },
        { value: "wine", label: "Wine (5 oz, 12% ABV)", grams: 14 },
        { value: "spirit", label: "Spirit (1.5 oz, 40% ABV)", grams: 14 },
        {
            value: "light_beer",
            label: "Light Beer (12 oz, 4% ABV)",
            grams: 11.2,
        },
        {
            value: "strong_beer",
            label: "Strong Beer (12 oz, 7% ABV)",
            grams: 19.6,
        },
    ];

    // Calculate BAC using Widmark formula
    function calculateBAC() {
        if (weight <= 0 || drinks <= 0 || timeElapsed < 0) {
            showResults = false;
            return;
        }

        const drinkInfo = drinkSizes.find((d) => d.value === drinkSize);
        const totalAlcohol = drinks * (drinkInfo?.grams || 14);

        // Widmark factors
        const widmarkFactor = gender === "male" ? 0.68 : 0.55;

        // Calculate BAC
        const bacPeak = (totalAlcohol / (weight * 1000 * widmarkFactor)) * 100;

        // Subtract alcohol metabolized over time (approximately 0.015% per hour)
        const metabolismRate = 0.015;
        bac = Math.max(0, bacPeak - metabolismRate * timeElapsed);

        // Calculate time to sober (BAC = 0)
        soberTime = Math.max(0, bacPeak / metabolismRate);

        // Determine legal status
        if (bac >= 0.08) {
            legalStatus = "Legally Intoxicated";
        } else if (bac >= 0.05) {
            legalStatus = "Impaired";
        } else if (bac > 0) {
            legalStatus = "Under the Influence";
        } else {
            legalStatus = "Sober";
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (weight && drinks && timeElapsed >= 0) {
        calculateBAC();
    }

    // Get BAC effects
    function getBACEffects(bacLevel) {
        if (bacLevel >= 0.3)
            return {
                level: "Life-threatening",
                effects: "Coma, death possible",
                color: "text-red-800 bg-red-100",
            };
        if (bacLevel >= 0.25)
            return {
                level: "Severe intoxication",
                effects: "Confusion, vomiting, blackouts",
                color: "text-red-700 bg-red-50",
            };
        if (bacLevel >= 0.15)
            return {
                level: "Very high",
                effects: "Loss of muscle control, vomiting",
                color: "text-red-600 bg-red-50",
            };
        if (bacLevel >= 0.08)
            return {
                level: "Legally intoxicated",
                effects: "Impaired coordination, judgment",
                color: "text-orange-600 bg-orange-50",
            };
        if (bacLevel >= 0.05)
            return {
                level: "Impaired",
                effects: "Reduced coordination, alertness",
                color: "text-yellow-600 bg-yellow-50",
            };
        if (bacLevel > 0)
            return {
                level: "Mild effects",
                effects: "Slight impairment possible",
                color: "text-blue-600 bg-blue-50",
            };
        return {
            level: "Sober",
            effects: "No alcohol effects",
            color: "text-green-600 bg-green-50",
        };
    }

    $: bacEffects = getBACEffects(bac);
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Blood Alcohol Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Estimate your blood alcohol content (BAC) and time to sobriety.
                This tool is for educational purposes only - never drink and
                drive.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Body Weight (kg)"
                    bind:value={weight}
                    placeholder="70"
                    min="30"
                    max="200"
                    step="0.1"
                />

                <Select
                    label="Gender"
                    bind:value={gender}
                    options={genderOptions}
                />

                <Input
                    type="number"
                    label="Number of Drinks"
                    bind:value={drinks}
                    placeholder="3"
                    min="0"
                    max="20"
                    step="0.5"
                />

                <Select
                    label="Drink Type/Size"
                    bind:value={drinkSize}
                    options={drinkSizes}
                />

                <Input
                    type="number"
                    label="Time Since First Drink (hours)"
                    bind:value={timeElapsed}
                    placeholder="2"
                    min="0"
                    max="24"
                    step="0.25"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- BAC Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-red-600 mb-4">
                    {formatNumber(bac, 3)}%
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Estimated Blood Alcohol Content
                </div>
                <div
                    class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {bacEffects.color} border"
                >
                    {legalStatus}
                </div>
            </div>
        </Card>

        <!-- Time to Sober -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(soberTime, 1)} hours
                    </div>
                    <div class="text-gray-600">Time to Sober (BAC = 0)</div>
                    <div class="text-sm text-gray-500 mt-1">
                        From start of drinking
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(Math.max(0, soberTime - timeElapsed), 1)} hours
                    </div>
                    <div class="text-gray-600">Time Remaining</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Until completely sober
                    </div>
                </div>
            </Card>
        </div>

        <!-- BAC Effects -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Current BAC Effects
                </h3>

                <div class="p-4 rounded-lg {bacEffects.color} border">
                    <h4 class="font-semibold text-lg mb-2">
                        {bacEffects.level}
                    </h4>
                    <p class="text-sm">{bacEffects.effects}</p>
                </div>
            </div>
        </Card>

        <!-- BAC Scale Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    BAC Level Reference
                </h3>

                <div class="space-y-3">
                    {#each [{ range: "0.00%", description: "Sober - No alcohol effects", color: "bg-green-50 text-green-800" }, { range: "0.01-0.04%", description: "Mild relaxation, slight mood elevation", color: "bg-blue-50 text-blue-800" }, { range: "0.05-0.07%", description: "Reduced coordination, impaired judgment", color: "bg-yellow-50 text-yellow-800" }, { range: "0.08-0.14%", description: "Legally intoxicated, significantly impaired", color: "bg-orange-50 text-orange-800" }, { range: "0.15-0.24%", description: "Severe impairment, risk of accidents", color: "bg-red-50 text-red-800" }, { range: "0.25%+", description: "Life-threatening, medical emergency", color: "bg-red-100 text-red-900" }] as level}
                        <div
                            class="flex justify-between items-center p-3 rounded-lg {level.color}"
                        >
                            <span class="font-medium">{level.range}</span>
                            <span class="text-sm">{level.description}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Safety Warning -->
        <Card>
            <div class="p-6 bg-red-50 border border-red-200">
                <h3 class="text-xl font-semibold text-red-900 mb-4">
                    ⚠️ Important Safety Information
                </h3>

                <div class="space-y-3 text-red-800 text-sm">
                    <p>
                        <strong>This calculator provides estimates only.</strong
                        > Actual BAC can vary significantly based on many factors.
                    </p>
                    <p>
                        <strong>Never drink and drive.</strong> Even small amounts
                        of alcohol can impair your ability to drive safely.
                    </p>
                    <p>
                        <strong>Legal limits vary by location.</strong> Many places
                        have lower limits for commercial drivers or zero tolerance
                        policies.
                    </p>
                    <p>
                        <strong>Seek medical help</strong> if someone shows signs
                        of alcohol poisoning: confusion, vomiting, slow breathing,
                        unconsciousness.
                    </p>
                </div>
            </div>
        </Card>
    {/if}
</div>
