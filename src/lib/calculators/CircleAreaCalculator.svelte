<script>
    /**
     * Circle Area Calculator Component
     * Calculate area, circumference, diameter, and other circle properties
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 5;
    let inputType = 'radius';

    // Results
    let radius = 0;
    let diameter = 0;
    let area = 0;
    let circumference = 0;
    let showResults = false;

    // Input type options
    const inputTypes = [
        { value: 'radius', label: 'Radius' },
        { value: 'diameter', label: 'Diameter' },
        { value: 'circumference', label: 'Circumference' },
        { value: 'area', label: 'Area' }
    ];

    // Calculate circle properties
    function calculateCircle() {
        if (inputValue <= 0) {
            showResults = false;
            return;
        }

        switch (inputType) {
            case 'radius':
                radius = inputValue;
                break;
            case 'diameter':
                radius = inputValue / 2;
                break;
            case 'circumference':
                radius = inputValue / (2 * Math.PI);
                break;
            case 'area':
                radius = Math.sqrt(inputValue / Math.PI);
                break;
        }

        diameter = radius * 2;
        area = Math.PI * radius * radius;
        circumference = 2 * Math.PI * radius;

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (inputValue && inputType) {
        calculateCircle();
    }

    // Get sector calculations
    function getSectorArea(angle) {
        return (angle / 360) * area;
    }

    function getArcLength(angle) {
        return (angle / 360) * circumference;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Circle Area Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate area, circumference, diameter, and radius of a circle. 
                Enter any known measurement and get all other properties instantly.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="Input Type"
                    bind:value={inputType}
                    options={inputTypes}
                />

                <Input
                    type="number"
                    label="Value"
                    bind:value={inputValue}
                    placeholder="5"
                    min="0.001"
                    step="0.1"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(radius, 3)}
                    </div>
                    <div class="text-gray-600">Radius</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(diameter, 3)}
                    </div>
                    <div class="text-gray-600">Diameter</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(area, 3)}
                    </div>
                    <div class="text-gray-600">Area</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatNumber(circumference, 3)}
                    </div>
                    <div class="text-gray-600">Circumference</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Circle Properties
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Radius (r):</span>
                            <span class="font-semibold text-blue-600">{formatNumber(radius, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Diameter (d):</span>
                            <span class="font-semibold text-green-600">{formatNumber(diameter, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Area (A):</span>
                            <span class="font-semibold text-purple-600">{formatNumber(area, 6)} units²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Circumference (C):</span>
                            <span class="font-semibold text-orange-600">{formatNumber(circumference, 6)} units</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Area Formula:</span>
                            <span class="font-semibold">A = πr²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Circumference Formula:</span>
                            <span class="font-semibold">C = 2πr</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Diameter Formula:</span>
                            <span class="font-semibold">d = 2r</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">π (Pi) Value:</span>
                            <span class="font-semibold">{formatNumber(Math.PI, 6)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Sector Calculations -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Sector Calculations
                </h3>
                <p class="text-gray-600 mb-4">
                    Calculate area and arc length for different sector angles
                </p>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each [30, 45, 60, 90, 120, 180, 270, 360] as angle}
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <div class="text-lg font-bold text-gray-900 mb-1">
                                {angle}°
                            </div>
                            <div class="text-sm text-gray-600 mb-1">
                                Area: {formatNumber(getSectorArea(angle), 2)}
                            </div>
                            <div class="text-sm text-gray-600">
                                Arc: {formatNumber(getArcLength(angle), 2)}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Visual Representation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Circle Visualization
                </h3>

                <div class="flex justify-center mb-6">
                    <svg width="300" height="300" viewBox="0 0 300 300" class="border border-gray-200 rounded-lg">
                        <!-- Circle -->
                        <circle cx="150" cy="150" r="100" fill="none" stroke="#3B82F6" stroke-width="2"/>
                        
                        <!-- Radius line -->
                        <line x1="150" y1="150" x2="250" y2="150" stroke="#10B981" stroke-width="2"/>
                        
                        <!-- Diameter line -->
                        <line x1="50" y1="150" x2="250" y2="150" stroke="#8B5CF6" stroke-width="1" stroke-dasharray="5,5"/>
                        
                        <!-- Center point -->
                        <circle cx="150" cy="150" r="3" fill="#EF4444"/>
                        
                        <!-- Labels -->
                        <text x="200" y="145" fill="#10B981" font-size="12" text-anchor="middle">r</text>
                        <text x="150" y="140" fill="#EF4444" font-size="12" text-anchor="middle">center</text>
                        <text x="150" y="280" fill="#3B82F6" font-size="12" text-anchor="middle">Circle</text>
                    </svg>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div class="flex items-center space-x-2">
                        <div class="w-4 h-0.5 bg-blue-500"></div>
                        <span>Circle (Circumference)</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-4 h-0.5 bg-green-500"></div>
                        <span>Radius</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-4 h-0.5 bg-purple-500 border-dashed"></div>
                        <span>Diameter</span>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Formulas and Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Circle Formulas & Tips
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📐 Key Formulas
                        </h4>
                        <div class="text-blue-800 text-sm space-y-1">
                            <div>• Area: A = πr² = π(d/2)²</div>
                            <div>• Circumference: C = 2πr = πd</div>
                            <div>• Diameter: d = 2r</div>
                            <div>• Radius: r = d/2 = C/(2π)</div>
                        </div>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            💡 Practical Applications
                        </h4>
                        <div class="text-green-800 text-sm space-y-1">
                            <div>• Calculate pizza or cake area</div>
                            <div>• Determine garden bed size</div>
                            <div>• Find wheel circumference</div>
                            <div>• Calculate pipe cross-section</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>