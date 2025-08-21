<script>
    /**
     * Pregnancy Due Date Calculator Component
     * Calculate pregnancy due date and important milestones
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let lastMenstrualPeriod = '';
    let cycleLength = 28;
    let calculationMethod = 'lmp';

    // Alternative method inputs
    let conceptionDate = '';
    let ultrasoundDate = '';
    let ultrasoundWeeks = 12;
    let ultrasoundDays = 0;

    // Results
    let dueDate = null;
    let currentWeek = 0;
    let currentDay = 0;
    let daysRemaining = 0;
    let trimester = 1;
    let milestones = [];
    let showResults = false;

    // Calculation methods
    const methods = [
        { value: 'lmp', label: 'Last Menstrual Period (LMP)' },
        { value: 'conception', label: 'Conception Date' },
        { value: 'ultrasound', label: 'Ultrasound Dating' }
    ];

    // Calculate due date and pregnancy details
    function calculateDueDate() {
        let pregnancyStart;

        switch (calculationMethod) {
            case 'lmp':
                if (!lastMenstrualPeriod) return;
                pregnancyStart = new Date(lastMenstrualPeriod);
                // Naegele's rule: LMP + 280 days
                dueDate = new Date(pregnancyStart.getTime() + (280 * 24 * 60 * 60 * 1000));
                break;

            case 'conception':
                if (!conceptionDate) return;
                pregnancyStart = new Date(conceptionDate);
                // Conception + 266 days
                dueDate = new Date(pregnancyStart.getTime() + (266 * 24 * 60 * 60 * 1000));
                // Adjust pregnancy start to LMP equivalent (14 days before conception)
                pregnancyStart = new Date(pregnancyStart.getTime() - (14 * 24 * 60 * 60 * 1000));
                break;

            case 'ultrasound':
                if (!ultrasoundDate || ultrasoundWeeks <= 0) return;
                const ultrasound = new Date(ultrasoundDate);
                const totalDaysAtUltrasound = (ultrasoundWeeks * 7) + ultrasoundDays;
                pregnancyStart = new Date(ultrasound.getTime() - (totalDaysAtUltrasound * 24 * 60 * 60 * 1000));
                dueDate = new Date(pregnancyStart.getTime() + (280 * 24 * 60 * 60 * 1000));
                break;

            default:
                return;
        }

        // Calculate current pregnancy progress
        const today = new Date();
        const pregnancyDuration = today.getTime() - pregnancyStart.getTime();
        const totalDays = Math.floor(pregnancyDuration / (24 * 60 * 60 * 1000));
        
        currentWeek = Math.floor(totalDays / 7);
        currentDay = totalDays % 7;
        
        // Calculate days remaining
        daysRemaining = Math.ceil((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
        
        // Determine trimester
        if (currentWeek < 13) trimester = 1;
        else if (currentWeek < 27) trimester = 2;
        else trimester = 3;

        // Generate milestones
        generateMilestones(pregnancyStart);

        showResults = true;
    }

    function generateMilestones(startDate) {
        milestones = [
            { week: 4, description: 'Missed period, pregnancy test positive', date: addWeeks(startDate, 4) },
            { week: 6, description: 'Heart begins to beat', date: addWeeks(startDate, 6) },
            { week: 8, description: 'First prenatal appointment', date: addWeeks(startDate, 8) },
            { week: 12, description: 'End of first trimester', date: addWeeks(startDate, 12) },
            { week: 16, description: 'Gender may be determined', date: addWeeks(startDate, 16) },
            { week: 20, description: 'Anatomy scan, halfway point', date: addWeeks(startDate, 20) },
            { week: 24, description: 'Viability milestone', date: addWeeks(startDate, 24) },
            { week: 28, description: 'Third trimester begins', date: addWeeks(startDate, 28) },
            { week: 32, description: 'Baby\'s bones hardening', date: addWeeks(startDate, 32) },
            { week: 36, description: 'Baby considered full-term soon', date: addWeeks(startDate, 36) },
            { week: 37, description: 'Full-term pregnancy', date: addWeeks(startDate, 37) },
            { week: 40, description: 'Due date!', date: addWeeks(startDate, 40) }
        ];
    }

    function addWeeks(date, weeks) {
        return new Date(date.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));
    }

    // Auto-calculate when inputs change
    $: if (calculationMethod) {
        calculateDueDate();
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
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Pregnancy Due Date Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your pregnancy due date and track important milestones. 
                Choose from multiple calculation methods for the most accurate estimate.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Method"
                    bind:value={calculationMethod}
                    options={methods}
                />

                {#if calculationMethod === 'lmp'}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="date"
                            label="Last Menstrual Period (LMP)"
                            bind:value={lastMenstrualPeriod}
                            required
                        />

                        <Input
                            type="number"
                            label="Average Cycle Length (days)"
                            bind:value={cycleLength}
                            placeholder="28"
                            min="21"
                            max="35"
                            step="1"
                        />
                    </div>
                {:else if calculationMethod === 'conception'}
                    <div class="max-w-md">
                        <Input
                            type="date"
                            label="Conception Date"
                            bind:value={conceptionDate}
                            required
                        />
                    </div>
                {:else if calculationMethod === 'ultrasound'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="date"
                            label="Ultrasound Date"
                            bind:value={ultrasoundDate}
                            required
                        />

                        <Input
                            type="number"
                            label="Gestational Age (weeks)"
                            bind:value={ultrasoundWeeks}
                            placeholder="12"
                            min="1"
                            max="42"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Additional Days"
                            bind:value={ultrasoundDays}
                            placeholder="0"
                            min="0"
                            max="6"
                            step="1"
                        />
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && dueDate}
        <!-- Due Date Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl mb-4">👶</div>
                <div class="text-3xl font-bold text-pink-600 mb-2">
                    {formatDate(dueDate)}
                </div>
                <div class="text-xl text-gray-600 mb-4">
                    Estimated Due Date
                </div>
                <div class="text-lg text-gray-500">
                    {daysRemaining > 0 ? `${daysRemaining} days to go` : daysRemaining === 0 ? 'Due today!' : `${Math.abs(daysRemaining)} days overdue`}
                </div>
            </div>
        </Card>

        <!-- Current Progress -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {currentWeek}w {currentDay}d
                    </div>
                    <div class="text-gray-600">Current Gestation</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {trimester}
                    </div>
                    <div class="text-gray-600">Trimester</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber((currentWeek / 40) * 100, 1)}%
                    </div>
                    <div class="text-gray-600">Complete</div>
                </div>
            </Card>
        </div>

        <!-- Pregnancy Milestones -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Pregnancy Milestones
                </h3>

                <div class="space-y-3">
                    {#each milestones as milestone}
                        {@const isPast = currentWeek >= milestone.week}
                        <div class="flex items-center justify-between p-3 rounded-lg {isPast ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}">
                            <div class="flex items-center space-x-3">
                                <span class="text-lg">{isPast ? '✅' : '⏳'}</span>
                                <div>
                                    <span class="font-medium {isPast ? 'text-green-900' : 'text-gray-700'}">
                                        Week {milestone.week}: {milestone.description}
                                    </span>
                                </div>
                            </div>
                            <span class="text-sm text-gray-500">
                                {formatDate(milestone.date)}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Important Notes -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📅 Due Date Accuracy
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Only about 5% of babies are born on their exact due date. 
                            Most babies are born within 2 weeks before or after the due date.
                        </p>
                    </div>

                    <div class="bg-pink-50 border border-pink-200 rounded-lg p-4">
                        <h4 class="font-semibold text-pink-900 mb-2">
                            👩‍⚕️ Medical Care
                        </h4>
                        <p class="text-pink-800 text-sm">
                            This calculator provides estimates only. Always consult with your healthcare provider 
                            for accurate dating and prenatal care throughout your pregnancy.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>