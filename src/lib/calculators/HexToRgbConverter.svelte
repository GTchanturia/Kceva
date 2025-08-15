<script>
    /**
     * HEX to RGB Converter Component
     * Convert HEX color codes to RGB values
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let hexColor = '#3B82F6';

    // Results
    let rgbValues = { r: 0, g: 0, b: 0 };
    let hslValues = { h: 0, s: 0, l: 0 };
    let showResults = false;
    let error = '';

    // Convert HEX to RGB
    function convertHexToRgb() {
        error = '';
        
        if (!hexColor) {
            showResults = false;
            return;
        }

        // Remove # if present
        let hex = hexColor.replace('#', '');
        
        // Validate hex format
        if (!/^[0-9A-Fa-f]{6}$/.test(hex) && !/^[0-9A-Fa-f]{3}$/.test(hex)) {
            error = 'Invalid HEX color format. Use #RRGGBB or #RGB format.';
            showResults = false;
            return;
        }

        // Convert 3-digit to 6-digit
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        // Extract RGB values
        rgbValues.r = parseInt(hex.substr(0, 2), 16);
        rgbValues.g = parseInt(hex.substr(2, 2), 16);
        rgbValues.b = parseInt(hex.substr(4, 2), 16);

        // Convert to HSL
        convertRgbToHsl();

        showResults = true;
    }

    function convertRgbToHsl() {
        const r = rgbValues.r / 255;
        const g = rgbValues.g / 255;
        const b = rgbValues.b / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        hslValues.h = Math.round(h * 360);
        hslValues.s = Math.round(s * 100);
        hslValues.l = Math.round(l * 100);
    }

    // Auto-convert when hex changes
    $: if (hexColor) {
        convertHexToRgb();
    }

    // Copy color value
    async function copyColorValue(value) {
        try {
            await navigator.clipboard.writeText(value);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                HEX to RGB Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert HEX color codes to RGB values and HSL format. 
                Perfect for web design, graphic design, and color manipulation.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="text"
                    label="HEX Color Code"
                    bind:value={hexColor}
                    placeholder="#3B82F6"
                />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Color Preview
                    </label>
                    <div 
                        class="w-full h-12 border border-gray-300 rounded-md"
                        style="background-color: {hexColor}"
                    ></div>
                </div>
            </div>

            {#if error}
                <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-red-700">{error}</p>
                </div>
            {/if}
        </div>
    </Card>

    {#if showResults && !error}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">RGB Values</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-red-600">Red:</span>
                            <span class="font-semibold">{rgbValues.r}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-green-600">Green:</span>
                            <span class="font-semibold">{rgbValues.g}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-blue-600">Blue:</span>
                            <span class="font-semibold">{rgbValues.b}</span>
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        on:click={() => copyColorValue(`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`)}
                        className="w-full mt-4"
                    >
                        Copy RGB
                    </Button>
                </div>
            </Card>

            <Card>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">HSL Values</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-purple-600">Hue:</span>
                            <span class="font-semibold">{hslValues.h}°</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-orange-600">Saturation:</span>
                            <span class="font-semibold">{hslValues.s}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Lightness:</span>
                            <span class="font-semibold">{hslValues.l}%</span>
                        </div>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        on:click={() => copyColorValue(`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`)}
                        className="w-full mt-4"
                    >
                        Copy HSL
                    </Button>
                </div>
            </Card>

            <Card>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">HEX Value</h3>
                    <div class="text-center">
                        <div class="text-2xl font-mono font-bold text-gray-900 mb-4">
                            {hexColor.toUpperCase()}
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            on:click={() => copyColorValue(hexColor)}
                            className="w-full"
                        >
                            Copy HEX
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    {/if}
</div>