<script>
  /**
   * Enhanced Left Sidebar Component with Widgets
   * @component
   */
  
  import { onMount, onDestroy } from 'svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { formatNumber } from '$lib/utils/helpers.js';
  
  // State
  let currentTime = new Date();
  let userIP = '';
  let userLocation = '';
  let timeInterval;
  
  // Currency converter state
  let currencyAmount = 100;
  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let convertedAmount = 0;
  let exchangeRate = 0;
  let lastCurrencyUpdate = '';
  
  // Loading states
  let loadingIP = true;
  let loadingCurrency = false;
  
  // Browser-specific info (initialized safely for SSR)
  let browserName = 'Unknown';
  let screenResolution = 'Unknown';
  let timezone = 'Unknown';
  
  // Comprehensive currency list with flags (50+ currencies)
  const currencies = [
    { value: 'USD', symbol: '$', flag: '🇺🇸' },
    { value: 'EUR', symbol: '€', flag: '🇪🇺' },
    { value: 'GBP', symbol: '£', flag: '🇬🇧' },
    { value: 'JPY', symbol: '¥', flag: '🇯🇵' },
    { value: 'CHF', symbol: 'CHF', flag: '🇨🇭' },
    { value: 'CAD', symbol: 'C$', flag: '🇨🇦' },
    { value: 'AUD', symbol: 'A$', flag: '🇦🇺' },
    { value: 'CNY', symbol: '¥', flag: '🇨🇳' },
    { value: 'INR', symbol: '₹', flag: '🇮🇳' },
    { value: 'KRW', symbol: '₩', flag: '🇰🇷' },
    { value: 'SGD', symbol: 'S$', flag: '🇸🇬' },
    { value: 'HKD', symbol: 'HK$', flag: '🇭🇰' },
    { value: 'SEK', symbol: 'kr', flag: '🇸🇪' },
    { value: 'NOK', symbol: 'kr', flag: '🇳🇴' },
    { value: 'DKK', symbol: 'kr', flag: '🇩🇰' },
    { value: 'PLN', symbol: 'zł', flag: '🇵🇱' },
    { value: 'CZK', symbol: 'Kč', flag: '🇨🇿' },
    { value: 'HUF', symbol: 'Ft', flag: '🇭🇺' },
    { value: 'RUB', symbol: '₽', flag: '🇷🇺' },
    { value: 'BRL', symbol: 'R$', flag: '🇧🇷' },
    { value: 'MXN', symbol: '$', flag: '🇲🇽' },
    { value: 'ZAR', symbol: 'R', flag: '🇿🇦' },
    { value: 'TRY', symbol: '₺', flag: '🇹🇷' },
    { value: 'ILS', symbol: '₪', flag: '🇮🇱' },
    { value: 'AED', symbol: 'د.إ', flag: '🇦🇪' },
    { value: 'SAR', symbol: '﷼', flag: '🇸🇦' },
    { value: 'EGP', symbol: 'E£', flag: '🇪🇬' },
    { value: 'THB', symbol: '฿', flag: '🇹🇭' },
    { value: 'MYR', symbol: 'RM', flag: '🇲🇾' },
    { value: 'IDR', symbol: 'Rp', flag: '🇮🇩' },
    { value: 'PHP', symbol: '₱', flag: '🇵🇭' },
    { value: 'VND', symbol: '₫', flag: '🇻🇳' },
    { value: 'GEL', symbol: '₾', flag: '🇬🇪' },
    { value: 'UAH', symbol: '₴', flag: '🇺🇦' },
    { value: 'BGN', symbol: 'лв', flag: '🇧🇬' },
    { value: 'RON', symbol: 'lei', flag: '🇷🇴' },
    { value: 'HRK', symbol: 'kn', flag: '🇭🇷' },
    { value: 'ISK', symbol: 'kr', flag: '🇮🇸' },
    { value: 'NZD', symbol: 'NZ$', flag: '🇳🇿' },
    { value: 'CLP', symbol: '$', flag: '🇨🇱' },
    { value: 'COP', symbol: '$', flag: '🇨🇴' },
    { value: 'PEN', symbol: 'S/', flag: '🇵🇪' },
    { value: 'UYU', symbol: '$U', flag: '🇺🇾' },
    { value: 'ARS', symbol: '$', flag: '🇦🇷' },
    { value: 'BOB', symbol: 'Bs', flag: '🇧🇴' },
    { value: 'PYG', symbol: '₲', flag: '🇵🇾' },
    { value: 'LKR', symbol: 'Rs', flag: '🇱🇰' },
    { value: 'PKR', symbol: 'Rs', flag: '🇵🇰' },
    { value: 'BDT', symbol: '৳', flag: '🇧🇩' },
    { value: 'NPR', symbol: 'Rs', flag: '🇳🇵' },
    { value: 'MMK', symbol: 'K', flag: '🇲🇲' },
    { value: 'KHR', symbol: '៛', flag: '🇰🇭' },
    { value: 'LAK', symbol: '₭', flag: '🇱🇦' }
  ];
  
  // Update time every second
  function updateTime() {
    currentTime = new Date();
  }
  
  // Get user's IP and location
  async function getUserInfo() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      userIP = data.ip || 'Unknown';
      userLocation = data.city && data.country_name 
        ? `${data.city}, ${data.country_name}` 
        : 'Unknown Location';
      
      loadingIP = false;
    } catch (error) {
      console.error('Failed to get user info:', error);
      userIP = 'Unable to detect';
      userLocation = 'Unknown Location';
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
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      
      if (response.ok) {
        const data = await response.json();
        exchangeRate = data.rates[toCurrency] || 1;
        convertedAmount = currencyAmount * exchangeRate;
        lastCurrencyUpdate = new Date().toLocaleTimeString();
      } else {
        // Fallback rates for common pairs
        const fallbackRates = {
          'USD-EUR': 0.85, 'EUR-USD': 1.18,
          'USD-GBP': 0.73, 'GBP-USD': 1.37,
          'USD-JPY': 110, 'JPY-USD': 0.009,
          'USD-GEL': 2.65, 'GEL-USD': 0.38
        };
        const rateKey = `${fromCurrency}-${toCurrency}`;
        exchangeRate = fallbackRates[rateKey] || 1;
        convertedAmount = currencyAmount * exchangeRate;
        lastCurrencyUpdate = 'Estimated';
      }
    } catch (error) {
      console.error('Currency conversion failed:', error);
      exchangeRate = 1;
      convertedAmount = currencyAmount;
      lastCurrencyUpdate = 'Error';
    } finally {
      loadingCurrency = false;
    }
  }
  
  // Format time display
  function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  
  function formatDate(date) {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
  
  // Get currency symbol
  function getCurrencySymbol(currency) {
    const currencyData = currencies.find(c => c.value === currency);
    return currencyData?.symbol || currency;
  }
  
  onMount(() => {
    // Start time updates
    timeInterval = setInterval(updateTime, 1000);
    
    // Initialize browser-specific information safely
    if (typeof navigator !== 'undefined') {
      browserName = navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                    navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                    navigator.userAgent.includes('Safari') ? 'Safari' : 'Other';
    }
    
    if (typeof screen !== 'undefined') {
      screenResolution = `${screen.width}×${screen.height}`;
    }
    
    if (typeof Intl !== 'undefined') {
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

<aside class="w-64 bg-white border-r border-gray-100 h-screen overflow-y-auto sticky top-0 shadow-sm" role="complementary" aria-label="Sidebar widgets">
  <div class="p-3 space-y-3">
    <!-- Time & Date Widget -->
    <Card>
      <div class="p-3" role="region" aria-label="Current time and date">
        <div class="text-center">
          <time class="text-xl font-mono font-bold text-blue-600 mb-1 block" datetime={currentTime.toISOString()}>
            {formatTime(currentTime)}
          </time>
          <div class="text-xs text-gray-600">
            {formatDate(currentTime)}
          </div>
          <div class="text-xs text-gray-400 mt-1">
            {timezone.split('/').pop() || 'Local'}
          </div>
        </div>
      </div>
    </Card>
    
    <!-- IP Address Widget -->
    <Card>
      <div class="p-3" role="region" aria-label="IP address and location information">
        {#if loadingIP}
          <div class="text-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto mb-2" aria-hidden="true"></div>
            <div class="text-xs text-gray-500">Detecting location...</div>
          </div>
        {:else}
          <div class="space-y-1">
            <div class="text-center">
              <div class="text-sm font-mono font-bold text-green-600" aria-label="Your IP address">
                {userIP}
              </div>
              <div class="text-xs text-gray-600" aria-label="Your location">
                {userLocation}
              </div>
              <div class="text-xs text-gray-400 mt-1">
                Browser: {browserName}
              </div>
              <div class="text-xs text-gray-400">
                Screen: {screenResolution}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </Card>
    
    <!-- Currency Converter Widget -->
    <Card>
      <div class="p-3" role="region" aria-label="Quick currency converter">
        <div class="space-y-2">
          <label for="currency-amount" class="sr-only">Amount to convert</label>
          <input
            id="currency-amount"
            type="number"
            bind:value={currencyAmount}
            placeholder="100"
            min="0.01"
            step="0.01"
            class="w-full text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Enter amount to convert"
          />
          
          <div class="grid grid-cols-2 gap-1">
            <label for="from-currency" class="sr-only">Convert from currency</label>
            <select
              id="from-currency"
              bind:value={fromCurrency}
              class="text-xs px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select source currency"
            >
              {#each currencies as currency}
                <option value={currency.value}>{currency.flag} {currency.value}</option>
              {/each}
            </select>
            
            <label for="to-currency" class="sr-only">Convert to currency</label>
            <select
              id="to-currency"
              bind:value={toCurrency}
              class="text-xs px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Select target currency"
            >
              {#each currencies as currency}
                <option value={currency.value}>{currency.flag} {currency.value}</option>
              {/each}
            </select>
          </div>
          
          {#if loadingCurrency}
            <div class="text-center">
              <div class="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500 mx-auto mb-1" aria-hidden="true"></div>
              <div class="text-xs text-gray-500">Converting...</div>
            </div>
          {:else}
            <div class="text-center p-2 bg-blue-50 border border-blue-200 rounded">
              <div class="text-sm font-bold text-blue-600" aria-label="Conversion result">
                {getCurrencySymbol(toCurrency)}{formatNumber(convertedAmount, 2)}
              </div>
              <div class="text-xs text-gray-600" aria-label="Exchange rate">
                1 {fromCurrency} = {formatNumber(exchangeRate, 4)} {toCurrency}
              </div>
              {#if lastCurrencyUpdate}
                <div class="text-xs text-gray-400 mt-1">
                  {lastCurrencyUpdate}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </Card>
    
    <!-- Quick Calculator Links -->
    <Card>
      <nav class="p-3" role="navigation" aria-label="Quick access to popular calculators">
        <div class="space-y-1">
          <a 
            href="/calculator/bmi-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Access BMI calculator to calculate body mass index"
          >
            BMI Calculator
          </a>
          <a 
            href="/calculator/loan-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Access loan calculator for monthly payment calculations"
          >
            Loan Calculator
          </a>
          <a 
            href="/calculator/percentage-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Access percentage calculator for mathematical percentage calculations"
          >
            Percentage Calculator
          </a>
          <a 
            href="/calculator/tip-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Access tip calculator for restaurant bill calculations"
          >
            Tip Calculator
          </a>
          <a 
            href="/calculator/currency-converter" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Access full currency converter with live exchange rates"
          >
            Currency Converter
          </a>
        </div>
      </nav>
    </Card>
  </div>
</aside>