<script>
    /**
     * DPI/PPI Calculator Component
     * Calculate dots per inch and pixels per inch for printing and displays
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let calculationType = 'screen-ppi';
    let screenWidth = 1920;
    let screenHeight = 1080;
    let diagonalInches = 24;
    let printWidth = 8.5;
    let printHeight = 11;
    let imageWidth = 2550;
    let imageHeight = 3300;

    // Results
    let ppi = 0;
    let dpi = 0;
    let pixelSize = 0;
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'screen-ppi', label: 'Screen PPI Calculator' },
        { value: 'print-dpi', label: 'Print DPI Calculator' }
    ];

    // Calculate PPI/DPI
    function calculate() {
        if (calculationType === 'screen-ppi') {
            if (screenWidth <= 0 || screenHeight <= 0 || diagonalInches <= 0) {
                showResults = false;
                return;
            }

            const diagonalPixels = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight);
            ppi = diagonalPixels / diagonalInches;
            pixelSize = 25.4 / ppi; // mm per pixel
        } else {
            if (printWidth <= 0 || printHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
                showResults = false;
                return;
            }

            const dpiWidth = imageWidth / printWidth;
            const dpiHeight = imageHeight / printHeight;
            dpi = Math.min(dpiWidth, dpiHeight);
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType) {
        calculate();
    }

    // Get quality assessment
    function getQualityAssessment(value, type) {
        if (type === 'ppi') {
            if (value >= 300) return { text: 'Retina Quality', color: 'text-green-600' };
            if (value >= 200) return { text: 'High Quality', color: 'text-blue-600' };
            if (value >= 150) return { text: 'Good Quality', color: 'text-yellow-600' };
            if (value >= 100) return { text: 'Standard Quality', color: 'text-orange-600' };
            return { text: 'Low Quality', color: 'text-red-600' };
        } else {
            if (value >= 300) return { text: 'Print Ready', color: 'text-green-600' };
            if (value >= 150) return { text: 'Good for Print', color: 'text-blue-600' };
            if (value >= 72) return { text: 'Screen Quality', color: 'text-yellow-600' };
            return { text: 'Low Quality', color: 'text-red-600' };
        }
    }

    $: quality = showResults ? getQualityAssessment(calculationType === 'screen-ppi' ? ppi : dpi, calculationType === 'screen-ppi' ? 'ppi' : 'dpi') : null;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                DPI/PPI Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate dots per inch (DPI) for printing or pixels per inch (PPI) for screens. 
                Essential for print quality and display sharpness assessment.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Type"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'screen-ppi'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Screen Width (pixels)"
                            bind:value={screenWidth}
                            placeholder="1920"
                            min="1"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Screen Height (pixels)"
                            bind:value={screenHeight}
                            placeholder="1080"
                            min="1"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Diagonal Size (inches)"
                            bind:value={diagonalInches}
                            placeholder="24"
                            min="0.1"
                            step="0.1"
                        />
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Print Dimensions</h4>
                            <Input
                                type="number"
                                label="Print Width (inches)"
                                bind:value={printWidth}
                                placeholder="8.5"
                                min="0.1"
                                step="0.1"
                            />
                            <Input
                                type="number"
                                label="Print Height (inches)"
                                bind:value={printHeight}
                                placeholder="11"
                                min="0.1"
                                step="0.1"
                            />
                        </div>

                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Image Dimensions</h4>
                            <Input
                                type="number"
                                label="Image Width (pixels)"
                                bind:value={imageWidth}
                                placeholder="2550"
                                min="1"
                                step="1"
                            />
                            <Input
                                type="number"
                                label="Image Height (pixels)"
                                bind:value={imageHeight}
                                placeholder="3300"
                                min="1"
                                step="1"
                            />
                        </div>
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
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatNumber(calculationType === 'screen-ppi' ? ppi : dpi, 1)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    {calculationType === 'screen-ppi' ? 'Pixels Per Inch (PPI)' : 'Dots Per Inch (DPI)'}
                </div>
                {#if quality}
                    <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {quality.color} bg-opacity-10 border">
                        {quality.text}
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Quality Standards -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Quality Standards
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">Screen PPI Standards</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Retina Display:</span>
                                <span class="font-medium">300+ PPI</span>
                            </div>
                            <div class="flex justify-between">
                                <span>High-end Monitor:</span>
                                <span class="font-medium">200-300 PPI</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Standard Monitor:</span>
                                <span class="font-medium">100-200 PPI</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Low Resolution:</span>
                                <span class="font-medium">< 100 PPI</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">Print DPI Standards</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Professional Print:</span>
                                <span class="font-medium">300+ DPI</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Good Quality Print:</span>
                                <span class="font-medium">150-300 DPI</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Draft Quality:</span>
                                <span class="font-medium">72-150 DPI</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Screen Display:</span>
                                <span class="font-medium">72 DPI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>