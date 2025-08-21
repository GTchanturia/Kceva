<script>
    /**
     * Age Calculator Component
     * Calculate exact age in years, months, days, hours, minutes, and seconds
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let birthDate = "";
    let targetDate = "";

    // Results
    let ageResult = null;
    let showResults = false;

    // Calculate age
    function calculateAge() {
        if (!birthDate) {
            showResults = false;
            return;
        }

        const birth = new Date(birthDate);
        const target = targetDate ? new Date(targetDate) : new Date();

        if (birth > target) {
            showResults = false;
            return;
        }

        // Calculate exact age
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        // Adjust for negative days
        if (days < 0) {
            months--;
            const lastMonth = new Date(
                target.getFullYear(),
                target.getMonth(),
                0,
            );
            days += lastMonth.getDate();
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calculate total days, hours, minutes, seconds
        const totalMs = target.getTime() - birth.getTime();
        const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor(totalMs / (1000 * 60));
        const totalSeconds = Math.floor(totalMs / 1000);

        // Calculate weeks
        const totalWeeks = Math.floor(totalDays / 7);

        // Next birthday
        let nextBirthday = new Date(
            target.getFullYear(),
            birth.getMonth(),
            birth.getDate(),
        );
        if (nextBirthday <= target) {
            nextBirthday.setFullYear(target.getFullYear() + 1);
        }
        const daysToNextBirthday = Math.ceil(
            (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
        );

        ageResult = {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalHours,
            totalMinutes,
            totalSeconds,
            nextBirthday,
            daysToNextBirthday,
            birthDate: birth,
            targetDate: target,
        };

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (birthDate) {
        calculateAge();
    }

    // Format date for display
    function formatDate(date) {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    // Get zodiac sign
    function getZodiacSign(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if ((month == 3 && day >= 21) || (month == 4 && day <= 19))
            return { sign: "Aries", emoji: "♈" };
        if ((month == 4 && day >= 20) || (month == 5 && day <= 20))
            return { sign: "Taurus", emoji: "♉" };
        if ((month == 5 && day >= 21) || (month == 6 && day <= 20))
            return { sign: "Gemini", emoji: "♊" };
        if ((month == 6 && day >= 21) || (month == 7 && day <= 22))
            return { sign: "Cancer", emoji: "♋" };
        if ((month == 7 && day >= 23) || (month == 8 && day <= 22))
            return { sign: "Leo", emoji: "♌" };
        if ((month == 8 && day >= 23) || (month == 9 && day <= 22))
            return { sign: "Virgo", emoji: "♍" };
        if ((month == 9 && day >= 23) || (month == 10 && day <= 22))
            return { sign: "Libra", emoji: "♎" };
        if ((month == 10 && day >= 23) || (month == 11 && day <= 21))
            return { sign: "Scorpio", emoji: "♏" };
        if ((month == 11 && day >= 22) || (month == 12 && day <= 21))
            return { sign: "Sagittarius", emoji: "♐" };
        if ((month == 12 && day >= 22) || (month == 1 && day <= 19))
            return { sign: "Capricorn", emoji: "♑" };
        if ((month == 1 && day >= 20) || (month == 2 && day <= 18))
            return { sign: "Aquarius", emoji: "♒" };
        return { sign: "Pisces", emoji: "♓" };
    }

    // Set today's date as default for target date
    $: if (!targetDate) {
        const today = new Date();
        targetDate = today.toISOString().split("T")[0];
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Age Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Age Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your exact age in years, months, days, and more. Find
                out how many days you've been alive!
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="date"
                    label="Birth Date"
                    bind:value={birthDate}
                    required
                />

                <Input
                    type="date"
                    label="Calculate Age As Of (optional)"
                    bind:value={targetDate}
                    placeholder="Leave empty for today"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && ageResult}
        {@const zodiac = getZodiacSign(ageResult.birthDate)}
        <!-- Main Age Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-6xl mb-4">🎂</div>
                <div class="text-4xl font-bold text-blue-600 mb-2">
                    {ageResult.years} years, {ageResult.months} months, {ageResult.days}
                    days
                </div>
                <div class="text-gray-600 text-lg">
                    Born on {formatDate(ageResult.birthDate)}
                </div>
                {#if targetDate !== new Date().toISOString().split("T")[0]}
                    <div class="text-gray-500 text-sm mt-2">
                        Age calculated as of {formatDate(ageResult.targetDate)}
                    </div>
                {/if}
            </div>
        </Card>

        <!-- Detailed Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Detailed Age Breakdown
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                        class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-blue-600">
                            {formatNumber(ageResult.years, 0)}
                        </div>
                        <div class="text-sm text-gray-600">Years</div>
                    </div>

                    <div
                        class="text-center p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-green-600">
                            {formatNumber(ageResult.totalDays, 0)}
                        </div>
                        <div class="text-sm text-gray-600">Total Days</div>
                    </div>

                    <div
                        class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-purple-600">
                            {formatNumber(ageResult.totalWeeks, 0)}
                        </div>
                        <div class="text-sm text-gray-600">Total Weeks</div>
                    </div>

                    <div
                        class="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-orange-600">
                            {formatNumber(ageResult.totalHours, 0)}
                        </div>
                        <div class="text-sm text-gray-600">Total Hours</div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div
                        class="text-center p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-red-600">
                            {formatNumber(ageResult.totalMinutes, 0)}
                        </div>
                        <div class="text-sm text-gray-600">Total Minutes</div>
                    </div>

                    <div
                        class="text-center p-4 bg-teal-50 border border-teal-200 rounded-lg"
                    >
                        <div class="text-2xl font-bold text-teal-600">
                            {formatNumber(ageResult.totalSeconds, 0)}
                        </div>
                        <div class="text-sm text-gray-600">Total Seconds</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Next Birthday Countdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Next Birthday
                </h3>

                <div class="text-center">
                    <div class="text-4xl mb-4">🎉</div>
                    <div class="text-2xl font-bold text-green-600 mb-2">
                        {ageResult.daysToNextBirthday} days to go!
                    </div>
                    <div class="text-gray-600">
                        Your next birthday is on {formatDate(
                            ageResult.nextBirthday,
                        )}
                    </div>
                    <div class="text-gray-500 text-sm mt-2">
                        You'll turn {ageResult.years + 1} years old
                    </div>
                </div>
            </div>
        </Card>

        <!-- Fun Facts -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Fun Facts
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div
                            class="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-purple-900 mb-2">
                                {zodiac.emoji} Zodiac Sign
                            </h4>
                            <p class="text-purple-800">{zodiac.sign}</p>
                        </div>

                        <div
                            class="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-blue-900 mb-2">
                                🌍 Day of Week Born
                            </h4>
                            <p class="text-blue-800">
                                {ageResult.birthDate.toLocaleDateString(
                                    "en-US",
                                    { weekday: "long" },
                                )}
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div
                            class="p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-green-900 mb-2">
                                💓 Heartbeats
                            </h4>
                            <p class="text-green-800">
                                Approximately {formatNumber(
                                    ageResult.totalDays * 100000,
                                    0,
                                )} heartbeats
                            </p>
                            <p class="text-xs text-green-600 mt-1">
                                Based on average 100,000 beats per day
                            </p>
                        </div>

                        <div
                            class="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-orange-900 mb-2">
                                😴 Sleep Time
                            </h4>
                            <p class="text-orange-800">
                                About {formatNumber(
                                    (ageResult.totalDays * 8) / 24,
                                    0,
                                )} days sleeping
                            </p>
                            <p class="text-xs text-orange-600 mt-1">
                                Based on 8 hours of sleep per day
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Age Milestones -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Age Milestones
                </h3>

                <div class="space-y-3">
                    {#each [{ age: 18, milestone: "Legal adult", passed: ageResult.years >= 18 }, { age: 21, milestone: "Legal drinking age (US)", passed: ageResult.years >= 21 }, { age: 25, milestone: "Car rental without surcharge", passed: ageResult.years >= 25 }, { age: 30, milestone: "The big 3-0", passed: ageResult.years >= 30 }, { age: 40, milestone: "Life begins at 40", passed: ageResult.years >= 40 }, { age: 50, milestone: "Half a century", passed: ageResult.years >= 50 }, { age: 65, milestone: "Retirement age", passed: ageResult.years >= 65 }, { age: 100, milestone: "Centenarian", passed: ageResult.years >= 100 }] as milestone}
                        <div
                            class="flex items-center justify-between p-3 rounded-lg {milestone.passed
                                ? 'bg-green-50 border border-green-200'
                                : 'bg-gray-50 border border-gray-200'}"
                        >
                            <div class="flex items-center space-x-3">
                                <span class="text-lg"
                                    >{milestone.passed ? "✅" : "⏳"}</span
                                >
                                <span
                                    class="font-medium {milestone.passed
                                        ? 'text-green-900'
                                        : 'text-gray-700'}"
                                >
                                    Age {milestone.age}: {milestone.milestone}
                                </span>
                            </div>
                            {#if !milestone.passed}
                                <span class="text-sm text-gray-500">
                                    In {milestone.age - ageResult.years} years
                                </span>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>
