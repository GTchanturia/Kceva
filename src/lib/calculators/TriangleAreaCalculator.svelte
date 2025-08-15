<script>
    /**
     * Triangle Area Calculator Component
     * Calculate triangle area using various methods and formulas
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let calculationMethod = 'base-height';
    let base = 10;
    let height = 8;
    let sideA = 3;
    let sideB = 4;
    let sideC = 5;
    let angleA = 60;
    let angleB = 60;
    let angleC = 60;

    // Results
    let area = 0;
    let perimeter = 0;
    let triangleType = '';
    let showResults = false;

    // Calculation methods
    const methods = [
        { value: 'base-height', label: 'Base and Height' },
        { value: 'three-sides', label: 'Three Sides (Heron\'s Formula)' },
        { value: 'two-sides-angle', label: 'Two Sides and Included Angle' },
        { value: 'coordinates', label: 'Three Coordinates' }
    ];

    // Coordinate inputs
    let x1 = 0, y1 = 0;
    let x2 = 4, y2 = 0;
    let x3 = 2, y3 = 3;

    // Calculate triangle area
    function calculateTriangleArea() {
        try {
            switch (calculationMethod) {
                case 'base-height':
                    if (base <= 0 || height <= 0) return;
                    area = (base * height) / 2;
                    perimeter = 0; // Cannot calculate without all sides
                    triangleType = 'Unknown';
                    break;

                case 'three-sides':
                    if (sideA <= 0 || sideB <= 0 || sideC <= 0) return;
                    if (!isValidTriangle(sideA, sideB, sideC)) return;
                    area = heronsFormula(sideA, sideB, sideC);
                    perimeter = sideA + sideB + sideC;
                    triangleType = getTriangleType(sideA, sideB, sideC);
                    break;

                case 'two-sides-angle':
                    if (sideA <= 0 || sideB <= 0 || angleC <= 0 || angleC >= 180) return;
                    area = 0.5 * sideA * sideB * Math.sin(angleC * Math.PI / 180);
                    // Calculate third side using law of cosines
                    const thirdSide = Math.sqrt(sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos(angleC * Math.PI / 180));
                    perimeter = sideA + sideB + thirdSide;
                    triangleType = getTriangleType(sideA, sideB, thirdSide);
                    break;

                case 'coordinates':
                    area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
                    // Calculate side lengths
                    const side1 = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    const side2 = Math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2);
                    const side3 = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2);
                    perimeter = side1 + side2 + side3;
                    triangleType = getTriangleType(side1, side2, side3);
                    break;
            }
            showResults = true;
        } catch (error) {
            showResults = false;
        }
    }

    // Heron's formula
    function heronsFormula(a, b, c) {
        const s = (a + b + c) / 2; // semi-perimeter
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    // Check if three sides can form a valid triangle
    function isValidTriangle(a, b, c) {
        return (a + b > c) && (a + c > b) && (b + c > a);
    }

    // Determine triangle type
    function getTriangleType(a, b, c) {
        const sides = [a, b, c].sort((x, y) => x - y);
        const [shortest, middle, longest] = sides;

        // Check if it's a right triangle (Pythagorean theorem)
        if (Math.abs(shortest ** 2 + middle ** 2 - longest ** 2) < 0.001) {
            return 'Right Triangle';
        }

        // Check if it's equilateral
        if (Math.abs(a - b) < 0.001 && Math.abs(b - c) < 0.001) {
            return 'Equilateral Triangle';
        }

        // Check if it's isosceles
        if (Math.abs(a - b) < 0.001 || Math.abs(b - c) < 0.001 || Math.abs(a - c) < 0.001) {
            return 'Isosceles Triangle';
        }

        // Check if it's acute or obtuse
        if (shortest ** 2 + middle ** 2 > longest ** 2) {
            return 'Acute Triangle';
        } else {
            return 'Obtuse Triangle';
        }
    }

    // Auto-calculate when inputs change
    $: if (calculationMethod) {
        calculateTriangleArea();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Triangle Area Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate triangle area using different methods: base and height, 
                three sides (Heron's formula), two sides with angle, or coordinates.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Method"
                    bind:value={calculationMethod}
                    options={methods}
                />

                {#if calculationMethod === 'base-height'}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Base"
                            bind:value={base}
                            placeholder="10"
                            min="0.001"
                            step="0.1"
                        />
                        <Input
                            type="number"
                            label="Height"
                            bind:value={height}
                            placeholder="8"
                            min="0.001"
                            step="0.1"
                        />
                    </div>
                {:else if calculationMethod === 'three-sides'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Side A"
                            bind:value={sideA}
                            placeholder="3"
                            min="0.001"
                            step="0.1"
                        />
                        <Input
                            type="number"
                            label="Side B"
                            bind:value={sideB}
                            placeholder="4"
                            min="0.001"
                            step="0.1"
                        />
                        <Input
                            type="number"
                            label="Side C"
                            bind:value={sideC}
                            placeholder="5"
                            min="0.001"
                            step="0.1"
                        />
                    </div>
                {:else if calculationMethod === 'two-sides-angle'}
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                            type="number"
                            label="Side A"
                            bind:value={sideA}
                            placeholder="3"
                            min="0.001"
                            step="0.1"
                        />
                        <Input
                            type="number"
                            label="Side B"
                            bind:value={sideB}
                            placeholder="4"
                            min="0.001"
                            step="0.1"
                        />
                        <Input
                            type="number"
                            label="Included Angle C (degrees)"
                            bind:value={angleC}
                            placeholder="90"
                            min="0.1"
                            max="179.9"
                            step="0.1"
                        />
                    </div>
                {:else if calculationMethod === 'coordinates'}
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Point A</h4>
                            <Input
                                type="number"
                                label="X₁"
                                bind:value={x1}
                                placeholder="0"
                                step="0.1"
                            />
                            <Input
                                type="number"
                                label="Y₁"
                                bind:value={y1}
                                placeholder="0"
                                step="0.1"
                            />
                        </div>
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Point B</h4>
                            <Input
                                type="number"
                                label="X₂"
                                bind:value={x2}
                                placeholder="4"
                                step="0.1"
                            />
                            <Input
                                type="number"
                                label="Y₂"
                                bind:value={y2}
                                placeholder="0"
                                step="0.1"
                            />
                        </div>
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900">Point C</h4>
                            <Input
                                type="number"
                                label="X₃"
                                bind:value={x3}
                                placeholder="2"
                                step="0.1"
                            />
                            <Input
                                type="number"
                                label="Y₃"
                                bind:value={y3}
                                placeholder="3"
                                step="0.1"
                            />
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
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

            {#if perimeter > 0}
                <Card>
                    <div class="p-6 text-center">
                        <div class="text-3xl font-bold text-green-600 mb-2">
                            {formatNumber(perimeter, 3)}
                        </div>
                        <div class="text-gray-600">Perimeter</div>
                    </div>
                </Card>
            {/if}

            <Card>
                <div class="p-6 text-center">
                    <div class="text-lg font-bold text-purple-600 mb-2">
                        {triangleType}
                    </div>
                    <div class="text-gray-600">Triangle Type</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Triangle Properties
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Area:</span>
                            <span class="font-semibold text-blue-600">{formatNumber(area, 6)} units²</span>
                        </div>
                        {#if perimeter > 0}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Perimeter:</span>
                                <span class="font-semibold text-green-600">{formatNumber(perimeter, 6)} units</span>
                            </div>
                        {/if}
                        <div class="flex justify-between">
                            <span class="text-gray-600">Triangle Type:</span>
                            <span class="font-semibold text-purple-600">{triangleType}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Method Used:</span>
                            <span class="font-semibold">{methods.find(m => m.value === calculationMethod)?.label}</span>
                        </div>
                    </div>

                    <div class="space-y-3">
                        {#if calculationMethod === 'base-height'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Base:</span>
                                <span class="font-semibold">{formatNumber(base, 3)} units</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Height:</span>
                                <span class="font-semibold">{formatNumber(height, 3)} units</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Formula:</span>
                                <span class="font-semibold">A = ½ × base × height</span>
                            </div>
                        {:else if calculationMethod === 'three-sides'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Semi-perimeter:</span>
                                <span class="font-semibold">{formatNumber(perimeter / 2, 3)} units</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Formula:</span>
                                <span class="font-semibold">Heron's Formula</span>
                            </div>
                        {:else if calculationMethod === 'two-sides-angle'}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Angle (radians):</span>
                                <span class="font-semibold">{formatNumber(angleC * Math.PI / 180, 4)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Formula:</span>
                                <span class="font-semibold">A = ½ab sin(C)</span>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </Card>

        <!-- Formulas Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Triangle Area Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 class="font-semibold text-blue-900 mb-2">Base and Height</h4>
                            <p class="text-blue-800 text-sm">A = ½ × base × height</p>
                        </div>

                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 class="font-semibold text-green-900 mb-2">Heron's Formula</h4>
                            <p class="text-green-800 text-sm">A = √[s(s-a)(s-b)(s-c)]</p>
                            <p class="text-green-700 text-xs mt-1">where s = (a+b+c)/2</p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 class="font-semibold text-purple-900 mb-2">Two Sides and Angle</h4>
                            <p class="text-purple-800 text-sm">A = ½ × a × b × sin(C)</p>
                        </div>

                        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h4 class="font-semibold text-orange-900 mb-2">Coordinates</h4>
                            <p class="text-orange-800 text-sm">A = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Triangle Types -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Triangle Types
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">By Sides:</h4>
                        <div class="space-y-2 text-sm">
                            <div><strong>Equilateral:</strong> All sides equal</div>
                            <div><strong>Isosceles:</strong> Two sides equal</div>
                            <div><strong>Scalene:</strong> All sides different</div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">By Angles:</h4>
                        <div class="space-y-2 text-sm">
                            <div><strong>Right:</strong> One 90° angle</div>
                            <div><strong>Acute:</strong> All angles < 90°</div>
                            <div><strong>Obtuse:</strong> One angle > 90°</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>