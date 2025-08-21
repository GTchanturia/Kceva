<script>
    /**
     * World Clock Component
     * Display time in multiple time zones around the world
     */

    import { onMount, onDestroy } from "svelte";
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Time zones
    const timeZones = [
        { name: "New York", zone: "America/New_York", flag: "🇺🇸" },
        { name: "Los Angeles", zone: "America/Los_Angeles", flag: "🇺🇸" },
        { name: "London", zone: "Europe/London", flag: "🇬🇧" },
        { name: "Paris", zone: "Europe/Paris", flag: "🇫🇷" },
        { name: "Tokyo", zone: "Asia/Tokyo", flag: "🇯🇵" },
        { name: "Sydney", zone: "Australia/Sydney", flag: "🇦🇺" },
        { name: "Dubai", zone: "Asia/Dubai", flag: "🇦🇪" },
        { name: "Singapore", zone: "Asia/Singapore", flag: "🇸🇬" },
        { name: "Mumbai", zone: "Asia/Kolkata", flag: "🇮🇳" },
        { name: "São Paulo", zone: "America/Sao_Paulo", flag: "🇧🇷" },
        { name: "Moscow", zone: "Europe/Moscow", flag: "🇷🇺" },
        { name: "Beijing", zone: "Asia/Shanghai", flag: "🇨🇳" },
    ];

    let currentTimes = {};
    let interval;

    // Update all times
    function updateTimes() {
        const now = new Date();
        currentTimes = {};

        timeZones.forEach((tz) => {
            currentTimes[tz.zone] = {
                time: now.toLocaleTimeString("en-US", {
                    timeZone: tz.zone,
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
                date: now.toLocaleDateString("en-US", {
                    timeZone: tz.zone,
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                }),
                offset: getTimezoneOffset(tz.zone, now),
            };
        });
    }

    // Get timezone offset
    function getTimezoneOffset(timeZone, date) {
        const utc = date.getTime() + date.getTimezoneOffset() * 60000;
        const targetTime = new Date(
            utc + getTimezoneOffsetMinutes(timeZone, date) * 60000,
        );
        const offsetMinutes = getTimezoneOffsetMinutes(timeZone, date);
        const hours = Math.floor(Math.abs(offsetMinutes) / 60);
        const minutes = Math.abs(offsetMinutes) % 60;
        const sign = offsetMinutes >= 0 ? "+" : "-";
        return `UTC${sign}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    function getTimezoneOffsetMinutes(timeZone, date) {
        const utcDate = new Date(
            date.toLocaleString("en-US", { timeZone: "UTC" }),
        );
        const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
        return (tzDate.getTime() - utcDate.getTime()) / 60000;
    }

    onMount(() => {
        updateTimes();
        interval = setInterval(updateTimes, 1000);
    });

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<div class="max-w-6xl mx-auto space-y-6">
    <!-- World Clock Header -->
    <Card>
        <div class="p-6 text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">World Clock</h2>
            <p class="text-gray-600 mb-4">
                View current time in major cities around the world. Perfect for
                international business and travel planning.
            </p>
        </div>
    </Card>

    <!-- Time Zone Grid -->
    <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
        {#each timeZones as tz}
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl mb-2">{tz.flag}</div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">
                        {tz.name}
                    </h3>
                    <div
                        class="text-2xl font-mono font-bold text-blue-600 mb-1"
                    >
                        {currentTimes[tz.zone]?.time || "--:--:--"}
                    </div>
                    <div class="text-sm text-gray-600 mb-1">
                        {currentTimes[tz.zone]?.date || "---"}
                    </div>
                    <div class="text-xs text-gray-500">
                        {currentTimes[tz.zone]?.offset || "UTC+00:00"}
                    </div>
                </div>
            </Card>
        {/each}
    </div>
</div>
