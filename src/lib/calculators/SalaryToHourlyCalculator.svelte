<script>
    /**
     * Salary to Hourly Calculator Component
     * Convert annual salary to hourly wage
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let annualSalary = 60000;
    let hoursPerWeek = 40;
    let weeksPerYear = 52;
    let vacationDays = 10;
    let sickDays = 5;
    let holidays = 10;

    // Results
    let hourlyRate = 0;
    let weeklyPay = 0;
    let monthlyPay = 0;
    let biweeklyPay = 0;
    let workingHours = 0;
    let showResults = false;

    // Work schedule options
    const scheduleOptions = [
        { value: 40, label: 'Full-time (40 hours/week)' },
        { value: 35, label: 'Standard (35 hours/week)' },
        { value: 30, label: 'Part-time (30 hours/week)' },
        { value: 20, label: 'Part-time (20 hours/week)' },
        { value: 0, label: 'Custom hours' }
    ];

    // Calculate hourly rate
    function calculateHourlyRate() {
        if (annualSalary <= 0 || hoursPerWeek <= 0 || weeksPerYear <= 0) {
            showResults = false;
            return;
        }

        // Calculate total working hours per year
        const totalWeeklyHours = hoursPerWeek;
        const totalYearlyHours = totalWeeklyHours * weeksPerYear;
        
        // Subtract time off (convert days to hours)
        const timeOffHours = (vacationDays + sickDays + holidays) * (totalWeeklyHours / 5); // Assuming 5-day work week
        workingHours = totalYearlyHours - timeOffHours;

        // Calculate rates
        hourlyRate = annualSalary / workingHours;
        weeklyPay = annualSalary / weeksPerYear;
        monthlyPay = annualSalary / 12;
        biweeklyPay = annualSalary / 26; // 26 pay periods per year

        showResults = true;
    }

    // Handle schedule selection
    function handleScheduleChange(event) {
        const value = parseInt(event.target.value);
        if (value > 0) {
            hoursPerWeek = value;
        }
    }

    // Auto-calculate when inputs change
    $: if (annualSalary && hoursPerWeek && weeksPerYear) {
        calculateHourlyRate();
    }

    // Calculate overtime scenarios
    function calculateOvertimeScenarios() {
        const regularHours = Math.min(hoursPerWeek, 40);
        const overtimeHours = Math.max(hoursPerWeek - 40, 0);
        const overtimeRate = hourlyRate * 1.5;

        return {
            regularPay: regularHours * hourlyRate,
            overtimePay: overtimeHours * overtimeRate,
            totalWeeklyPay: (regularHours * hourlyRate) + (overtimeHours * overtimeRate)
        };
    }

    $: overtimeScenario = showResults ? calculateOvertimeScenarios() : null;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Salary to Hourly Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Convert your annual salary to hourly wage. Calculate your true hourly rate 
                accounting for vacation time, sick days, and holidays.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Annual Salary"
                    bind:value={annualSalary}
                    placeholder="60000"
                    min="1"
                    step="1000"
                />

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Work Schedule
                    </label>
                    <select 
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        on:change={handleScheduleChange}
                    >
                        {#each scheduleOptions as option}
                            <option value={option.value} selected={hoursPerWeek === option.value}>
                                {option.label}
                            </option>
                        {/each}
                    </select>
                </div>

                <Input
                    type="number"
                    label="Hours per Week"
                    bind:value={hoursPerWeek}
                    placeholder="40"
                    min="1"
                    max="80"
                    step="1"
                />

                <Input
                    type="number"
                    label="Weeks per Year"
                    bind:value={weeksPerYear}
                    placeholder="52"
                    min="1"
                    max="52"
                    step="1"
                />

                <Input
                    type="number"
                    label="Vacation Days per Year"
                    bind:value={vacationDays}
                    placeholder="10"
                    min="0"
                    max="50"
                    step="1"
                />

                <Input
                    type="number"
                    label="Sick Days per Year"
                    bind:value={sickDays}
                    placeholder="5"
                    min="0"
                    max="30"
                    step="1"
                />

                <Input
                    type="number"
                    label="Holidays per Year"
                    bind:value={holidays}
                    placeholder="10"
                    min="0"
                    max="20"
                    step="1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(hourlyRate)}
                    </div>
                    <div class="text-gray-600">Hourly Rate</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(weeklyPay)}
                    </div>
                    <div class="text-gray-600">Weekly Pay</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(biweeklyPay)}
                    </div>
                    <div class="text-gray-600">Bi-weekly Pay</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatCurrency(monthlyPay)}
                    </div>
                    <div class="text-gray-600">Monthly Pay</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Salary Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Annual Salary:</span>
                            <span class="font-semibold">{formatCurrency(annualSalary)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Hours per Week:</span>
                            <span class="font-semibold">{hoursPerWeek} hours</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Weeks per Year:</span>
                            <span class="font-semibold">{weeksPerYear} weeks</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Total Scheduled Hours:</span>
                            <span class="font-semibold">{formatNumber(hoursPerWeek * weeksPerYear, 0)} hours</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Vacation Days:</span>
                            <span class="font-semibold">{vacationDays} days</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Sick Days:</span>
                            <span class="font-semibold">{sickDays} days</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Holidays:</span>
                            <span class="font-semibold">{holidays} days</span>
                        </div>
                        <div class="flex justify-between border-t pt-3">
                            <span class="text-gray-900 font-semibold">Actual Working Hours:</span>
                            <span class="font-bold text-blue-600">{formatNumber(workingHours, 0)} hours</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Pay Period Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Pay Period Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-lg font-bold text-blue-600 mb-1">
                            {formatCurrency(hourlyRate)}
                        </div>
                        <div class="text-sm text-gray-700">Per Hour</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-lg font-bold text-green-600 mb-1">
                            {formatCurrency(hourlyRate * 8)}
                        </div>
                        <div class="text-sm text-gray-700">Per Day (8 hrs)</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div class="text-lg font-bold text-purple-600 mb-1">
                            {formatCurrency(weeklyPay)}
                        </div>
                        <div class="text-sm text-gray-700">Per Week</div>
                    </div>

                    <div class="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div class="text-lg font-bold text-orange-600 mb-1">
                            {formatCurrency(monthlyPay)}
                        </div>
                        <div class="text-sm text-gray-700">Per Month</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Overtime Calculation -->
        {#if overtimeScenario && hoursPerWeek > 40}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Overtime Calculation
                    </h3>

                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                        <h4 class="font-semibold text-yellow-900 mb-2">
                            ⚠️ Overtime Consideration
                        </h4>
                        <p class="text-yellow-800 text-sm">
                            You're working {hoursPerWeek} hours per week. If you're eligible for overtime pay, 
                            here's how your weekly pay would break down:
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div class="text-lg font-bold text-blue-600 mb-1">
                                {formatCurrency(overtimeScenario.regularPay)}
                            </div>
                            <div class="text-sm text-gray-700">Regular Pay</div>
                            <div class="text-xs text-gray-500">40 hrs × {formatCurrency(hourlyRate)}</div>
                        </div>

                        <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div class="text-lg font-bold text-green-600 mb-1">
                                {formatCurrency(overtimeScenario.overtimePay)}
                            </div>
                            <div class="text-sm text-gray-700">Overtime Pay</div>
                            <div class="text-xs text-gray-500">{hoursPerWeek - 40} hrs × {formatCurrency(hourlyRate * 1.5)}</div>
                        </div>

                        <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <div class="text-lg font-bold text-purple-600 mb-1">
                                {formatCurrency(overtimeScenario.totalWeeklyPay)}
                            </div>
                            <div class="text-sm text-gray-700">Total Weekly</div>
                            <div class="text-xs text-gray-500">With overtime</div>
                        </div>
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Considerations
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💰 Gross vs Net Pay
                        </h4>
                        <p class="text-blue-800 text-sm">
                            These calculations show gross pay before taxes, insurance, and other deductions. 
                            Your take-home pay will be lower.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            📊 Benefits Value
                        </h4>
                        <p class="text-green-800 text-sm">
                            Don't forget to factor in the value of benefits like health insurance, 
                            retirement contributions, and paid time off.
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            ⏰ Overtime Eligibility
                        </h4>
                        <p class="text-purple-800 text-sm">
                            Salaried employees may not be eligible for overtime pay. 
                            Check your employment classification and local labor laws.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            🎯 Negotiation Tool
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Use this information when negotiating salary or comparing job offers. 
                            Consider the total compensation package.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>