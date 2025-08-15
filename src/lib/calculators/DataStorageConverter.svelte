<script>
    /**
     * Data Storage Converter Component
     * Convert between different data storage units
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 1;
    let fromUnit = 'GB';
    let toUnit = 'MB';

    // Results
    let convertedValue = 0;
    let showResults = false;

    // Data storage units with conversion factors to bytes
    const storageUnits = [
        // Binary (base 2)
        { value: 'B', label: 'Bytes (B)', factor: 1, category: 'Binary' },
        { value: 'KiB', label: 'Kibibytes (KiB)', factor: 1024, category: 'Binary' },
        { value: 'MiB', label: 'Mebibytes (MiB)', factor: 1048576, category: 'Binary' },
        { value: 'GiB', label: 'Gibibytes (GiB)', factor: 1073741824, category: 'Binary' },
        { value: 'TiB', label: 'Tebibytes (TiB)', factor: 1099511627776, category: 'Binary' },
        { value: 'PiB', label: 'Pebibytes (PiB)', factor: 1125899906842624, category: 'Binary' },
        
        // Decimal (base 10)
        { value: 'KB', label: 'Kilobytes (KB)', factor: 1000, category: 'Decimal' },
        { value: 'MB', label: 'Megabytes (MB)', factor: 1000000, category: 'Decimal' },
        { value: 'GB', label: 'Gigabytes (GB)', factor: 1000000000, category: 'Decimal' },
        { value: 'TB', label: 'Terabytes (TB)', factor: 1000000000000, category: 'Decimal' },
        { value: 'PB', label: 'Petabytes (PB)', factor: 1000000000000000, category: 'Decimal' },
        
        // Bits
        { value: 'bit', label: 'Bits', factor: 0.125, category: 'Bits' },
        { value: 'Kbit', label: 'Kilobits (Kbit)', factor: 125, category: 'Bits' },
        { value: 'Mbit', label: 'Megabits (Mbit)', factor: 125000, category: 'Bits' },
        { value: 'Gbit', label: 'Gigabits (Gbit)', factor: 125000000, category: 'Bits' }
    ];

    // Convert data storage
    function convertStorage() {
        if (inputValue === null || inputValue === undefined) {
            showResults = false;
            return;
        }

        const fromFactor = storageUnits.find(unit => unit.value === fromUnit)?.factor || 1;
        const toFactor = storageUnits.find(unit => unit.value === toUnit)?.factor || 1;
        
        const bytes = inputValue * fromFactor;
        convertedValue = bytes / toFactor;
        
        showResults = true;
    }

    // Swap units
    function swapUnits() {
        const temp = fromUnit;
        fromUnit = toUnit;
        toUnit = temp;
        convertStorage();
    }

    // Auto-convert when inputs change
    $: if (inputValue !== null && fromUnit && toUnit) {
        convertStorage();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Data Storage Converter
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between MB, GB, TB and other data storage units. 
                Supports both binary (1024-based) and decimal (1000-based) systems.
            </p>

            <div class="space-y-6">
                <div>
                    <Input
                        type="number"
                        label="Storage Value"
                        bind:value={inputValue}
                        placeholder="1"
                        step="0.001"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Unit"
                        bind:value={fromUnit}
                        options={storageUnits}
                    />

                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Unit"
                            bind:value={toUnit}
                            options={storageUnits}
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

    {#if showResults}
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
            </div>
        </Card>

        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Storage Size References
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-blue-900">File Sizes</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Text document:</span>
                                <span class="font-medium">~50 KB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>High-res photo:</span>
                                <span class="font-medium">~5 MB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Song (MP3):</span>
                                <span class="font-medium">~4 MB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>HD movie:</span>
                                <span class="font-medium">~4 GB</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-green-900">Storage Devices</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>USB flash drive:</span>
                                <span class="font-medium">8-128 GB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>SSD:</span>
                                <span class="font-medium">256 GB - 4 TB</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Hard drive:</span>
                                <span class="font-medium">500 GB - 20 TB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>