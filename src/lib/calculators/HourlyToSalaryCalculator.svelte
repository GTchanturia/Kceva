<script>
    /**
     * Hourly to Salary Calculator Component
     * Convert hourly wage to annual salary
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatCurrency, formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let hourlyWage = 25;
    let hoursPerWeek = 40;
    let weeksPerYear = 52;
    let overtimeHours = 0;
    let overtimeMultiplier = 1.5;

    // Results
    let annualSalary = 0;
    let monthlyPay = 0;
    let weeklyPay = 0;
    let biweeklyPay = 0;
    let regularPay = 0;
    let overtimePay = 0;
    let showResults = false;

    // Work schedule options
    const scheduleOptions = [
        { value: 40, label: 'Full-time (40 hours/week)' },
        { value: 35, label: 'Standard (35 hours/week)' },
        { value: 30, label: 'Part-time (30 hours/week)' },
        { value: 25, label: 'Part-time (25 hours/week)' },
        { value: 20, label: 'Part-time (20 hours/week)' },
        { value: 0, label: 'Custom hours' }
    ];

    // Calculate annual salary
    function calculateSalary() {
        if (hourlyWage <= 0 || hoursPerWeek <= 0 || weeksPerYear <= 0) {
            showResults = false;
            return;
        }

        // Calculate regular hours (up to 40 per week)
        const regularHours = Math.min(hoursPerWeek, 40);
        const weeklyOvertimeHours = Math.max(hoursPerWeek - 40, 0) + overtimeHours;

        // Calculate pay components
        regularPay = regularHours * hourlyWage * weeksPerYear;
        overtimePay = weeklyOvertimeHours * hourlyWage * overtimeMultiplier * weeksPerYear;

        // Calculate totals
        annualSalary = regularPay + overtimePay;
        monthlyPay = annualSalary / 12;
        weeklyPay = annualSalary / weeksPerYear;
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
    $: if (hourlyWage && hoursPerWeek && weeksPerYear) {
        calculateSalary();
    }

    // Calculate different scenarios
    function calculateScenarios() {
        const scenarios = [];
        const baseHours = [20, 30, 35, 40, 45, 50];
        
        baseHours.forEach(hours => {
            const regHours = Math.min(hours, 40);
            const otHours = Math.max(hours - 40, 0);
            const regPay = regHours * hourlyWage * weeksPerYear;
            const otPay = otHours * hourlyWage * overtimeMultiplier * weeksPerYear;
            const totalPay = regPay + otPay;
            
            scenarios.push({
                hours,
                regularPay: regPay,
                overtimePay: otPay,
                totalPay,
                monthlyPay: totalPay / 12
            });
        });
        
        return scenarios;
    }

    $: scenarios = showResults ? calculateScenarios() : [];
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Hourly to Salary Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Convert your hourly wage to annual salary. Calculate your potential earnings 
                based on different work schedules and overtime hours.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Hourly Wage"
                    bind:value={hourlyWage}
                    placeholder="25.00"
                    min="0.01"
                    step="0.25"
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
                    label="Additional Overtime Hours/Week"
                    bind:value={overtimeHours}
                    placeholder="0"
                    min="0"
                    max="40"
                    step="1"
                />

                <Input
                    type="number"
                    label="Overtime Multiplier"
                    bind:value={overtimeMultiplier}
                    placeholder="1.5"
                    min="1"
                    max="3"
                    step="0.1"
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
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(annualSalary)}
                    </div>
                    <div class="text-gray-600">Annual Salary</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(monthlyPay)}
                    </div>
                    <div class="text-gray-600">Monthly Pay</div>
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
                        {formatCurrency(weeklyPay)}
                    </div>
                    <div class="text-gray-600">Weekly Pay</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Earnings Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Hourly Wage:</span>
                            <span class="font-semibold">{formatCurrency(hourlyWage)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Regular Hours/Week:</span>
                            <span class="font-semibold">{Math.min(hoursPerWeek, 40)} hours</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Overtime Hours/Week:</span>
                            <span class="font-semibold">{Math.max(hoursPerWeek - 40, 0) + overtimeHours} hours</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Weeks per Year:</span>
                            <span class="font-semibold">{weeksPerYear} weeks</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Regular Pay (Annual):</span>
                            <span class="font-semibold text-blue-600">{formatCurrency(regularPay)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Overtime Pay (Annual):</span>
                            <span class="font-semibold text-green-600">{formatCurrency(overtimePay)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Overtime Rate:</span>
                            <span class="font-semibold">{formatCurrency(hourlyWage * overtimeMultiplier)}/hour</span>
                        </div>
                        <div class="flex justify-between border-t pt-3">
                            <span class="text-gray-900 font-semibold">Total Annual:</span>
                            <span class="font-bold text-green-600">{formatCurrency(annualSalary)}</span>
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

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-lg font-bold text-blue-600 mb-1">
                            {formatCurrency(hourlyWage)}
                        </div>
                        <div class="text-sm text-gray-700">Per Hour</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-lg font-bold text-green-600 mb-1">
                            {formatCurrency(hourlyWage * 8)}
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

        <!-- Different Hour Scenarios -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Earnings at Different Hours
                </h3>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hours/Week
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Regular Pay
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Overtime Pay
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Annual Total
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Monthly
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each scenarios as scenario}
                                <tr class={scenario.hours === hoursPerWeek ? 'bg-blue-50' : ''}>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {scenario.hours}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        {formatCurrency(scenario.regularPay)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                        {formatCurrency(scenario.overtimePay)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency(scenario.totalPay)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatCurrency(scenario.monthlyPay)}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Important Considerations
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            💰 Gross vs Net Income
                        </h4>
                        <p class="text-blue-800 text-sm">
                            These calculations show gross income before taxes, insurance, and other deductions. 
                            Your actual take-home pay will be lower.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            ⏰ Overtime Laws
                        </h4>
                        <p class="text-green-800 text-sm">
                            Overtime pay (typically 1.5x regular rate) is required for hours over 40 per week 
                            for non-exempt employees under federal law.
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            📅 Time Off Impact
                        </h4>
                        <p class="text-purple-800 text-sm">
                            This calculation assumes you work every scheduled week. 
                            Unpaid time off will reduce your actual annual earnings.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            🎯 Career Planning
                        </h4>
                        <p class="text-orange-800 text-sm">
                            Use this information to set income goals, budget effectively, 
                            and compare job opportunities with different pay structures.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>