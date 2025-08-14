<script>
  import { fade, slide } from "svelte/transition";

  let firstName = "";
  let secondName = "";
  let compatibilityScore = null;
  let errorMessage = "";

  // Function to calculate compatibility score
  function calculateCompatibility() {
    if (!firstName.trim() || !secondName.trim()) {
      compatibilityScore = null;
      errorMessage = "Please enter both names to calculate compatibility";
      return;
    }

    // Simple algorithm: sum character codes of both names and normalize to 0-100
    const name1 = firstName.toLowerCase().replace(/\s/g, "");
    const name2 = secondName.toLowerCase().replace(/\s/g, "");
    let sum = 0;

    for (let i = 0; i < Math.max(name1.length, name2.length); i++) {
      const char1 = name1[i] || "";
      const char2 = name2[i] || "";
      sum += (char1.charCodeAt(0) || 0) + (char2.charCodeAt(0) || 0);
    }

    // Normalize to 0-100
    compatibilityScore = Math.round(((sum % 100) * (Math.sin(sum) + 1)) / 2);
    errorMessage = "";
  }

  // Recalculate when names change
  $: if (firstName || secondName) {
    calculateCompatibility();
  }
</script>

<div
  class="bg-gray-100 text-gray-800 container mx-auto p-6 max-w-3xl rounded-lg shadow-lg transition-colors duration-300"
>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Name Compatibility Calculator</h1>
  </div>

  <p class="text-gray-700 mb-6">
    Enter two names to calculate their compatibility score.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" in:slide>
    <div>
      <label for="firstName" class="block text-sm font-medium mb-2">
        First Name
      </label>
      <input
        id="firstName"
        type="text"
        bind:value={firstName}
        placeholder="Enter first name"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
        aria-label="First name for compatibility calculation"
      />
    </div>
    <div>
      <label for="secondName" class="block text-sm font-medium mb-2">
        Second Name
      </label>
      <input
        id="secondName"
        type="text"
        bind:value={secondName}
        placeholder="Enter second name"
        class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-300"
        aria-label="Second name for compatibility calculation"
      />
    </div>
  </div>

  <div class="flex justify-center mb-6">
    <button
      on:click={calculateCompatibility}
      class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      aria-label="Calculate compatibility score"
    >
      Calculate Compatibility
    </button>
  </div>

  {#if errorMessage}
    <p class="text-red-500 mb-4 text-center" in:fade>{errorMessage}</p>
  {/if}

  {#if compatibilityScore !== null}
    <div class="flex flex-col items-center" in:slide>
      <h2 class="text-xl font-semibold mb-2">Compatibility Score</h2>
      <p class="text-4xl font-bold text-blue-600">
        {compatibilityScore}%
      </p>
      <p class="text-gray-700 mt-2">
        {firstName} and {secondName} have a {compatibilityScore}% compatibility
        score.
      </p>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    font-family: "Inter", Arial, sans-serif;
    background-color: #f3f4f6; /* matches bg-gray-100 */
  }
</style>
