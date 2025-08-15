<script>
    /**
     * Solar Panel Output Calculator Component
     * Calculate solar panel energy output and potential savings
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let panelWattage = 400;
    let numberOfPanels = 20;
    let sunHoursPerDay = 5;
    let systemEfficiency = 85;
    let electricityRate = 0.12;

    // Results
    let dailyOutput = 0;
    let monthlyOutput = 0;
    let annualOutput = 0;
    let monthlySavings = 0;
    let annualSavings = 0;
    let showResults = false;

    // Calculate solar output
    function calculateSolarOutput() {
        if (panelWattage <= 0 || numberOfPanels <= 0 || sunHoursPerDay <= 0 || systemEfficiency <= 0) {
            showResults = false;
            return;
        }

        const totalWattage = panelWattage * numberOfPanels;
        const efficiencyFactor = systemEfficiency / 100;
        
        // Calculate daily output in kWh
        dailyOutput = (totalWattage / 1000) * sunHoursPerDay * efficiencyFactor;
        
        // Calculate monthly and annual output
        monthlyOutput = dailyOutput * 30;
        annualOutput = dailyOutput * 365;
        
        // Calculate savings
        monthlySavings = monthlyOutput * electricityRate;
        annualSavings = annualOutput * electricityRate;

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (panelWattage && numberOfPanels && sunHoursPerDay && systemEfficiency && electricityRate) {
        calculateSolarOutput();
    }

    // Get system size category
    function getSystemSize() {
        const totalKW = (panelWattage * numberOfPanels) / 1000;
        if (totalKW < 3) return { text: 'Small Residential', color: 'text-blue-600' };
        if (totalKW < 6) return { text: 'Medium Residential', color: 'text-green-600' };
        if (totalKW < 10) return { text: 'Large Residential', color: 'text-purple-600' };
        return { text: 'Commercial Scale', color: 'text-orange-600' };
    }

    $: systemSize = getSystemSize();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Solar Panel Output Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate solar panel energy output and potential electricity savings. 
                Plan your solar installation and estimate return on investment.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Panel Wattage (W)"
                    bind:value={panelWattage}
                    placeholder="400"
                    min="100"
                    max="600"
                    step="10"
                />

                <Input
                    type="number"
                    label="Number of Panels"
                    bind:value={numberOfPanels}
                    placeholder="20"
                    min="1"
                    max="100"
                    step="1"
                />

                <Input
                    type="number"
                    label="Peak Sun Hours per Day"
                    bind:value={sunHoursPerDay}
                    placeholder="5"
                    min="1"
                    max="12"
                    step="0.1"
                />

                <Input
                    type="number"
                    label="System Efficiency (%)"
                    bind:value={systemEfficiency}
                    placeholder="85"
                    min="70"
                    max="95"
                    step="1"
                />

                <Input
                    type="number"
                    label="Electricity Rate (per kWh)"
                    bind:value={electricityRate}
                    placeholder="0.12"
                    min="0.01"
                    step="0.01"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- System Overview -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl font-bold text-yellow-600 mb-4">
                    {formatNumber((panelWattage * numberOfPanels) / 1000, 1)} kW
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Total System Size
                </div>
                <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {systemSize.color} bg-opacity-10 border">
                    {systemSize.text}
                </div>
            </div>
        </Card>

        <!-- Energy Output -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(dailyOutput, 1)} kWh
                    </div>
                    <div class="text-gray-600">Daily Output</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(monthlyOutput, 0)} kWh
                    </div>
                    <div class="text-gray-600">Monthly Output</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(annualOutput, 0)} kWh
                    </div>
                    <div class="text-gray-600">Annual Output</div>
                </div>
            </Card>
        </div>

        <!-- Cost Savings -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(monthlySavings)}
                    </div>
                    <div class="text-gray-600">Monthly Savings</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatCurrency(annualSavings)}
                    </div>
                    <div class="text-gray-600">Annual Savings</div>
                </div>
            </Card>
        </div>

        <!-- Environmental Impact -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Environmental Impact
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-2xl font-bold text-green-600 mb-1">
                            {formatNumber(annualOutput * 0.0004, 1)} tons
                        </div>
                        <div class="text-sm text-gray-700">CO₂ Avoided Annually</div>
                    </div>

                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600 mb-1">
                            {formatNumber(annualOutput * 0.0004 * 25, 0)} tons
                        </div>
                        <div class="text-sm text-gray-700">25-Year CO₂ Reduction</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600 mb-1">
                            {formatNumber(annualOutput * 25 / 1000, 0)} MWh
                        </div>
                        <div class="text-sm text-gray-700">25-Year Energy Production</div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>