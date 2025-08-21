<script>
    /**
     * Stopwatch Component
     * Digital stopwatch with lap times and precision timing
     */

    import { onDestroy } from 'svelte';
    import Card from "$lib/components/ui/Card.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // State
    let startTime = 0;
    let elapsedTime = 0;
    let isRunning = false;
    let interval;
    let lapTimes = [];

    // Update elapsed time
    function updateTime() {
        if (isRunning) {
            elapsedTime = Date.now() - startTime;
        }
    }

    // Start stopwatch
    function start() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            isRunning = true;
            interval = setInterval(updateTime, 10); // Update every 10ms for precision
        }
    }

    // Stop stopwatch
    function stop() {
        if (isRunning) {
            isRunning = false;
            clearInterval(interval);
        }
    }

    // Reset stopwatch
    function reset() {
        stop();
        elapsedTime = 0;
        lapTimes = [];
    }

    // Record lap time
    function lap() {
        if (isRunning) {
            const lapTime = elapsedTime;
            const previousLap = lapTimes.length > 0 ? lapTimes[lapTimes.length - 1].total : 0;
            const splitTime = lapTime - previousLap;
            
            lapTimes = [...lapTimes, {
                number: lapTimes.length + 1,
                total: lapTime,
                split: splitTime
            }];
        }
    }

    // Format time display
    function formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }

    onDestroy(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Stopwatch Display -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                Digital Stopwatch
            </h2>

            <!-- Time Display -->
            <div class="text-center mb-8">
                <div class="text-6xl md:text-8xl font-mono font-bold text-blue-600 mb-4">
                    {formatTime(elapsedTime)}
                </div>
                <div class="text-lg text-gray-600">
                    {isRunning ? '🟢 Running' : '⏸️ Stopped'}
                </div>
            </div>

            <!-- Controls -->
            <div class="flex justify-center space-x-4">
                {#if !isRunning}
                    <Button variant="primary" size="lg" on:click={start}>
                        ▶️ Start
                    </Button>
                {:else}
                    <Button variant="outline" size="lg" on:click={stop}>
                        ⏸️ Stop
                    </Button>
                {/if}

                <Button 
                    variant="outline" 
                    size="lg" 
                    on:click={lap}
                    disabled={!isRunning}
                >
                    🏁 Lap
                </Button>

                <Button variant="outline" size="lg" on:click={reset}>
                    🔄 Reset
                </Button>
            </div>
        </div>
    </Card>

    <!-- Lap Times -->
    {#if lapTimes.length > 0}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Lap Times
                </h3>

                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lap
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Split Time
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Time
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each lapTimes.reverse() as lap}
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Lap {lap.number}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono">
                                        {formatTime(lap.split)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-mono">
                                        {formatTime(lap.total)}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    {/if}
</div>