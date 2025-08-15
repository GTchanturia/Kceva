<script>
    /**
     * RGB to HEX Converter Component
     * Convert RGB color values to HEX codes
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let red = 59;
    let green = 130;
    let blue = 246;

    // Results
    let hexColor = '';
    let hslValues = { h: 0, s: 0, l: 0 };
    let showResults = false;

    // Convert RGB to HEX
    function convertRgbToHex() {
        if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
            showResults = false;
            return;
        }

        // Convert to hex
        const r = Math.round(red).toString(16).padStart(2, '0');
        const g = Math.round(green).toString(16).padStart(2, '0');
        const b = Math.round(blue).toString(16).padStart(2, '0');
        
        hexColor = `#${r}${g}${b}`.toUpperCase();

        // Convert to HSL
        convertRgbToHsl();

        showResults = true;
    }

    function convertRgbToHsl() {
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;

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

    // Auto-convert when RGB values change
    $: if (red !== null && green !== null && blue !== null) {
        convertRgbToHex();
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
                RGB to HEX Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert RGB color values to HEX codes and HSL format. 
                Perfect for web design, CSS styling, and color manipulation.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <Input
                        type="number"
                        label="Red (0-255)"
                        bind:value={red}
                        placeholder="59"
                        min="0"
                        max="255"
                        step="1"
                    />

                    <Input
                        type="number"
                        label="Green (0-255)"
                        bind:value={green}
                        placeholder="130"
                        min="0"
                        max="255"
                        step="1"
                    />

                    <Input
                        type="number"
                        label="Blue (0-255)"
                        bind:value={blue}
                        placeholder="246"
                        min="0"
                        max="255"
                        step="1"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Color Preview
                    </label>
                    <div 
                        class="w-full h-32 border border-gray-300 rounded-md mb-4"
                        style="background-color: rgb({red}, {green}, {blue})"
                    ></div>
                    
                    {#if showResults}
                        <div class="text-center">
                            <div class="text-2xl font-mono font-bold text-gray-900">
                                {hexColor}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </Card>

    {#if showResults}
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
                        on:click={() => copyColorValue(`rgb(${red}, ${green}, ${blue})`)}
                        className="w-full mt-4"
                    >
                        Copy RGB
                    </Button>
                </div>
            </Card>

            <Card>
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">HEX Code</h3>
                    <div class="text-center">
                        <div class="text-3xl font-mono font-bold text-gray-900 mb-4">
                            {hexColor}
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
        </div>
    {/if}
</div>