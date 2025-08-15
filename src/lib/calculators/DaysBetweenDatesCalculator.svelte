<script>
    /**
     * Days Between Dates Calculator Component
     * Calculate the difference between two dates
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let startDate = '';
    let endDate = '';

    // Results
    let daysDifference = 0;
    let weeksDifference = 0;
    let monthsDifference = 0;
    let yearsDifference = 0;
    let showResults = false;

    // Calculate difference between dates
    function calculateDateDifference() {
        if (!startDate || !endDate) {
            showResults = false;
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            showResults = false;
            return;
        }

        const timeDifference = Math.abs(end.getTime() - start.getTime());
        daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        weeksDifference = daysDifference / 7;
        monthsDifference = daysDifference / 30.44; // Average month length
        yearsDifference = daysDifference / 365.25; // Account for leap years

        showResults = true;
    }

    // Auto-calculate when dates change
    $: if (startDate && endDate) {
        calculateDateDifference();
    }

    // Set today's date as default
    $: if (!endDate) {
        const today = new Date();
        endDate = today.toISOString().split('T')[0];
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Days Between Dates Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate the exact number of days, weeks, months, and years between two dates. 
                Perfect for planning events, calculating age, or measuring time periods.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="date"
                    label="Start Date"
                    bind:value={startDate}
                    required
                />

                <Input
                    type="date"
                    label="End Date"
                    bind:value={endDate}
                    required
                />
            </div>
        </div>
    </Card>

    {#if showResults}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(daysDifference, 0)}
                    </div>
                    <div class="text-gray-600">Days</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(weeksDifference, 1)}
                    </div>
                    <div class="text-gray-600">Weeks</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(monthsDifference, 1)}
                    </div>
                    <div class="text-gray-600">Months</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatNumber(yearsDifference, 2)}
                    </div>
                    <div class="text-gray-600">Years</div>
                </div>
            </Card>
        </div>

        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Date Difference Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Start Date:</span>
                            <span class="font-semibold">{new Date(startDate).toLocaleDateString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">End Date:</span>
                            <span class="font-semibold">{new Date(endDate).toLocaleDateString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Days:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(daysDifference, 0)} days</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Hours:</span>
                            <span class="font-semibold">{formatNumber(daysDifference * 24, 0)} hours</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Minutes:</span>
                            <span class="font-semibold">{formatNumber(daysDifference * 24 * 60, 0)} minutes</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Seconds:</span>
                            <span class="font-semibold">{formatNumber(daysDifference * 24 * 60 * 60, 0)} seconds</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>