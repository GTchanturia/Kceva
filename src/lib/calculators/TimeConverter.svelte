<script>
    /**
     * Time Converter Component
     * Convert between different time units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1;
    let fromUnit = 'hours';
    let toUnit = 'minutes';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Time units with conversion factors to seconds
    const timeUnits = [
        // Basic units
        { value: 'nanoseconds', label: 'Nanoseconds (ns)', factor: 1e-9, category: 'Precise' },
        { value: 'microseconds', label: 'Microseconds (μs)', factor: 1e-6, category: 'Precise' },
        { value: 'milliseconds', label: 'Milliseconds (ms)', factor: 0.001, category: 'Precise' },
        { value: 'seconds', label: 'Seconds (s)', factor: 1, category: 'Basic' },
        { value: 'minutes', label: 'Minutes (min)', factor: 60, category: 'Basic' },
        { value: 'hours', label: 'Hours (h)', factor: 3600, category: 'Basic' },
        
        // Calendar units
        { value: 'days', label: 'Days', factor: 86400, category: 'Calendar' },
        { value: 'weeks', label: 'Weeks', factor: 604800, category: 'Calendar' },
        { value: 'months', label: 'Months (30 days)', factor: 2592000, category: 'Calendar' },
        { value: 'years', label: 'Years (365 days)', factor: 31536000, category: 'Calendar' },
        
        // Specialized
        { value: 'decades', label: 'Decades', factor: 315360000, category: 'Long' },
        { value: 'centuries', label: 'Centuries', factor: 3153600000, category: 'Long' },
        { value: 'millennia', label: 'Millennia', factor: 31536000000, category: 'Long' }
    ];

    // Convert time
    function convertTime() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = timeUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = timeUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        // Convert to seconds first, then to target unit
        const seconds = inputValue * fromFactor;
        convertedValue = seconds / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertTime();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertTime();
    }

    // Get unit label
    function getUnitLabel(unitValue) {
        return timeUnits.find(unit => unit.value === unitValue)?.label || unitValue;
    }

    // Get common conversions
    function getCommonConversions() {
        const fromFactor = timeUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const commonUnits = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
        
        return commonUnits
            .filter(unit => unit !== fromUnit)
            .map(unit => {
                const toFactor = timeUnits.find(u => u.value === unit)?.factor || 1;
                const seconds = inputValue * fromFactor;
                const converted = seconds / toFactor;
                return {
                    unit,
                    label: timeUnits.find(u => u.value === unit)?.label || unit,
                    value: converted
                };
            });
    }

    $: commonConversions = showResults ? getCommonConversions() : [];

    // Format time in human readable format
    function formatDuration(totalSeconds) {
        if (totalSeconds < 60) {
            return `${formatNumber(totalSeconds, 2)} seconds`;
        }
        
        const years = Math.floor(totalSeconds / 31536000);
        const days = Math.floor((totalSeconds % 31536000) / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        const parts = [];
        if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
        if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
        if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
        
        return parts.slice(0, 3).join(', ');
    }

    $: humanReadable = showResults ? formatDuration(inputValue * (timeUnits.find(u => u.value === fromUnit)?.factor || 1)) : '';
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Time Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Time Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between different time units, from nanoseconds to millennia. 
                Perfect for scientific calculations, project planning, and everyday time conversions.
            </p>

            <div class="space-y-6">
                <!-- Value Input -->
                <div>
                    <Input
                        type="number"
                        label="Time Value"
                        bind:value={inputValue}
                        placeholder="1"
                        step="0.000001"
                    />
                </div>

                <!-- Unit Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={timeUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={timeUnits}
                            className="flex-1"
                        />

                        <Button 
                            variant="outline" 
                            size="sm" 
                            on:click={swapUnits}
                            className="mb-0"
                        >
                            🔄 Swap
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {formatNumber(inputValue, 6)} {fromUnit}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(convertedValue, 8)} {toUnit}
                    </div>
                </div>

                <div class="text-gray-600">
                    <div class="text-sm">Conversion Factor</div>
                    <div class="text-lg font-semibold">
                        1 {fromUnit} = {formatNumber(convertedValue / inputValue, 8)} {toUnit}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Human Readable Format -->
        {#if humanReadable}
            <Card>
                <div class="p-6 text-center bg-blue-50 border border-blue-200">
                    <h3 class="text-lg font-semibold text-blue-900 mb-2">
                        Human Readable Format
                    </h3>
                    <div class="text-xl text-blue-800">
                        {humanReadable}
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Conversion Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Conversion Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">From:</span>
                            <span class="font-semibold">{formatNumber(inputValue, 6)} {getUnitLabel(fromUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">To:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(convertedValue, 8)} {getUnitLabel(toUnit)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">In Seconds:</span>
                            <span class="font-semibold">{formatNumber(inputValue * (timeUnits.find(u => u.value === fromUnit)?.factor || 1), 6)} s</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Reverse Factor:</span>
                            <span class="font-semibold">1 {toUnit} = {formatNumber(inputValue / convertedValue, 8)} {fromUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Scientific Notation:</span>
                            <span class="font-semibold">{convertedValue.toExponential(3)} {toUnit}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Precision:</span>
                            <span class="font-semibold">{convertedValue.toString().split('.')[1]?.length || 0} decimal places</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Conversions -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    {formatNumber(inputValue, 3)} {fromUnit} in Other Units
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each commonConversions as conversion}
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{conversion.unit}</div>
                            <div class="text-lg text-blue-600">{formatNumber(conversion.value, 6)}</div>
                            <div class="text-xs text-gray-500">{conversion.label}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Time Unit Categories -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Time Unit Categories
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">Precise Time</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Nanosecond:</span>
                                <span class="font-medium">10⁻⁹ s</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Microsecond:</span>
                                <span class="font-medium">10⁻⁶ s</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Millisecond:</span>
                                <span class="font-medium">10⁻³ s</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Basic Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Second:</span>
                                <span class="font-medium">Base unit</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Minute:</span>
                                <span class="font-medium">60 s</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Hour:</span>
                                <span class="font-medium">3,600 s</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-purple-900">Calendar Units</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Day:</span>
                                <span class="font-medium">24 hours</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Week:</span>
                                <span class="font-medium">7 days</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Month:</span>
                                <span class="font-medium">~30 days</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Year:</span>
                                <span class="font-medium">365 days</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-orange-900">Long Periods</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Decade:</span>
                                <span class="font-medium">10 years</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Century:</span>
                                <span class="font-medium">100 years</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Millennium:</span>
                                <span class="font-medium">1,000 years</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Time References -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Time References
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Human Activities</h4>
                            <div class="text-blue-800 text-sm space-y-1">
                                <div>• Blink of an eye: ~100-150 ms</div>
                                <div>• Heartbeat: ~1 second</div>
                                <div>• Deep breath: ~4-6 seconds</div>
                                <div>• Average attention span: ~8 minutes</div>
                                <div>• Power nap: ~20 minutes</div>
                                <div>• Full sleep cycle: ~90 minutes</div>
                                <div>• Average workday: ~8 hours</div>
                            </div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Technology</h4>
                            <div class="text-green-800 text-sm space-y-1">
                                <div>• CPU clock cycle: ~1 ns</div>
                                <div>• RAM access: ~10-100 ns</div>
                                <div>• SSD read: ~0.1 ms</div>
                                <div>• Network ping: ~10-100 ms</div>
                                <div>• Video frame (60fps): ~16.7 ms</div>
                                <div>• Hard drive seek: ~10 ms</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">Natural Cycles</h4>
                            <div class="text-purple-800 text-sm space-y-1">
                                <div>• Earth rotation: 24 hours</div>
                                <div>• Lunar month: ~29.5 days</div>
                                <div>• Earth orbit: 365.25 days</div>
                                <div>• Seasons: ~3 months</div>
                                <div>• Solar cycle: ~11 years</div>
                                <div>• Precession cycle: ~26,000 years</div>
                            </div>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">Historical Periods</h4>
                            <div class="text-orange-800 text-sm space-y-1">
                                <div>• Human lifespan: ~80 years</div>
                                <div>• Recorded history: ~5,000 years</div>
                                <div>• Agriculture: ~10,000 years</div>
                                <div>• Modern humans: ~200,000 years</div>
                                <div>• Dinosaur extinction: ~65M years</div>
                                <div>• Age of Earth: ~4.5B years</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Time Conversion Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Time Conversion Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            ⏰ Quick Mental Math
                        </h4>
                        <p class="text-blue-800 text-sm">
                            Remember key conversions: 1 hour = 3,600 seconds, 1 day = 86,400 seconds, 
                            1 year ≈ 31.5 million seconds. These help with quick estimates.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            📅 Calendar Variations
                        </h4>
                        <p class="text-green-800 text-sm">
                            Months vary from 28-31 days, and leap years add an extra day. 
                            For precise calculations, consider using exact dates rather than average values.
                        </p>
                    </div>

                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">
                            🔬 Scientific Precision
                        </h4>
                        <p class="text-purple-800 text-sm">
                            In scientific contexts, use precise definitions: 1 second is defined by 
                            atomic transitions, and time zones/daylight saving don't affect calculations.
                        </p>
                    </div>

                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 class="font-semibold text-orange-900 mb-2">
                            🌍 Time Zones
                        </h4>
                        <p class="text-orange-800 text-sm">
                            This converter works with duration, not specific times. 
                            For time zone conversions, you'll need a different tool that handles dates and locations.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>