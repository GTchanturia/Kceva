<script>
    /**
     * Golden Ratio Calculator Component
     * Calculate golden ratio proportions and measurements
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 100;
    let calculationType = 'find-golden';

    // Results
    let goldenRatio = 1.618033988749;
    let largerSegment = 0;
    let smallerSegment = 0;
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'find-golden', label: 'Find Golden Ratio Segments' },
        { value: 'check-ratio', label: 'Check if Ratio is Golden' }
    ];

    // For checking ratio
    let segment1 = 100;
    let segment2 = 61.8;

    // Calculate golden ratio
    function calculateGoldenRatio() {
        if (calculationType === 'find-golden') {
            if (inputValue <= 0) {
                showResults = false;
                return;
            }

            largerSegment = inputValue / goldenRatio;
            smallerSegment = inputValue - largerSegment;
        } else {
            if (segment1 <= 0 || segment2 <= 0) {
                showResults = false;
                return;
            }

            const ratio = Math.max(segment1, segment2) / Math.min(segment1, segment2);
            const difference = Math.abs(ratio - goldenRatio);
            
            largerSegment = Math.max(segment1, segment2);
            smallerSegment = Math.min(segment1, segment2);
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType === 'find-golden' && inputValue) {
        calculateGoldenRatio();
    } else if (calculationType === 'check-ratio' && segment1 && segment2) {
        calculateGoldenRatio();
    }

    // Check if ratio is close to golden ratio
    function isGoldenRatio() {
        if (calculationType !== 'check-ratio') return false;
        const ratio = Math.max(segment1, segment2) / Math.min(segment1, segment2);
        return Math.abs(ratio - goldenRatio) < 0.01;
    }

    $: isGolden = isGoldenRatio();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Golden Ratio Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate golden ratio proportions (φ ≈ 1.618) for design, art, and architecture. 
                The golden ratio creates naturally pleasing proportions.
            </p>

            <div class="space-y-6">
                <Select
                    label="What do you want to calculate?"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'find-golden'}
                    <div class="max-w-md">
                        <Input
                            type="number"
                            label="Total Length"
                            bind:value={inputValue}
                            placeholder="100"
                            min="0.01"
                            step="0.01"
                        />
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="First Segment"
                            bind:value={segment1}
                            placeholder="100"
                            min="0.01"
                            step="0.01"
                        />

                        <Input
                            type="number"
                            label="Second Segment"
                            bind:value={segment2}
                            placeholder="61.8"
                            min="0.01"
                            step="0.01"
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
                {#if calculationType === 'find-golden'}
                    <div class="text-5xl font-bold text-yellow-600 mb-4">
                        φ = {formatNumber(goldenRatio, 6)}
                    </div>
                    <div class="text-xl text-gray-600 mb-2">
                        Golden Ratio
                    </div>
                    <div class="text-lg text-gray-500">
                        Larger: {formatNumber(largerSegment, 3)} | Smaller: {formatNumber(smallerSegment, 3)}
                    </div>
                {:else}
                    <div class="text-6xl mb-4">
                        {isGolden ? '✅' : '❌'}
                    </div>
                    <div class="text-3xl font-bold {isGolden ? 'text-green-600' : 'text-red-600'} mb-2">
                        {isGolden ? 'Golden Ratio!' : 'Not Golden Ratio'}
                    </div>
                    <div class="text-lg text-gray-600">
                        Ratio: {formatNumber(Math.max(segment1, segment2) / Math.min(segment1, segment2), 6)}
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Golden Ratio Applications -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Golden Ratio in Design
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 class="font-semibold text-yellow-900 mb-2">🎨 Art & Design</h4>
                            <p class="text-yellow-800 text-sm">
                                Used in paintings, logos, and layouts for naturally pleasing proportions.
                            </p>
                        </div>

                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">🏛️ Architecture</h4>
                            <p class="text-blue-800 text-sm">
                                Found in the Parthenon, pyramids, and modern buildings for aesthetic appeal.
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">🌿 Nature</h4>
                            <p class="text-green-800 text-sm">
                                Appears in flower petals, shell spirals, and tree branches naturally.
                            </p>
                        </div>

                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">📱 UI Design</h4>
                            <p class="text-purple-800 text-sm">
                                Used in web layouts, mobile apps, and interface design for balance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>