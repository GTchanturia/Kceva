<script>
    let minValue = 1;
    let maxValue = 100;
    let quantity = 1;
    let generatedNumbers = [];
    let errorMessage = "";

    // Function to generate random numbers
    function generateRandomNumbers() {
        errorMessage = "";

        // Validate inputs
        if (minValue >= maxValue) {
            errorMessage = "Minimum value must be less than maximum value";
            generatedNumbers = [];
            return;
        }
        if (quantity < 1) {
            errorMessage = "Quantity must be at least 1";
            generatedNumbers = [];
            return;
        }
        if (!Number.isInteger(quantity)) {
            errorMessage = "Quantity must be a whole number";
            generatedNumbers = [];
            return;
        }

        // Generate random numbers
        generatedNumbers = Array.from({ length: quantity }, () => {
            return (
                Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
            );
        });
    }
</script>

<div class="container mx-auto p-4 max-w-2xl">
    <h1 class="text-2xl font-bold mb-4">Random Number Generator</h1>
    <p class="text-gray-600 mb-6">
        Generate random numbers within a specified range.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
            <label
                for="minValue"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Minimum Value
            </label>
            <input
                id="minValue"
                type="number"
                bind:value={minValue}
                placeholder="Min (e.g., 1)"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label
                for="maxValue"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Maximum Value
            </label>
            <input
                id="maxValue"
                type="number"
                bind:value={maxValue}
                placeholder="Max (e.g., 100)"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label
                for="quantity"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Quantity
            </label>
            <input
                id="quantity"
                type="number"
                bind:value={quantity}
                min="1"
                placeholder="Quantity (e.g., 1)"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    </div>

    <button
        on:click={generateRandomNumbers}
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mb-4"
    >
        Generate Numbers
    </button>

    {#if errorMessage}
        <p class="text-red-500 mb-4">{errorMessage}</p>
    {/if}

    {#if generatedNumbers.length > 0}
        <div class="mt-4">
            <h2 class="text-lg font-semibold mb-2">Generated Numbers:</h2>
            <div class="flex flex-wrap gap-2">
                {#each generatedNumbers as number}
                    <span class="bg-gray-100 px-3 py-1 rounded-md"
                        >{number}</span
                    >
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        font-family: Arial, sans-serif;
    }
</style>
