<script>
    /**
     * Time Until Birthday Calculator Component
     * Calculate exact time remaining until next birthday
     */

    import { onMount, onDestroy } from 'svelte';
    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let birthDate = '';

    // Results
    let timeUntilBirthday = {
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    let nextBirthdayDate = null;
    let age = 0;
    let showResults = false;
    let interval;

    // Update countdown
    function updateCountdown() {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const now = new Date();
        
        // Calculate current age
        age = now.getFullYear() - birth.getFullYear();
        if (now.getMonth() < birth.getMonth() || 
            (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) {
            age--;
        }

        // Calculate next birthday
        nextBirthdayDate = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthdayDate <= now) {
            nextBirthdayDate.setFullYear(now.getFullYear() + 1);
        }

        // Calculate time remaining
        const diff = nextBirthdayDate.getTime() - now.getTime();
        
        timeUntilBirthday = {
            months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)),
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };

        showResults = true;
    }

    // Auto-update when birth date changes
    $: if (birthDate) {
        updateCountdown();
        if (interval) clearInterval(interval);
        interval = setInterval(updateCountdown, 1000);
    }

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    });

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
                Time Until Birthday Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate the exact time remaining until your next birthday. 
                Get a live countdown with days, hours, minutes, and seconds.
            </p>

            <div class="max-w-md">
                <Input
                    type="date"
                    label="Your Birth Date"
                    bind:value={birthDate}
                    required
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && nextBirthdayDate}
        <!-- Birthday Countdown -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl mb-4">🎂</div>
                <div class="text-3xl font-bold text-pink-600 mb-2">
                    {formatDate(nextBirthdayDate)}
                </div>
                <div class="text-xl text-gray-600 mb-4">
                    Your Next Birthday
                </div>
                <div class="text-lg text-gray-500">
                    You'll turn {age + 1} years old
                </div>
            </div>
        </Card>

        <!-- Live Countdown -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {timeUntilBirthday.days}
                    </div>
                    <div class="text-gray-600">Days</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {timeUntilBirthday.hours}
                    </div>
                    <div class="text-gray-600">Hours</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {timeUntilBirthday.minutes}
                    </div>
                    <div class="text-gray-600">Minutes</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {timeUntilBirthday.seconds}
                    </div>
                    <div class="text-gray-600">Seconds</div>
                </div>
            </Card>
        </div>

        <!-- Birthday Facts -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Birthday Facts
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current Age:</span>
                            <span class="font-semibold">{age} years old</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Next Age:</span>
                            <span class="font-semibold">{age + 1} years old</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Days Until Birthday:</span>
                            <span class="font-semibold text-blue-600">{timeUntilBirthday.days} days</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Birthday Day:</span>
                            <span class="font-semibold">{nextBirthdayDate.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Weeks Until:</span>
                            <span class="font-semibold">{Math.floor(timeUntilBirthday.days / 7)} weeks</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Hours Until:</span>
                            <span class="font-semibold">{timeUntilBirthday.days * 24 + timeUntilBirthday.hours} hours</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>