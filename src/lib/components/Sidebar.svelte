<script>
  /**
   * Left Sidebar Component with Widgets
   * @component
   */
  
  import { onMount, onDestroy } from 'svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import { formatCurrency, formatNumber } from '$lib/utils/helpers.js';
  
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
  
  // Extended currencies with flags
  const currencies = [
    { value: 'USD', label: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { value: 'EUR', label: 'Euro', symbol: '€', flag: '🇪🇺' },
    { value: 'GBP', label: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { value: 'JPY', label: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { value: 'CHF', label: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { value: 'AUD', label: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { value: 'CNY', label: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { value: 'INR', label: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { value: 'KRW', label: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { value: 'HKD', label: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { value: 'SEK', label: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
    { value: 'NOK', label: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
    { value: 'DKK', label: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
    { value: 'PLN', label: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
    { value: 'CZK', label: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
    { value: 'HUF', label: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
    { value: 'RUB', label: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
    { value: 'BRL', label: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { value: 'MXN', label: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { value: 'ZAR', label: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
    { value: 'TRY', label: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
    { value: 'ILS', label: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
    { value: 'AED', label: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { value: 'SAR', label: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
    { value: 'EGP', label: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
    { value: 'THB', label: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
    { value: 'MYR', label: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
    { value: 'IDR', label: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
    { value: 'PHP', label: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
    { value: 'VND', label: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' }
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
        // Fallback rates
        const fallbackRates = {
          'USD-EUR': 0.85, 'EUR-USD': 1.18,
          'USD-GBP': 0.73, 'GBP-USD': 1.37,
          'USD-JPY': 110, 'JPY-USD': 0.009
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
      day: 'numeric',
      year: 'numeric'
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
    
    // Initialize browser-specific information
    browserName = navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                  navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                  navigator.userAgent.includes('Safari') ? 'Safari' : 'Other';
    screenResolution = `${screen.width}×${screen.height}`;
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
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

<aside class="w-64 bg-white border-r border-gray-100 h-screen overflow-y-auto sticky top-0 shadow-sm">
  <div class="p-3 space-y-3">
    <!-- Time & Date Widget -->
    <Card>
      <div class="p-3">
        <div class="text-center">
          <div class="text-xl font-mono font-bold text-blue-600 mb-1">
            {formatTime(currentTime)}
          </div>
          <div class="text-xs text-gray-600">
            {formatDate(currentTime)}
          </div>
          <div class="text-xs text-gray-400 mt-1">
            Local Time
          </div>
        </div>
      </div>
    </Card>
    
    <!-- IP Address Widget -->
    <Card>
      <div class="p-3">
        {#if loadingIP}
          <div class="text-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <div class="text-xs text-gray-500">Detecting...</div>
          </div>
        {:else}
          <div class="space-y-1">
            <div class="text-center">
              <div class="text-sm font-mono font-bold text-green-600">
                {userIP}
              </div>
              <div class="text-xs text-gray-600">
                {userLocation}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </Card>
    
    <!-- Currency Converter Widget -->
    <Card>
      <div class="p-3">
        <div class="space-y-2">
          <Input
            type="number"
            bind:value={currencyAmount}
            placeholder="100"
            min="0.01"
            step="0.01"
          />
          
          <div class="grid grid-cols-2 gap-1">
            <select
              bind:value={fromCurrency}
              class="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {#each currencies as currency}
                <option value={currency.value}>{currency.flag} {currency.value}</option>
              {/each}
            </select>
            
            <select
              bind:value={toCurrency}
              class="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {#each currencies as currency}
                <option value={currency.value}>{currency.flag} {currency.value}</option>
              {/each}
            </select>
          </div>
          
          {#if loadingCurrency}
            <div class="text-center">
              <div class="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500 mx-auto mb-1"></div>
              <div class="text-xs text-gray-500">Converting...</div>
            </div>
          {:else}
            <div class="text-center p-2 bg-blue-50 border border-blue-200 rounded">
              <div class="text-sm font-bold text-blue-600">
                {getCurrencySymbol(toCurrency)}{formatNumber(convertedAmount, 2)}
              </div>
              <div class="text-xs text-gray-600">
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
    
    <!-- Quick Links -->
    <Card>
      <div class="p-3">
        <div class="space-y-1">
          <a 
            href="/calculator/bmi-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            BMI Calculator
          </a>
          <a 
            href="/calculator/loan-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            Loan Calculator
          </a>
          <a 
            href="/calculator/percentage-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            Percentage Calculator
          </a>
          <a 
            href="/calculator/tip-calculator" 
            class="block p-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
          >
            Tip Calculator
          </a>
        </div>
      </div>
    </Card>
    
    <!-- System Info -->
    <Card>
      <div class="p-3">
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-gray-500">Browser:</span>
            <span class="font-medium text-gray-700">{browserName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Screen:</span>
            <span class="font-medium text-gray-700">{screenResolution}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Timezone:</span>
            <span class="font-medium text-gray-700">{timezone.split('/').pop()}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</aside>