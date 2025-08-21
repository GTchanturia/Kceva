<script>
    /**
     * Fuel Cost Calculator Component
     * Calculate fuel costs for trips and daily commuting
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let distance = 100;
    let fuelEfficiency = 8; // L/100km
    let fuelPrice = 1.50;
    let calculationType = 'trip';
    let dailyDistance = 50;
    let daysPerWeek = 5;

    // Results
    let fuelNeeded = 0;
    let totalCost = 0;
    let costPerKm = 0;
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'trip', label: 'Single Trip Cost' },
        { value: 'daily', label: 'Daily Commute Cost' }
    ];

    // Calculate fuel cost
    function calculateFuelCost() {
        if (calculationType === 'trip') {
            if (distance <= 0 || fuelEfficiency <= 0 || fuelPrice <= 0) {
                showResults = false;
                return;
            }

            fuelNeeded = (distance * fuelEfficiency) / 100;
            totalCost = fuelNeeded * fuelPrice;
            costPerKm = totalCost / distance;
        } else {
            if (dailyDistance <= 0 || fuelEfficiency <= 0 || fuelPrice <= 0 || daysPerWeek <= 0) {
                showResults = false;
                return;
            }

            const weeklyDistance = dailyDistance * daysPerWeek;
            fuelNeeded = (weeklyDistance * fuelEfficiency) / 100;
            totalCost = fuelNeeded * fuelPrice;
            costPerKm = totalCost / weeklyDistance;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType) {
        calculateFuelCost();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Fuel Cost Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate fuel costs for trips and daily commuting. 
                Plan your travel budget and compare transportation costs.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Type"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'trip'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Distance (km)"
                            bind:value={distance}
                            placeholder="100"
                            min="0.1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Fuel Consumption (L/100km)"
                            bind:value={fuelEfficiency}
                            placeholder="8"
                            min="0.1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Fuel Price (per liter)"
                            bind:value={fuelPrice}
                            placeholder="1.50"
                            min="0.01"
                            step="0.01"
                        />
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Input
                            type="number"
                            label="Daily Distance (km)"
                            bind:value={dailyDistance}
                            placeholder="50"
                            min="0.1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Days per Week"
                            bind:value={daysPerWeek}
                            placeholder="5"
                            min="1"
                            max="7"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Fuel Consumption (L/100km)"
                            bind:value={fuelEfficiency}
                            placeholder="8"
                            min="0.1"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Fuel Price (per liter)"
                            bind:value={fuelPrice}
                            placeholder="1.50"
                            min="0.01"
                            step="0.01"
                        />
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
                        {formatNumber(fuelNeeded, 2)} L
                    </div>
                    <div class="text-gray-600">Fuel Needed</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(totalCost)}
                    </div>
                    <div class="text-gray-600">
                        {calculationType === 'trip' ? 'Trip Cost' : 'Weekly Cost'}
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(costPerKm)}
                    </div>
                    <div class="text-gray-600">Cost per km</div>
                </div>
            </Card>
        </div>

        <!-- Cost Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    {calculationType === 'trip' ? 'Trip' : 'Weekly Commute'} Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Distance:</span>
                            <span class="font-semibold">
                                {calculationType === 'trip' ? distance : dailyDistance * daysPerWeek} km
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Fuel Consumption:</span>
                            <span class="font-semibold">{fuelEfficiency} L/100km</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Fuel Price:</span>
                            <span class="font-semibold">{formatCurrency(fuelPrice)}/L</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Fuel Needed:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(fuelNeeded, 2)} L</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Cost:</span>
                            <span class="font-semibold text-green-600">{formatCurrency(totalCost)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Cost per km:</span>
                            <span class="font-semibold">{formatCurrency(costPerKm)}</span>
                        </div>
                    </div>
                </div>

                {#if calculationType === 'daily'}
                    <div class="mt-6 pt-4 border-t border-gray-200">
                        <h4 class="font-semibold text-gray-900 mb-3">Extended Projections</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="text-center p-3 bg-blue-50 rounded-lg">
                                <div class="text-lg font-bold text-blue-600">{formatCurrency(totalCost * 4.33)}</div>
                                <div class="text-sm text-gray-600">Monthly Cost</div>
                            </div>
                            <div class="text-center p-3 bg-green-50 rounded-lg">
                                <div class="text-lg font-bold text-green-600">{formatCurrency(totalCost * 52)}</div>
                                <div class="text-sm text-gray-600">Annual Cost</div>
                            </div>
                            <div class="text-center p-3 bg-purple-50 rounded-lg">
                                <div class="text-lg font-bold text-purple-600">{formatNumber(fuelNeeded * 52, 0)} L</div>
                                <div class="text-sm text-gray-600">Annual Fuel</div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}
</div>