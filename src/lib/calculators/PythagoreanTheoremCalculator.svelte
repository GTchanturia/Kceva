<script>
    /**
     * Pythagorean Theorem Calculator Component
     * Calculate missing sides of right triangles using a² + b² = c²
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let sideA = 3;
    let sideB = 4;
    let sideC = '';
    let findSide = 'c';

    // Results
    let result = 0;
    let showResults = false;
    let isValidTriangle = true;

    // Side options
    const sideOptions = [
        { value: 'c', label: 'Hypotenuse (c)' },
        { value: 'a', label: 'Side A (a)' },
        { value: 'b', label: 'Side B (b)' }
    ];

    // Calculate missing side
    function calculatePythagorean() {
        isValidTriangle = true;
        
        switch (findSide) {
            case 'c':
                if (sideA <= 0 || sideB <= 0) {
                    showResults = false;
                    return;
                }
                result = Math.sqrt(sideA * sideA + sideB * sideB);
                sideC = result;
                break;
                
            case 'a':
                if (sideB <= 0 || sideC <= 0) {
                    showResults = false;
                    return;
                }
                if (sideC <= sideB) {
                    isValidTriangle = false;
                    showResults = false;
                    return;
                }
                result = Math.sqrt(sideC * sideC - sideB * sideB);
                sideA = result;
                break;
                
            case 'b':
                if (sideA <= 0 || sideC <= 0) {
                    showResults = false;
                    return;
                }
                if (sideC <= sideA) {
                    isValidTriangle = false;
                    showResults = false;
                    return;
                }
                result = Math.sqrt(sideC * sideC - sideA * sideA);
                sideB = result;
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (findSide) {
        calculatePythagorean();
    }

    // Calculate triangle properties
    $: area = showResults ? (sideA * sideB) / 2 : 0;
    $: perimeter = showResults ? sideA + sideB + sideC : 0;
    $: angleA = showResults ? Math.atan(sideA / sideB) * 180 / Math.PI : 0;
    $: angleB = showResults ? Math.atan(sideB / sideA) * 180 / Math.PI : 0;
    $: angleC = 90; // Always 90 degrees in a right triangle
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Pythagorean Theorem Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate the missing side of a right triangle using the Pythagorean theorem: 
                a² + b² = c². Perfect for construction, navigation, and geometry problems.
            </p>

            <div class="space-y-6">
                <Select
                    label="Which side do you want to find?"
                    bind:value={findSide}
                    options={sideOptions}
                />

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                        type="number"
                        label="Side A"
                        bind:value={sideA}
                        placeholder="3"
                        min="0.01"
                        step="0.01"
                        disabled={findSide === 'a'}
                    />

                    <Input
                        type="number"
                        label="Side B"
                        bind:value={sideB}
                        placeholder="4"
                        min="0.01"
                        step="0.01"
                        disabled={findSide === 'b'}
                    />

                    <Input
                        type="number"
                        label="Hypotenuse (C)"
                        bind:value={sideC}
                        placeholder="5"
                        min="0.01"
                        step="0.01"
                        disabled={findSide === 'c'}
                    />
                </div>
            </div>
        </div>
    </Card>

    <!-- Error Message -->
    {#if !isValidTriangle}
        <Card>
            <div class="p-6 bg-red-50 border border-red-200">
                <div class="flex items-center">
                    <div class="text-red-600 text-xl mr-3">⚠️</div>
                    <div>
                        <h3 class="text-lg font-semibold text-red-800 mb-1">Invalid Triangle</h3>
                        <p class="text-red-700">The hypotenuse must be longer than the other sides in a right triangle.</p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}

    <!-- Results -->
    {#if showResults && isValidTriangle}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        Missing Side ({findSide.toUpperCase()})
                    </div>
                    <div class="text-5xl font-bold text-blue-600 mb-2">
                        {formatNumber(result, 4)}
                    </div>
                    <div class="text-lg text-gray-600">
                        units
                    </div>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="font-mono text-lg text-blue-900">
                        {formatNumber(sideA, 2)}² + {formatNumber(sideB, 2)}² = {formatNumber(sideC, 2)}²
                    </div>
                    <div class="text-sm text-blue-700 mt-1">
                        {formatNumber(sideA * sideA, 2)} + {formatNumber(sideB * sideB, 2)} = {formatNumber(sideC * sideC, 2)}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Triangle Properties -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(area, 3)}
                    </div>
                    <div class="text-gray-600">Area (units²)</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(perimeter, 3)}
                    </div>
                    <div class="text-gray-600">Perimeter</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-lg font-bold text-orange-600 mb-2">
                        Right Triangle
                    </div>
                    <div class="text-gray-600">Triangle Type</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Triangle Details
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Side A:</span>
                            <span class="font-semibold">{formatNumber(sideA, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Side B:</span>
                            <span class="font-semibold">{formatNumber(sideB, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Hypotenuse (C):</span>
                            <span class="font-semibold text-blue-600">{formatNumber(sideC, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Area:</span>
                            <span class="font-semibold text-green-600">{formatNumber(area, 6)} units²</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Perimeter:</span>
                            <span class="font-semibold text-purple-600">{formatNumber(perimeter, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Angle A:</span>
                            <span class="font-semibold">{formatNumber(angleA, 2)}°</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Angle B:</span>
                            <span class="font-semibold">{formatNumber(angleB, 2)}°</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Angle C:</span>
                            <span class="font-semibold text-orange-600">{angleC}°</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Visual Representation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Right Triangle Visualization
                </h3>

                <div class="flex justify-center mb-6">
                    <svg width="400" height="300" viewBox="0 0 400 300" class="border border-gray-200 rounded-lg">
                        <!-- Triangle -->
                        <polygon points="50,250 300,250 300,100" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" stroke-width="2"/>
                        
                        <!-- Right angle indicator -->
                        <rect x="280" y="230" width="20" height="20" fill="none" stroke="#ef4444" stroke-width="1"/>
                        
                        <!-- Side A (horizontal) -->
                        <text x="175" y="270" fill="#10b981" font-size="14" text-anchor="middle">a = {formatNumber(sideA, 2)}</text>
                        
                        <!-- Side B (vertical) -->
                        <text x="315" y="175" fill="#ef4444" font-size="14" text-anchor="middle">b = {formatNumber(sideB, 2)}</text>
                        
                        <!-- Hypotenuse C -->
                        <text x="160" y="160" fill="#8b5cf6" font-size="14" text-anchor="middle" transform="rotate(-37, 160, 160)">c = {formatNumber(sideC, 2)}</text>
                        
                        <!-- Angle labels -->
                        <text x="70" y="240" fill="#f59e0b" font-size="12">A = {formatNumber(angleA, 1)}°</text>
                        <text x="270" y="120" fill="#f59e0b" font-size="12">B = {formatNumber(angleB, 1)}°</text>
                        <text x="290" y="240" fill="#f59e0b" font-size="12">C = 90°</text>
                    </svg>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                    <div class="p-3 bg-green-50 rounded-lg">
                        <div class="font-semibold text-green-900">Side A</div>
                        <div class="text-green-700">Adjacent to angle A</div>
                        <div class="text-green-600">{formatNumber(sideA, 2)} units</div>
                    </div>
                    <div class="p-3 bg-red-50 rounded-lg">
                        <div class="font-semibold text-red-900">Side B</div>
                        <div class="text-red-700">Opposite to angle A</div>
                        <div class="text-red-600">{formatNumber(sideB, 2)} units</div>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-lg">
                        <div class="font-semibold text-purple-900">Hypotenuse C</div>
                        <div class="text-purple-700">Longest side</div>
                        <div class="text-purple-600">{formatNumber(sideC, 2)} units</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Theorem Explanation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Pythagorean Theorem
                </h3>

                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-blue-900 mb-2">a² + b² = c²</div>
                        <div class="text-blue-800">
                            In a right triangle, the square of the hypotenuse equals 
                            the sum of squares of the other two sides.
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">Finding Hypotenuse</h4>
                        <div class="text-green-800 text-sm">
                            <div class="font-mono">c = √(a² + b²)</div>
                            <div class="mt-1">When you know both legs</div>
                        </div>
                    </div>

                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 class="font-semibold text-red-900 mb-2">Finding a Leg</h4>
                        <div class="text-red-800 text-sm">
                            <div class="font-mono">a = √(c² - b²)</div>
                            <div class="mt-1">When you know hypotenuse and one leg</div>
                        </div>
                    </div>

                    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 class="font-semibold text-purple-900 mb-2">Verification</h4>
                        <div class="text-purple-800 text-sm">
                            <div class="font-mono">{formatNumber(sideA * sideA + sideB * sideB, 2)} = {formatNumber(sideC * sideC, 2)}</div>
                            <div class="mt-1">Proof that it's a right triangle</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Applications -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Real-World Applications
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900">🏗️ Construction</h4>
                            <p class="text-blue-800 text-sm">Ensure walls are square, calculate diagonal braces, roof measurements.</p>
                        </div>
                        
                        <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900">🧭 Navigation</h4>
                            <p class="text-green-800 text-sm">Calculate direct distances, GPS coordinates, shortest paths.</p>
                        </div>
                        
                        <div class="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900">📐 Engineering</h4>
                            <p class="text-purple-800 text-sm">Structural analysis, force calculations, design optimization.</p>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900">🎯 Sports</h4>
                            <p class="text-orange-800 text-sm">Baseball diamond distances, soccer field diagonals, court measurements.</p>
                        </div>
                        
                        <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <h4 class="font-semibold text-red-900">📺 Technology</h4>
                            <p class="text-red-800 text-sm">Screen sizes, antenna positioning, cable lengths.</p>
                        </div>
                        
                        <div class="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                            <h4 class="font-semibold text-teal-900">🏠 Home Improvement</h4>
                            <p class="text-teal-800 text-sm">Ladder safety, room diagonals, furniture placement.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>