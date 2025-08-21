<script>
    /**
     * Sphere Volume Calculator Component
     * Calculate volume, surface area, and other sphere properties
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let inputValue = 5;
    let inputType = "radius";

    // Results
    let radius = 0;
    let diameter = 0;
    let volume = 0;
    let surfaceArea = 0;
    let circumference = 0;
    let showResults = false;

    // Input type options
    const inputTypes = [
        { value: "radius", label: "Radius" },
        { value: "diameter", label: "Diameter" },
        { value: "volume", label: "Volume" },
        { value: "surface-area", label: "Surface Area" },
    ];

    // Calculate sphere properties
    function calculateSphere() {
        if (inputValue <= 0) {
            showResults = false;
            return;
        }

        switch (inputType) {
            case "radius":
                radius = inputValue;
                diameter = radius * 2;
                volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
                surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
                circumference = 2 * Math.PI * radius;
                break;
            case "diameter":
                diameter = inputValue;
                radius = diameter / 2;
                volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
                surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
                circumference = Math.PI * diameter;
                break;
            case "volume":
                volume = inputValue;
                radius = Math.pow((3 * volume) / (4 * Math.PI), 1 / 3);
                diameter = radius * 2;
                surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
                circumference = 2 * Math.PI * radius;
                break;
            case "surface-area":
                surfaceArea = inputValue;
                radius = Math.sqrt(surfaceArea / (4 * Math.PI));
                diameter = radius * 2;
                volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
                circumference = 2 * Math.PI * radius;
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (inputValue && inputType) {
        calculateSphere();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Sphere Volume Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate volume, surface area, radius, and diameter of a
                sphere. Enter any one measurement and get all the others
                instantly.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                    label="What do you know?"
                    bind:value={inputType}
                    options={inputTypes}
                />

                <Input
                    type="number"
                    label={inputTypes.find((t) => t.value === inputType)
                        ?.label || "Value"}
                    bind:value={inputValue}
                    placeholder="5"
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
                        {formatNumber(volume, 3)}
                    </div>
                    <div class="text-gray-600">Volume</div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatNumber(surfaceArea, 3)}
                    </div>
                    <div class="text-gray-600">Surface Area</div>
                </div>
            </Card>
        </div>

        <!-- Detailed Results -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Sphere Properties
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Radius (r):</span>
                            <span class="font-semibold text-blue-600"
                                >{formatNumber(radius, 6)} units</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Diameter (d):</span>
                            <span class="font-semibold text-green-600"
                                >{formatNumber(diameter, 6)} units</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Volume (V):</span>
                            <span class="font-semibold text-purple-600"
                                >{formatNumber(volume, 6)} units³</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Surface Area (SA):</span
                            >
                            <span class="font-semibold text-orange-600"
                                >{formatNumber(surfaceArea, 6)} units²</span
                            >
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Circumference:</span>
                            <span class="font-semibold text-teal-600"
                                >{formatNumber(circumference, 6)} units</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Volume Formula:</span>
                            <span class="font-semibold">V = (4/3)πr³</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600"
                                >Surface Area Formula:</span
                            >
                            <span class="font-semibold">SA = 4πr²</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">π (Pi):</span>
                            <span class="font-semibold"
                                >{formatNumber(Math.PI, 6)}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Visual Representation -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Sphere Visualization
                </h3>

                <div class="flex justify-center mb-6">
                    <svg
                        width="300"
                        height="300"
                        viewBox="0 0 300 300"
                        class="border border-gray-200 rounded-lg"
                    >
                        <!-- Sphere (represented as circle) -->
                        <circle
                            cx="150"
                            cy="150"
                            r="100"
                            fill="rgba(139, 92, 246, 0.1)"
                            stroke="#8b5cf6"
                            stroke-width="2"
                        />

                        <!-- Great circle (equator) -->
                        <ellipse
                            cx="150"
                            cy="150"
                            rx="100"
                            ry="30"
                            fill="none"
                            stroke="#8b5cf6"
                            stroke-width="1"
                            stroke-dasharray="3,3"
                        />

                        <!-- Radius line -->
                        <line
                            x1="150"
                            y1="150"
                            x2="250"
                            y2="150"
                            stroke="#ef4444"
                            stroke-width="2"
                        />
                        <text
                            x="200"
                            y="145"
                            fill="#ef4444"
                            font-size="12"
                            text-anchor="middle">r</text
                        >

                        <!-- Diameter line -->
                        <line
                            x1="50"
                            y1="150"
                            x2="250"
                            y2="150"
                            stroke="#10b981"
                            stroke-width="1"
                            stroke-dasharray="5,5"
                        />
                        <text
                            x="150"
                            y="140"
                            fill="#10b981"
                            font-size="12"
                            text-anchor="middle">d</text
                        >

                        <!-- Center point -->
                        <circle cx="150" cy="150" r="3" fill="#1f2937" />
                        <text x="155" y="165" fill="#1f2937" font-size="12"
                            >Center</text
                        >

                        <!-- Vertical great circle -->
                        <ellipse
                            cx="150"
                            cy="150"
                            rx="30"
                            ry="100"
                            fill="none"
                            stroke="#8b5cf6"
                            stroke-width="1"
                            stroke-dasharray="3,3"
                        />
                    </svg>
                </div>

                <div
                    class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm"
                >
                    <div class="p-3 bg-blue-50 rounded-lg">
                        <div class="font-semibold text-blue-900">Radius</div>
                        <div class="text-blue-700">Center to surface</div>
                    </div>
                    <div class="p-3 bg-green-50 rounded-lg">
                        <div class="font-semibold text-green-900">Diameter</div>
                        <div class="text-green-700">Through center</div>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-lg">
                        <div class="font-semibold text-purple-900">Volume</div>
                        <div class="text-purple-700">Space inside</div>
                    </div>
                    <div class="p-3 bg-orange-50 rounded-lg">
                        <div class="font-semibold text-orange-900">
                            Surface Area
                        </div>
                        <div class="text-orange-700">Outer surface</div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Formulas -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Sphere Formulas
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div
                            class="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-purple-900 mb-2">
                                Volume
                            </h4>
                            <div class="text-purple-800">
                                <div class="font-mono text-lg">
                                    V = (4/3)πr³
                                </div>
                                <div class="text-sm mt-1">
                                    V = (4/3) × π × {formatNumber(radius, 2)}³ = {formatNumber(
                                        volume,
                                        3,
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            class="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-orange-900 mb-2">
                                Surface Area
                            </h4>
                            <div class="text-orange-800">
                                <div class="font-mono text-lg">SA = 4πr²</div>
                                <div class="text-sm mt-1">
                                    SA = 4 × π × {formatNumber(radius, 2)}² = {formatNumber(
                                        surfaceArea,
                                        3,
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div
                            class="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-blue-900 mb-2">
                                Radius from Volume
                            </h4>
                            <div class="text-blue-800">
                                <div class="font-mono text-lg">
                                    r = ∛(3V/4π)
                                </div>
                                <div class="text-sm mt-1">
                                    r = ∛(3×{formatNumber(volume, 2)}/4π) = {formatNumber(
                                        radius,
                                        3,
                                    )}
                                </div>
                                )
                            </div>
                        </div>

                        <div
                            class="p-4 bg-green-50 border border-green-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-green-900 mb-2">
                                Radius from Surface Area
                            </h4>
                            <div class="text-green-800">
                                <div class="font-mono text-lg">
                                    r = √(SA/4π)
                                </div>
                                <div class="text-sm mt-1">
                                    r = √({formatNumber(surfaceArea, 2)}/4π) = {formatNumber(
                                        radius,
                                        3,
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Comparisons -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Sphere vs Other Shapes
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-2">
                            🌐 Sphere
                        </h4>
                        <div class="text-sm text-gray-700 space-y-1">
                            <div>Volume: {formatNumber(volume, 2)}</div>
                            <div>
                                Surface Area: {formatNumber(surfaceArea, 2)}
                            </div>
                        </div>
                    </div>

                    <div class="p-4 bg-blue-50 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            🟦 Cube (same volume)
                        </h4>
                        <div class="text-sm text-blue-700 space-y-1">
                            <div>
                                Side: {formatNumber(Math.pow(volume, 1 / 3), 2)}
                            </div>
                            <div>
                                Surface Area: {formatNumber(
                                    6 * Math.pow(Math.pow(volume, 1 / 3), 2),
                                    2,
                                )}
                            </div>
                        </div>
                    </div>

                    <div class="p-4 bg-green-50 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🥫 Cylinder (same height & radius)
                        </h4>
                        <div class="text-sm text-green-700 space-y-1">
                            <div>Height: {formatNumber(diameter, 2)}</div>
                            <div>
                                Volume: {formatNumber(
                                    Math.PI * radius * radius * diameter,
                                    2,
                                )}
                            </div>
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
                        <div
                            class="p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-red-900">
                                🏀 Sports Equipment
                            </h4>
                            <p class="text-red-800 text-sm">
                                Calculate volume and surface area of balls,
                                spheres in sports.
                            </p>
                        </div>

                        <div
                            class="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-blue-900">
                                🧪 Science & Engineering
                            </h4>
                            <p class="text-blue-800 text-sm">
                                Molecular models, planetary calculations,
                                material properties.
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div
                            class="p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-green-900">
                                🏭 Manufacturing
                            </h4>
                            <p class="text-green-800 text-sm">
                                Calculate material needed for spherical objects,
                                tanks, containers.
                            </p>
                        </div>

                        <div
                            class="p-3 bg-purple-50 border border-purple-200 rounded-lg"
                        >
                            <h4 class="font-semibold text-purple-900">
                                📐 Architecture
                            </h4>
                            <p class="text-purple-800 text-sm">
                                Dome calculations, spherical structures, space
                                planning.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>
