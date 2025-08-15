<script>
    /**
     * Font Size Converter Component
     * Convert between pt, px, and other font size units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 16;
    let fromUnit = 'px';
    let toUnit = 'pt';
    let dpi = 96; // Screen DPI

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Font size units
    const fontUnits = [
        { value: 'px', label: 'Pixels (px)', category: 'Screen' },
        { value: 'pt', label: 'Points (pt)', category: 'Print' },
        { value: 'pc', label: 'Picas (pc)', category: 'Print' },
        { value: 'em', label: 'Em (em)', category: 'Relative' },
        { value: 'rem', label: 'Root Em (rem)', category: 'Relative' },
        { value: 'percent', label: 'Percentage (%)', category: 'Relative' },
        { value: 'mm', label: 'Millimeters (mm)', category: 'Physical' },
        { value: 'in', label: 'Inches (in)', category: 'Physical' }
    ];

    // Convert font sizes
    function convertFontSize() {
        if (inputValue === null || inputValue === undefined || inputValue <= 0) {
            showResults = false;
            return;
        }

        // Convert everything to points first (standard typography unit)
        let points = inputValue;

        switch (fromUnit) {
            case 'px':
                points = inputValue * (72 / dpi);
                break;
            case 'pt':
                points = inputValue;
                break;
            case 'pc':
                points = inputValue * 12; // 1 pica = 12 points
                break;
            case 'em':
                points = inputValue * 12; // Assuming 12pt base
                break;
            case 'rem':
                points = inputValue * 12; // Assuming 12pt root
                break;
            case 'percent':
                points = (inputValue / 100) * 12; // Assuming 12pt base
                break;
            case 'mm':
                points = inputValue * (72 / 25.4); // 1 inch = 25.4mm, 72pt = 1 inch
                break;
            case 'in':
                points = inputValue * 72; // 72 points = 1 inch
                break;
        }

        // Convert from points to target unit
        switch (toUnit) {
            case 'px':
                convertedValue = points * (dpi / 72);
                break;
            case 'pt':
                convertedValue = points;
                break;
            case 'pc':
                convertedValue = points / 12;
                break;
            case 'em':
                convertedValue = points / 12;
                break;
            case 'rem':
                convertedValue = points / 12;
                break;
            case 'percent':
                convertedValue = (points / 12) * 100;
                break;
            case 'mm':
                convertedValue = points / (72 / 25.4);
                break;
            case 'in':
                convertedValue = points / 72;
                break;
        }

        showResults = true;
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertFontSize();
    }

    // Common font sizes
    const commonSizes = [
        { name: 'Caption', px: 10, pt: 7.5 },
        { name: 'Small', px: 12, pt: 9 },
        { name: 'Body', px: 16, pt: 12 },
        { name: 'Large', px: 18, pt: 13.5 },
        { name: 'H4', px: 20, pt: 15 },
        { name: 'H3', px: 24, pt: 18 },
        { name: 'H2', px: 32, pt: 24 },
        { name: 'H1', px: 48, pt: 36 }
    ];
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Font Size Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between pixels, points, and other font size units. 
                Perfect for typography design and print-to-screen conversions.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Input
                    type="number"
                    label="Font Size"
                    bind:value={inputValue}
                    placeholder="16"
                    min="0.1"
                    step="0.1"
                />

                <Select
                    label="From Unit"
                    bind:value={fromUnit}
                    options={fontUnits}
                />

                <Select
                    label="To Unit"
                    bind:value={toUnit}
                    options={fontUnits}
                />

                <Input
                    type="number"
                    label="Screen DPI"
                    bind:value={dpi}
                    placeholder="96"
                    min="72"
                    max="300"
                    step="1"
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
                    {formatNumber(inputValue, 3)} {fromUnit}
                </div>
                <div class="text-5xl font-bold text-blue-600 mb-2">
                    {formatNumber(convertedValue, 3)} {toUnit}
                </div>
                <div class="text-lg text-gray-600">
                    Font Size Conversion
                </div>
            </div>
        </Card>

        <!-- Common Font Sizes -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Font Sizes
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each commonSizes as size}
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{size.name}</div>
                            <div class="text-sm text-gray-600">{size.px}px</div>
                            <div class="text-sm text-gray-600">{size.pt}pt</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>