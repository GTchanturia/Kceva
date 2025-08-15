<script>
    /**
     * Rectangle Area Calculator Component
     * Calculate area, perimeter, and diagonal of rectangles
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let length = 10;
    let width = 6;

    // Results
    let area = 0;
    let perimeter = 0;
    let diagonal = 0;
    let showResults = false;

    // Calculate rectangle properties
    function calculateRectangle() {
        if (length <= 0 || width <= 0) {
            showResults = false;
            return;
        }

        area = length * width;
        perimeter = 2 * (length + width);
        diagonal = Math.sqrt(length * length + width * width);

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (length && width) {
        calculateRectangle();
    }

    // Check if it's a square
    $: isSquare = Math.abs(length - width) < 0.001;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Rectangle Area Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate area, perimeter, and diagonal of rectangles and squares. 
                Perfect for construction, flooring, and geometry problems.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Length"
                    bind:value={length}
                    placeholder="10"
                    min="0.01"
                    step="0.01"
                />

                <Input
                    type="number"
                    label="Width"
                    bind:value={width}
                    placeholder="6"
                    min="0.01"
                    step="0.01"
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Shape Type Indicator -->
        {#if isSquare}
            <Card>
                <div class="p-4 bg-blue-50 border border-blue-200 text-center">
                    <div class="text-blue-900 font-semibold">
                        🟦 This is a Square (all sides equal)
                    </div>
                </div>
            </Card>
        {/if}

        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(area, 3)}
                    </div>
                    <div class="text-gray-600">Area (units²)</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber(perimeter, 3)}
                    </div>
                    <div class="text-gray-600">Perimeter</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatNumber(diagonal, 3)}
                    </div>
                    <div class="text-gray-600">Diagonal</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Rectangle Properties
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Length:</span>
                            <span class="font-semibold">{formatNumber(length, 3)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Width:</span>
                            <span class="font-semibold">{formatNumber(width, 3)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Area:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(area, 6)} units²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Perimeter:</span>
                            <span class="font-semibold text-green-600">{formatNumber(perimeter, 6)} units</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Diagonal:</span>
                            <span class="font-semibold text-purple-600">{formatNumber(diagonal, 6)} units</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Shape Type:</span>
                            <span class="font-semibold">{isSquare ? 'Square' : 'Rectangle'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Aspect Ratio:</span>
                            <span class="font-semibold">{formatNumber(length / width, 3)}:1</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Diagonal Angle:</span>
                            <span class="font-semibold">{formatNumber(Math.atan(width / length) * 180 / Math.PI, 1)}°</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Visual Representation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Rectangle Visualization
                </h3>

                <div class="flex justify-center mb-6">
                    <svg width="300" height="200" viewBox="0 0 300 200" class="border border-gray-200 rounded-lg">
                        <!-- Rectangle -->
                        <rect x="50" y="50" width="200" height="100" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" stroke-width="2"/>
                        
                        <!-- Length dimension -->
                        <line x1="50" y1="170" x2="250" y2="170" stroke="#10b981" stroke-width="2"/>
                        <line x1="50" y1="165" x2="50" y2="175" stroke="#10b981" stroke-width="2"/>
                        <line x1="250" y1="165" x2="250" y2="175" stroke="#10b981" stroke-width="2"/>
                        <text x="150" y="185" fill="#10b981" font-size="12" text-anchor="middle">Length = {formatNumber(length, 1)}</text>
                        
                        <!-- Width dimension -->
                        <line x1="30" y1="50" x2="30" y2="150" stroke="#ef4444" stroke-width="2"/>
                        <line x1="25" y1="50" x2="35" y2="50" stroke="#ef4444" stroke-width="2"/>
                        <line x1="25" y1="150" x2="35" y2="150" stroke="#ef4444" stroke-width="2"/>
                        <text x="15" y="105" fill="#ef4444" font-size="12" text-anchor="middle" transform="rotate(-90, 15, 105)">Width = {formatNumber(width, 1)}</text>
                        
                        <!-- Diagonal -->
                        <line x1="50" y1="150" x2="250" y2="50" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="5,5"/>
                        <text x="150" y="95" fill="#8b5cf6" font-size="12" text-anchor="middle">d = {formatNumber(diagonal, 1)}</text>
                    </svg>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                    <div class="p-3 bg-blue-50 rounded-lg">
                        <div class="font-semibold text-blue-900">Area</div>
                        <div class="text-blue-700">Length × Width</div>
                        <div class="text-blue-600">{formatNumber(area, 2)} units²</div>
                    </div>
                    <div class="p-3 bg-green-50 rounded-lg">
                        <div class="font-semibold text-green-900">Perimeter</div>
                        <div class="text-green-700">2(Length + Width)</div>
                        <div class="text-green-600">{formatNumber(perimeter, 2)} units</div>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-lg">
                        <div class="font-semibold text-purple-900">Diagonal</div>
                        <div class="text-purple-700">√(L² + W²)</div>
                        <div class="text-purple-600">{formatNumber(diagonal, 2)} units</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Formulas -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Rectangle Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">Area</h4>
                        <div class="text-blue-800">
                            <div class="font-mono text-lg">A = l × w</div>
                            <div class="text-sm mt-1">A = {formatNumber(length, 2)} × {formatNumber(width, 2)} = {formatNumber(area, 3)}</div>
                        </div>
                    </div>

                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">Perimeter</h4>
                        <div class="text-green-800">
                            <div class="font-mono text-lg">P = 2(l + w)</div>
                            <div class="text-sm mt-1">P = 2({formatNumber(length, 2)} + {formatNumber(width, 2)}) = {formatNumber(perimeter, 3)}</div>
                        </div>
                    </div>

                    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 class="font-semibold text-purple-900 mb-2">Diagonal</h4>
                        <div class="text-purple-800">
                            <div class="font-mono text-lg">d = √(l² + w²)</div>
                            <div class="text-sm mt-1">d = √({formatNumber(length, 2)}² + {formatNumber(width, 2)}²) = {formatNumber(diagonal, 3)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Common Applications -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Common Applications
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900">🏠 Construction & Flooring</h4>
                            <p class="text-orange-800 text-sm">Calculate square footage for rooms, tiles, carpet, or paint coverage.</p>
                        </div>
                        
                        <div class="p-3 bg-teal-50 border border-teal-200 rounded-lg">
                            <h4 class="font-semibold text-teal-900">📐 Geometry & Math</h4>
                            <p class="text-teal-800 text-sm">Solve geometry problems and understand rectangle properties.</p>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                            <h4 class="font-semibold text-pink-900">🎨 Design & Layout</h4>
                            <p class="text-pink-800 text-sm">Plan layouts for graphics, websites, or physical spaces.</p>
                        </div>
                        
                        <div class="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <h4 class="font-semibold text-indigo-900">📦 Packaging & Shipping</h4>
                            <p class="text-indigo-800 text-sm">Calculate box dimensions and shipping requirements.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>