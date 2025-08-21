<script>
    /**
     * Countdown Timer Component
     * Create countdown timers for events and deadlines
     */

    import { onMount, onDestroy } from "svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let targetDate = "";
    let targetTime = "12:00";
    let eventName = "My Event";

    // Results
    let timeRemaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
    };
    let isActive = false;
    let hasEnded = false;
    let interval;

    // Update countdown
    function updateCountdown() {
        if (!targetDate) return;

        const target = new Date(`${targetDate}T${targetTime}`);
        const now = new Date();
        const diff = target.getTime() - now.getTime();

        if (diff <= 0) {
            timeRemaining = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                total: 0,
            };
            hasEnded = true;
            stopCountdown();
            return;
        }

        hasEnded = false;
        timeRemaining = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            ),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
            total: diff,
        };
    }

    // Start countdown
    function startCountdown() {
        if (!targetDate) return;

        isActive = true;
        updateCountdown();
        interval = setInterval(updateCountdown, 1000);
    }

    // Stop countdown
    function stopCountdown() {
        isActive = false;
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Reset countdown
    function resetCountdown() {
        stopCountdown();
        updateCountdown();
    }

    // Set default target date (tomorrow)
    $: if (!targetDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        targetDate = tomorrow.toISOString().split("T")[0];
    }

    onMount(() => {
        updateCountdown();
    });

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Timer Setup -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Countdown Timer
            </h2>
            <p class="text-gray-600 mb-6">
                Create countdown timers for events, deadlines, and special
                occasions. Track time remaining with live updates down to the
                second.
            </p>

            <div class="space-y-6">
                <Input
                    type="text"
                    label="Event Name"
                    bind:value={eventName}
                    placeholder="My Event"
                />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="date"
                        label="Target Date"
                        bind:value={targetDate}
                        required
                    />

                    <Input
                        type="time"
                        label="Target Time"
                        bind:value={targetTime}
                        required
                    />
                </div>

                <div class="flex justify-center space-x-4">
                    <Button
                        variant="primary"
                        on:click={startCountdown}
                        disabled={isActive || !targetDate}
                    >
                        ▶️ Start Timer
                    </Button>

                    <Button
                        variant="outline"
                        on:click={stopCountdown}
                        disabled={!isActive}
                    >
                        ⏸️ Pause
                    </Button>

                    <Button variant="outline" on:click={resetCountdown}>
                        🔄 Reset
                    </Button>
                </div>
            </div>
        </div>
    </Card>

    <!-- Countdown Display -->
    {#if targetDate}
        <Card>
            <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {eventName}
                </h3>

                {#if hasEnded}
                    <div class="text-center">
                        <div class="text-6xl mb-4">🎉</div>
                        <div class="text-3xl font-bold text-green-600 mb-2">
                            Event Has Started!
                        </div>
                        <div class="text-lg text-gray-600">
                            {eventName} began on {new Date(
                                `${targetDate}T${targetTime}`,
                            ).toLocaleDateString()}
                        </div>
                    </div>
                {:else}
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div
                            class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                            <div class="text-4xl font-bold text-blue-600 mb-2">
                                {timeRemaining.days}
                            </div>
                            <div class="text-gray-600">Days</div>
                        </div>

                        <div
                            class="text-center p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                            <div class="text-4xl font-bold text-green-600 mb-2">
                                {timeRemaining.hours}
                            </div>
                            <div class="text-gray-600">Hours</div>
                        </div>

                        <div
                            class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg"
                        >
                            <div
                                class="text-4xl font-bold text-purple-600 mb-2"
                            >
                                {timeRemaining.minutes}
                            </div>
                            <div class="text-gray-600">Minutes</div>
                        </div>

                        <div
                            class="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                            <div
                                class="text-4xl font-bold text-orange-600 mb-2"
                            >
                                {timeRemaining.seconds}
                            </div>
                            <div class="text-gray-600">Seconds</div>
                        </div>
                    </div>

                    <div class="text-center mt-6">
                        <div class="text-lg text-gray-600">
                            Time until {eventName}
                        </div>
                        <div class="text-sm text-gray-500 mt-2">
                            Target: {new Date(
                                `${targetDate}T${targetTime}`,
                            ).toLocaleString()}
                        </div>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}
</div>
