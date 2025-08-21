<script>
    /**
     * Cylinder Volume Calculator Component
     * Calculate volume, surface area, and other cylinder properties
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let radius = 5;
    let height = 10;

    // Results
    let volume = 0;
    let surfaceArea = 0;
    let lateralArea = 0;
    let baseArea = 0;
    let diameter = 0;
    let showResults = false;

    // Calculate cylinder properties
    function calculateCylinder() {
        if (radius <= 0 || height <= 0) {
            showResults = false;
            return;
        }

        diameter = radius * 2;
        baseArea = Math.PI * radius * radius;
        volume = baseArea * height;
        lateralArea = 2 * Math.PI * radius * height;
        surfaceArea = lateralArea + (2 * baseArea);

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (radius && height) {
        calculateCylinder();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Cylinder Volume Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate volume, surface area, and other properties of cylinders. 
                Perfect for engineering, construction, and manufacturing calculations.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Radius"
                    bind:value={radius}
                    placeholder="5"
                    min="0.01"
                    step="0.01"
                />

                <Input
                    type="number"
                    label="Height"
                    bind:value={height}
                    placeholder="10"
                    min="0.01"
                    step="0.01"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(volume, 3)}
                    </div>
                    <div class="text-gray-600">Volume</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(surfaceArea, 3)}
                    </div>
                    <div class="text-gray-600">Surface Area</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(lateralArea, 3)}
                    </div>
                    <div class="text-gray-600">Lateral Area</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatNumber(baseArea, 3)}
                    </div>
                    <div class="text-gray-600">Base Area</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Cylinder Properties
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Radius (r):</span>
                            <span class="font-semibold">{formatNumber(radius, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Diameter (d):</span>
                            <span class="font-semibold">{formatNumber(diameter, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Height (h):</span>
                            <span class="font-semibold">{formatNumber(height, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Volume (V):</span>
                            <span class="font-semibold text-blue-600">{formatNumber(volume, 6)} units³</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Surface Area (SA):</span>
                            <span class="font-semibold text-green-600">{formatNumber(surfaceArea, 6)} units²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Lateral Area (LA):</span>
                            <span class="font-semibold text-purple-600">{formatNumber(lateralArea, 6)} units²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Base Area (BA):</span>
                            <span class="font-semibold text-orange-600">{formatNumber(baseArea, 6)} units²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Circumference:</span>
                            <span class="font-semibold text-teal-600">{formatNumber(2 * Math.PI * radius, 6)} units</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Visual Representation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Cylinder Visualization
                </h3>

                <div class="flex justify-center mb-6">
                    <svg width="300" height="350" viewBox="0 0 300 350" class="border border-gray-200 rounded-lg">
                        <!-- Cylinder body -->
                        <rect x="75" y="100" width="150" height="150" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" stroke-width="2"/>
                        
                        <!-- Top ellipse -->
                        <ellipse cx="150" cy="100" rx="75" ry="25" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" stroke-width="2"/>
                        
                        <!-- Bottom ellipse -->
                        <ellipse cx="150" cy="250" rx="75" ry="25" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" stroke-width="2"/>
                        
                        <!-- Height dimension -->
                        <line x1="40" y1="100" x2="40" y2="250" stroke="#10b981" stroke-width="2"/>
                        <line x1="35" y1="100" x2="45" y2="100" stroke="#10b981" stroke-width="2"/>
                        <line x1="35" y1="250" x2="45" y2="250" stroke="#10b981" stroke-width="2"/>
                        <text x="25" y="180" fill="#10b981" font-size="12" text-anchor="middle" transform="rotate(-90, 25, 180)">h = {formatNumber(height, 1)}</text>
                        
                        <!-- Radius line -->
                        <line x1="150" y1="100" x2="225" y2="100" stroke="#ef4444" stroke-width="2"/>
                        <text x="187" y="95" fill="#ef4444" font-size="12" text-anchor="middle">r = {formatNumber(radius, 1)}</text>
                        
                        <!-- Center point -->
                        <circle cx="150" cy="100" r="2" fill="#1f2937"/>
                        <circle cx="150" cy="250" r="2" fill="#1f2937"/>
                    </svg>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                    <div class="p-3 bg-blue-50 rounded-lg">
                        <div class="font-semibold text-blue-900">Volume</div>
                        <div class="text-blue-700">πr²h</div>
                        <div class="text-blue-600">{formatNumber(volume, 2)}</div>
                    </div>
                    <div class="p-3 bg-green-50 rounded-lg">
                        <div class="font-semibold text-green-900">Surface Area</div>
                        <div class="text-green-700">2πr(r+h)</div>
                        <div class="text-green-600">{formatNumber(surfaceArea, 2)}</div>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-lg">
                        <div class="font-semibold text-purple-900">Lateral Area</div>
                        <div class="text-purple-700">2πrh</div>
                        <div class="text-purple-600">{formatNumber(lateralArea, 2)}</div>
                    </div>
                    <div class="p-3 bg-orange-50 rounded-lg">
                        <div class="font-semibold text-orange-900">Base Area</div>
                        <div class="text-orange-700">πr²</div>
                        <div class="text-orange-600">{formatNumber(baseArea, 2)}</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Formulas -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Cylinder Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">Volume</h4>
                            <div class="text-blue-800">
                                <div class="font-mono text-lg">V = πr²h</div>
                                <div class="text-sm mt-1">V = π × {formatNumber(radius, 2)}² × {formatNumber(height, 2)} = {formatNumber(volume, 3)}</div>
                            </div>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">Surface Area</h4>
                            <div class="text-green-800">
                                <div class="font-mono text-lg">SA = 2πr(r + h)</div>
                                <div class="text-sm mt-1">SA = 2π × {formatNumber(radius, 2)} × ({formatNumber(radius, 2)} + {formatNumber(height, 2)}) = {formatNumber(surfaceArea, 3)}</div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">Lateral Area</h4>
                            <div class="text-purple-800">
                                <div class="font-mono text-lg">LA = 2πrh</div>
                                <div class="text-sm mt-1">LA = 2π × {formatNumber(radius, 2)} × {formatNumber(height, 2)} = {formatNumber(lateralArea, 3)}</div>
                            </div>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">Base Area</h4>
                            <div class="text-orange-800">
                                <div class="font-mono text-lg">BA = πr²</div>
                                <div class="text-sm mt-1">BA = π × {formatNumber(radius, 2)}² = {formatNumber(baseArea, 3)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Cylinder Types -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Cylinder Variations
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">Right Cylinder</h4>
                        <div class="text-blue-800 text-sm">
                            <div>Height perpendicular to base</div>
                            <div>Most common type</div>
                            <div>Volume: πr²h</div>
                        </div>
                    </div>

                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">Oblique Cylinder</h4>
                        <div class="text-green-800 text-sm">
                            <div>Height at an angle to base</div>
                            <div>Same volume formula</div>
                            <div>Different surface area</div>
                        </div>
                    </div>

                    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 class="font-semibold text-purple-900 mb-2">Hollow Cylinder</h4>
                        <div class="text-purple-800 text-sm">
                            <div>Has inner and outer radius</div>
                            <div>Volume: π(R² - r²)h</div>
                            <div>Like a pipe or tube</div>
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
                        <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <h4 class="font-semibold text-red-900">🏭 Industrial Tanks</h4>
                            <p class="text-red-800 text-sm">Calculate capacity of storage tanks, silos, and containers.</p>
                        </div>
                        
                        <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900">🔧 Engineering</h4>
                            <p class="text-blue-800 text-sm">Design pipes, columns, shafts, and cylindrical components.</p>
                        </div>
                        
                        <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900">🏗️ Construction</h4>
                            <p class="text-green-800 text-sm">Calculate concrete for cylindrical structures and foundations.</p>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900">🥫 Packaging</h4>
                            <p class="text-purple-800 text-sm">Design cans, bottles, and cylindrical containers.</p>
                        </div>
                        
                        <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900">🧪 Laboratory</h4>
                            <p class="text-orange-800 text-sm">Calculate volumes for test tubes, beakers, and equipment.</p>
                        </div>
                        
                        <div class="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                            <h4 class="font-semibold text-teal-900">🚗 Automotive</h4>
                            <p class="text-teal-800 text-sm">Engine cylinders, fuel tanks, and hydraulic systems.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>