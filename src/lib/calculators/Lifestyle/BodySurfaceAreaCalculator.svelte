<script>
    /**
     * Body Surface Area Calculator Component
     * Calculate body surface area for medical dosing calculations
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let weight = 70;
    let height = 175;
    let formula = 'dubois';

    // Results
    let bsa = 0;
    let showResults = false;

    // Formula options
    const formulas = [
        { value: 'dubois', label: 'Du Bois Formula (Most Common)' },
        { value: 'mosteller', label: 'Mosteller Formula' },
        { value: 'haycock', label: 'Haycock Formula' },
        { value: 'gehan', label: 'Gehan & George Formula' }
    ];

    // Calculate BSA
    function calculateBSA() {
        if (weight <= 0 || height <= 0) {
            showResults = false;
            return;
        }

        switch (formula) {
            case 'dubois':
                bsa = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
                break;
            case 'mosteller':
                bsa = Math.sqrt((weight * height) / 3600);
                break;
            case 'haycock':
                bsa = 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964);
                break;
            case 'gehan':
                bsa = 0.0235 * Math.pow(weight, 0.51456) * Math.pow(height, 0.42246);
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (weight && height && formula) {
        calculateBSA();
    }

    // Get BSA category
    function getBSACategory(bsaValue) {
        if (bsaValue < 1.0) return { text: 'Below Average', color: 'text-blue-600' };
        if (bsaValue < 1.5) return { text: 'Small', color: 'text-green-600' };
        if (bsaValue < 1.8) return { text: 'Average', color: 'text-yellow-600' };
        if (bsaValue < 2.2) return { text: 'Large', color: 'text-orange-600' };
        return { text: 'Very Large', color: 'text-red-600' };
    }

    $: bsaCategory = getBSACategory(bsa);
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Body Surface Area Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate body surface area (BSA) for medical dosing calculations. 
                Used in chemotherapy, medication dosing, and medical research.
            </p>

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
                    min="50"
                    step="0.1"
                />

                <Select
                    label="Formula"
                    bind:value={formula}
                    options={formulas}
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- BSA Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatNumber(bsa, 3)} m²
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Body Surface Area
                </div>
                <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {bsaCategory.color} bg-opacity-10 border">
                    {bsaCategory.text}
                </div>
            </div>
        </Card>

        <!-- Formula Comparison -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    BSA Formula Comparison
                </h3>

                <div class="space-y-3">
                    {#each formulas as formulaOption}
                        {@const tempBSA = formulaOption.value === 'dubois' ? 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725) :
                                         formulaOption.value === 'mosteller' ? Math.sqrt((weight * height) / 3600) :
                                         formulaOption.value === 'haycock' ? 0.024265 * Math.pow(weight, 0.5378) * Math.pow(height, 0.3964) :
                                         0.0235 * Math.pow(weight, 0.51456) * Math.pow(height, 0.42246)}
                        <div class="flex items-center justify-between p-3 rounded-lg {formulaOption.value === formula ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
                            <span class="font-medium">{formulaOption.label}</span>
                            <span class="text-lg font-bold text-blue-600">{formatNumber(tempBSA, 3)} m²</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Medical Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Medical Applications
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💊 Medication Dosing
                        </h4>
                        <p class="text-blue-800 text-sm">
                            BSA is used to calculate chemotherapy doses and other medications 
                            where dosing based on body surface area is more accurate than weight alone.
                        </p>
                    </div>

                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 class="font-semibold text-red-900 mb-2">
                            ⚠️ Medical Use Only
                        </h4>
                        <p class="text-red-800 text-sm">
                            This calculator is for educational purposes. Always consult healthcare 
                            professionals for actual medical dosing and treatment decisions.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>