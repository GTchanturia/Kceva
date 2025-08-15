<script>
    /**
     * Prime Number Checker Component
     * Check if numbers are prime and find prime numbers in ranges
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let number = 17;
    let calculationType = 'check';
    let rangeStart = 1;
    let rangeEnd = 100;

    // Results
    let isPrime = false;
    let factors = [];
    let primeList = [];
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'check', label: 'Check if Number is Prime' },
        { value: 'factors', label: 'Find All Factors' },
        { value: 'range', label: 'Find Primes in Range' }
    ];

    // Check if a number is prime
    function isPrimeNumber(n) {
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }

    // Find all factors of a number
    function findFactors(n) {
        const factors = [];
        for (let i = 1; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                factors.push(i);
                if (i !== n / i) {
                    factors.push(n / i);
                }
            }
        }
        return factors.sort((a, b) => a - b);
    }

    // Find prime numbers in range
    function findPrimesInRange(start, end) {
        const primes = [];
        for (let i = Math.max(2, start); i <= Math.min(end, 10000); i++) {
            if (isPrimeNumber(i)) {
                primes.push(i);
            }
        }
        return primes;
    }

    // Calculate based on type
    function calculate() {
        switch (calculationType) {
            case 'check':
                if (number < 1 || !Number.isInteger(number)) return;
                isPrime = isPrimeNumber(number);
                factors = findFactors(number);
                break;

            case 'factors':
                if (number < 1 || !Number.isInteger(number)) return;
                factors = findFactors(number);
                isPrime = factors.length === 2; // Only 1 and itself
                break;

            case 'range':
                if (rangeStart < 1 || rangeEnd < rangeStart || rangeEnd > 10000) return;
                primeList = findPrimesInRange(rangeStart, rangeEnd);
                break;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType) {
        calculate();
    }

    // Get next prime after current number
    function getNextPrime(n) {
        let next = n + 1;
        while (!isPrimeNumber(next) && next < n + 1000) {
            next++;
        }
        return next < n + 1000 ? next : null;
    }

    // Get previous prime before current number
    function getPreviousPrime(n) {
        let prev = n - 1;
        while (prev > 1 && !isPrimeNumber(prev)) {
            prev--;
        }
        return prev > 1 ? prev : null;
    }

    $: nextPrime = calculationType === 'check' ? getNextPrime(number) : null;
    $: previousPrime = calculationType === 'check' ? getPreviousPrime(number) : null;
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Prime Number Checker
            </h2>
            <p class="text-gray-600 mb-6">
                Check if numbers are prime, find all factors, or discover prime numbers in a range. 
                Perfect for mathematics, cryptography, and number theory studies.
            </p>

            <div class="space-y-6">
                <Select
                    label="What do you want to do?"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'check' || calculationType === 'factors'}
                    <div class="max-w-md">
                        <Input
                            type="number"
                            label="Number to Check"
                            bind:value={number}
                            placeholder="17"
                            min="1"
                            step="1"
                        />
                    </div>
                {:else if calculationType === 'range'}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Range Start"
                            bind:value={rangeStart}
                            placeholder="1"
                            min="1"
                            max="9999"
                            step="1"
                        />

                        <Input
                            type="number"
                            label="Range End"
                            bind:value={rangeEnd}
                            placeholder="100"
                            min="2"
                            max="10000"
                            step="1"
                        />
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        {#if calculationType === 'check'}
            <!-- Prime Check Result -->
            <Card>
                <div class="p-6 text-center">
                    <div class="text-6xl mb-4">
                        {isPrime ? '✅' : '❌'}
                    </div>
                    <div class="text-3xl font-bold {isPrime ? 'text-green-600' : 'text-red-600'} mb-2">
                        {number} is {isPrime ? '' : 'NOT'} Prime
                    </div>
                    <div class="text-lg text-gray-600">
                        {isPrime ? 'This number is only divisible by 1 and itself' : 'This number has factors other than 1 and itself'}
                    </div>
                </div>
            </Card>

            <!-- Adjacent Primes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                {#if previousPrime}
                    <Card>
                        <div class="p-6 text-center">
                            <div class="text-3xl font-bold text-blue-600 mb-2">
                                {previousPrime}
                            </div>
                            <div class="text-gray-600">Previous Prime</div>
                        </div>
                    </Card>
                {/if}

                {#if nextPrime}
                    <Card>
                        <div class="p-6 text-center">
                            <div class="text-3xl font-bold text-purple-600 mb-2">
                                {nextPrime}
                            </div>
                            <div class="text-gray-600">Next Prime</div>
                        </div>
                    </Card>
                {/if}
            </div>
        {/if}

        {#if calculationType === 'factors' || (calculationType === 'check' && factors.length > 0)}
            <!-- Factors Display -->
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Factors of {number}
                    </h3>

                    <div class="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
                        {#each factors as factor}
                            <div class="text-center p-2 bg-blue-50 border border-blue-200 rounded">
                                <span class="font-medium text-blue-900">{factor}</span>
                            </div>
                        {/each}
                    </div>

                    <div class="text-center text-gray-600">
                        {number} has {factors.length} factor{factors.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </Card>
        {/if}

        {#if calculationType === 'range'}
            <!-- Prime Range Results -->
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Prime Numbers from {rangeStart} to {rangeEnd}
                    </h3>

                    <div class="mb-4 text-center">
                        <span class="text-2xl font-bold text-green-600">{primeList.length}</span>
                        <span class="text-gray-600 ml-2">prime numbers found</span>
                    </div>

                    {#if primeList.length > 0}
                        <div class="grid grid-cols-6 md:grid-cols-10 gap-2">
                            {#each primeList as prime}
                                <div class="text-center p-2 bg-green-50 border border-green-200 rounded">
                                    <span class="font-medium text-green-900">{prime}</span>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="text-center text-gray-500">
                            No prime numbers found in this range
                        </div>
                    {/if}
                </div>
            </Card>
        {/if}

        <!-- Prime Number Facts -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Prime Number Facts
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">📚 Definition</h4>
                            <p class="text-blue-800 text-sm">
                                A prime number is a natural number greater than 1 that has no positive 
                                divisors other than 1 and itself.
                            </p>
                        </div>

                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">🔢 First 10 Primes</h4>
                            <p class="text-green-800 text-sm">
                                2, 3, 5, 7, 11, 13, 17, 19, 23, 29
                            </p>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">🔐 Applications</h4>
                            <p class="text-purple-800 text-sm">
                                Prime numbers are crucial in cryptography, computer science, 
                                and mathematical research. RSA encryption relies on large primes.
                            </p>
                        </div>

                        <div class="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 class="font-semibold text-orange-900 mb-2">✨ Fun Facts</h4>
                            <p class="text-orange-800 text-sm">
                                2 is the only even prime number. There are infinitely many primes 
                                (proven by Euclid ~300 BC).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>