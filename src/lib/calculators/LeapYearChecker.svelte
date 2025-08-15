<script>
    /**
     * Leap Year Checker Component
     * Check if a year is a leap year and find leap years
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let year = new Date().getFullYear();
    let calculationType = 'check';
    let rangeStart = 2020;
    let rangeEnd = 2030;

    // Results
    let isLeapYear = false;
    let leapYears = [];
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'check', label: 'Check Single Year' },
        { value: 'range', label: 'Find Leap Years in Range' }
    ];

    // Check if year is leap year
    function checkLeapYear(y) {
        return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
    }

    // Calculate based on type
    function calculate() {
        if (calculationType === 'check') {
            if (year < 1 || year > 9999) {
                showResults = false;
                return;
            }
            isLeapYear = checkLeapYear(year);
        } else {
            if (rangeStart < 1 || rangeEnd < rangeStart || rangeEnd > 9999) {
                showResults = false;
                return;
            }
            leapYears = [];
            for (let y = rangeStart; y <= rangeEnd; y++) {
                if (checkLeapYear(y)) {
                    leapYears.push(y);
                }
            }
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType) {
        calculate();
    }

    // Get next leap year
    function getNextLeapYear(currentYear) {
        let next = currentYear + 1;
        while (!checkLeapYear(next) && next < currentYear + 10) {
            next++;
        }
        return next;
    }

    // Get previous leap year
    function getPreviousLeapYear(currentYear) {
        let prev = currentYear - 1;
        while (!checkLeapYear(prev) && prev > currentYear - 10) {
            prev--;
        }
        return prev;
    }

    $: nextLeapYear = calculationType === 'check' ? getNextLeapYear(year) : null;
    $: previousLeapYear = calculationType === 'check' ? getPreviousLeapYear(year) : null;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Leap Year Checker
            </h2>
            <p class="text-gray-600 mb-6">
                Check if a year is a leap year or find all leap years in a range. 
                Leap years have 366 days instead of 365, with February having 29 days.
            </p>

            <div class="space-y-6">
                <Select
                    label="What do you want to do?"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'check'}
                    <div class="max-w-md">
                        <Input
                            type="number"
                            label="Year to Check"
                            bind:value={year}
                            placeholder={new Date().getFullYear()}
                            min="1"
                            max="9999"
                            step="1"
                        />
                    </div>
                {:else}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Start Year"
                            bind:value={rangeStart}
                            placeholder="2020"
                            min="1"
                            max="9998"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="End Year"
                            bind:value={rangeEnd}
                            placeholder="2030"
                            min="2"
                            max="9999"
                            step="1"
                        />
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        {#if calculationType === 'check'}
            <!-- Leap Year Check Result -->
            <Card>
                <div class="p-6 text-center">
                    <div class="text-6xl mb-4">
                        {isLeapYear ? '✅' : '❌'}
                    </div>
                    <div class="text-3xl font-bold {isLeapYear ? 'text-green-600' : 'text-red-600'} mb-2">
                        {year} is {isLeapYear ? '' : 'NOT'} a Leap Year
                    </div>
                    <div class="text-lg text-gray-600">
                        {isLeapYear ? 'This year has 366 days (February has 29 days)' : 'This year has 365 days (February has 28 days)'}
                    </div>
                </div>
            </Card>

            <!-- Adjacent Leap Years -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#if previousLeapYear}
                    <Card>
                        <div class="p-6 text-center">
                            <div class="text-3xl font-bold text-blue-600 mb-2">
                                {previousLeapYear}
                            </div>
                            <div class="text-gray-600">Previous Leap Year</div>
                        </div>
                    </Card>
                {/if}

                {#if nextLeapYear}
                    <Card>
                        <div class="p-6 text-center">
                            <div class="text-3xl font-bold text-purple-600 mb-2">
                                {nextLeapYear}
                            </div>
                            <div class="text-gray-600">Next Leap Year</div>
                        </div>
                    </Card>
                {/if}
            </div>
        {:else}
            <!-- Leap Years in Range -->
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Leap Years from {rangeStart} to {rangeEnd}
                    </h3>

                    <div class="mb-4 text-center">
                        <span class="text-2xl font-bold text-green-600">{leapYears.length}</span>
                        <span class="text-gray-600 ml-2">leap years found</span>
                    </div>

                    {#if leapYears.length > 0}
                        <div class="grid grid-cols-4 md:grid-cols-8 gap-4">
                            {#each leapYears as leapYear}
                                <div class="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <span class="font-bold text-green-900">{leapYear}</span>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="text-center text-gray-500">
                            No leap years found in this range
                        </div>
                    {/if}
                </div>
            </Card>
        {/if}

        <!-- Leap Year Rules -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Leap Year Rules
                </h3>

                <div class="space-y-4">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">📚 The Rules</h4>
                        <div class="text-blue-800 text-sm space-y-1">
                            <div>1. If the year is divisible by 4, it's a leap year</div>
                            <div>2. EXCEPT if it's divisible by 100, then it's NOT a leap year</div>
                            <div>3. EXCEPT if it's divisible by 400, then it IS a leap year</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">✅ Leap Year Examples</h4>
                            <div class="text-green-800 text-sm">
                                2000, 2004, 2008, 2012, 2016, 2020, 2024
                            </div>
                        </div>

                        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h4 class="font-semibold text-red-900 mb-2">❌ Not Leap Years</h4>
                            <div class="text-red-800 text-sm">
                                1900, 2001, 2002, 2003, 2100, 2200, 2300
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>