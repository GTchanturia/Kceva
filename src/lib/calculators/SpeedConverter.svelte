<script>
    /**
     * Speed Converter Component
     * Convert between different speed and velocity units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 60;
    let fromUnit = 'kmh';
    let toUnit = 'mph';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Speed units with conversion factors to m/s
    const speedUnits = [
        // Metric
        { value: 'ms', label: 'Meters per Second (m/s)', factor: 1, category: 'Metric' },
        { value: 'kmh', label: 'Kilometers per Hour (km/h)', factor: 1/3.6, category: 'Metric' },
        { value: 'kms', label: 'Kilometers per Second (km/s)', factor: 1000, category: 'Metric' },
        
        // Imperial
        { value: 'fps', label: 'Feet per Second (ft/s)', factor: 0.3048, category: 'Imperial' },
        { value: 'mph', label: 'Miles per Hour (mph)', factor: 0.44704, category: 'Imperial' },
        { value: 'mps', label: 'Miles per Second (mi/s)', factor: 1609.344, category: 'Imperial' },
        
        // Nautical
        { value: 'knot', label: 'Knots (kn)', factor: 0.514444, category: 'Nautical' },
        
        // Scientific
        { value: 'c', label: 'Speed of Light (c)', factor: 299792458, category: 'Scientific' },
        { value: 'mach', label: 'Mach (at sea level)', factor: 343, category: 'Scientific' },
        
        // Other
        { value: 'ips', label: 'Inches per Second (in/s)', factor: 0.0254, category: 'Other' },
        { value: 'fpm', label: 'Feet per Minute (ft/min)', factor: 0.00508, category: 'Other' }
    ];

    // Convert speed
    function convertSpeed() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = speedUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = speedUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        // Convert to m/s first, then to target unit
        const metersPerSecond = inputValue * fromFactor;
        convertedValue = metersPerSecond / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertSpeed();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertSpeed();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return speedUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }

    // Get common conversions
    function getCommonConversions() {
        const fromFactor = speedUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const commonUnits = ['ms', 'kmh', 'mph', 'fps', 'knot'];
        
        return commonUnits
            .filter(unit => unit !== fromUnit)
            .map(unit => {
                const toFactor = speedUnits.find(u => u.value === unit)?.factor || 1;
                const metersPerSecond = inputValue * fromFactor;
                const converted = metersPerSecond / toFactor;
                return {
                    unit,
                    label: speedUnits.find(u => u.value === unit)?.label || unit,
                    value: converted
                };
            });
    }

    $: commonConversions = showResults ? getCommonConversions() : [];

    // Calculate time and distance examples
    function getTimeDistanceExamples() {
        if (!showResults) return [];
        
        const fromFactor = speedUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const speedInMS = inputValue * fromFactor;
        
        return [
            {
                time: '1 second',
                distance: speedInMS,
                unit: 'meters'
            },
            {
                time: '1 minute',
                distance: speedInMS * 60,
                unit: 'meters'
            },
            {
                time: '1 hour',
                distance: speedInMS * 3600 / 1000,
                unit: 'kilometers'
            },
            {
                time: '1 day',
                distance: speedInMS * 86400 / 1000,
                unit: 'kilometers'
            }
        ];
    }

    $: timeDistanceExamples = getTimeDistanceExamples();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Speed Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Speed Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between different speed and velocity units. Perfect for 
                automotive, aviation, maritime, and scientific applications.
            </p>

            <div class="space-y-6">
                <!-- Value Input -->
                <div>
                    <Input
                        type="number"
                        label="Speed Value"
                        bind:value={inputValue}
                        placeholder="60"
                        step="0.000001"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={speedUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={speedUnits}
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

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {formatNumber(inputValue, 6)} {fromUnit}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedValue, 8)} {toUnit}
                    </div>
                </div>

                <div class="text-gray-600">
                    <div class="text-sm">Conversion Factor</div>
                    <div class="text-lg font-semibold">
                        1 {fromUnit} = {formatNumber(convertedValue / inputValue, 8)} {toUnit}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Conversion Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Conversion Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">From:</span>
                            <span class="font-semibold">{formatNumber(inputValue, 6)} {getUnitLabel(fromUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">To:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(convertedValue, 8)} {getUnitLabel(toUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">In m/s:</span>
                            <span class="font-semibold">{formatNumber(inputValue * (speedUnits.find(u => u.value === fromUnit)?.factor || 1), 6)} m/s</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Reverse Factor:</span>
                            <span class="font-semibold">1 {toUnit} = {formatNumber(inputValue / convertedValue, 8)} {fromUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Scientific Notation:</span>
                            <span class="font-semibold">{convertedValue.toExponential(3)} {toUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Precision:</span>
                            <span class="font-semibold">{convertedValue.toString().split('.')[1]?.length || 0} decimal places</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    {formatNumber(inputValue, 3)} {fromUnit} in Other Units
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each commonConversions as conversion}
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{conversion.unit}</div>
                            <div class="text-lg text-blue-600">{formatNumber(conversion.value, 6)}</div>
                            <div class="text-xs text-gray-500">{conversion.label}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Time and Distance Examples -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Distance Traveled at {formatNumber(inputValue, 2)} {fromUnit}
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {#each timeDistanceExamples as example}
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                            <div class="font-semibold text-blue-900 mb-1">{example.time}</div>
                            <div class="text-lg text-blue-600">{formatNumber(example.distance, 2)}</div>
                            <div class="text-sm text-blue-700">{example.unit}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Speed Categories -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Speed Unit Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">Metric System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>m/s:</span>
                                <span class="font-medium">Base SI unit</span>
                            </div>
                            <div class="flex justify-between">
                                <span>km/h:</span>
                                <span class="font-medium">Common usage</span>
                            </div>
                            <div class="flex justify-between">
                                <span>km/s:</span>
                                <span class="font-medium">Space velocities</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Imperial System</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>ft/s:</span>
                                <span class="font-medium">Engineering</span>
                            </div>
                            <div class="flex justify-between">
                                <span>mph:</span>
                                <span class="font-medium">Road speeds</span>
                            </div>
                            <div class="flex justify-between">
                                <span>mi/s:</span>
                                <span class="font-medium">High velocities</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-purple-900">Specialized Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Knots:</span>
                                <span class="font-medium">Maritime/Aviation</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Mach:</span>
                                <span class="font-medium">Supersonic flight</span>
                            </div>
                            <div class="flex justify-between">
                                <span>c (light speed):</span>
                                <span class="font-medium">Physics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Speed References -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Speed References
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Transportation</h4>
                            <div class="text-blue-800 text-sm space-y-1">
                                <div>• Walking: ~5 km/h (3 mph)</div>
                                <div>• Cycling: ~20 km/h (12 mph)</div>
                                <div>• City driving: ~50 km/h (30 mph)</div>
                                <div>• Highway: ~100 km/h (60 mph)</div>
                                <div>• High-speed train: ~300 km/h (185 mph)</div>
                                <div>• Commercial jet: ~900 km/h (560 mph)</div>
                            </div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Natural Phenomena</h4>
                            <div class="text-green-800 text-sm space-y-1">
                                <div>• Gentle breeze: ~10 km/h (6 mph)</div>
                                <div>• Strong wind: ~50 km/h (30 mph)</div>
                                <div>• Hurricane: ~120+ km/h (75+ mph)</div>
                                <div>• Tornado: ~500 km/h (300 mph)</div>
                                <div>• Sound (air): ~343 m/s (1,235 km/h)</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">Sports & Records</h4>
                            <div class="text-purple-800 text-sm space-y-1">
                                <div>• Marathon pace: ~20 km/h (12 mph)</div>
                                <div>• Sprint (100m): ~36 km/h (22 mph)</div>
                                <div>• Tennis serve: ~200 km/h (125 mph)</div>
                                <div>• Baseball pitch: ~160 km/h (100 mph)</div>
                                <div>• F1 car: ~350 km/h (220 mph)</div>
                            </div>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">Extreme Speeds</h4>
                            <div class="text-orange-800 text-sm space-y-1">
                                <div>• Bullet: ~400 m/s (1,440 km/h)</div>
                                <div>• Earth's rotation: ~465 m/s (equator)</div>
                                <div>• Earth's orbit: ~30 km/s</div>
                                <div>• Escape velocity: ~11.2 km/s</div>
                                <div>• Light: ~300,000 km/s</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Conversion Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Speed Conversion Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            🚗 Quick Approximations
                        </h4>
                        <p class="text-blue-800 text-sm">
                            To quickly convert km/h to mph, multiply by 0.6. 
                            To convert mph to km/h, multiply by 1.6. For example: 100 km/h ≈ 60 mph.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            ⛵ Nautical Speeds
                        </h4>
                        <p class="text-green-800 text-sm">
                            Knots are used in maritime and aviation. 1 knot = 1 nautical mile per hour. 
                            A nautical mile is based on Earth's circumference (1/60th of a degree).
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            ✈️ Aviation Speeds
                        </h4>
                        <p class="text-purple-800 text-sm">
                            Aircraft speeds are often given in knots for navigation, but Mach numbers 
                            are used for high-speed flight (Mach 1 = speed of sound ≈ 343 m/s at sea level).
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            🔬 Scientific Context
                        </h4>
                        <p class="text-orange-800 text-sm">
                            In physics, speeds are often expressed as fractions of the speed of light (c). 
                            For example, particle accelerators can achieve speeds of 0.99c or higher.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>