<script>
  /**
   * Modern Compact Sidebar Component
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
    { value: 'USD', flag: '🇺🇸' },
    { value: 'EUR', flag: '🇪🇺' },
    { value: 'GBP', flag: '🇬🇧' },
    { value: 'JPY', flag: '🇯🇵' },
    { value: 'GEL', flag: '🇬🇪' },
    { value: 'CHF', flag: '🇨🇭' },
    { value: 'CAD', flag: '🇨🇦' },
    { value: 'AUD', flag: '🇦🇺' },
    { value: 'CNY', flag: '🇨🇳' },
    { value: 'INR', flag: '🇮🇳' },
    { value: 'KRW', flag: '🇰🇷' },
    { value: 'SGD', flag: '🇸🇬' },
    { value: 'HKD', flag: '🇭🇰' },
    { value: 'SEK', flag: '🇸🇪' },
    { value: 'NOK', flag: '🇳🇴' },
    { value: 'DKK', flag: '🇩🇰' },
    { value: 'PLN', flag: '🇵🇱' },
    { value: 'CZK', flag: '🇨🇿' },
    { value: 'HUF', flag: '🇭🇺' },
    { value: 'RUB', flag: '🇷🇺' },
    { value: 'BRL', flag: '🇧🇷' },
    { value: 'MXN', flag: '🇲🇽' },
    { value: 'ZAR', flag: '🇿🇦' },
    { value: 'TRY', flag: '🇹🇷' },
    { value: 'ILS', flag: '🇮🇱' },
    { value: 'AED', flag: '🇦🇪' },
    { value: 'SAR', flag: '🇸🇦' },
    { value: 'EGP', flag: '🇪🇬' },
    { value: 'THB', flag: '🇹🇭' },
    { value: 'MYR', flag: '🇲🇾' },
    { value: 'IDR', flag: '🇮🇩' },
    { value: 'PHP', flag: '🇵🇭' },
    { value: 'VND', flag: '🇻🇳' },
    { value: 'UAH', flag: '🇺🇦' },
    { value: 'BGN', flag: '🇧🇬' },
    { value: 'RON', flag: '🇷🇴' },
    { value: 'HRK', flag: '🇭🇷' },
    { value: 'ISK', flag: '🇮🇸' },
    { value: 'NZD', flag: '🇳🇿' },
    { value: 'CLP', flag: '🇨🇱' },
    { value: 'COP', flag: '🇨🇴' },
    { value: 'PEN', flag: '🇵🇪' },
    { value: 'UYU', flag: '🇺🇾' },
    { value: 'ARS', flag: '🇦🇷' },
    { value: 'BOB', flag: '🇧🇴' },
    { value: 'PYG', flag: '🇵🇾' },
    { value: 'LKR', flag: '🇱🇰' },
    { value: 'PKR', flag: '🇵🇰' },
    { value: 'BDT', flag: '🇧🇩' },
    { value: 'NPR', flag: '🇳🇵' },
    { value: 'MMK', flag: '🇲🇲' },
    { value: 'KHR', flag: '🇰🇭' },
    { value: 'LAK', flag: '🇱🇦' },
    { value: 'AMD', flag: '🇦🇲' },
    { value: 'AZN', flag: '🇦🇿' },
    { value: 'BYN', flag: '🇧🇾' },
    { value: 'KZT', flag: '🇰🇿' },
    { value: 'KGS', flag: '🇰🇬' },
    { value: 'TJS', flag: '🇹🇯' },
    { value: 'TMT', flag: '🇹🇲' },
    { value: 'UZS', flag: '🇺🇿' },
    { value: 'AFN', flag: '🇦🇫' },
    { value: 'ALL', flag: '🇦🇱' },
    { value: 'DZD', flag: '🇩🇿' },
    { value: 'AOA', flag: '🇦🇴' },
    { value: 'XCD', flag: '🏴' },
    { value: 'AWG', flag: '🇦🇼' },
    { value: 'BSD', flag: '🇧🇸' },
    { value: 'BHD', flag: '🇧🇭' },
    { value: 'BBD', flag: '🇧🇧' },
    { value: 'BZD', flag: '🇧🇿' },
    { value: 'BMD', flag: '🇧🇲' },
    { value: 'BTN', flag: '🇧🇹' },
    { value: 'BWP', flag: '🇧🇼' },
    { value: 'BND', flag: '🇧🇳' },
    { value: 'BIF', flag: '🇧🇮' },
    { value: 'CVE', flag: '🇨🇻' },
    { value: 'XAF', flag: '🌍' },
    { value: 'XOF', flag: '🌍' },
    { value: 'KMF', flag: '🇰🇲' },
    { value: 'CDF', flag: '🇨🇩' },
    { value: 'CRC', flag: '🇨🇷' },
    { value: 'CUP', flag: '🇨🇺' },
    { value: 'DJF', flag: '🇩🇯' },
    { value: 'DOP', flag: '🇩🇴' },
    { value: 'ERN', flag: '🇪🇷' },
    { value: 'SZL', flag: '🇸🇿' },
    { value: 'ETB', flag: '🇪🇹' },
    { value: 'FKP', flag: '🇫🇰' },
    { value: 'FJD', flag: '🇫🇯' },
    { value: 'GMD', flag: '🇬🇲' },
    { value: 'GHS', flag: '🇬🇭' },
    { value: 'GIP', flag: '🇬🇮' },
    { value: 'GTQ', flag: '🇬🇹' },
    { value: 'GGP', flag: '🇬🇬' },
    { value: 'GNF', flag: '🇬🇳' },
    { value: 'GYD', flag: '🇬🇾' },
    { value: 'HTG', flag: '🇭🇹' },
    { value: 'HNL', flag: '🇭🇳' },
    { value: 'IRR', flag: '🇮🇷' },
    { value: 'IQD', flag: '🇮🇶' },
    { value: 'JMD', flag: '🇯🇲' },
    { value: 'JOD', flag: '🇯🇴' },
    { value: 'KES', flag: '🇰🇪' },
    { value: 'KWD', flag: '🇰🇼' },
    { value: 'LBP', flag: '🇱🇧' },
    { value: 'LSL', flag: '🇱🇸' },
    { value: 'LRD', flag: '🇱🇷' },
    { value: 'LYD', flag: '🇱🇾' },
    { value: 'MOP', flag: '🇲🇴' },
    { value: 'MKD', flag: '🇲🇰' },
    { value: 'MGA', flag: '🇲🇬' },
    { value: 'MWK', flag: '🇲🇼' },
    { value: 'MVR', flag: '🇲🇻' },
    { value: 'MRU', flag: '🇲🇷' },
    { value: 'MUR', flag: '🇲🇺' },
    { value: 'MDL', flag: '🇲🇩' },
    { value: 'MNT', flag: '🇲🇳' },
    { value: 'MAD', flag: '🇲🇦' },
    { value: 'MZN', flag: '🇲🇿' },
    { value: 'NAD', flag: '🇳🇦' },
    { value: 'NIO', flag: '🇳🇮' },
    { value: 'NGN', flag: '🇳🇬' },
    { value: 'OMR', flag: '🇴🇲' },
    { value: 'PAB', flag: '🇵🇦' },
    { value: 'PGK', flag: '🇵🇬' },
    { value: 'QAR', flag: '🇶🇦' },
    { value: 'RWF', flag: '🇷🇼' },
    { value: 'SHP', flag: '🇸🇭' },
    { value: 'WST', flag: '🇼🇸' },
    { value: 'STN', flag: '🇸🇹' },
    { value: 'RSD', flag: '🇷🇸' },
    { value: 'SCR', flag: '🇸🇨' },
    { value: 'SLL', flag: '🇸🇱' },
    { value: 'SBD', flag: '🇸🇧' },
    { value: 'SOS', flag: '🇸🇴' },
    { value: 'SSP', flag: '🇸🇸' },
    { value: 'SRD', flag: '🇸🇷' },
    { value: 'SYP', flag: '🇸🇾' },
    { value: 'TWD', flag: '🇹🇼' },
    { value: 'TZS', flag: '🇹🇿' },
    { value: 'TOP', flag: '🇹🇴' },
    { value: 'TTD', flag: '🇹🇹' },
    { value: 'TND', flag: '🇹🇳' },
    { value: 'UGX', flag: '🇺🇬' },
    { value: 'VUV', flag: '🇻🇺' },
    { value: 'VES', flag: '🇻🇪' },
    { value: 'YER', flag: '🇾🇪' },
    { value: 'ZMW', flag: '🇿🇲' },
    { value: 'ZWL', flag: '🇿🇼' }
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
    const symbols = {
      'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥', 'GEL': '₾',
      'CHF': 'CHF', 'CAD': 'C$', 'AUD': 'A$', 'CNY': '¥',
      'INR': '₹', 'KRW': '₩', 'SGD': 'S$', 'HKD': 'HK$',
      'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr', 'PLN': 'zł',
      'CZK': 'Kč', 'HUF': 'Ft', 'RUB': '₽', 'BRL': 'R$',
      'MXN': '$', 'ZAR': 'R', 'TRY': '₺', 'ILS': '₪',
      'AED': 'د.إ', 'SAR': '﷼', 'EGP': 'E£', 'THB': '฿',
      'MYR': 'RM', 'IDR': 'Rp', 'PHP': '₱', 'VND': '₫'
    };
    return symbols[currency] || currency;
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
            class="w-full text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Enter amount to convert"
          />
          
          <div class="grid grid-cols-2 gap-1">
            <label for="from-currency" class="sr-only">Convert from currency</label>
            <select
              id="from-currency"
              bind:value={fromCurrency}
              class="text-xs px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              class="text-xs px-1 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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