<script>
    /**
     * Percentage Calculator Component
     * Calculate percentages, increases, decreases, and more
     */
    
    import Card from '$lib/components/ui/Card.svelte';
    import Input from '$lib/components/ui/Input.svelte';
    import Select from '$lib/components/ui/Select.svelte';
    import { formatNumber } from '$lib/utils/helpers.js';
    
    // Calculation type
    let calculationType = 'basic';
    
    // Basic percentage calculation
    let value = 150;
    let total = 500;
    let percentage = 0;
    
    // Percentage of a number
    let percentageAmount = 25;
    let baseNumber = 200;
    let result = 0;
    
    // Percentage increase/decrease
    let originalValue = 100;
    let newValue = 125;
    let changePercentage = 0;
    let changeAmount = 0;
    
    // Add/subtract percentage
    let baseValue = 100;
    let percentageChange = 20;
    let increaseResult = 0;
    let decreaseResult = 0;
    
    // Results visibility
    let showBasicResult = false;
    let showPercentageOfResult = false;
    let showChangeResult = false;
    let showAddSubtractResult = false;
    
    // Calculation types
    const calculationTypes = [
        { value: 'basic', label: 'What percentage is X of Y?' },
        { value: 'percentageOf', label: 'What is X% of Y?' },
        { value: 'change', label: 'Percentage change from X to Y' },
        { value: 'addSubtract', label: 'Add/Subtract percentage' }
    ];
    
    // Calculate basic percentage (what percentage is X of Y)
    function calculateBasicPercentage() {
        if (total === 0) {
            percentage = 0;
            showBasicResult = false;
            return;
        }
        
        percentage = (value / total) * 100;
        showBasicResult = true;
    }
    
    // Calculate percentage of a number (what is X% of Y)
    function calculatePercentageOf() {
        result = (percentageAmount / 100) * baseNumber;
        showPercentageOfResult = true;
    }
    
    // Calculate percentage change
    function calculatePercentageChange() {
        if (originalValue === 0) {
            changePercentage = 0;
            changeAmount = 0;
            showChangeResult = false;
            return;
        }
        
        changeAmount = newValue - originalValue;
        changePercentage = (changeAmount / originalValue) * 100;
        showChangeResult = true;
    }
    
    // Calculate add/subtract percentage
    function calculateAddSubtract() {
        const changeAmount = (percentageChange / 100) * baseValue;
        increaseResult = baseValue + changeAmount;
        decreaseResult = baseValue - changeAmount;
        showAddSubtractResult = true;
    }
    
    // Auto-calculate based on type
    $: {
        switch (calculationType) {
            case 'basic':
                if (value !== null && total !== null) calculateBasicPercentage();
                break;
            case 'percentageOf':
                if (percentageAmount !== null && baseNumber !== null) calculatePercentageOf();
                break;
            case 'change':
                if (originalValue !== null && newValue !== null) calculatePercentageChange();
                break;
            case 'addSubtract':
                if (baseValue !== null && percentageChange !== null) calculateAddSubtract();
                break;
        }
    }
    
    // Get change direction and color
    function getChangeInfo(change) {
        if (change > 0) {
            return { direction: 'increase', color: 'text-green-600', icon: '📈' };
        } else if (change < 0) {
            return { direction: 'decrease', color: 'text-red-600', icon: '📉' };
        } else {
            return { direction: 'no change', color: 'text-gray-600', icon: '➡️' };
        }
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Type Selection -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Percentage Calculator</h2>
            <p class="text-gray-600 mb-6">
                Calculate percentages, increases, decreases, and percentage of numbers with instant results.
            </p>
            
            <Select
                label="Select Calculation Type"
                bind:value={calculationType}
                options={calculationTypes}
            />
        </div>
    </Card>
    
    <!-- Basic Percentage Calculator -->
    {#if calculationType === 'basic'}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">What percentage is X of Y?</h3>
                <p class="text-gray-600 mb-6">Calculate what percentage one number is of another number.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Value (X)"
                        bind:value={value}
                        placeholder="150"
                        step="0.01"
                    />
                    
                    <Input
                        type="number"
                        label="Total (Y)"
                        bind:value={total}
                        placeholder="500"
                        step="0.01"
                    />
                </div>
                
                {#if showBasicResult}
                    <div class="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
                        <div class="text-4xl font-bold text-blue-600 mb-2">
                            {formatNumber(percentage, 2)}%
                        </div>
                        <div class="text-gray-600">
                            {formatNumber(value, 2)} is {formatNumber(percentage, 2)}% of {formatNumber(total, 2)}
                        </div>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}
    
    <!-- Percentage of a Number -->
    {#if calculationType === 'percentageOf'}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">What is X% of Y?</h3>
                <p class="text-gray-600 mb-6">Calculate what a certain percentage of a number equals.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Percentage (X%)"
                        bind:value={percentageAmount}
                        placeholder="25"
                        step="0.01"
                        min="0"
                    />
                    
                    <Input
                        type="number"
                        label="Base Number (Y)"
                        bind:value={baseNumber}
                        placeholder="200"
                        step="0.01"
                    />
                </div>
                
                {#if showPercentageOfResult}
                    <div class="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                        <div class="text-4xl font-bold text-green-600 mb-2">
                            {formatNumber(result, 2)}
                        </div>
                        <div class="text-gray-600">
                            {formatNumber(percentageAmount, 2)}% of {formatNumber(baseNumber, 2)} is {formatNumber(result, 2)}
                        </div>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}
    
    <!-- Percentage Change -->
    {#if calculationType === 'change'}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Percentage Change</h3>
                <p class="text-gray-600 mb-6">Calculate the percentage increase or decrease between two values.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Original Value"
                        bind:value={originalValue}
                        placeholder="100"
                        step="0.01"
                    />
                    
                    <Input
                        type="number"
                        label="New Value"
                        bind:value={newValue}
                        placeholder="125"
                        step="0.01"
                    />
                </div>
                
                {#if showChangeResult}
                    {@const changeInfo = getChangeInfo(changePercentage)}
                    <div class="mt-6 space-y-4">
                        <div class="p-6 bg-purple-50 border border-purple-200 rounded-lg text-center">
                            <div class="text-4xl font-bold {changeInfo.color} mb-2">
                                {changeInfo.icon} {formatNumber(Math.abs(changePercentage), 2)}%
                            </div>
                            <div class="text-gray-600">
                                {changePercentage >= 0 ? 'Increase' : 'Decrease'} from {formatNumber(originalValue, 2)} to {formatNumber(newValue, 2)}
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <div class="text-lg font-semibold text-gray-900">Change Amount</div>
                                <div class="text-xl {changeInfo.color}">
                                    {changeAmount >= 0 ? '+' : ''}{formatNumber(changeAmount, 2)}
                                </div>
                            </div>
                            
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <div class="text-lg font-semibold text-gray-900">Change Percentage</div>
                                <div class="text-xl {changeInfo.color}">
                                    {changePercentage >= 0 ? '+' : ''}{formatNumber(changePercentage, 2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}
    
    <!-- Add/Subtract Percentage -->
    {#if calculationType === 'addSubtract'}
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Add/Subtract Percentage</h3>
                <p class="text-gray-600 mb-6">Add or subtract a percentage from a number.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        label="Base Value"
                        bind:value={baseValue}
                        placeholder="100"
                        step="0.01"
                    />
                    
                    <Input
                        type="number"
                        label="Percentage"
                        bind:value={percentageChange}
                        placeholder="20"
                        step="0.01"
                        min="0"
                    />
                </div>
                
                {#if showAddSubtractResult}
                    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
                            <div class="text-2xl font-bold text-green-600 mb-2">
                                📈 {formatNumber(increaseResult, 2)}
                            </div>
                            <div class="text-gray-600">
                                {formatNumber(baseValue, 2)} + {formatNumber(percentageChange, 2)}%
                            </div>
                            <div class="text-sm text-gray-500 mt-1">
                                (+{formatNumber((percentageChange / 100) * baseValue, 2)})
                            </div>
                        </div>
                        
                        <div class="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
                            <div class="text-2xl font-bold text-red-600 mb-2">
                                📉 {formatNumber(decreaseResult, 2)}
                            </div>
                            <div class="text-gray-600">
                                {formatNumber(baseValue, 2)} - {formatNumber(percentageChange, 2)}%
                            </div>
                            <div class="text-sm text-gray-500 mt-1">
                                (-{formatNumber((percentageChange / 100) * baseValue, 2)})
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </Card>
    {/if}
    
    <!-- Formula Reference -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Percentage Formulas</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-2">Basic Percentage</h4>
                        <div class="text-sm text-gray-600">
                            <div>Percentage = (Value ÷ Total) × 100</div>
                            <div class="text-xs mt-1">Example: (25 ÷ 100) × 100 = 25%</div>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-2">Percentage of Number</h4>
                        <div class="text-sm text-gray-600">
                            <div>Result = (Percentage ÷ 100) × Number</div>
                            <div class="text-xs mt-1">Example: (25 ÷ 100) × 200 = 50</div>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-2">Percentage Change</h4>
                        <div class="text-sm text-gray-600">
                            <div>Change% = ((New - Old) ÷ Old) × 100</div>
                            <div class="text-xs mt-1">Example: ((125 - 100) ÷ 100) × 100 = 25%</div>
                        </div>
                    </div>
                    
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <h4 class="font-semibold text-gray-900 mb-2">Add/Subtract Percentage</h4>
                        <div class="text-sm text-gray-600">
                            <div>Result = Number ± (Number × Percentage ÷ 100)</div>
                            <div class="text-xs mt-1">Example: 100 + (100 × 20 ÷ 100) = 120</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
    
    <!-- Common Percentage Applications -->
    <Card>
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Common Applications</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="text-2xl mb-2">💰</div>
                    <h4 class="font-semibold text-blue-900 mb-2">Finance</h4>
                    <p class="text-blue-800 text-sm">
                        Interest rates, discounts, tax calculations, profit margins
                    </p>
                </div>
                
                <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="text-2xl mb-2">📊</div>
                    <h4 class="font-semibold text-green-900 mb-2">Statistics</h4>
                    <p class="text-green-800 text-sm">
                        Data analysis, growth rates, survey results, comparisons
                    </p>
                </div>
                
                <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div class="text-2xl mb-2">🎓</div>
                    <h4 class="font-semibold text-purple-900 mb-2">Education</h4>
                    <p class="text-purple-800 text-sm">
                        Test scores, grade calculations, success rates, progress tracking
                    </p>
                </div>
            </div>
        </div>
    </Card>
</div>