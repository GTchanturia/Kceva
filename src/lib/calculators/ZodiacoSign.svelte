<script>
    import { fade, slide } from "svelte/transition";

    let day = "";
    let month = "";
    let year = "";
    let zodiacSign = null;
    let errorMessage = "";

    // Zodiac sign data with date ranges and descriptions
    const zodiacSigns = [
        {
            sign: "Capricorn",
            start: "12-22",
            end: "01-19",
            symbol: "♑",
            description: "Ambitious, disciplined, and practical.",
        },
        {
            sign: "Aquarius",
            start: "01-20",
            end: "02-18",
            symbol: "♒",
            description: "Innovative, independent, and humanitarian.",
        },
        {
            sign: "Pisces",
            start: "02-19",
            end: "03-20",
            symbol: "♓",
            description: "Compassionate, intuitive, and artistic.",
        },
        {
            sign: "Aries",
            start: "03-21",
            end: "04-19",
            symbol: "♈",
            description: "Bold, energetic, and courageous.",
        },
        {
            sign: "Taurus",
            start: "04-20",
            end: "05-20",
            symbol: "♉",
            description: "Reliable, patient, and determined.",
        },
        {
            sign: "Gemini",
            start: "05-21",
            end: "06-20",
            symbol: "♊",
            description: "Adaptable, curious, and communicative.",
        },
        {
            sign: "Cancer",
            start: "06-21",
            end: "07-22",
            symbol: "♋",
            description: "Nurturing, empathetic, and protective.",
        },
        {
            sign: "Leo",
            start: "07-23",
            end: "08-22",
            symbol: "♌",
            description: "Confident, charismatic, and ambitious.",
        },
        {
            sign: "Virgo",
            start: "08-23",
            end: "09-22",
            symbol: "♍",
            description: "Analytical, practical, and detail-oriented.",
        },
        {
            sign: "Libra",
            start: "09-23",
            end: "10-22",
            symbol: "♎",
            description: "Balanced, diplomatic, and charming.",
        },
        {
            sign: "Scorpio",
            start: "10-23",
            end: "11-21",
            symbol: "♏",
            description: "Passionate, resourceful, and intense.",
        },
        {
            sign: "Sagittarius",
            start: "11-22",
            end: "12-21",
            symbol: "♐",
            description: "Adventurous, optimistic, and philosophical.",
        },
    ];

    // Function to calculate zodiac sign
    function calculateZodiacSign() {
        errorMessage = "";
        zodiacSign = null;

        // Validate inputs
        if (!day || !month || !year) {
            errorMessage = "Please enter a complete birth date";
            return;
        }

        const dayNum = parseInt(day, 10);
        const monthNum = parseInt(month, 10);
        const yearNum = parseInt(year, 10);

        if (
            isNaN(dayNum) ||
            isNaN(monthNum) ||
            isNaN(yearNum) ||
            dayNum < 1 ||
            dayNum > 31 ||
            monthNum < 1 ||
            monthNum > 12 ||
            yearNum < 1900 ||
            yearNum > 2025
        ) {
            errorMessage =
                "Please enter a valid birth date (e.g., Day: 15, Month: 6, Year: 1990)";
            return;
        }

        // Create date string in MM-DD format for comparison
        const dateStr = `${monthNum.toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;

        // Find zodiac sign
        zodiacSign = zodiacSigns.find((sign) => {
            const [startMonth, startDay] = sign.start.split("-").map(Number);
            const [endMonth, endDay] = sign.end.split("-").map(Number);

            const dateNum = monthNum * 100 + dayNum;
            const startNum = startMonth * 100 + startDay;
            const endNum = endMonth * 100 + endDay;

            if (startMonth > endMonth) {
                // Signs that span year-end (e.g., Capricorn)
                return dateNum >= startNum || dateNum <= endNum;
            } else {
                return dateNum >= startNum && dateNum <= endNum;
            }
        });

        if (!zodiacSign) {
            errorMessage =
                "Unable to determine zodiac sign. Please check your date.";
        }
    }

    // Recalculate when inputs change
    $: if (day || month || year) {
        calculateZodiacSign();
    }
</script>

<div
    class="bg-gray-100 text-gray-800 container mx-auto p-6 max-w-3xl rounded-lg shadow-lg"
>
    <h1 class="text-3xl font-bold mb-6">Zodiac Sign Calculator</h1>
    <p class="text-gray-600 mb-6">
        Enter your birth date to find your zodiac sign.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" in:slide>
        <div>
            <label for="day" class="block text-sm font-medium mb-2">
                Day
            </label>
            <input
                id="day"
                type="number"
                min="1"
                max="31"
                bind:value={day}
                placeholder="e.g., 15"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Day of birth"
            />
        </div>
        <div>
            <label for="month" class="block text-sm font-medium mb-2">
                Month
            </label>
            <input
                id="month"
                type="number"
                min="1"
                max="12"
                bind:value={month}
                placeholder="e.g., 6"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Month of birth"
            />
        </div>
        <div>
            <label for="year" class="block text-sm font-medium mb-2">
                Year
            </label>
            <input
                id="year"
                type="number"
                min="1900"
                max="2025"
                bind:value={year}
                placeholder="e.g., 1990"
                class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                aria-label="Year of birth"
            />
        </div>
    </div>

    <div class="flex justify-center mb-6">
        <button
            on:click={calculateZodiacSign}
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            aria-label="Calculate zodiac sign"
        >
            Calculate Zodiac Sign
        </button>
    </div>

    {#if errorMessage}
        <p class="text-red-500 mb-4 text-center" in:fade>{errorMessage}</p>
    {/if}

    {#if zodiacSign}
        <div class="flex flex-col items-center" in:slide>
            <h2 class="text-2xl font-semibold mb-2">
                {zodiacSign.sign}
                {zodiacSign.symbol}
            </h2>
            <p class="text-gray-600 mb-4">{zodiacSign.description}</p>
            <p class="text-gray-600">
                Your zodiac sign is {zodiacSign.sign}, associated with dates
                from {zodiacSign.start} to {zodiacSign.end}.
            </p>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        font-family: "Inter", Arial, sans-serif;
    }
</style>
