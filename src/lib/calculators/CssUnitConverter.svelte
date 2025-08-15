<script>
    /**
     * CSS Unit Converter Component
     * Convert between px, em, rem, and percentage units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 16;
    let fromUnit = 'px';
    let toUnit = 'rem';
    let baseFontSize = 16; // Root font size in px
    let parentFontSize = 16; // Parent font size in px

    // Results
    let convertedValue = 0;
    let showResults = false;

    // CSS units
    const cssUnits = [
        { value: 'px', label: 'Pixels (px)', category: 'Absolute' },
        { value: 'em', label: 'Em (em)', category: 'Relative' },
        { value: 'rem', label: 'Root Em (rem)', category: 'Relative' },
        { value: 'percent', label: 'Percentage (%)', category: 'Relative' },
        { value: 'pt', label: 'Points (pt)', category: 'Absolute' },
        { value: 'pc', label: 'Picas (pc)', category: 'Absolute' },
        { value: 'in', label: 'Inches (in)', category: 'Absolute' },
        { value: 'cm', label: 'Centimeters (cm)', category: 'Absolute' },
        { value: 'mm', label: 'Millimeters (mm)', category: 'Absolute' }
    ];

    // Convert CSS units
    function convertUnits() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        // Convert everything to pixels first
        let pixels = inputValue;

        switch (fromUnit) {
            case 'px':
                pixels = inputValue;
                break;
            case 'em':
                pixels = inputValue * parentFontSize;
                break;
            case 'rem':
                pixels = inputValue * baseFontSize;
                break;
            case 'percent':
                pixels = (inputValue / 100) * parentFontSize;
                break;
            case 'pt':
                pixels = inputValue * (96 / 72); // 1pt = 1/72 inch, 96 DPI
                break;
            case 'pc':
                pixels = inputValue * 16; // 1pc = 12pt = 16px
                break;
            case 'in':
                pixels = inputValue * 96; // 96 DPI
                break;
            case 'cm':
                pixels = inputValue * (96 / 2.54); // 1 inch = 2.54 cm
                break;
            case 'mm':
                pixels = inputValue * (96 / 25.4); // 1 inch = 25.4 mm
                break;
        }

        // Convert from pixels to target unit
        switch (toUnit) {
            case 'px':
                convertedValue = pixels;
                break;
            case 'em':
                convertedValue = pixels / parentFontSize;
                break;
            case 'rem':
                convertedValue = pixels / baseFontSize;
                break;
            case 'percent':
                convertedValue = (pixels / parentFontSize) * 100;
                break;
            case 'pt':
                convertedValue = pixels / (96 / 72);
                break;
            case 'pc':
                convertedValue = pixels / 16;
                break;
            case 'in':
                convertedValue = pixels / 96;
                break;
            case 'cm':
                convertedValue = pixels / (96 / 2.54);
                break;
            case 'mm':
                convertedValue = pixels / (96 / 25.4);
                break;
        }

        showResults = true;
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertUnits();
    }

    // Get unit description
    function getUnitDescription(unit) {
        const descriptions = {
            'px': 'Fixed size, same across all devices',
            'em': 'Relative to parent element font size',
            'rem': 'Relative to root element font size',
            'percent': 'Percentage of parent element',
            'pt': 'Print unit, 1/72 of an inch',
            'pc': 'Print unit, 12 points',
            'in': 'Physical inch measurement',
            'cm': 'Physical centimeter measurement',
            'mm': 'Physical millimeter measurement'
        };
        return descriptions[unit] || '';
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                CSS Unit Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between CSS units like px, em, rem, and percentages. 
                Essential for responsive web design and consistent layouts.
            </p>

            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Base Font Size (px)"
                        bind:value={baseFontSize}
                        placeholder="16"
                        min="1"
                        step="0.1"
                    />

                    <Input
                        type="number"
                        label="Parent Font Size (px)"
                        bind:value={parentFontSize}
                        placeholder="16"
                        min="1"
                        step="0.1"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                        type="number"
                        label="Value"
                        bind:value={inputValue}
                        placeholder="16"
                        step="0.001"
                    />

                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={cssUnits}
                    />

                    <Select
                        label="To Unit"
                        bind:value={toUnit}
                        options={cssUnits}
                    />
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-2xl text-gray-600 mb-2">
                    {formatNumber(inputValue, 3)}{fromUnit}
                </div>
                <div class="text-5xl font-bold text-blue-600 mb-2">
                    {formatNumber(convertedValue, 6)}{toUnit}
                </div>
                <div class="text-lg text-gray-600">
                    CSS Unit Conversion
                </div>
            </div>
        </Card>

        <!-- Unit Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Unit Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">{fromUnit.toUpperCase()}</h4>
                        <p class="text-blue-800 text-sm">{getUnitDescription(fromUnit)}</p>
                    </div>

                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">{toUnit.toUpperCase()}</h4>
                        <p class="text-green-800 text-sm">{getUnitDescription(toUnit)}</p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>