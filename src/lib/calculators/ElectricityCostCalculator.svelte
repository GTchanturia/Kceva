<script>
    /**
     * Electricity Cost Calculator Component
     * Calculate electricity costs for appliances and usage
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let powerWatts = 1000;
    let hoursPerDay = 8;
    let daysPerMonth = 30;
    let electricityRate = 0.12;
    let applianceType = 'custom';

    // Results
    let dailyCost = 0;
    let monthlyCost = 0;
    let annualCost = 0;
    let kwhPerMonth = 0;
    let showResults = false;

    // Common appliances
    const appliances = [
        { value: 'custom', label: 'Custom Appliance', watts: 1000 },
        { value: 'led_bulb', label: 'LED Light Bulb', watts: 10 },
        { value: 'cfl_bulb', label: 'CFL Light Bulb', watts: 23 },
        { value: 'incandescent', label: 'Incandescent Bulb', watts: 60 },
        { value: 'laptop', label: 'Laptop Computer', watts: 65 },
        { value: 'desktop', label: 'Desktop Computer', watts: 300 },
        { value: 'tv_led', label: 'LED TV (55")', watts: 150 },
        { value: 'refrigerator', label: 'Refrigerator', watts: 400 },
        { value: 'washing_machine', label: 'Washing Machine', watts: 2000 },
        { value: 'air_conditioner', label: 'Air Conditioner', watts: 3500 },
        { value: 'microwave', label: 'Microwave Oven', watts: 1200 },
        { value: 'dishwasher', label: 'Dishwasher', watts: 1800 }
    ];

    // Calculate electricity cost
    function calculateElectricityCost() {
        if (powerWatts <= 0 || hoursPerDay <= 0 || daysPerMonth <= 0 || electricityRate <= 0) {
            showResults = false;
            return;
        }

        // Convert watts to kilowatts
        const powerKW = powerWatts / 1000;
        
        // Calculate daily usage in kWh
        const dailyKWh = powerKW * hoursPerDay;
        
        // Calculate monthly usage
        kwhPerMonth = dailyKWh * daysPerMonth;
        
        // Calculate costs
        dailyCost = dailyKWh * electricityRate;
        monthlyCost = kwhPerMonth * electricityRate;
        annualCost = monthlyCost * 12;

        showResults = true;
    }

    // Handle appliance selection
    function handleApplianceChange() {
        const appliance = appliances.find(app => app.value === applianceType);
        if (appliance && appliance.value !== 'custom') {
            powerWatts = appliance.watts;
        }
    }

    // Auto-calculate when inputs change
    $: if (powerWatts && hoursPerDay && daysPerMonth && electricityRate) {
        calculateElectricityCost();
    }

    $: if (applianceType) {
        handleApplianceChange();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Electricity Cost Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate electricity costs for appliances and devices. 
                Understand your energy consumption and plan your electricity budget.
            </p>

            <div class="space-y-6">
                <Select
                    label="Appliance Type"
                    bind:value={applianceType}
                    options={appliances}
                />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Power Consumption (Watts)"
                        bind:value={powerWatts}
                        placeholder="1000"
                        min="1"
                        step="1"
                    />

                    <Input
                        type="number"
                        label="Hours Used Per Day"
                        bind:value={hoursPerDay}
                        placeholder="8"
                        min="0.1"
                        max="24"
                        step="0.1"
                    />

                    <Input
                        type="number"
                        label="Days Per Month"
                        bind:value={daysPerMonth}
                        placeholder="30"
                        min="1"
                        max="31"
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
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Cost Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(dailyCost)}
                    </div>
                    <div class="text-gray-600">Daily Cost</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(monthlyCost)}
                    </div>
                    <div class="text-gray-600">Monthly Cost</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(annualCost)}
                    </div>
                    <div class="text-gray-600">Annual Cost</div>
                </div>
            </Card>
        </div>

        <!-- Usage Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Energy Usage Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Power Rating:</span>
                            <span class="font-semibold">{powerWatts} W ({formatNumber(powerWatts / 1000, 2)} kW)</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Daily Usage:</span>
                            <span class="font-semibold">{hoursPerDay} hours</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Usage:</span>
                            <span class="font-semibold">{daysPerMonth} days</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Electricity Rate:</span>
                            <span class="font-semibold">{formatCurrency(electricityRate)}/kWh</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Daily Energy:</span>
                            <span class="font-semibold text-blue-600">{formatNumber((powerWatts / 1000) * hoursPerDay, 2)} kWh</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Monthly Energy:</span>
                            <span class="font-semibold text-green-600">{formatNumber(kwhPerMonth, 1)} kWh</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Annual Energy:</span>
                            <span class="font-semibold">{formatNumber(kwhPerMonth * 12, 0)} kWh</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Cost per Hour:</span>
                            <span class="font-semibold">{formatCurrency((powerWatts / 1000) * electricityRate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Energy Saving Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Energy Saving Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            💡 Efficient Lighting
                        </h4>
                        <p class="text-green-800 text-sm">
                            Switch to LED bulbs - they use 75% less energy than incandescent 
                            bulbs and last 25 times longer.
                        </p>
                    </div>

                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            🌡️ Temperature Control
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Adjust your thermostat by 1-2 degrees to save 5-10% on heating 
                            and cooling costs without sacrificing comfort.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>