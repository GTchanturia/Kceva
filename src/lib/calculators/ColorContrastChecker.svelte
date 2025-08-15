<script>
    /**
     * Color Contrast Checker Component
     * Check color contrast ratios for accessibility compliance
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let foregroundColor = '#000000';
    let backgroundColor = '#FFFFFF';

    // Results
    let contrastRatio = 0;
    let wcagAA = false;
    let wcagAAA = false;
    let showResults = false;

    // Calculate contrast ratio
    function calculateContrast() {
        if (!foregroundColor || !backgroundColor) {
            showResults = false;
            return;
        }

        const fgLuminance = getLuminance(foregroundColor);
        const bgLuminance = getLuminance(backgroundColor);
        
        const lighter = Math.max(fgLuminance, bgLuminance);
        const darker = Math.min(fgLuminance, bgLuminance);
        
        contrastRatio = (lighter + 0.05) / (darker + 0.05);
        
        wcagAA = contrastRatio >= 4.5;
        wcagAAA = contrastRatio >= 7;
        
        showResults = true;
    }

    // Calculate relative luminance
    function getLuminance(hex) {
        const rgb = hexToRgb(hex);
        const [r, g, b] = rgb.map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    // Convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : [0, 0, 0];
    }

    // Auto-calculate when colors change
    $: if (foregroundColor && backgroundColor) {
        calculateContrast();
    }

    // Get compliance level
    function getComplianceLevel() {
        if (wcagAAA) return { text: 'WCAG AAA', color: 'text-green-600', bg: 'bg-green-50' };
        if (wcagAA) return { text: 'WCAG AA', color: 'text-blue-600', bg: 'bg-blue-50' };
        return { text: 'Fails WCAG', color: 'text-red-600', bg: 'bg-red-50' };
    }

    $: compliance = getComplianceLevel();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Color Contrast Checker
            </h2>
            <p class="text-gray-600 mb-6">
                Check color contrast ratios for web accessibility compliance. 
                Ensure your designs meet WCAG AA and AAA standards.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Input
                        type="color"
                        label="Foreground Color (Text)"
                        bind:value={foregroundColor}
                    />
                    <div class="mt-2 text-sm text-gray-600">
                        HEX: {foregroundColor.toUpperCase()}
                    </div>
                </div>

                <div>
                    <Input
                        type="color"
                        label="Background Color"
                        bind:value={backgroundColor}
                    />
                    <div class="mt-2 text-sm text-gray-600">
                        HEX: {backgroundColor.toUpperCase()}
                    </div>
                </div>
            </div>

            <!-- Color Preview -->
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                </label>
                <div 
                    class="p-6 border border-gray-300 rounded-lg text-center"
                    style="background-color: {backgroundColor}; color: {foregroundColor}"
                >
                    <div class="text-2xl font-bold mb-2">Sample Text</div>
                    <div class="text-lg">This is how your text will look</div>
                    <div class="text-sm mt-2">Small text example for readability testing</div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Contrast Ratio -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatNumber(contrastRatio, 2)}:1
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Contrast Ratio
                </div>
                <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {compliance.color} {compliance.bg} border">
                    {compliance.text}
                </div>
            </div>
        </Card>

        <!-- WCAG Compliance -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    WCAG Accessibility Compliance
                </h3>

                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 rounded-lg {wcagAA ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">{wcagAA ? '✅' : '❌'}</span>
                            <div>
                                <div class="font-semibold">WCAG AA Standard</div>
                                <div class="text-sm text-gray-600">Minimum 4.5:1 ratio required</div>
                            </div>
                        </div>
                        <div class="text-lg font-bold {wcagAA ? 'text-green-600' : 'text-red-600'}">
                            {wcagAA ? 'Pass' : 'Fail'}
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-4 rounded-lg {wcagAAA ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                        <div class="flex items-center space-x-3">
                            <span class="text-2xl">{wcagAAA ? '✅' : '❌'}</span>
                            <div>
                                <div class="font-semibold">WCAG AAA Standard</div>
                                <div class="text-sm text-gray-600">Minimum 7:1 ratio required</div>
                            </div>
                        </div>
                        <div class="text-lg font-bold {wcagAAA ? 'text-green-600' : 'text-red-600'}">
                            {wcagAAA ? 'Pass' : 'Fail'}
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Accessibility Guidelines -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Accessibility Guidelines
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📋 WCAG AA (4.5:1)
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Minimum standard for web accessibility. Required for most websites 
                            and applications to ensure readability for users with visual impairments.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🏆 WCAG AAA (7:1)
                        </h4>
                        <p class="text-green-800 text-sm">
                            Enhanced standard providing superior accessibility. 
                            Recommended for critical interfaces and maximum inclusivity.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>