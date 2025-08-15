<script>
    /**
     * Ovulation Calculator Component
     * Calculate ovulation and fertile window dates
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let lastPeriodDate = '';
    let cycleLength = 28;
    let periodLength = 5;

    // Results
    let ovulationDate = null;
    let fertileWindow = { start: null, end: null };
    let nextPeriod = null;
    let showResults = false;

    // Calculate ovulation and fertile window
    function calculateOvulation() {
        if (!lastPeriodDate || cycleLength < 21 || cycleLength > 35) {
            showResults = false;
            return;
        }

        const lastPeriod = new Date(lastPeriodDate);
        
        // Ovulation typically occurs 14 days before next period
        ovulationDate = new Date(lastPeriod.getTime() + ((cycleLength - 14) * 24 * 60 * 60 * 1000));
        
        // Fertile window: 5 days before ovulation to 1 day after
        fertileWindow.start = new Date(ovulationDate.getTime() - (5 * 24 * 60 * 60 * 1000));
        fertileWindow.end = new Date(ovulationDate.getTime() + (1 * 24 * 60 * 60 * 1000));
        
        // Next period date
        nextPeriod = new Date(lastPeriod.getTime() + (cycleLength * 24 * 60 * 60 * 1000));

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (lastPeriodDate && cycleLength) {
        calculateOvulation();
    }

    // Format date for display
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    }

    // Check if date is today
    function isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // Get days until ovulation
    function getDaysUntilOvulation() {
        if (!ovulationDate) return 0;
        const today = new Date();
        const timeDiff = ovulationDate.getTime() - today.getTime();
        return Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    }

    $: daysUntilOvulation = getDaysUntilOvulation();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Ovulation Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your ovulation date and fertile window to help with family planning. 
                Track your menstrual cycle and identify the best days for conception.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    type="date"
                    label="Last Period Start Date"
                    bind:value={lastPeriodDate}
                    required
                />

                <Input
                    type="number"
                    label="Cycle Length (days)"
                    bind:value={cycleLength}
                    placeholder="28"
                    min="21"
                    max="35"
                    step="1"
                />

                <Input
                    type="number"
                    label="Period Length (days)"
                    bind:value={periodLength}
                    placeholder="5"
                    min="3"
                    max="8"
                    step="1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && ovulationDate}
        <!-- Ovulation Date -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl mb-4">🥚</div>
                <div class="text-3xl font-bold text-pink-600 mb-2">
                    {formatDate(ovulationDate)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Estimated Ovulation Date
                </div>
                <div class="text-lg text-gray-500">
                    {daysUntilOvulation > 0 ? `${daysUntilOvulation} days from now` : 
                     daysUntilOvulation === 0 ? 'Today!' : 
                     `${Math.abs(daysUntilOvulation)} days ago`}
                </div>
            </div>
        </Card>

        <!-- Fertile Window -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">
                    Fertile Window
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-2xl font-bold text-green-600 mb-2">
                            {formatDate(fertileWindow.start)}
                        </div>
                        <div class="text-gray-700">Fertile Window Starts</div>
                        <div class="text-sm text-green-600 mt-1">Highest chance of conception begins</div>
                    </div>

                    <div class="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div class="text-2xl font-bold text-red-600 mb-2">
                            {formatDate(fertileWindow.end)}
                        </div>
                        <div class="text-gray-700">Fertile Window Ends</div>
                        <div class="text-sm text-red-600 mt-1">Conception chance decreases</div>
                    </div>
                </div>

                <div class="text-center mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <h4 class="font-semibold text-pink-900 mb-2">💕 Peak Fertility Days</h4>
                    <p class="text-pink-800 text-sm">
                        The 2-3 days leading up to and including ovulation day offer the highest chance of conception.
                    </p>
                </div>
            </div>
        </Card>

        <!-- Cycle Overview -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Menstrual Cycle Overview
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div class="text-lg font-bold text-red-600 mb-1">
                            {formatDate(new Date(lastPeriodDate))}
                        </div>
                        <div class="text-sm text-gray-700">Last Period</div>
                        <div class="text-xs text-red-600">{periodLength} days</div>
                    </div>

                    <div class="text-center p-4 bg-pink-50 border border-pink-200 rounded-lg">
                        <div class="text-lg font-bold text-pink-600 mb-1">
                            {formatDate(ovulationDate)}
                        </div>
                        <div class="text-sm text-gray-700">Ovulation</div>
                        <div class="text-xs text-pink-600">Day {cycleLength - 14} of cycle</div>
                    </div>

                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-lg font-bold text-blue-600 mb-1">
                            {formatDate(nextPeriod)}
                        </div>
                        <div class="text-sm text-gray-700">Next Period</div>
                        <div class="text-xs text-blue-600">Day 1 of next cycle</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Important Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📊 Accuracy Note
                        </h4>
                        <p class="text-blue-800 text-sm">
                            These calculations are estimates based on average cycles. 
                            Actual ovulation can vary by several days each month.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Tracking Tips
                        </h4>
                        <p class="text-green-800 text-sm">
                            For more accurate tracking, monitor basal body temperature, 
                            cervical mucus changes, and use ovulation predictor kits.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>