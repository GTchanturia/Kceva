<script>
    /**
     * Angle Converter Component
     * Convert between degrees, radians, and gradians
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 90;
    let fromUnit = 'degrees';
    let toUnit = 'radians';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Angle units
    const angleUnits = [
        { value: 'degrees', label: 'Degrees (°)', factor: 1 },
        { value: 'radians', label: 'Radians (rad)', factor: Math.PI / 180 },
        { value: 'gradians', label: 'Gradians (grad)', factor: 10 / 9 },
        { value: 'turns', label: 'Turns (full rotations)', factor: 1 / 360 }
    ];

    // Convert angles
    function convertAngle() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        // Convert to degrees first
        let degrees = inputValue;
        const fromFactor = angleUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        
        if (fromUnit === 'radians') {
            degrees = inputValue * (180 / Math.PI);
        } else if (fromUnit === 'gradians') {
            degrees = inputValue * (9 / 10);
        } else if (fromUnit === 'turns') {
            degrees = inputValue * 360;
        }

        // Convert from degrees to target unit
        if (toUnit === 'degrees') {
            convertedValue = degrees;
        } else if (toUnit === 'radians') {
            convertedValue = degrees * (Math.PI / 180);
        } else if (toUnit === 'gradians') {
            convertedValue = degrees * (10 / 9);
        } else if (toUnit === 'turns') {
            convertedValue = degrees / 360;
        }

        showResults = true;
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertAngle();
    }

    // Get angle description
    function getAngleDescription(degrees) {
        const normalizedDegrees = ((degrees % 360) + 360) % 360;
        
        if (normalizedDegrees === 0) return 'No rotation';
        if (normalizedDegrees === 30) return 'Acute angle';
        if (normalizedDegrees === 45) return 'Acute angle';
        if (normalizedDegrees === 60) return 'Acute angle';
        if (normalizedDegrees === 90) return 'Right angle';
        if (normalizedDegrees === 120) return 'Obtuse angle';
        if (normalizedDegrees === 135) return 'Obtuse angle';
        if (normalizedDegrees === 150) return 'Obtuse angle';
        if (normalizedDegrees === 180) return 'Straight angle';
        if (normalizedDegrees === 270) return 'Three-quarter turn';
        if (normalizedDegrees === 360) return 'Full rotation';
        
        if (normalizedDegrees < 90) return 'Acute angle';
        if (normalizedDegrees < 180) return 'Obtuse angle';
        if (normalizedDegrees < 270) return 'Reflex angle';
        return 'Reflex angle';
    }

    $: angleDescription = showResults ? getAngleDescription(fromUnit === 'degrees' ? inputValue : convertedValue) : '';
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Angle Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between degrees, radians, gradians, and turns. 
                Essential for mathematics, engineering, and computer graphics.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    type="number"
                    label="Angle Value"
                    bind:value={inputValue}
                    placeholder="90"
                    step="0.000001"
                />

                <Select
                    label="From Unit"
                    bind:value={fromUnit}
                    options={angleUnits}
                />

                <Select
                    label="To Unit"
                    bind:value={toUnit}
                    options={angleUnits}
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-2xl text-gray-600 mb-2">
                    {formatNumber(inputValue, 6)} {fromUnit}
                </div>
                <div class="text-5xl font-bold text-blue-600 mb-2">
                    {formatNumber(convertedValue, 8)} {toUnit}
                </div>
                <div class="text-lg text-gray-600">
                    {angleDescription}
                </div>
            </div>
        </Card>

        <!-- All Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    All Angle Conversions
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {#each angleUnits as unit}
                        {@const degrees = fromUnit === 'degrees' ? inputValue : 
                                        fromUnit === 'radians' ? inputValue * (180 / Math.PI) :
                                        fromUnit === 'gradians' ? inputValue * (9 / 10) :
                                        inputValue * 360}
                        {@const value = unit.value === 'degrees' ? degrees :
                                       unit.value === 'radians' ? degrees * (Math.PI / 180) :
                                       unit.value === 'gradians' ? degrees * (10 / 9) :
                                       degrees / 360}
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{unit.label}</div>
                            <div class="text-lg text-blue-600">{formatNumber(value, 6)}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>