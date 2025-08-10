<script>
    /**
     * Currency Converter Component
     * Converts between different currencies using live exchange rates
     */
    
    import { onMount } from 'svelte';
    import Card from '$lib/components/ui/Card.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import Select from '$lib/components/ui/Select.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import { formatNumber } from '$lib/utils/helpers.js';
    
    // Input values
    let amount = 100;
    let fromCurrency = 'USD';
    let toCurrency = 'EUR';
    
    // Results
    let convertedAmount = 0;
    let exchangeRate = 0;
    let showResults = false;
    let loading = false;
    let error = '';
    let lastUpdated = '';
    
    // Popular currencies
    const currencies = [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'JPY', label: 'Japanese Yen (JPY)' },
        { value: 'CHF', label: 'Swiss Franc (CHF)' },
        { value: 'CAD', label: 'Canadian Dollar (CAD)' },
        { value: 'AUD', label: 'Australian Dollar (AUD)' },
        { value: 'CNY', label: 'Chinese Yuan (CNY)' },
        { value: 'INR', label: 'Indian Rupee (INR)' },
        { value: 'KRW', label: 'South Korean Won (KRW)' },
        { value: 'SGD', label: 'Singapore Dollar (SGD)' },
        { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
        { value: 'SEK', label: 'Swedish Krona (SEK)' },
        { value: 'NOK', label: 'Norwegian Krone (NOK)' },
        { value: 'DKK', label: 'Danish Krone (DKK)' },
        { value: 'PLN', label: 'Polish Zloty (PLN)' },
        { value: 'CZK', label: 'Czech Koruna (CZK)' },
        { value: 'HUF', label: 'Hungarian Forint (HUF)' },
        { value: 'RUB', label: 'Russian Ruble (RUB)' },
        { value: 'BRL', label: 'Brazilian Real (BRL)' },
        { value: 'MXN', label: 'Mexican Peso (MXN)' },
        { value: 'ZAR', label: 'South African Rand (ZAR)' },
        { value: 'TRY', label: 'Turkish Lira (TRY)' },
        { value: 'ILS', label: 'Israeli Shekel (ILS)' },
        { value: 'AED', label: 'UAE Dirham (AED)' },
        { value: 'SAR', label: 'Saudi Riyal (SAR)' },
        { value: 'EGP', label: 'Egyptian Pound (EGP)' },
        { value: 'THB', label: 'Thai Baht (THB)' },
        { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
        { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
        { value: 'PHP', label: 'Philippine Peso (PHP)' },
        { value: 'VND', label: 'Vietnamese Dong (VND)' }
    ];
    
    // API endpoint - using exchangerate-api.com (free tier: 1500 requests/month)
    const API_URL = 'https://api.exchangerate-api.com/v4/latest/';
    
    // Convert currencies
    async function convertCurrency() {
        if (amount <= 0 || fromCurrency === toCurrency) {
            if (fromCurrency === toCurrency) {
                convertedAmount = amount;
                exchangeRate = 1;
                showResults = true;
                error = '';
            }
            return;
        }
        
        loading = true;
        error = '';
        showResults = false;
        
        try {
            const response = await fetch(`${API_URL}${fromCurrency}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            
            const data = await response.json();
            
            if (!data.rates || !data.rates[toCurrency]) {
                throw new Error(`Exchange rate not available for ${toCurrency}`);
            }
            
            exchangeRate = data.rates[toCurrency];
            convertedAmount = amount * exchangeRate;
            lastUpdated = new Date(data.date).toLocaleDateString();
            showResults = true;
            error = '';
            
        } catch (err) {
            error = `Error: ${err.message}. Please try again later.`;
            showResults = false;
        } finally {
            loading = false;
        }
    }
    
    // Swap currencies
    function swapCurrencies() {
        const temp = fromCurrency;
        fromCurrency = toCurrency;
        toCurrency = temp;
        
        // Recalculate if we have valid data
        if (amount > 0) {
            convertCurrency();
        }
    }
    
    // Get currency symbol
    function getCurrencySymbol(currency) {
        const symbols = {
            'USD': '$', 'EUR': '€', 'GBP': '£', 'JPY': '¥',
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
    
    // Auto-convert on input change (with debounce)
    let convertTimeout;
    $: if (amount && fromCurrency && toCurrency) {
        clearTimeout(convertTimeout);
        convertTimeout = setTimeout(() => {
            convertCurrency();
        }, 1000);
    }
    
    // Load initial conversion on mount
    onMount(() => {
        convertCurrency();
    });
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Currency Converter Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>
            <p class="text-gray-600 mb-6">
                Convert between different currencies with live exchange rates. Data updates daily.
            </p>
            
            <div class="space-y-6">
                <!-- Amount Input -->
                <div>
                    <Input
                        type="number"
                        label="Amount"
                        bind:value={amount}
                        placeholder="100"
                        min="0.01"
                        step="0.01"
                    />
                </div>
                
                <!-- Currency Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <Select
                        label="From Currency"
                        bind:value={fromCurrency}
                        options={currencies}
                    />
                    
                    <div class="flex items-center space-x-4">
                        <Select
                            label="To Currency"
                            bind:value={toCurrency}
                            options={currencies}
                            className="flex-1"
                        />
                        
                        <Button 
                            variant="outline" 
                            size="sm" 
                            on:click={swapCurrencies}
                            className="mb-0"
                        >
                            🔄 Swap
                        </Button>
                    </div>
                </div>
                
                <!-- Convert Button -->
                <div class="text-center">
                    <Button 
                        variant="primary" 
                        on:click={convertCurrency} 
                        disabled={loading || amount <= 0}
                    >
                        {loading ? '⏳ Converting...' : '💱 Convert'}
                    </Button>
                </div>
            </div>
        </div>
    </Card>
    
    <!-- Error Message -->
    {#if error}
        <Card>
            <div class="p-6 bg-red-50 border border-red-200">
                <div class="flex items-center">
                    <div class="text-red-600 text-xl mr-3">⚠️</div>
                    <div>
                        <h3 class="text-lg font-semibold text-red-800 mb-1">Conversion Error</h3>
                        <p class="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
    
    <!-- Results -->
    {#if showResults && !error}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="mb-4">
                    <div class="text-2xl text-gray-600 mb-2">
                        {getCurrencySymbol(fromCurrency)}{formatNumber(amount, 2)} {fromCurrency}
                    </div>
                    <div class="text-4xl font-bold text-blue-600 mb-2">
                        {getCurrencySymbol(toCurrency)}{formatNumber(convertedAmount, 2)} {toCurrency}
                    </div>
                </div>
                
                <div class="text-gray-600">
                    <div class="text-sm">Exchange Rate</div>
                    <div class="text-lg font-semibold">
                        1 {fromCurrency} = {formatNumber(exchangeRate, 6)} {toCurrency}
                    </div>
                </div>
            </div>
        </Card>
        
        <!-- Exchange Rate Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Exchange Rate Details</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Amount:</span>
                            <span class="font-semibold">{getCurrencySymbol(fromCurrency)}{formatNumber(amount, 2)} {fromCurrency}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Exchange Rate:</span>
                            <span class="font-semibold">1 {fromCurrency} = {formatNumber(exchangeRate, 6)} {toCurrency}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Converted Amount:</span>
                            <span class="font-semibold text-blue-600">{getCurrencySymbol(toCurrency)}{formatNumber(convertedAmount, 2)} {toCurrency}</span>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Reverse Rate:</span>
                            <span class="font-semibold">1 {toCurrency} = {formatNumber(1/exchangeRate, 6)} {fromCurrency}</span>
                        </div>
                        {#if lastUpdated}
                            <div class="flex justify-between">
                                <span class="text-gray-600">Last Updated:</span>
                                <span class="font-semibold">{lastUpdated}</span>
                            </div>
                        {/if}
                        <div class="flex justify-between">
                            <span class="text-gray-600">Data Source:</span>
                            <span class="font-semibold text-sm">ExchangeRate-API</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        
        <!-- Quick Conversion Table -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Quick Reference</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-3">{fromCurrency} to {toCurrency}</h4>
                        <div class="space-y-2 text-sm">
                            {#each [1, 5, 10, 25, 50, 100, 500, 1000] as qty}
                                <div class="flex justify-between">
                                    <span>{qty} {fromCurrency}</span>
                                    <span class="font-medium">{formatNumber(qty * exchangeRate, 2)} {toCurrency}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-3">{toCurrency} to {fromCurrency}</h4>
                        <div class="space-y-2 text-sm">
                            {#each [1, 5, 10, 25, 50, 100, 500, 1000] as qty}
                                <div class="flex justify-between">
                                    <span>{qty} {toCurrency}</span>
                                    <span class="font-medium">{formatNumber(qty / exchangeRate, 2)} {fromCurrency}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        
        <!-- Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Important Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">📊 Live Rates</h4>
                        <p class="text-blue-800 text-sm">
                            Exchange rates are updated daily and may vary from real-time market rates. 
                            Rates shown are mid-market rates for reference purposes.
                        </p>
                    </div>
                    
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 class="font-semibold text-yellow-900 mb-2">💰 Bank Rates</h4>
                        <p class="text-yellow-800 text-sm">
                            Banks and money transfer services typically charge fees and offer different rates. 
                            Check with your financial institution for actual exchange rates.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>