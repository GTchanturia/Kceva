<script>
    /**
     * Travel Time Calculator Component
     * Calculate travel time based on distance and speed
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let distance = 100;
    let speed = 60;
    let distanceUnit = 'km';
    let speedUnit = 'kmh';

    // Results
    let travelTime = 0; // in hours
    let showResults = false;

    // Distance units
    const distanceUnits = [
        { value: 'km', label: 'Kilometers (km)' },
        { value: 'mi', label: 'Miles (mi)' },
        { value: 'm', label: 'Meters (m)' },
        { value: 'ft', label: 'Feet (ft)' }
    ];

    // Speed units
    const speedUnits = [
        { value: 'kmh', label: 'km/h' },
        { value: 'mph', label: 'mph' },
        { value: 'ms', label: 'm/s' },
        { value: 'fps', label: 'ft/s' }
    ];

    // Calculate travel time
    function calculateTravelTime() {
        if (distance <= 0 || speed <= 0) {
            showResults = false;
            return;
        }

        // Convert distance to km
        let distanceKm = distance;
        switch (distanceUnit) {
            case 'mi':
                distanceKm = distance * 1.60934;
                break;
            case 'm':
                distanceKm = distance / 1000;
                break;
            case 'ft':
                distanceKm = distance * 0.0003048;
                break;
        }

        // Convert speed to km/h
        let speedKmh = speed;
        switch (speedUnit) {
            case 'mph':
                speedKmh = speed * 1.60934;
                break;
            case 'ms':
                speedKmh = speed * 3.6;
                break;
            case 'fps':
                speedKmh = speed * 1.09728;
                break;
        }

        travelTime = distanceKm / speedKmh;
        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (distance && speed && distanceUnit && speedUnit) {
        calculateTravelTime();
    }

    // Format time display
    function formatTime(hours) {
        const totalMinutes = hours * 60;
        const h = Math.floor(hours);
        const m = Math.floor((hours - h) * 60);
        const s = Math.floor(((hours - h) * 60 - m) * 60);

        if (h > 0) {
            return `${h}h ${m}m`;
        } else if (m > 0) {
            return `${m}m ${s}s`;
        } else {
            return `${s}s`;
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Travel Time Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate travel time based on distance and average speed. 
                Perfect for trip planning and estimating arrival times.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <Input
                        type="number"
                        label="Distance"
                        bind:value={distance}
                        placeholder="100"
                        min="0.1"
                        step="0.1"
                    />
                    <Select
                        label="Distance Unit"
                        bind:value={distanceUnit}
                        options={distanceUnits}
                    />
                </div>

                <div class="space-y-4">
                    <Input
                        type="number"
                        label="Average Speed"
                        bind:value={speed}
                        placeholder="60"
                        min="0.1"
                        step="0.1"
                    />
                    <Select
                        label="Speed Unit"
                        bind:value={speedUnit}
                        options={speedUnits}
                    />
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Travel Time Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-blue-600 mb-4">
                    {formatTime(travelTime)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Travel Time
                </div>
                <div class="text-lg text-gray-500">
                    {formatNumber(distance, 1)} {distanceUnit} at {formatNumber(speed, 1)} {speedUnit}
                </div>
            </div>
        </Card>

        <!-- Time Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-green-600 mb-2">
                        {formatNumber(travelTime, 3)}
                    </div>
                    <div class="text-gray-600">Hours</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-purple-600 mb-2">
                        {formatNumber(travelTime * 60, 1)}
                    </div>
                    <div class="text-gray-600">Minutes</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-orange-600 mb-2">
                        {formatNumber(travelTime * 3600, 0)}
                    </div>
                    <div class="text-gray-600">Seconds</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-2xl font-bold text-red-600 mb-2">
                        {formatNumber(distance / travelTime, 1)}
                    </div>
                    <div class="text-gray-600">Avg Speed</div>
                </div>
            </Card>
        </div>
    {/if}
</div>