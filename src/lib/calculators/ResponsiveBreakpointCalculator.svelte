<script>
    /**
     * Responsive Breakpoint Calculator Component
     * Calculate responsive design breakpoints for different devices
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Common breakpoints
    const commonBreakpoints = [
        { name: 'Mobile Portrait', width: 320, description: 'iPhone 5/SE' },
        { name: 'Mobile Landscape', width: 568, description: 'iPhone 5/SE landscape' },
        { name: 'Tablet Portrait', width: 768, description: 'iPad portrait' },
        { name: 'Tablet Landscape', width: 1024, description: 'iPad landscape' },
        { name: 'Desktop Small', width: 1280, description: 'Small desktop' },
        { name: 'Desktop Large', width: 1440, description: 'Large desktop' },
        { name: 'Desktop XL', width: 1920, description: 'Full HD desktop' },
        { name: 'Desktop 4K', width: 3840, description: '4K displays' }
    ];

    // Popular frameworks breakpoints
    const frameworkBreakpoints = {
        'Bootstrap 5': [
            { name: 'xs', width: 0, description: 'Extra small devices' },
            { name: 'sm', width: 576, description: 'Small devices' },
            { name: 'md', width: 768, description: 'Medium devices' },
            { name: 'lg', width: 992, description: 'Large devices' },
            { name: 'xl', width: 1200, description: 'Extra large devices' },
            { name: 'xxl', width: 1400, description: 'Extra extra large' }
        ],
        'Tailwind CSS': [
            { name: 'sm', width: 640, description: 'Small devices' },
            { name: 'md', width: 768, description: 'Medium devices' },
            { name: 'lg', width: 1024, description: 'Large devices' },
            { name: 'xl', width: 1280, description: 'Extra large devices' },
            { name: '2xl', width: 1536, description: 'Extra extra large' }
        ],
        'Material Design': [
            { name: 'xs', width: 0, description: 'Extra small' },
            { name: 'sm', width: 600, description: 'Small' },
            { name: 'md', width: 960, description: 'Medium' },
            { name: 'lg', width: 1280, description: 'Large' },
            { name: 'xl', width: 1920, description: 'Extra large' }
        ]
    };

    // Custom breakpoint
    let customWidth = 1200;

    // Get device category for custom width
    $: deviceInfo = getDeviceCategory(customWidth);

    // Get device category for width
    function getDeviceCategory(width) {
        if (width < 576) return { category: 'Mobile', color: 'text-blue-600' };
        if (width < 768) return { category: 'Large Mobile', color: 'text-green-600' };
        if (width < 992) return { category: 'Tablet', color: 'text-purple-600' };
        if (width < 1200) return { category: 'Small Desktop', color: 'text-orange-600' };
        if (width < 1920) return { category: 'Desktop', color: 'text-red-600' };
        return { category: 'Large Desktop', color: 'text-indigo-600' };
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Breakpoint Calculator -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Responsive Breakpoint Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Plan responsive design breakpoints for different devices and screen sizes. 
                Compare popular framework breakpoints and create custom responsive layouts.
            </p>

            <div class="max-w-md">
                <Input
                    type="number"
                    label="Custom Breakpoint Width (px)"
                    bind:value={customWidth}
                    placeholder="1200"
                    min="1"
                    step="1"
                />
                
                <div class="mt-2 text-sm {deviceInfo.color}">
                    Device Category: {deviceInfo.category}
                </div>
            </div>
        </div>
    </Card>

    <!-- Common Breakpoints -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Common Device Breakpoints
            </h3>

            <div class="space-y-3">
                {#each commonBreakpoints as breakpoint}
                    {@const deviceInfo = getDeviceCategory(breakpoint.width)}
                    <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div>
                            <span class="font-medium">{breakpoint.name}</span>
                            <span class="text-sm text-gray-600 ml-2">({breakpoint.description})</span>
                        </div>
                        <div class="text-right">
                            <div class="font-bold {deviceInfo.color}">{breakpoint.width}px</div>
                            <div class="text-xs text-gray-500">{deviceInfo.category}</div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>

    <!-- Framework Breakpoints -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Popular Framework Breakpoints
            </h3>

            <div class="space-y-6">
                {#each Object.entries(frameworkBreakpoints) as [framework, breakpoints]}
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">{framework}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {#each breakpoints as bp}
                                <div class="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div class="font-semibold text-blue-900">{bp.name}</div>
                                    <div class="text-lg text-blue-600">{bp.width}px+</div>
                                    <div class="text-xs text-blue-700">{bp.description}</div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </Card>
</div>