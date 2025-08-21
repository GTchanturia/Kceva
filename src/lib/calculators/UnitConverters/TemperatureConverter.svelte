<script>
    /**
     * Temperature Converter Component
     * Convert between Celsius, Fahrenheit, and Kelvin
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { convertTemperature } from "$lib/utils/calculations.js";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let temperature = 25;
    let fromUnit = "C";
    let toUnit = "F";

    // Results
    let convertedTemp = 0;
    let showResults = false;

    // Temperature units
    const temperatureUnits = [
        { value: "C", label: "Celsius (°C)" },
        { value: "F", label: "Fahrenheit (°F)" },
        { value: "K", label: "Kelvin (K)" },
    ];

    // Convert temperature
    function convertTemp() {
        if (temperature === null || temperature === undefined) {
            showResults = false;
            return;
        }

        convertedTemp = convertTemperature(temperature, fromUnit, toUnit);
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertTemp();
    }

    // Get unit symbol
    function getUnitSymbol(unit) {
        const symbols = {
            C: "°C",
            F: "°F",
            K: "K",
        };
        return symbols[unit] || unit;
    }

    // Get temperature description
    function getTemperatureDescription(temp, unit) {
        let celsius = temp;
        if (unit === "F") {
            celsius = ((temp - 32) * 5) / 9;
        } else if (unit === "K") {
            celsius = temp - 273.15;
        }

        if (celsius <= 0)
            return { text: "Freezing point of water", color: "text-blue-600" };
        if (celsius <= 10) return { text: "Very cold", color: "text-blue-500" };
        if (celsius <= 20) return { text: "Cool", color: "text-blue-400" };
        if (celsius <= 25)
            return { text: "Room temperature", color: "text-green-600" };
        if (celsius <= 30) return { text: "Warm", color: "text-yellow-600" };
        if (celsius <= 40) return { text: "Hot", color: "text-orange-600" };
        if (celsius >= 100)
            return { text: "Boiling point of water", color: "text-red-600" };
        return { text: "Very hot", color: "text-red-500" };
    }

    // Auto-convert when inputs change
    $: if (temperature !== null && fromUnit && toUnit) {
        convertTemp();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Temperature Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Temperature Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert temperatures between Celsius, Fahrenheit, and Kelvin
                with instant results.
            </p>

            <div class="space-y-6">
                <!-- Temperature Input -->
                <div>
                    <Input
                        type="number"
                        label="Temperature"
                        bind:value={temperature}
                        placeholder="25"
                        step="0.1"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={temperatureUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={temperatureUnits}
                            className="flex-1"
                        />

                        <button
                            type="button"
                            on:click={swapUnits}
                            class="mb-0 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200"
                            aria-label="Swap units"
                        >
                            🔄
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        {@const description = getTemperatureDescription(convertedTemp, toUnit)}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {formatNumber(temperature, 1)}{getUnitSymbol(fromUnit)}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedTemp, 1)}{getUnitSymbol(toUnit)}
                    </div>
                </div>

                <div class="text-lg {description.color} font-medium">
                    {description.text}
                </div>
            </div>
        </Card>

        <!-- All Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    All Conversions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-blue-600 mb-1">
                            {formatNumber(
                                convertTemperature(temperature, fromUnit, "C"),
                                1,
                            )}°C
                        </div>
                        <div class="text-gray-600">Celsius</div>
                    </div>

                    <div
                        class="text-center p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-red-600 mb-1">
                            {formatNumber(
                                convertTemperature(temperature, fromUnit, "F"),
                                1,
                            )}°F
                        </div>
                        <div class="text-gray-600">Fahrenheit</div>
                    </div>

                    <div
                        class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-purple-600 mb-1">
                            {formatNumber(
                                convertTemperature(temperature, fromUnit, "K"),
                                1,
                            )}K
                        </div>
                        <div class="text-gray-600">Kelvin</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Temperature Scale Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Temperature Scale Reference
                </h3>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Reference Point
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Celsius
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Fahrenheit
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Kelvin
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >Absolute Zero</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                    >-273.15°C</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-red-600"
                                    >-459.67°F</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                    >0K</td
                                >
                            </tr>
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >Water Freezes</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                    >0°C</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-red-600"
                                    >32°F</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                    >273.15K</td
                                >
                            </tr>
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >Room Temperature</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                    >20°C</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-red-600"
                                    >68°F</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                    >293.15K</td
                                >
                            </tr>
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >Body Temperature</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                    >37°C</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-red-600"
                                    >98.6°F</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                    >310.15K</td
                                >
                            </tr>
                            <tr>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >Water Boils</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-blue-600"
                                    >100°C</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-red-600"
                                    >212°F</td
                                >
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm text-purple-600"
                                    >373.15K</td
                                >
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>

        <!-- Conversion Formulas -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Conversion Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div
                            class="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-blue-900 mb-2">
                                Celsius to Fahrenheit
                            </h4>
                            <div class="text-sm text-blue-800">
                                <div>°F = (°C × 9/5) + 32</div>
                                <div class="text-xs mt-1">
                                    Example: (25 × 9/5) + 32 = 77°F
                                </div>
                            </div>
                        </div>

                        <div
                            class="p-4 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-red-900 mb-2">
                                Fahrenheit to Celsius
                            </h4>
                            <div class="text-sm text-red-800">
                                <div>°C = (°F - 32) × 5/9</div>
                                <div class="text-xs mt-1">
                                    Example: (77 - 32) × 5/9 = 25°C
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div
                            class="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-purple-900 mb-2">
                                Celsius to Kelvin
                            </h4>
                            <div class="text-sm text-purple-800">
                                <div>K = °C + 273.15</div>
                                <div class="text-xs mt-1">
                                    Example: 25 + 273.15 = 298.15K
                                </div>
                            </div>
                        </div>

                        <div
                            class="p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-green-900 mb-2">
                                Kelvin to Celsius
                            </h4>
                            <div class="text-sm text-green-800">
                                <div>°C = K - 273.15</div>
                                <div class="text-xs mt-1">
                                    Example: 298.15 - 273.15 = 25°C
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>
