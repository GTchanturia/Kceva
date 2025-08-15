<script>
    /**
     * Split Bill Calculator Component
     * Split restaurant bills and expenses among multiple people
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let totalBill = 120;
    let tipPercentage = 18;
    let numberOfPeople = 4;
    let customSplits = [];
    let splitMethod = 'equal';

    // Results
    let tipAmount = 0;
    let totalWithTip = 0;
    let perPersonAmount = 0;
    let showResults = false;

    // Split method options
    const splitMethods = [
        { value: 'equal', label: 'Split Equally' },
        { value: 'custom', label: 'Custom Amounts' }
    ];

    // Initialize custom splits
    function initializeCustomSplits() {
        customSplits = Array.from({ length: numberOfPeople }, (_, i) => ({
            name: `Person ${i + 1}`,
            amount: totalBill / numberOfPeople
        }));
    }

    // Calculate bill split
    function calculateSplit() {
        if (totalBill <= 0 || numberOfPeople <= 0) {
            showResults = false;
            return;
        }

        tipAmount = (totalBill * tipPercentage) / 100;
        totalWithTip = totalBill + tipAmount;

        if (splitMethod === 'equal') {
            perPersonAmount = totalWithTip / numberOfPeople;
        } else {
            // Custom split - calculate proportional tip
            const customTotal = customSplits.reduce((sum, person) => sum + (person.amount || 0), 0);
            customSplits = customSplits.map(person => ({
                ...person,
                tipShare: (person.amount / customTotal) * tipAmount,
                total: person.amount + ((person.amount / customTotal) * tipAmount)
            }));
        }

        showResults = true;
    }

    // Add person to custom split
    function addPerson() {
        numberOfPeople++;
        customSplits.push({
            name: `Person ${numberOfPeople}`,
            amount: 0
        });
    }

    // Remove person from custom split
    function removePerson(index) {
        if (numberOfPeople > 1) {
            numberOfPeople--;
            customSplits = customSplits.filter((_, i) => i !== index);
        }
    }

    // Auto-calculate when inputs change
    $: if (totalBill && numberOfPeople && tipPercentage >= 0) {
        if (splitMethod === 'custom' && customSplits.length !== numberOfPeople) {
            initializeCustomSplits();
        }
        calculateSplit();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Split Bill Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Split restaurant bills and expenses fairly among friends. 
                Choose between equal splits or custom amounts with automatic tip calculation.
            </p>

            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                        type="number"
                        label="Total Bill Amount"
                        bind:value={totalBill}
                        placeholder="120.00"
                        min="0"
                        step="0.01"
                    />

                    <Input
                        type="number"
                        label="Tip Percentage (%)"
                        bind:value={tipPercentage}
                        placeholder="18"
                        min="0"
                        max="50"
                        step="0.1"
                    />

                    <Input
                        type="number"
                        label="Number of People"
                        bind:value={numberOfPeople}
                        placeholder="4"
                        min="1"
                        max="20"
                        step="1"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Split Method
                        </label>
                        <div class="space-y-2">
                            {#each splitMethods as method}
                                <label class="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        bind:group={splitMethod}
                                        value={method.value}
                                        class="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span class="text-gray-700">{method.label}</span>
                                </label>
                            {/each}
                        </div>
                    </div>
                </div>

                {#if splitMethod === 'custom'}
                    <Card>
                        <div class="p-4 bg-gray-50">
                            <h4 class="font-semibold text-gray-900 mb-4">Custom Split Amounts</h4>
                            <div class="space-y-3">
                                {#each customSplits as person, index}
                                    <div class="flex items-center space-x-3">
                                        <Input
                                            type="text"
                                            label="Name"
                                            bind:value={person.name}
                                            placeholder="Person {index + 1}"
                                            className="flex-1"
                                        />
                                        <Input
                                            type="number"
                                            label="Amount"
                                            bind:value={person.amount}
                                            placeholder="30.00"
                                            min="0"
                                            step="0.01"
                                            className="flex-1"
                                        />
                                        {#if numberOfPeople > 1}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                on:click={() => removePerson(index)}
                                            >
                                                Remove
                                            </Button>
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                            <div class="mt-4">
                                <Button variant="outline" size="sm" on:click={addPerson}>
                                    + Add Person
                                </Button>
                            </div>
                        </div>
                    </Card>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Bill Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Bill Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600 mb-1">
                            {formatCurrency(totalBill)}
                        </div>
                        <div class="text-sm text-gray-700">Subtotal</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-2xl font-bold text-green-600 mb-1">
                            {formatCurrency(tipAmount)}
                        </div>
                        <div class="text-sm text-gray-700">Tip ({tipPercentage}%)</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600 mb-1">
                            {formatCurrency(totalWithTip)}
                        </div>
                        <div class="text-sm text-gray-700">Total</div>
                    </div>

                    <div class="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div class="text-2xl font-bold text-orange-600 mb-1">
                            {numberOfPeople}
                        </div>
                        <div class="text-sm text-gray-700">People</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Split Results -->
        {#if splitMethod === 'equal'}
            <Card>
                <div class="p-6 text-center">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Equal Split
                    </h3>
                    <div class="text-4xl font-bold text-green-600 mb-2">
                        {formatCurrency(perPersonAmount)}
                    </div>
                    <div class="text-lg text-gray-600">
                        Per Person (including tip)
                    </div>
                </div>
            </Card>
        {:else}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Custom Split Breakdown
                    </h3>

                    <div class="space-y-3">
                        {#each customSplits as person}
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span class="font-medium text-gray-900">{person.name}</span>
                                <div class="text-right">
                                    <div class="text-lg font-bold text-green-600">
                                        {formatCurrency(person.total || 0)}
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        Bill: {formatCurrency(person.amount || 0)} + Tip: {formatCurrency(person.tipShare || 0)}
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Bill Splitting Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💡 Fair Splitting
                        </h4>
                        <p class="text-blue-800 text-sm">
                            For equal splits, everyone pays the same regardless of what they ordered. 
                            For custom splits, each person pays for their items plus proportional tip.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🧾 Keep It Simple
                        </h4>
                        <p class="text-green-800 text-sm">
                            Round amounts to the nearest dollar for easier payment. 
                            Use payment apps for quick and easy money transfers.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>