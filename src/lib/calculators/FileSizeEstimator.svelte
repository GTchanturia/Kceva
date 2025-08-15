<script>
    /**
     * File Size Estimator Component
     * Estimate file sizes for different image formats and qualities
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let imageWidth = 1920;
    let imageHeight = 1080;
    let colorDepth = 24;
    let compressionQuality = 80;
    let fileFormat = 'jpeg';

    // Results
    let estimatedSize = 0;
    let uncompressedSize = 0;
    let showResults = false;

    // File format options
    const fileFormats = [
        { value: 'jpeg', label: 'JPEG', compressionRatio: 0.1 },
        { value: 'png', label: 'PNG', compressionRatio: 0.5 },
        { value: 'gif', label: 'GIF', compressionRatio: 0.3 },
        { value: 'bmp', label: 'BMP', compressionRatio: 1.0 },
        { value: 'tiff', label: 'TIFF', compressionRatio: 0.7 },
        { value: 'webp', label: 'WebP', compressionRatio: 0.08 }
    ];

    // Color depth options
    const colorDepths = [
        { value: 1, label: '1-bit (Monochrome)' },
        { value: 8, label: '8-bit (256 colors)' },
        { value: 16, label: '16-bit (65K colors)' },
        { value: 24, label: '24-bit (16M colors)' },
        { value: 32, label: '32-bit (16M + Alpha)' }
    ];

    // Calculate file size
    function calculateFileSize() {
        if (imageWidth <= 0 || imageHeight <= 0) {
            showResults = false;
            return;
        }

        const totalPixels = imageWidth * imageHeight;
        uncompressedSize = (totalPixels * colorDepth) / 8; // Size in bytes

        const format = fileFormats.find(f => f.value === fileFormat);
        let compressionFactor = format?.compressionRatio || 0.1;

        // Adjust compression based on quality for JPEG and WebP
        if (fileFormat === 'jpeg' || fileFormat === 'webp') {
            compressionFactor *= (100 - compressionQuality) / 100 + 0.1;
        }

        estimatedSize = uncompressedSize * compressionFactor;
        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (imageWidth && imageHeight && colorDepth && fileFormat) {
        calculateFileSize();
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes < 1024) return `${formatNumber(bytes, 0)} B`;
        if (bytes < 1024 * 1024) return `${formatNumber(bytes / 1024, 1)} KB`;
        if (bytes < 1024 * 1024 * 1024) return `${formatNumber(bytes / (1024 * 1024), 1)} MB`;
        return `${formatNumber(bytes / (1024 * 1024 * 1024), 1)} GB`;
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Image File Size Estimator
            </h2>
            <p class="text-gray-600 mb-6">
                Estimate file sizes for different image formats, dimensions, and quality settings. 
                Plan storage requirements and optimize for web delivery.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    type="number"
                    label="Image Width (pixels)"
                    bind:value={imageWidth}
                    placeholder="1920"
                    min="1"
                    step="1"
                />

                <Input
                    type="number"
                    label="Image Height (pixels)"
                    bind:value={imageHeight}
                    placeholder="1080"
                    min="1"
                    step="1"
                />

                <Select
                    label="Color Depth"
                    bind:value={colorDepth}
                    options={colorDepths}
                />

                <Select
                    label="File Format"
                    bind:value={fileFormat}
                    options={fileFormats}
                />

                {#if fileFormat === 'jpeg' || fileFormat === 'webp'}
                    <Input
                        type="number"
                        label="Compression Quality (%)"
                        bind:value={compressionQuality}
                        placeholder="80"
                        min="1"
                        max="100"
                        step="1"
                    />
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- File Size Results -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatFileSize(estimatedSize)}
                    </div>
                    <div class="text-gray-600">Estimated Size</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {fileFormat.toUpperCase()} format
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-red-600 mb-2">
                        {formatFileSize(uncompressedSize)}
                    </div>
                    <div class="text-gray-600">Uncompressed</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Raw bitmap size
                    </div>
                </div>
            </Card>

            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatNumber((1 - estimatedSize / uncompressedSize) * 100, 1)}%
                    </div>
                    <div class="text-gray-600">Compression</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Size reduction
                    </div>
                </div>
            </Card>
        </div>

        <!-- Format Comparison -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Format Comparison
                </h3>

                <div class="space-y-3">
                    {#each fileFormats as format}
                        {@const formatSize = uncompressedSize * format.compressionRatio}
                        <div class="flex items-center justify-between p-3 rounded-lg {format.value === fileFormat ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
                            <span class="font-medium">{format.label}</span>
                            <span class="text-lg font-bold text-blue-600">{formatFileSize(formatSize)}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>