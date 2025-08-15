<script>
    /**
     * Fuel Efficiency Converter Component
     * Convert between mpg, L/100km and other fuel efficiency units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 30;
    let fromUnit = 'mpg_us';
    let toUnit = 'L_100km';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Fuel efficiency units
    const fuelUnits = [
        { value: 'mpg_us', label: 'Miles per Gallon (US)', category: 'US' },
        { value: 'mpg_uk', label: 'Miles per Gallon (Imperial)', category: 'UK' },
        { value: 'L_100km', label: 'Liters per 100 km', category: 'Metric' },
        { value: 'km_L', label: 'Kilometers per Liter', category: 'Metric' }
    ];

    // Convert fuel efficiency
    function convertFuelEfficiency() {
        if (inputValue === null || inputValue === undefined || inputValue <= 0) {
            showResults = false;
            return;
        }

        // Convert everything to L/100km as base unit
        let baseValue;
        
        switch (fromUnit) {
            case 'mpg_us':
                baseValue = 235.214 / inputValue; // US gallon = 3.78541 L
                break;
            case 'mpg_uk':
                baseValue = 282.481 / inputValue; // Imperial gallon = 4.54609 L
                break;
            case 'L_100km':
                baseValue = inputValue;
                break;
            case 'km_L':
                baseValue = 100 / inputValue;
                break;
            default:
                baseValue = inputValue;
        }

        // Convert from base to target unit
        switch (toUnit) {
            case 'mpg_us':
                convertedValue = 235.214 / baseValue;
                break;
            case 'mpg_uk':
                convertedValue = 282.481 / baseValue;
                break;
            case 'L_100km':
                convertedValue = baseValue;
                break;
            case 'km_L':
                convertedValue = 100 / baseValue;
                break;
            default:
                convertedValue = baseValue;
        }

        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertFuelEfficiency();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertFuelEfficiency();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Fuel Efficiency Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between mpg, L/100km and other fuel efficiency units. 
                Compare vehicle efficiency across different measurement systems.
            </p>

            <div class="space-y-6">
                <div>
                    <Input
                        type="number"
                        label="Fuel Efficiency Value"
                        bind:value={inputValue}
                        placeholder="30"
                        step="0.1"
                        min="0.1"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={fuelUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={fuelUnits}
                            className="flex-1"
                        />

                        <Button 
                            variant="outline" 
                            size="sm" 
                            on:click={swapUnits}
                            className="mb-0"
                        >
                            🔄 Swap
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    {#if showResults}
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {formatNumber(inputValue, 2)} {fromUnit}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedValue, 2)} {toUnit}
                    </div>
                </div>
            </div>
        </Card>

        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Fuel Efficiency Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div class="text-lg font-bold text-red-600 mb-1">Poor</div>
                        <div class="text-sm text-red-700">&lt; 20 mpg</div>
                        <div class="text-sm text-red-700">&gt; 12 L/100km</div>
                    </div>

                    <div class="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div class="text-lg font-bold text-yellow-600 mb-1">Average</div>
                        <div class="text-sm text-yellow-700">20-30 mpg</div>
                        <div class="text-sm text-yellow-700">8-12 L/100km</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-lg font-bold text-green-600 mb-1">Excellent</div>
                        <div class="text-sm text-green-700">&gt; 30 mpg</div>
                        <div class="text-sm text-green-700">&lt; 8 L/100km</div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>