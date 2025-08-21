<script>
    /**
     * Meeting Time Planner Component
     * Find optimal meeting times across different time zones
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Input values
    let meetingDate = '';
    let meetingTime = '14:00';
    let selectedTimeZones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];

    // Available time zones
    const timeZones = [
        { value: 'America/New_York', label: 'New York (EST/EDT)', flag: '🇺🇸' },
        { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', flag: '🇺🇸' },
        { value: 'America/Chicago', label: 'Chicago (CST/CDT)', flag: '🇺🇸' },
        { value: 'Europe/London', label: 'London (GMT/BST)', flag: '🇬🇧' },
        { value: 'Europe/Paris', label: 'Paris (CET/CEST)', flag: '🇫🇷' },
        { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', flag: '🇩🇪' },
        { value: 'Asia/Tokyo', label: 'Tokyo (JST)', flag: '🇯🇵' },
        { value: 'Asia/Shanghai', label: 'Shanghai (CST)', flag: '🇨🇳' },
        { value: 'Asia/Kolkata', label: 'Mumbai (IST)', flag: '🇮🇳' },
        { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', flag: '🇦🇺' },
        { value: 'Asia/Dubai', label: 'Dubai (GST)', flag: '🇦🇪' },
        { value: 'Asia/Singapore', label: 'Singapore (SGT)', flag: '🇸🇬' }
    ];

    // Results
    let meetingTimes = [];
    let showResults = false;

    // Calculate meeting times
    function calculateMeetingTimes() {
        if (!meetingDate || !meetingTime || selectedTimeZones.length === 0) {
            showResults = false;
            return;
        }

        const baseDateTime = new Date(`${meetingDate}T${meetingTime}`);
        
        meetingTimes = selectedTimeZones.map(tzValue => {
            const tz = timeZones.find(t => t.value === tzValue);
            if (!tz) return null;

            const localTime = baseDateTime.toLocaleString('en-US', {
                timeZone: tzValue,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });

            const localDate = baseDateTime.toLocaleDateString('en-US', {
                timeZone: tzValue,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            // Determine if it's a good meeting time (9 AM - 6 PM)
            const hour = parseInt(localTime.split(':')[0]);
            const isGoodTime = hour >= 9 && hour <= 18;

            return {
                ...tz,
                time: localTime,
                date: localDate,
                isGoodTime,
                hour
            };
        }).filter(Boolean);

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (meetingDate && meetingTime && selectedTimeZones.length > 0) {
        calculateMeetingTimes();
    }

    // Set default date (tomorrow)
    $: if (!meetingDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        meetingDate = tomorrow.toISOString().split('T')[0];
    }

    // Add time zone
    function addTimeZone(tzValue) {
        if (!selectedTimeZones.includes(tzValue)) {
            selectedTimeZones = [...selectedTimeZones, tzValue];
        }
    }

    // Remove time zone
    function removeTimeZone(tzValue) {
        selectedTimeZones = selectedTimeZones.filter(tz => tz !== tzValue);
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Meeting Planner Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Meeting Time Planner
            </h2>
            <p class="text-gray-600 mb-6">
                Find optimal meeting times across different time zones. 
                Plan international meetings with confidence.
            </p>

            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="date"
                        label="Meeting Date"
                        bind:value={meetingDate}
                        required
                    />

                    <Input
                        type="time"
                        label="Meeting Time (your timezone)"
                        bind:value={meetingTime}
                        required
                    />
                </div>

                <!-- Selected Time Zones -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Selected Time Zones
                    </label>
                    <div class="space-y-2">
                        {#each selectedTimeZones as tzValue}
                            {@const tz = timeZones.find(t => t.value === tzValue)}
                            {#if tz}
                                <div class="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <span class="text-sm">{tz.flag} {tz.label}</span>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        on:click={() => removeTimeZone(tzValue)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>

                <!-- Add Time Zone -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Add Time Zone
                    </label>
                    <div class="flex flex-wrap gap-2">
                        {#each timeZones.filter(tz => !selectedTimeZones.includes(tz.value)) as tz}
                            <Button 
                                variant="outline" 
                                size="sm" 
                                on:click={() => addTimeZone(tz.value)}
                            >
                                {tz.flag} {tz.name}
                            </Button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Meeting Times -->
    {#if showResults}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Meeting Times by Location
                </h3>

                <div class="space-y-4">
                    {#each meetingTimes as meeting}
                        <div class="flex items-center justify-between p-4 rounded-lg {meeting.isGoodTime ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                            <div class="flex items-center space-x-3">
                                <span class="text-2xl">{meeting.flag}</span>
                                <div>
                                    <div class="font-semibold text-gray-900">{meeting.label}</div>
                                    <div class="text-sm text-gray-600">{meeting.date}</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-2xl font-mono font-bold {meeting.isGoodTime ? 'text-green-600' : 'text-red-600'}">
                                    {meeting.time}
                                </div>
                                <div class="text-sm {meeting.isGoodTime ? 'text-green-600' : 'text-red-600'}">
                                    {meeting.isGoodTime ? '✅ Good time' : '❌ Outside hours'}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>