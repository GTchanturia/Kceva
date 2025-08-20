<script>
  /**
   * Modern Minimalist Sidebar Component
   * @component
   */

  import { onMount, onDestroy } from "svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import { formatNumber } from "$lib/utils/helpers.js";

  // State
  let currentTime = new Date();
  let userIP = "";
  let userLocation = "";
  let timeInterval;

  let sidebarOpen = false;
  let sidebarEl;

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
    if (sidebarOpen) {
      sidebarEl.classList.remove("-translate-x-full");
    } else {
      sidebarEl.classList.add("-translate-x-full");
    }
  }

  function closeSidebar() {
    sidebarOpen = false;
    sidebarEl.classList.add("-translate-x-full");
  }

  // Currency converter state
  let currencyAmount = 100;
  let fromCurrency = "USD";
  let toCurrency = "EUR";
  let convertedAmount = 0;
  let exchangeRate = 0;
  let lastCurrencyUpdate = "";

  // Loading states
  let loadingIP = true;
  let loadingCurrency = false;

  // Browser-specific info (initialized safely for SSR)
  let browserName = "Unknown";
  let screenResolution = "Unknown";
  let timezone = "Unknown";

  // Essential currency list with flags
  const currencies = [
    { value: "USD", flag: "🇺🇸", name: "US Dollar" },
    { value: "EUR", flag: "🇪🇺", name: "Euro" },
    { value: "GBP", flag: "🇬🇧", name: "British Pound" },
    { value: "JPY", flag: "🇯🇵", name: "Japanese Yen" },
    { value: "GEL", flag: "🇬🇪", name: "Georgian Lari" },
    { value: "CHF", flag: "🇨🇭", name: "Swiss Franc" },
    { value: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
    { value: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
    { value: "CNY", flag: "🇨🇳", name: "Chinese Yuan" },
    { value: "INR", flag: "🇮🇳", name: "Indian Rupee" },
    { value: "KRW", flag: "🇰🇷", name: "South Korean Won" },
    { value: "SGD", flag: "🇸🇬", name: "Singapore Dollar" },
    { value: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar" },
    { value: "SEK", flag: "🇸🇪", name: "Swedish Krona" },
    { value: "NOK", flag: "🇳🇴", name: "Norwegian Krone" },
    { value: "DKK", flag: "🇩🇰", name: "Danish Krone" },
    { value: "PLN", flag: "🇵🇱", name: "Polish Zloty" },
    { value: "CZK", flag: "🇨🇿", name: "Czech Koruna" },
    { value: "RUB", flag: "🇷🇺", name: "Russian Ruble" },
    { value: "BRL", flag: "🇧🇷", name: "Brazilian Real" }
  ];

  // Update time every second
  function updateTime() {
    currentTime = new Date();
  }

  // Get user's IP and location with IPv6 handling
  async function getUserInfo() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      // Handle IPv6 to IPv4 conversion if needed
      let displayIP = data.ip || "Unknown";
      
      // Check if IP is IPv6 format and try to get IPv4
      if (displayIP.includes(':')) {
        try {
          const ipv4Response = await fetch("https://api4.ipify.org?format=json");
          const ipv4Data = await ipv4Response.json();
          if (ipv4Data.ip && !ipv4Data.ip.includes(':')) {
            displayIP = ipv4Data.ip;
          }
        } catch (ipv4Error) {
          // If IPv4 fetch fails, show simplified IPv6
          displayIP = `IPv6: ${displayIP.split(':').slice(0, 3).join(':')}...`;
        }
      }

      userIP = displayIP;
      userLocation =
        data.city && data.country_name
          ? `${data.city}, ${data.country_name}`
          : "Unknown Location";

      loadingIP = false;
    } catch (error) {
      console.error("Failed to get user info:", error);
      userIP = "Unable to detect";
      userLocation = "Unknown Location";
      loadingIP = false;
    }
  }

  // Convert currency
  async function convertCurrency() {
    if (currencyAmount <= 0 || fromCurrency === toCurrency) {
      if (fromCurrency === toCurrency) {
        convertedAmount = currencyAmount;
        exchangeRate = 1;
      }
      return;
    }

    loadingCurrency = true;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      );

      if (response.ok) {
        const data = await response.json();
        exchangeRate = data.rates[toCurrency] || 1;
        convertedAmount = currencyAmount * exchangeRate;
        lastCurrencyUpdate = new Date().toLocaleTimeString();
      } else {
        // Fallback rates for common pairs
        const fallbackRates = {
          "USD-EUR": 0.85,
          "EUR-USD": 1.18,
          "USD-GBP": 0.73,
          "GBP-USD": 1.37,
          "USD-JPY": 110,
          "JPY-USD": 0.009,
          "USD-GEL": 2.65,
          "GEL-USD": 0.38,
        };
        const rateKey = `${fromCurrency}-${toCurrency}`;
        exchangeRate = fallbackRates[rateKey] || 1;
        convertedAmount = currencyAmount * exchangeRate;
        lastCurrencyUpdate = "Estimated";
      }
    } catch (error) {
      console.error("Currency conversion failed:", error);
      exchangeRate = 1;
      convertedAmount = currencyAmount;
      lastCurrencyUpdate = "Error";
    } finally {
      loadingCurrency = false;
    }
  }

  // Format time display
  function formatTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  // Get currency symbol
  function getCurrencySymbol(currency) {
    const symbols = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      GEL: "₾",
      CHF: "CHF",
      CAD: "C$",
      AUD: "A$",
      CNY: "¥",
      INR: "₹",
      KRW: "₩",
      SGD: "S$",
      HKD: "HK$",
      SEK: "kr",
      NOK: "kr",
      DKK: "kr",
      PLN: "zł",
      CZK: "Kč",
      RUB: "₽",
      BRL: "R$",
    };
    return symbols[currency] || currency;
  }

  onMount(() => {
    // Start time updates
    timeInterval = setInterval(updateTime, 1000);

    // Initialize browser-specific information safely
    if (typeof navigator !== "undefined") {
      browserName = navigator.userAgent.includes("Chrome")
        ? "Chrome"
        : navigator.userAgent.includes("Firefox")
          ? "Firefox"
          : navigator.userAgent.includes("Safari")
            ? "Safari"
            : "Other";
    }

    if (typeof screen !== "undefined") {
      screenResolution = `${screen.width}×${screen.height}`;
    }

    if (typeof Intl !== "undefined") {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // Get user info
    getUserInfo();

    // Initial currency conversion
    convertCurrency();
  });

  onDestroy(() => {
    if (timeInterval) {
      clearInterval(timeInterval);
    }
  });

  // Auto-convert currency when values change
  let currencyTimeout;
  $: if (currencyAmount && fromCurrency && toCurrency) {
    clearTimeout(currencyTimeout);
    currencyTimeout = setTimeout(() => {
      convertCurrency();
    }, 1000);
  }
</script>

<!-- Mobile Toggle Button -->
<button
  on:click={toggleSidebar}
  class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  aria-label="Toggle sidebar"
>
  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

<!-- Mobile Backdrop -->
{#if sidebarOpen}
  <div
    on:click={closeSidebar}
    class="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
    aria-hidden="true"
  ></div>
{/if}

<!-- Sidebar -->
<aside
  class="bg-white border-r border-gray-100 overflow-y-auto
         w-80 lg:w-72 xl:w-80
         fixed lg:relative lg:h-auto h-screen top-0 left-0
         transform lg:translate-x-0 -translate-x-full
         transition-transform duration-300 ease-in-out z-50
         shadow-xl lg:shadow-none"
  aria-label="Information panel"
  bind:this={sidebarEl}
>
  <div class="relative h-full p-6 space-y-6">
    <!-- Close Button (Mobile) -->
    <button
      on:click={closeSidebar}
      class="lg:hidden absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      aria-label="Close sidebar"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Time Widget -->
    <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div class="flex items-center space-x-3 mb-3">
        <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="font-medium text-gray-900">Current Time</h3>
      </div>
      
      <div class="text-center space-y-1">
        <time class="text-2xl font-mono font-bold text-blue-600 block" datetime={currentTime.toISOString()}>
          {formatTime(currentTime)}
        </time>
        <div class="text-sm text-gray-600">{formatDate(currentTime)}</div>
        <div class="text-xs text-gray-400">{timezone.split("/").pop() || "Local"}</div>
      </div>
    </div>

    <!-- Location Widget -->
    <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div class="flex items-center space-x-3 mb-3">
        <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 class="font-medium text-gray-900">Your Location</h3>
      </div>

      {#if loadingIP}
        <div class="text-center py-2">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <div class="text-sm text-gray-500">Detecting location...</div>
        </div>
      {:else}
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">IP Address:</span>
            <span class="text-sm font-mono font-medium text-green-600">{userIP}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Location:</span>
            <span class="text-sm font-medium text-gray-900">{userLocation}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Browser:</span>
            <span class="text-sm text-gray-700">{browserName}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Screen:</span>
            <span class="text-sm text-gray-700">{screenResolution}</span>
          </div>
        </div>
      {/if}
    </div>

    <!-- Currency Converter Widget -->
    <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div class="flex items-center space-x-3 mb-4">
        <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
        <h3 class="font-medium text-gray-900">Quick Convert</h3>
      </div>

      <div class="space-y-3">
        <input
          type="number"
          bind:value={currencyAmount}
          placeholder="100"
          min="0.01"
          step="0.01"
          class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Enter amount to convert"
        />

        <div class="grid grid-cols-2 gap-2">
          <select
            bind:value={fromCurrency}
            class="px-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select source currency"
          >
            {#each currencies as currency}
              <option value={currency.value}>{currency.flag} {currency.value}</option>
            {/each}
          </select>

          <select
            bind:value={toCurrency}
            class="px-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select target currency"
          >
            {#each currencies as currency}
              <option value={currency.value}>{currency.flag} {currency.value}</option>
            {/each}
          </select>
        </div>

        {#if loadingCurrency}
          <div class="text-center py-2">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto mb-1"></div>
            <div class="text-xs text-gray-500">Converting...</div>
          </div>
        {:else}
          <div class="bg-white p-3 rounded-lg border border-gray-200">
            <div class="text-lg font-bold text-blue-600 text-center">
              {getCurrencySymbol(toCurrency)}{formatNumber(convertedAmount, 2)}
            </div>
            <div class="text-xs text-gray-600 text-center mt-1">
              1 {fromCurrency} = {formatNumber(exchangeRate, 4)} {toCurrency}
            </div>
            {#if lastCurrencyUpdate}
              <div class="text-xs text-gray-400 text-center mt-1">
                Updated: {lastCurrencyUpdate}
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>

    <!-- Quick Access -->
    <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div class="flex items-center space-x-3 mb-4">
        <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 class="font-medium text-gray-900">Popular Tools</h3>
      </div>

      <nav class="space-y-1">
        <a
          href="/calculator/bmi-calculator"
          class="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>BMI Calculator</span>
        </a>
        
        <a
          href="/calculator/loan-calculator"
          class="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <span>Loan Calculator</span>
        </a>
        
        <a
          href="/calculator/percentage-calculator"
          class="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Percentage Calculator</span>
        </a>
        
        <a
          href="/calculator/currency-converter"
          class="flex items-center space-x-3 p-2 text-sm text-gray-700 hover:bg-white hover:text-blue-600 rounded-lg transition-all"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 5l-4 4" />
          </svg>
          <span>Currency Converter</span>
        </a>
      </nav>
    </div>
  </div>
</aside>