<script>
    /**
     * Heart Rate Zone Calculator Component
     * Calculate target heart rate zones for different exercise intensities
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let age = 30;
    let restingHeartRate = 60;
    let method = 'karvonen';

    // Results
    let maxHeartRate = 0;
    let heartRateZones = [];
    let showResults = false;

    // Method options
    const methods = [
        { value: 'karvonen', label: 'Karvonen Formula (Heart Rate Reserve)' },
        { value: 'simple', label: 'Simple Formula (220 - Age)' }
    ];

    // Heart rate zones
    const zones = [
        { name: 'Recovery Zone', min: 50, max: 60, color: 'bg-blue-50 border-blue-200 text-blue-900', description: 'Active recovery, warm-up' },
        { name: 'Aerobic Base Zone', min: 60, max: 70, color: 'bg-green-50 border-green-200 text-green-900', description: 'Fat burning, endurance building' },
        { name: 'Aerobic Zone', min: 70, max: 80, color: 'bg-yellow-50 border-yellow-200 text-yellow-900', description: 'Cardiovascular fitness' },
        { name: 'Lactate Threshold', min: 80, max: 90, color: 'bg-orange-50 border-orange-200 text-orange-900', description: 'Performance improvement' },
        { name: 'Neuromuscular Power', min: 90, max: 100, color: 'bg-red-50 border-red-200 text-red-900', description: 'Maximum effort, anaerobic' }
    ];

    // Calculate heart rate zones
    function calculateHeartRateZones() {
        if (age <= 0 || age > 120) {
            showResults = false;
            return;
        }

        // Calculate maximum heart rate
        maxHeartRate = 220 - age;

        // Calculate zones based on method
        heartRateZones = zones.map(zone => {
            let minHR, maxHR;

            if (method === 'karvonen') {
                // Karvonen formula: Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR
                const heartRateReserve = maxHeartRate - restingHeartRate;
                minHR = Math.round((heartRateReserve * zone.min / 100) + restingHeartRate);
                maxHR = Math.round((heartRateReserve * zone.max / 100) + restingHeartRate);
            } else {
                // Simple percentage of max heart rate
                minHR = Math.round(maxHeartRate * zone.min / 100);
                maxHR = Math.round(maxHeartRate * zone.max / 100);
            }

            return {
                ...zone,
                minHR,
                maxHR,
                intensity: `${zone.min}-${zone.max}%`
            };
        });

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (age && restingHeartRate && method) {
        calculateHeartRateZones();
    }

    // Get zone for current heart rate
    function getZoneForHeartRate(hr) {
        return heartRateZones.find(zone => hr >= zone.minHR && hr <= zone.maxHR);
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Heart Rate Zone Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your target heart rate zones for different exercise intensities. 
                Optimize your workouts for fat burning, endurance, or performance goals.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                    type="number"
                    label="Age (years)"
                    bind:value={age}
                    placeholder="30"
                    min="1"
                    max="120"
                    step="1"
                />

                <Input
                    type="number"
                    label="Resting Heart Rate (bpm)"
                    bind:value={restingHeartRate}
                    placeholder="60"
                    min="30"
                    max="120"
                    step="1"
                />

                <Select
                    label="Calculation Method"
                    bind:value={method}
                    options={methods}
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Maximum Heart Rate -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-5xl font-bold text-red-600 mb-4">
                    {maxHeartRate} bpm
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Maximum Heart Rate
                </div>
                <div class="text-sm text-gray-500">
                    Based on age: 220 - {age} = {maxHeartRate}
                </div>
            </div>
        </Card>

        <!-- Heart Rate Zones -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Your Heart Rate Training Zones
                </h3>

                <div class="space-y-4">
                    {#each heartRateZones as zone}
                        <div class="p-4 border rounded-lg {zone.color}">
                            <div class="flex justify-between items-center mb-2">
                                <h4 class="font-semibold text-lg">{zone.name}</h4>
                                <span class="text-sm font-medium">{zone.intensity}</span>
                            </div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-2xl font-bold">{zone.minHR} - {zone.maxHR} bpm</span>
                                <span class="text-sm">Target Range</span>
                            </div>
                            <p class="text-sm opacity-80">{zone.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Zone Benefits -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Training Zone Benefits
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">💙 Recovery Zone (50-60%)</h4>
                            <p class="text-blue-800 text-sm">
                                Perfect for warm-ups, cool-downs, and active recovery days. 
                                Promotes blood flow and aids in recovery.
                            </p>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">💚 Aerobic Base (60-70%)</h4>
                            <p class="text-green-800 text-sm">
                                Optimal for fat burning and building aerobic endurance. 
                                Can be sustained for long periods.
                            </p>
                        </div>

                        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <h4 class="font-semibold text-yellow-900 mb-2">💛 Aerobic Zone (70-80%)</h4>
                            <p class="text-yellow-800 text-sm">
                                Improves cardiovascular fitness and aerobic capacity. 
                                Good for general fitness and endurance.
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">🧡 Lactate Threshold (80-90%)</h4>
                            <p class="text-orange-800 text-sm">
                                Improves lactate threshold and performance. 
                                Challenging but sustainable for trained athletes.
                            </p>
                        </div>

                        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <h4 class="font-semibold text-red-900 mb-2">❤️ Neuromuscular (90-100%)</h4>
                            <p class="text-red-800 text-sm">
                                Maximum effort training for power and speed. 
                                Short intervals only, requires adequate recovery.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Training Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Heart Rate Training Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📱 Monitor Your Heart Rate
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Use a heart rate monitor, fitness tracker, or smartwatch for accurate readings. 
                            Manual pulse checks work but may be less precise during exercise.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Train in Different Zones
                        </h4>
                        <p class="text-green-800 text-sm">
                            Vary your training across different zones for optimal fitness. 
                            80% of training should be in lower zones, 20% in higher intensity zones.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>