<script>
    /**
     * Dice Roller Component
     * Roll virtual dice for games and decision making
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let numberOfDice = 2;
    let diceType = 6;
    let modifier = 0;

    // Results
    let rolls = [];
    let total = 0;
    let totalWithModifier = 0;
    let showResults = false;

    // Dice type options
    const diceTypes = [
        { value: 4, label: 'D4 (4-sided)' },
        { value: 6, label: 'D6 (6-sided)' },
        { value: 8, label: 'D8 (8-sided)' },
        { value: 10, label: 'D10 (10-sided)' },
        { value: 12, label: 'D12 (12-sided)' },
        { value: 20, label: 'D20 (20-sided)' },
        { value: 100, label: 'D100 (100-sided)' }
    ];

    // Roll dice
    function rollDice() {
        rolls = [];
        total = 0;

        for (let i = 0; i < numberOfDice; i++) {
            const roll = Math.floor(Math.random() * diceType) + 1;
            rolls.push(roll);
            total += roll;
        }

        totalWithModifier = total + modifier;
        showResults = true;
    }

    // Get dice emoji
    function getDiceEmoji(value, sides) {
        if (sides === 6) {
            const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
            return diceEmojis[value - 1] || '🎲';
        }
        return '🎲';
    }

    // Get roll statistics
    function getRollStatistics() {
        if (!showResults) return {};

        const minPossible = numberOfDice + modifier;
        const maxPossible = (numberOfDice * diceType) + modifier;
        const average = ((numberOfDice * (diceType + 1)) / 2) + modifier;

        return {
            minPossible,
            maxPossible,
            average,
            isMinRoll: totalWithModifier === minPossible,
            isMaxRoll: totalWithModifier === maxPossible
        };
    }

    $: rollStats = getRollStatistics();

    // Preset dice combinations
    const presets = [
        { name: 'Single D6', dice: 1, type: 6, mod: 0 },
        { name: 'Two D6', dice: 2, type: 6, mod: 0 },
        { name: 'Three D6', dice: 3, type: 6, mod: 0 },
        { name: 'D20 Attack', dice: 1, type: 20, mod: 5 },
        { name: '2D10', dice: 2, type: 10, mod: 0 },
        { name: '4D6 Drop Lowest', dice: 4, type: 6, mod: 0 }
    ];

    function applyPreset(preset) {
        numberOfDice = preset.dice;
        diceType = preset.type;
        modifier = preset.mod;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Virtual Dice Roller
            </h2>
            <p class="text-gray-600 mb-6">
                Roll virtual dice for tabletop games, decision making, or random number generation. 
                Supports multiple dice types and modifiers.
            </p>

            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                        type="number"
                        label="Number of Dice"
                        bind:value={numberOfDice}
                        placeholder="2"
                        min="1"
                        max="20"
                        step="1"
                    />

                    <Select
                        label="Dice Type"
                        bind:value={diceType}
                        options={diceTypes}
                    />

                    <Input
                        type="number"
                        label="Modifier"
                        bind:value={modifier}
                        placeholder="0"
                        min="-100"
                        max="100"
                        step="1"
                    />
                </div>

                <!-- Preset Buttons -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Quick Presets</label>
                    <div class="flex flex-wrap gap-2">
                        {#each presets as preset}
                            <Button 
                                variant="outline" 
                                size="sm" 
                                on:click={() => applyPreset(preset)}
                            >
                                {preset.name}
                            </Button>
                        {/each}
                    </div>
                </div>

                <!-- Roll Button -->
                <div class="text-center">
                    <Button variant="primary" size="lg" on:click={rollDice}>
                        🎲 Roll {numberOfDice}D{diceType}{modifier !== 0 ? (modifier > 0 ? '+' + modifier : modifier) : ''}
                    </Button>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-6xl font-bold text-blue-600 mb-4">
                    {totalWithModifier}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Total Result
                </div>
                {#if modifier !== 0}
                    <div class="text-lg text-gray-500">
                        ({total} + {modifier} modifier)
                    </div>
                {/if}
                
                {#if rollStats.isMinRoll}
                    <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 mt-2">
                        Minimum Possible Roll!
                    </div>
                {:else if rollStats.isMaxRoll}
                    <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-2">
                        Maximum Possible Roll!
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Individual Dice Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">
                    Individual Dice Results
                </h3>

                <div class="flex justify-center flex-wrap gap-4 mb-6">
                    {#each rolls as roll, index}
                        <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="text-4xl mb-2">
                                {getDiceEmoji(roll, diceType)}
                            </div>
                            <div class="text-2xl font-bold text-blue-600">
                                {roll}
                            </div>
                            <div class="text-sm text-gray-600">
                                Die {index + 1}
                            </div>
                        </div>
                    {/each}
                </div>

                <div class="text-center text-gray-600">
                    Sum of dice: {total}
                    {#if modifier !== 0}
                        + Modifier: {modifier} = <strong>{totalWithModifier}</strong>
                    {/if}
                </div>
            </div>
        </Card>

        <!-- Roll Statistics -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Roll Statistics
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-lg font-bold text-gray-900 mb-1">
                            {rollStats.minPossible}
                        </div>
                        <div class="text-sm text-gray-600">Minimum Possible</div>
                    </div>

                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-lg font-bold text-gray-900 mb-1">
                            {rollStats.maxPossible}
                        </div>
                        <div class="text-sm text-gray-600">Maximum Possible</div>
                    </div>

                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-lg font-bold text-gray-900 mb-1">
                            {formatNumber(rollStats.average, 1)}
                        </div>
                        <div class="text-sm text-gray-600">Average Expected</div>
                    </div>

                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-lg font-bold text-gray-900 mb-1">
                            {numberOfDice}D{diceType}
                        </div>
                        <div class="text-sm text-gray-600">Dice Notation</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Dice Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Dice Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">🎲 Dice Notation</h4>
                        <p class="text-blue-800 text-sm">
                            Standard notation: XdY+Z means "roll X dice with Y sides each, add Z modifier". 
                            For example: 2d6+3 means roll two 6-sided dice and add 3.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">🎯 Probability</h4>
                        <p class="text-green-800 text-sm">
                            Each die roll is independent and random. Multiple dice create a bell curve 
                            distribution, with results near the average being more likely.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>