<script>
    /**
     * IP Address Lookup Component
     * Get location and details for any IP address
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";

    // Input values
    let ipAddress = "";
    let loading = false;
    let error = "";
    let result = null;

    // Lookup IP address
    async function lookupIP() {
        if (!ipAddress.trim()) {
            error = "Please enter an IP address";
            return;
        }

        loading = true;
        error = "";
        result = null;

        try {
            const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);

            if (!response.ok) {
                throw new Error("Failed to lookup IP address");
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.reason || "Invalid IP address");
            }

            result = data;
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    // Get current user's IP
    async function getMyIP() {
        loading = true;
        error = "";

        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            ipAddress = data.ip;
            result = data;
        } catch (err) {
            error = "Failed to get your IP address";
        } finally {
            loading = false;
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- IP Lookup Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                IP Address Lookup
            </h2>
            <p class="text-gray-600 mb-6">
                Get location and network information for any IP address. Useful
                for security analysis and network troubleshooting.
            </p>

            <div class="space-y-4">
                <Input
                    type="text"
                    label="IP Address"
                    bind:value={ipAddress}
                    placeholder="8.8.8.8"
                />

                <div class="flex space-x-4">
                    <Button
                        variant="primary"
                        on:click={lookupIP}
                        disabled={loading}
                    >
                        {loading ? "🔍 Looking up..." : "🔍 Lookup IP"}
                    </Button>

                    <Button
                        variant="outline"
                        on:click={getMyIP}
                        disabled={loading}
                    >
                        📍 My IP
                    </Button>
                </div>

                {#if error}
                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-700">{error}</p>
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if result}
        <!-- Location Info -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Location Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">IP Address:</span>
                            <span class="font-semibold font-mono"
                                >{result.ip}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">City:</span>
                            <span class="font-semibold"
                                >{result.city || "Unknown"}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Region:</span>
                            <span class="font-semibold"
                                >{result.region || "Unknown"}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Country:</span>
                            <span class="font-semibold"
                                >{result.country_name || "Unknown"}</span
                            >
                        </div>
                    </div>

                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">ISP:</span>
                            <span class="font-semibold"
                                >{result.org || "Unknown"}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Timezone:</span>
                            <span class="font-semibold"
                                >{result.timezone || "Unknown"}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Postal Code:</span>
                            <span class="font-semibold"
                                >{result.postal || "Unknown"}</span
                            >
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Coordinates:</span>
                            <span class="font-semibold"
                                >{result.latitude}, {result.longitude}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>
