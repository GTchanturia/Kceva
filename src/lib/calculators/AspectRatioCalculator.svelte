<script>
    /**
     * Aspect Ratio Calculator Component
     * Calculate aspect ratios for images, screens, and design
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let width = 1920;
    let height = 1080;
    let calculationType = 'find-ratio';
    let targetWidth = 1280;
    let targetRatio = '16:9';

    // Results
    let aspectRatio = '';
    let decimal = 0;
    let newHeight = 0;
    let newWidth = 0;
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'find-ratio', label: 'Find Aspect Ratio' },
        { value: 'resize-width', label: 'Resize by Width' },
        { value: 'resize-height', label: 'Resize by Height' }
    ];

    // Common aspect ratios
    const commonRatios = [
        { value: '16:9', label: '16:9 (Widescreen)', decimal: 16/9 },
        { value: '4:3', label: '4:3 (Standard)', decimal: 4/3 },
        { value: '21:9', label: '21:9 (Ultrawide)', decimal: 21/9 },
        { value: '1:1', label: '1:1 (Square)', decimal: 1 },
        { value: '3:2', label: '3:2 (Photography)', decimal: 3/2 },
        { value: '5:4', label: '5:4 (Monitor)', decimal: 5/4 },
        { value: '16:10', label: '16:10 (Widescreen)', decimal: 16/10 },
        { value: '9:16', label: '9:16 (Portrait)', decimal: 9/16 }
    ];

    // Calculate greatest common divisor
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Calculate aspect ratio
    function calculateAspectRatio() {
        if (width <= 0 || height <= 0) {
            showResults = false;
            return;
        }

        switch (calculationType) {
            case 'find-ratio':
                const divisor = gcd(width, height);
                const ratioW = width / divisor;
                const ratioH = height / divisor;
                aspectRatio = `${ratioW}:${ratioH}`;
                decimal = width / height;
                break;

            case 'resize-width':
                if (targetWidth <= 0) return;
                newHeight = Math.round((targetWidth * height) / width);
                aspectRatio = `${width}:${height}`;
                decimal = width / height;
                break;

            case 'resize-height':
                const selectedRatio = commonRatios.find(r => r.value === targetRatio);
                if (!selectedRatio || targetWidth <= 0) return;
                newHeight = Math.round(targetWidth / selectedRatio.decimal);
                aspectRatio = targetRatio;
                decimal = selectedRatio.decimal;
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType) {
        calculateAspectRatio();
    }

    // Find closest common ratio
    function findClosestRatio() {
        if (!showResults) return null;
        
        const currentDecimal = width / height;
        let closest = commonRatios[0];
        let minDiff = Math.abs(currentDecimal - closest.decimal);

        commonRatios.forEach(ratio => {
            const diff = Math.abs(currentDecimal - ratio.decimal);
            if (diff < minDiff) {
                minDiff = diff;
                closest = ratio;
            }
        });

        return closest;
    }

    $: closestRatio = findClosestRatio();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Aspect Ratio Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate aspect ratios for images, screens, and design projects. 
                Find ratios, resize dimensions, or match common aspect ratios.
            </p>

            <div class="space-y-6">
                <Select
                    label="What do you want to calculate?"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'find-ratio'}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Width"
                            bind:value={width}
                            placeholder="1920"
                            min="1"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Height"
                            bind:value={height}
                            placeholder="1080"
                            min="1"
                            step="1"
                        />
                    </div>
                {:else if calculationType === 'resize-width'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Original Width"
                            bind:value={width}
                            placeholder="1920"
                            min="1"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Original Height"
                            bind:value={height}
                            placeholder="1080"
                            min="1"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="New Width"
                            bind:value={targetWidth}
                            placeholder="1280"
                            min="1"
                            step="1"
                        />
                    </div>
                {:else if calculationType === 'resize-height'}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Target Width"
                            bind:value={targetWidth}
                            placeholder="1280"
                            min="1"
                            step="1"
                        />

                        <Select
                            label="Target Aspect Ratio"
                            bind:value={targetRatio}
                            options={commonRatios}
                        />
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                {#if calculationType === 'find-ratio'}
                    <div class="text-5xl font-bold text-blue-600 mb-4">
                        {aspectRatio}
                    </div>
                    <div class="text-xl text-gray-600 mb-2">
                        Aspect Ratio
                    </div>
                    <div class="text-lg text-gray-500">
                        Decimal: {formatNumber(decimal, 4)}
                    </div>
                {:else if calculationType === 'resize-width'}
                    <div class="text-5xl font-bold text-green-600 mb-4">
                        {targetWidth} × {newHeight}
                    </div>
                    <div class="text-xl text-gray-600 mb-2">
                        New Dimensions
                    </div>
                    <div class="text-lg text-gray-500">
                        Maintains {aspectRatio} ratio
                    </div>
                {:else if calculationType === 'resize-height'}
                    <div class="text-5xl font-bold text-purple-600 mb-4">
                        {targetWidth} × {newHeight}
                    </div>
                    <div class="text-xl text-gray-600 mb-2">
                        Calculated Dimensions
                    </div>
                    <div class="text-lg text-gray-500">
                        {targetRatio} aspect ratio
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Dimension Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Dimension Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        {#if calculationType === 'find-ratio'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Width:</span>
                                <span class="font-semibold">{width} px</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Height:</span>
                                <span class="font-semibold">{height} px</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Aspect Ratio:</span>
                                <span class="font-semibold text-blue-600">{aspectRatio}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Decimal Ratio:</span>
                                <span class="font-semibold">{formatNumber(decimal, 6)}</span>
                            </div>
                        {:else}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Target Width:</span>
                                <span class="font-semibold">{targetWidth} px</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Calculated Height:</span>
                                <span class="font-semibold text-green-600">{newHeight} px</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Aspect Ratio:</span>
                                <span class="font-semibold">{aspectRatio}</span>
                            </div>
                        {/if}
                    </div>

                    {#if calculationType === 'find-ratio' && closestRatio}
                        <div class="space-y-3">
                            <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 class="font-semibold text-blue-900 mb-1">Closest Common Ratio</h4>
                                <div class="text-blue-800">{closestRatio.label}</div>
                                <div class="text-sm text-blue-600">
                                    Difference: {formatNumber(Math.abs(decimal - closestRatio.decimal), 4)}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </Card>

        <!-- Common Aspect Ratios -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Aspect Ratios
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {#each commonRatios as ratio}
                        <div class="text-center p-3 rounded-lg {aspectRatio === ratio.value ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'}">
                            <div class="font-semibold text-gray-900">{ratio.value}</div>
                            <div class="text-sm text-gray-600">{ratio.label}</div>
                            <div class="text-xs text-gray-500">{formatNumber(ratio.decimal, 3)}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Usage Examples -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Usage Examples
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">Screen & Video</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>HD Video:</span>
                                <span class="font-medium">16:9 (1920×1080)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>4K Video:</span>
                                <span class="font-medium">16:9 (3840×2160)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Ultrawide:</span>
                                <span class="font-medium">21:9 (2560×1080)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Old TV:</span>
                                <span class="font-medium">4:3 (640×480)</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">Photography & Print</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Instagram Square:</span>
                                <span class="font-medium">1:1 (1080×1080)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Instagram Story:</span>
                                <span class="font-medium">9:16 (1080×1920)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>35mm Film:</span>
                                <span class="font-medium">3:2 (3000×2000)</span>
                            </div>
                            <div class="flex justify-between">
                                <span>A4 Paper:</span>
                                <span class="font-medium">√2:1 (210×297mm)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>