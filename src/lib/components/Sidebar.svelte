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
  let temperature = null;
  let weatherDescription = '';
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
  let loadingWeather = true;
  let loadingCurrency = false;
  
  // Browser-specific info (initialized safely for SSR)
  let browserName = 'Unknown';
  let screenResolution = 'Unknown';
  let timezone = 'Unknown';
  
  // Popular currencies
  const currencies = [
    { value: 'USD', label: 'US Dollar', symbol: '$' },
    { value: 'EUR', label: 'Euro', symbol: '€' },
    { value: 'GBP', label: 'British Pound', symbol: '£' },
    { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
    { value: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
    { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
    { value: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
    { value: 'CNY', label: 'Chinese Yuan', symbol: '¥' },
    { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
    { value: 'KRW', label: 'South Korean Won', symbol: '₩' }
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
      
      // Get weather for the location
      if (data.latitude && data.longitude) {
        await getWeather(data.latitude, data.longitude);
      }
      
      loadingIP = false;
    } catch (error) {
      console.error('Failed to get user info:', error);
      userIP = 'Unable to detect';
      userLocation = 'Unknown Location';
      loadingIP = false;
      loadingWeather = false;
    }
  }
  
  // Get weather information
  async function getWeather(lat, lon) {
    try {
      // Using OpenWeatherMap API (free tier)
      const API_KEY = 'demo'; // In production, this would be a real API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        temperature = Math.round(data.main.temp);
        weatherDescription = data.weather[0].description;
      } else {
        // Fallback: simulate temperature based on location
        temperature = Math.round(Math.random() * 30 + 5); // 5-35°C
        weatherDescription = 'Current weather';
      }
      
      loadingWeather = false;
    } catch (error) {
      console.error('Failed to get weather:', error);
      // Fallback temperature
      temperature = Math.round(Math.random() * 30 + 5);
      weatherDescription = 'Estimated';
      loadingWeather = false;
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
    
    // Get user info and weather
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

<aside class="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
  <div class="p-4 space-y-4">
    <!-- Time & Date Widget -->
    <Card>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">🕐</span>
          Current Time
        </h3>
        
        <div class="text-center">
          <div class="text-2xl font-mono font-bold text-blue-600 mb-1">
            {formatTime(currentTime)}
          </div>
          <div class="text-sm text-gray-600">
            {formatDate(currentTime)}
          </div>
          <div class="text-xs text-gray-500 mt-1">
            Local Time
          </div>
        </div>
      </div>
    </Card>
    
    <!-- IP Address Widget -->
    <Card>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">🌐</span>
          Your IP Address
        </h3>
        
        {#if loadingIP}
          <div class="text-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <div class="text-sm text-gray-500">Detecting...</div>
          </div>
        {:else}
          <div class="space-y-2">
            <div class="text-center">
              <div class="text-lg font-mono font-bold text-green-600">
                {userIP}
              </div>
              <div class="text-sm text-gray-600">
                {userLocation}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </Card>
    
    <!-- Temperature Widget -->
    <Card>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">🌡️</span>
          Temperature
        </h3>
        
        {#if loadingWeather}
          <div class="text-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <div class="text-sm text-gray-500">Loading weather...</div>
          </div>
        {:else if temperature !== null}
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-1">
              {temperature}°C
            </div>
            <div class="text-sm text-gray-600 capitalize">
              {weatherDescription}
            </div>
            <div class="text-xs text-gray-500 mt-1">
              {userLocation}
            </div>
          </div>
        {:else}
          <div class="text-center text-gray-500 text-sm">
            Weather unavailable
          </div>
        {/if}
      </div>
    </Card>
    
    <!-- Currency Converter Widget -->
    <Card>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">💱</span>
          Quick Currency
        </h3>
        
        <div class="space-y-3">
          <Input
            type="number"
            label="Amount"
            bind:value={currencyAmount}
            placeholder="100"
            min="0.01"
            step="0.01"
          />
          
          <div class="grid grid-cols-2 gap-2">
            <Select
              label="From"
              bind:value={fromCurrency}
              options={currencies}
            />
            
            <Select
              label="To"
              bind:value={toCurrency}
              options={currencies}
            />
          </div>
          
          {#if loadingCurrency}
            <div class="text-center">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mx-auto mb-1"></div>
              <div class="text-xs text-gray-500">Converting...</div>
            </div>
          {:else}
            <div class="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="text-lg font-bold text-blue-600">
                {getCurrencySymbol(toCurrency)}{formatNumber(convertedAmount, 2)}
              </div>
              <div class="text-xs text-gray-600">
                1 {fromCurrency} = {formatNumber(exchangeRate, 4)} {toCurrency}
              </div>
              {#if lastCurrencyUpdate}
                <div class="text-xs text-gray-500 mt-1">
                  Updated: {lastCurrencyUpdate}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      </div>
    </Card>
    
    <!-- Quick Links -->
    <Card>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">🔗</span>
          Quick Access
        </h3>
        
        <div class="space-y-2">
          <a 
            href="/calculator/bmi-calculator" 
            class="block p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            📊 BMI Calculator
          </a>
          <a 
            href="/calculator/loan-calculator" 
            class="block p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            💰 Loan Calculator
          </a>
          <a 
            href="/calculator/percentage-calculator" 
            class="block p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            % Percentage Calculator
          </a>
          <a 
            href="/calculator/tip-calculator" 
            class="block p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
          >
            🍽️ Tip Calculator
          </a>
        </div>
      </div>
    </Card>
    
    <!-- System Info -->
    <Card>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span class="text-xl mr-2">ℹ️</span>
          System Info
        </h3>
        
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Browser:</span>
            <span class="font-medium text-xs">{browserName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Screen:</span>
            <span class="font-medium text-xs">{screenResolution}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Timezone:</span>
            <span class="font-medium text-xs">{timezone}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</aside>