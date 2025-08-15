<script>
    /**
     * Work Days Calculator Component
     * Calculate working days between dates excluding weekends and holidays
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let startDate = '';
    let endDate = '';
    let excludeWeekends = true;
    let excludeHolidays = false;

    // Results
    let totalDays = 0;
    let workDays = 0;
    let weekends = 0;
    let holidays = 0;
    let showResults = false;

    // Common holidays (US)
    const commonHolidays = [
        '2024-01-01', // New Year's Day
        '2024-07-04', // Independence Day
        '2024-12-25', // Christmas Day
        '2024-11-28', // Thanksgiving (example)
    ];

    // Calculate work days
    function calculateWorkDays() {
        if (!startDate || !endDate) {
            showResults = false;
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            showResults = false;
            return;
        }

        totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        workDays = 0;
        weekends = 0;
        holidays = 0;

        const current = new Date(start);
        while (current <= end) {
            const dayOfWeek = current.getDay();
            const dateString = current.toISOString().split('T')[0];
            
            let isWorkDay = true;

            // Check if weekend
            if (excludeWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) {
                weekends++;
                isWorkDay = false;
            }

            // Check if holiday
            if (excludeHolidays && commonHolidays.includes(dateString)) {
                holidays++;
                isWorkDay = false;
            }

            if (isWorkDay) {
                workDays++;
            }

            current.setDate(current.getDate() + 1);
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (startDate && endDate) {
        calculateWorkDays();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Work Days Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate working days between two dates, excluding weekends and holidays. 
                Perfect for project planning and business scheduling.
            </p>

            <div class="space-y-6">
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

                <div class="space-y-4">
                    <label class="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            bind:checked={excludeWeekends}
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span class="text-gray-700">Exclude Weekends (Saturday & Sunday)</span>
                    </label>

                    <label class="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            bind:checked={excludeHolidays}
                            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span class="text-gray-700">Exclude Common Holidays</span>
                    </label>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {workDays}
                    </div>
                    <div class="text-gray-600">Work Days</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-gray-600 mb-2">
                        {totalDays}
                    </div>
                    <div class="text-gray-600">Total Days</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {weekends}
                    </div>
                    <div class="text-gray-600">Weekend Days</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">
                        {holidays}
                    </div>
                    <div class="text-gray-600">Holidays</div>
                </div>
            </Card>
        </div>
    {/if}
</div>