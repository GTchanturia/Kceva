<script>
    /**
     * Coin Flip Component
     * Flip virtual coins for heads or tails decisions
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let numberOfFlips = 1;

    // Results
    let results = [];
    let headsCount = 0;
    let tailsCount = 0;
    let showResults = false;
    let isFlipping = false;

    // Flip coins
    async function flipCoins() {
        isFlipping = true;
        results = [];
        headsCount = 0;
        tailsCount = 0;

        // Add delay for animation effect
        for (let i = 0; i < numberOfFlips; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const result = Math.random() < 0.5 ? 'heads' : 'tails';
            results.push({
                flip: i + 1,
                result: result,
                emoji: result === 'heads' ? '👑' : '🪙'
            });

            if (result === 'heads') {
                headsCount++;
            } else {
                tailsCount++;
            }
        }

        isFlipping = false;
        showResults = true;
    }

    // Get statistics
    function getStatistics() {
        if (!showResults) return {};

        const headsPercentage = (headsCount / numberOfFlips) * 100;
        const tailsPercentage = (tailsCount / numberOfFlips) * 100;

        return {
            headsPercentage,
            tailsPercentage,
            isBalanced: Math.abs(headsPercentage - 50) < 10 // Within 10% of 50/50
        };
    }

    $: statistics = getStatistics();

    // Quick flip presets
    const presets = [
        { name: 'Single Flip', flips: 1 },
        { name: 'Best of 3', flips: 3 },
        { name: 'Best of 5', flips: 5 },
        { name: '10 Flips', flips: 10 },
        { name: '50 Flips', flips: 50 },
        { name: '100 Flips', flips: 100 }
    ];
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Virtual Coin Flip
            </h2>
            <p class="text-gray-600 mb-6">
                Flip virtual coins for quick decisions, games, or probability experiments. 
                Perfect for settling disputes or making random choices.
            </p>

            <div class="space-y-6">
                <div class="max-w-md">
                    <Input
                        type="number"
                        label="Number of Flips"
                        bind:value={numberOfFlips}
                        placeholder="1"
                        min="1"
                        max="1000"
                        step="1"
                    />
                </div>

                <!-- Preset Buttons -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Quick Options</label>
                    <div class="flex flex-wrap gap-2">
                        {#each presets as preset}
                            <Button 
                                variant="outline" 
                                size="sm" 
                                on:click={() => numberOfFlips = preset.flips}
                            >
                                {preset.name}
                            </Button>
                        {/each}
                    </div>
                </div>

                <!-- Flip Button -->
                <div class="text-center">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        on:click={flipCoins}
                        disabled={isFlipping}
                    >
                        {isFlipping ? '🔄 Flipping...' : `🪙 Flip ${numberOfFlips} Coin${numberOfFlips !== 1 ? 's' : ''}`}
                    </Button>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Summary Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-4xl mb-2">👑</div>
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {headsCount}
                    </div>
                    <div class="text-gray-600">Heads</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {formatNumber(statistics.headsPercentage, 1)}%
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-4xl mb-2">🪙</div>
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {tailsCount}
                    </div>
                    <div class="text-gray-600">Tails</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {formatNumber(statistics.tailsPercentage, 1)}%
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {numberOfFlips}
                    </div>
                    <div class="text-gray-600">Total Flips</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {statistics.isBalanced ? 'Balanced' : 'Unbalanced'}
                    </div>
                </div>
            </Card>
        </div>

        <!-- Individual Results -->
        {#if numberOfFlips <= 50}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">
                        Flip Results
                    </h3>

                    <div class="grid grid-cols-5 md:grid-cols-10 gap-4">
                        {#each results as result}
                            <div class="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <div class="text-2xl mb-1">{result.emoji}</div>
                                <div class="text-sm font-medium {result.result === 'heads' ? 'text-blue-600' : 'text-orange-600'}">
                                    {result.result}
                                </div>
                                <div class="text-xs text-gray-500">#{result.flip}</div>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Probability Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Probability Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">🎯 Fair Coin</h4>
                        <p class="text-blue-800 text-sm">
                            Each flip has exactly 50% chance of heads and 50% chance of tails. 
                            Previous flips don't affect future results.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">📊 Law of Large Numbers</h4>
                        <p class="text-green-800 text-sm">
                            With more flips, the ratio of heads to tails approaches 50/50. 
                            Small samples may show significant deviation from this ratio.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>