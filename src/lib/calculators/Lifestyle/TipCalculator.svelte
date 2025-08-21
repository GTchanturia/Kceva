<script>
    /**
     * Tip Calculator Component
     * Calculate tips and split bills for restaurants and services
     */
    
    import Card from '$lib/components/ui/Card.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import Select from '$lib/components/ui/Select.svelte';
    import { formatCurrency, formatNumber } from '$lib/utils/helpers.js';
    
    // Input values
    let billAmount = 50;
    let tipPercentage = 18;
    let numberOfPeople = 1;
    let customTipPercentage = '';
    
    // Results
    let tipAmount = 0;
    let totalAmount = 0;
    let perPersonAmount = 0;
    let perPersonTip = 0;
    let showResults = false;
    
    // Preset tip percentages
    const tipPresets = [
        { value: 15, label: '15% - Standard' },
        { value: 18, label: '18% - Good Service' },
        { value: 20, label: '20% - Great Service' },
        { value: 22, label: '22% - Excellent Service' },
        { value: 25, label: '25% - Outstanding Service' },
        { value: 0, label: 'Custom Amount' }
    ];
    
    // Service quality descriptions
    const serviceDescriptions = {
        10: { text: 'Poor Service', color: 'text-red-600' },
        15: { text: 'Standard Service', color: 'text-yellow-600' },
        18: { text: 'Good Service', color: 'text-blue-600' },
        20: { text: 'Great Service', color: 'text-green-600' },
        22: { text: 'Excellent Service', color: 'text-purple-600' },
        25: { text: 'Outstanding Service', color: 'text-indigo-600' }
    };
    
    // Calculate tip and totals
    function calculateTip() {
        if (billAmount <= 0 || numberOfPeople <= 0) {
            showResults = false;
            return;
        }
        
        let effectiveTipPercentage = tipPercentage;
        if (tipPercentage === 0 && customTipPercentage) {
            effectiveTipPercentage = parseFloat(customTipPercentage);
        }
        
        if (effectiveTipPercentage < 0) {
            effectiveTipPercentage = 0;
        }
        
        tipAmount = (billAmount * effectiveTipPercentage) / 100;
        totalAmount = billAmount + tipAmount;
        perPersonAmount = totalAmount / numberOfPeople;
        perPersonTip = tipAmount / numberOfPeople;
        
        showResults = true;
    }
    
    // Get service description
    function getServiceDescription(percentage) {
        const closest = Object.keys(serviceDescriptions)
            .map(Number)
            .reduce((prev, curr) => 
                Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev
            );
        return serviceDescriptions[closest] || { text: 'Custom Service', color: 'text-gray-600' };
    }
    
    // Auto-calculate when inputs change
    $: if (billAmount && numberOfPeople) {
        calculateTip();
    }
    
    // Handle tip percentage change
    $: if (tipPercentage !== 0) {
        customTipPercentage = '';
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Tip Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Tip Calculator</h2>
            <p class="text-gray-600 mb-6">
                Calculate tips and split bills easily. Perfect for restaurants, bars, and service providers.
            </p>
            
            <div class="space-y-6">
                <!-- Bill Amount -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Bill Amount"
                        bind:value={billAmount}
                        placeholder="50.00"
                        min="0"
                        step="0.01"
                    />
                    
                    <Input
                        type="number"
                        label="Number of People"
                        bind:value={numberOfPeople}
                        placeholder="1"
                        min="1"
                        step="1"
                    />
                </div>
                
                <!-- Tip Percentage -->
                <div class="space-y-4">
                    <Select
                        label="Tip Percentage"
                        bind:value={tipPercentage}
                        options={tipPresets}
                    />
                    
                    {#if tipPercentage === 0}
                        <Input
                            type="number"
                            label="Custom Tip Percentage"
                            bind:value={customTipPercentage}
                            placeholder="20"
                            min="0"
                            max="100"
                            step="0.1"
                        />
                    {/if}
                </div>
                
                <!-- Quick Tip Buttons -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Quick Select</label>
                    <div class="flex flex-wrap gap-2">
                        {#each [10, 15, 18, 20, 22, 25] as preset}
                            <button
                                type="button"
                                on:click={() => tipPercentage = preset}
                                class="px-3 py-2 text-sm font-medium rounded-md border transition-colors duration-200 {tipPercentage === preset ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}"
                            >
                                {preset}%
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </Card>
    
    <!-- Results -->
    {#if showResults}
        {@const effectivePercentage = tipPercentage === 0 && customTipPercentage ? parseFloat(customTipPercentage) : tipPercentage}
        {@const serviceDesc = getServiceDescription(effectivePercentage)}
        
        <!-- Main Results -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-green-600 mb-2">
                        {formatCurrency(tipAmount)}
                    </div>
                    <div class="text-gray-600">Tip Amount</div>
                    <div class="text-sm text-gray-500 mt-1">
                        {formatNumber(effectivePercentage, 1)}%
                    </div>
                </div>
            </Card>
            
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(totalAmount)}
                    </div>
                    <div class="text-gray-600">Total Amount</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Bill + Tip
                    </div>
                </div>
            </Card>
            
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-purple-600 mb-2">
                        {formatCurrency(perPersonAmount)}
                    </div>
                    <div class="text-gray-600">Per Person</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Total ÷ {numberOfPeople}
                    </div>
                </div>
            </Card>
            
            <Card>
                <div class="p-6 text-center">
                    <div class="text-3xl font-bold text-orange-600 mb-2">
                        {formatCurrency(perPersonTip)}
                    </div>
                    <div class="text-gray-600">Tip Per Person</div>
                    <div class="text-sm text-gray-500 mt-1">
                        Tip ÷ {numberOfPeople}
                    </div>
                </div>
            </Card>
        </div>
        
        <!-- Service Quality Indicator -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-2xl {serviceDesc.color} font-semibold mb-2">
                    {serviceDesc.text}
                </div>
                <div class="text-gray-600">
                    Based on {formatNumber(effectivePercentage, 1)}% tip
                </div>
            </div>
        </Card>
        
        <!-- Detailed Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Bill Breakdown</h3>
                
                <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                        <span class="text-gray-600">Original Bill:</span>
                        <span class="font-semibold">{formatCurrency(billAmount)}</span>
                    </div>
                    
                    <div class="flex justify-between items-center py-2 border-b border-gray-200">
                        <span class="text-gray-600">Tip ({formatNumber(effectivePercentage, 1)}%):</span>
                        <span class="font-semibold text-green-600">{formatCurrency(tipAmount)}</span>
                    </div>
                    
                    <div class="flex justify-between items-center py-2 border-b-2 border-gray-300">
                        <span class="text-gray-900 font-semibold">Total Amount:</span>
                        <span class="font-bold text-blue-600 text-lg">{formatCurrency(totalAmount)}</span>
                    </div>
                    
                    {#if numberOfPeople > 1}
                        <div class="mt-6 pt-4 border-t border-gray-200">
                            <h4 class="font-semibold text-gray-900 mb-3">Split Between {numberOfPeople} People</h4>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="flex justify-between items-center py-2">
                                    <span class="text-gray-600">Bill per person:</span>
                                    <span class="font-semibold">{formatCurrency(billAmount / numberOfPeople)}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-2">
                                    <span class="text-gray-600">Tip per person:</span>
                                    <span class="font-semibold text-green-600">{formatCurrency(perPersonTip)}</span>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center py-2 mt-2 border-t border-gray-200">
                                <span class="text-gray-900 font-semibold">Total per person:</span>
                                <span class="font-bold text-purple-600">{formatCurrency(perPersonAmount)}</span>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </Card>
        
        <!-- Tip Comparison -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Tip Comparison</h3>
                
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {#each [10, 15, 18, 20, 25] as percentage}
                        {@const compTip = (billAmount * percentage) / 100}
                        {@const compTotal = billAmount + compTip}
                        <div class="text-center p-3 rounded-lg {percentage === effectivePercentage ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50 border border-gray-200'}">
                            <div class="text-lg font-bold {percentage === effectivePercentage ? 'text-blue-600' : 'text-gray-700'}">
                                {percentage}%
                            </div>
                            <div class="text-sm text-gray-600">
                                {formatCurrency(compTip)}
                            </div>
                            <div class="text-xs text-gray-500">
                                Total: {formatCurrency(compTotal)}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
        
        <!-- Tipping Guidelines -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Tipping Guidelines</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">Restaurant Service</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Poor service:</span>
                                <span class="font-medium">10-12%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Standard service:</span>
                                <span class="font-medium">15-18%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Good service:</span>
                                <span class="font-medium">18-20%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Excellent service:</span>
                                <span class="font-medium">20-25%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <h4 class="font-semibold text-gray-800">Other Services</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span>Bartender:</span>
                                <span class="font-medium">$1-2 per drink</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Taxi/Uber:</span>
                                <span class="font-medium">10-15%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Hair stylist:</span>
                                <span class="font-medium">15-20%</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Delivery:</span>
                                <span class="font-medium">10-15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>