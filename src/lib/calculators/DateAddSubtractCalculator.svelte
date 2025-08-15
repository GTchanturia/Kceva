<script>
    /**
     * Date Add/Subtract Calculator Component
     * Add or subtract days, months, years from a date
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let startDate = '';
    let operation = 'add';
    let amount = 30;
    let unit = 'days';

    // Results
    let resultDate = null;
    let showResults = false;

    // Operation options
    const operations = [
        { value: 'add', label: 'Add' },
        { value: 'subtract', label: 'Subtract' }
    ];

    // Unit options
    const units = [
        { value: 'days', label: 'Days' },
        { value: 'weeks', label: 'Weeks' },
        { value: 'months', label: 'Months' },
        { value: 'years', label: 'Years' }
    ];

    // Calculate new date
    function calculateNewDate() {
        if (!startDate || amount <= 0) {
            showResults = false;
            return;
        }

        const date = new Date(startDate);
        if (isNaN(date.getTime())) {
            showResults = false;
            return;
        }

        const multiplier = operation === 'add' ? 1 : -1;
        const adjustedAmount = amount * multiplier;

        switch (unit) {
            case 'days':
                resultDate = new Date(date.getTime() + (adjustedAmount * 24 * 60 * 60 * 1000));
                break;
            case 'weeks':
                resultDate = new Date(date.getTime() + (adjustedAmount * 7 * 24 * 60 * 60 * 1000));
                break;
            case 'months':
                resultDate = new Date(date);
                resultDate.setMonth(date.getMonth() + adjustedAmount);
                break;
            case 'years':
                resultDate = new Date(date);
                resultDate.setFullYear(date.getFullYear() + adjustedAmount);
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (startDate && amount && operation && unit) {
        calculateNewDate();
    }

    // Format date for display
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Set today's date as default
    $: if (!startDate) {
        const today = new Date();
        startDate = today.toISOString().split('T')[0];
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Date Add/Subtract Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Add or subtract days, weeks, months, or years from any date. 
                Perfect for planning events, calculating deadlines, or finding future/past dates.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="date"
                    label="Start Date"
                    bind:value={startDate}
                    required
                />

                <div class="grid grid-cols-3 gap-2">
                    <Select
                        label="Operation"
                        bind:value={operation}
                        options={operations}
                    />

                    <Input
                        type="number"
                        label="Amount"
                        bind:value={amount}
                        placeholder="30"
                        min="1"
                        step="1"
                    />

                    <Select
                        label="Unit"
                        bind:value={unit}
                        options={units}
                    />
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && resultDate}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl mb-4">📅</div>
                <div class="text-3xl font-bold text-blue-600 mb-2">
                    {formatDate(resultDate)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Result Date
                </div>
                <div class="text-lg text-gray-500">
                    {operation === 'add' ? 'Added' : 'Subtracted'} {amount} {unit}
                </div>
            </div>
        </Card>

        <!-- Calculation Summary -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Calculation Summary
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Start Date:</span>
                            <span class="font-semibold">{formatDate(new Date(startDate))}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Operation:</span>
                            <span class="font-semibold">{operation === 'add' ? 'Add' : 'Subtract'} {amount} {unit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Result Date:</span>
                            <span class="font-semibold text-blue-600">{formatDate(resultDate)}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Day of Week:</span>
                            <span class="font-semibold">{resultDate.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Days from Today:</span>
                            <span class="font-semibold">
                                {Math.ceil((resultDate.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))} days
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">ISO Format:</span>
                            <span class="font-semibold font-mono">{resultDate.toISOString().split('T')[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>