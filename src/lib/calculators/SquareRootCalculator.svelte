<script>
    /**
     * Square Root Calculator Component
     * Calculate square roots, perfect squares, and cube roots
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let number = 16;
    let calculationType = 'square-root';

    // Results
    let result = 0;
    let showResults = false;
    let isPerfectSquare = false;
    let isPerfectCube = false;

    // Calculation types
    const calculationTypes = [
        { value: 'square-root', label: 'Square Root (√x)' },
        { value: 'cube-root', label: 'Cube Root (∛x)' },
        { value: 'nth-root', label: 'Nth Root' },
        { value: 'square', label: 'Perfect Square (x²)' },
        { value: 'cube', label: 'Perfect Cube (x³)' }
    ];

    // For nth root
    let nthRoot = 3;

    // Calculate based on type
    function calculate() {
        if (number === null || number === undefined) {
            showResults = false;
            return;
        }

        switch (calculationType) {
            case 'square-root':
                if (number < 0) {
                    showResults = false;
                    return;
                }
                result = Math.sqrt(number);
                isPerfectSquare = Math.floor(result) === result;
                break;
                
            case 'cube-root':
                result = Math.cbrt(number);
                isPerfectCube = Math.abs(Math.round(result) ** 3 - number) < 0.000001;
                break;
                
            case 'nth-root':
                if (nthRoot === 0 || (number < 0 && nthRoot % 2 === 0)) {
                    showResults = false;
                    return;
                }
                result = Math.pow(Math.abs(number), 1 / nthRoot);
                if (number < 0 && nthRoot % 2 === 1) {
                    result = -result;
                }
                break;
                
            case 'square':
                result = number * number;
                break;
                
            case 'cube':
                result = number * number * number;
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (number !== null && calculationType) {
        calculate();
    }

    // Get perfect squares near the input
    function getNearbyPerfectSquares() {
        if (calculationType !== 'square-root' || number <= 0) return [];
        
        const sqrt = Math.sqrt(number);
        const lower = Math.floor(sqrt);
        const upper = Math.ceil(sqrt);
        
        const squares = [];
        for (let i = Math.max(1, lower - 2); i <= upper + 2; i++) {
            squares.push({
                base: i,
                square: i * i,
                isCurrent: i * i === number
            });
        }
        
        return squares;
    }

    $: nearbySquares = getNearbyPerfectSquares();

    // Get perfect cubes near the input
    function getNearbyCubes() {
        if (calculationType !== 'cube-root') return [];
        
        const cbrt = Math.cbrt(Math.abs(number));
        const lower = Math.floor(cbrt);
        const upper = Math.ceil(cbrt);
        
        const cubes = [];
        for (let i = Math.max(1, lower - 2); i <= upper + 2; i++) {
            const cube = i * i * i;
            cubes.push({
                base: i,
                cube: cube,
                isCurrent: Math.abs(cube - Math.abs(number)) < 0.001
            });
        }
        
        return cubes;
    }

    $: nearbyCubes = getNearbyCubes();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Square Root Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate square roots, cube roots, nth roots, and perfect powers. 
                Includes perfect square and cube detection with nearby values.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Type"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Number"
                        bind:value={number}
                        placeholder="16"
                        step="0.000001"
                    />

                    {#if calculationType === 'nth-root'}
                        <Input
                            type="number"
                            label="Root (n)"
                            bind:value={nthRoot}
                            placeholder="3"
                            min="1"
                            step="1"
                        />
                    {/if}
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
                        {#if calculationType === 'square-root'}
                            √{formatNumber(number, 6)}
                        {:else if calculationType === 'cube-root'}
                            ∛{formatNumber(number, 6)}
                        {:else if calculationType === 'nth-root'}
                            {nthRoot}√{formatNumber(number, 6)}
                        {:else if calculationType === 'square'}
                            {formatNumber(number, 6)}²
                        {:else if calculationType === 'cube'}
                            {formatNumber(number, 6)}³
                        {/if}
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(result, 8)}
                    </div>
                    
                    {#if calculationType === 'square-root' && isPerfectSquare}
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            ✅ Perfect Square
                        </div>
                    {:else if calculationType === 'cube-root' && isPerfectCube}
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            ✅ Perfect Cube
                        </div>
                    {/if}
                </div>
            </div>
        </Card>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Calculation Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Input Number:</span>
                            <span class="font-semibold">{formatNumber(number, 6)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Result:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(result, 8)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Rounded Result:</span>
                            <span class="font-semibold">{formatNumber(result, 4)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Integer Part:</span>
                            <span class="font-semibold">{Math.floor(Math.abs(result))}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        {#if calculationType === 'square-root'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Verification:</span>
                                <span class="font-semibold">{formatNumber(result, 4)}² = {formatNumber(result * result, 6)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Perfect Square:</span>
                                <span class="font-semibold {isPerfectSquare ? 'text-green-600' : 'text-orange-600'}">
                                    {isPerfectSquare ? 'Yes' : 'No'}
                                </span>
                            </div>
                        {:else if calculationType === 'cube-root'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Verification:</span>
                                <span class="font-semibold">{formatNumber(result, 4)}³ = {formatNumber(result * result * result, 6)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Perfect Cube:</span>
                                <span class="font-semibold {isPerfectCube ? 'text-green-600' : 'text-orange-600'}">
                                    {isPerfectCube ? 'Yes' : 'No'}
                                </span>
                            </div>
                        {:else if calculationType === 'nth-root'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Root Type:</span>
                                <span class="font-semibold">{nthRoot}{nthRoot === 2 ? 'nd' : nthRoot === 3 ? 'rd' : 'th'} root</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Verification:</span>
                                <span class="font-semibold">{formatNumber(result, 4)}^{nthRoot} = {formatNumber(Math.pow(result, nthRoot), 6)}</span>
                            </div>
                        {:else if calculationType === 'square'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Square Root:</span>
                                <span class="font-semibold">√{formatNumber(result, 2)} = {formatNumber(number, 6)}</span>
                            </div>
                        {:else if calculationType === 'cube'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Cube Root:</span>
                                <span class="font-semibold">∛{formatNumber(result, 2)} = {formatNumber(number, 6)}</span>
                            </div>
                        {/if}
                        
                        <div class="flex justify-between">
                            <span class="text-gray-600">Decimal Places:</span>
                            <span class="font-semibold">{result.toString().split('.')[1]?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Perfect Squares Reference -->
        {#if calculationType === 'square-root' && nearbySquares.length > 0}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Perfect Squares Near {formatNumber(number, 0)}
                    </h3>

                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {#each nearbySquares as square}
                            <div class="text-center p-3 rounded-lg {square.isCurrent ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}">
                                <div class="font-semibold text-gray-900">{square.base}² = {square.square}</div>
                                <div class="text-sm text-gray-600">√{square.square} = {square.base}</div>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Perfect Cubes Reference -->
        {#if calculationType === 'cube-root' && nearbyCubes.length > 0}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Perfect Cubes Near {formatNumber(Math.abs(number), 0)}
                    </h3>

                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {#each nearbyCubes as cube}
                            <div class="text-center p-3 rounded-lg {cube.isCurrent ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'}">
                                <div class="font-semibold text-gray-900">{cube.base}³ = {cube.cube}</div>
                                <div class="text-sm text-gray-600">∛{cube.cube} = {cube.base}</div>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Common Roots Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Square and Cube Roots
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Perfect Squares</h4>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            {#each [
                                {n: 1, sq: 1}, {n: 2, sq: 4}, {n: 3, sq: 9}, {n: 4, sq: 16},
                                {n: 5, sq: 25}, {n: 6, sq: 36}, {n: 7, sq: 49}, {n: 8, sq: 64},
                                {n: 9, sq: 81}, {n: 10, sq: 100}, {n: 11, sq: 121}, {n: 12, sq: 144}
                            ] as item}
                                <div class="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>√{item.sq}</span>
                                    <span class="font-medium">{item.n}</span>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Perfect Cubes</h4>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            {#each [
                                {n: 1, cb: 1}, {n: 2, cb: 8}, {n: 3, cb: 27}, {n: 4, cb: 64},
                                {n: 5, cb: 125}, {n: 6, cb: 216}, {n: 7, cb: 343}, {n: 8, cb: 512},
                                {n: 9, cb: 729}, {n: 10, cb: 1000}
                            ] as item}
                                <div class="flex justify-between p-2 bg-gray-50 rounded">
                                    <span>∛{item.cb}</span>
                                    <span class="font-medium">{item.n}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Properties and Rules -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Root Properties and Rules
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Square Root Properties</h4>
                            <div class="text-blue-800 text-sm space-y-1">
                                <div>√(a × b) = √a × √b</div>
                                <div>√(a ÷ b) = √a ÷ √b</div>
                                <div>√a² = |a|</div>
                                <div>√a × √a = a (for a ≥ 0)</div>
                            </div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Cube Root Properties</h4>
                            <div class="text-green-800 text-sm space-y-1">
                                <div>∛(a × b) = ∛a × ∛b</div>
                                <div>∛(a ÷ b) = ∛a ÷ ∛b</div>
                                <div>∛a³ = a</div>
                                <div>∛(-a) = -∛a</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">General Rules</h4>
                            <div class="text-purple-800 text-sm space-y-1">
                                <div>ⁿ√(aᵐ) = a^(m/n)</div>
                                <div>ⁿ√a × ⁿ√b = ⁿ√(a × b)</div>
                                <div>(ⁿ√a)ⁿ = a</div>
                                <div>ⁿ√ᵐ√a = ⁿᵐ√a</div>
                            </div>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">Important Notes</h4>
                            <div class="text-orange-800 text-sm space-y-1">
                                <div>• Even roots of negative numbers are undefined in real numbers</div>
                                <div>• Odd roots of negative numbers are negative</div>
                                <div>• √0 = 0 and ⁿ√0 = 0</div>
                                <div>• √1 = 1 and ⁿ√1 = 1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>