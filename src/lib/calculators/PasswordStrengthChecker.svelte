<script>
    /**
     * Password Strength Checker Component
     * Analyze password strength and provide security recommendations
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let password = '';

    // Results
    let strength = 0;
    let strengthText = '';
    let strengthColor = '';
    let feedback = [];
    let showResults = false;
    let crackTime = '';

    // Analyze password strength
    function analyzePassword() {
        if (!password) {
            showResults = false;
            return;
        }

        let score = 0;
        feedback = [];

        // Length check
        if (password.length >= 8) score += 1;
        else feedback.push('Use at least 8 characters');

        if (password.length >= 12) score += 1;
        else if (password.length >= 8) feedback.push('Consider using 12+ characters for better security');

        // Character variety
        if (/[a-z]/.test(password)) score += 1;
        else feedback.push('Add lowercase letters');

        if (/[A-Z]/.test(password)) score += 1;
        else feedback.push('Add uppercase letters');

        if (/[0-9]/.test(password)) score += 1;
        else feedback.push('Add numbers');

        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else feedback.push('Add special characters (!@#$%^&*)');

        // Penalties
        if (/(.)\1{2,}/.test(password)) {
            score -= 1;
            feedback.push('Avoid repeating characters');
        }

        if (/123|abc|qwe|password/i.test(password)) {
            score -= 1;
            feedback.push('Avoid common patterns and words');
        }

        strength = Math.max(0, Math.min(6, score));
        
        // Set strength text and color
        const strengthLevels = [
            { text: 'Very Weak', color: 'text-red-600' },
            { text: 'Weak', color: 'text-orange-600' },
            { text: 'Fair', color: 'text-yellow-600' },
            { text: 'Good', color: 'text-blue-600' },
            { text: 'Strong', color: 'text-green-600' },
            { text: 'Very Strong', color: 'text-purple-600' }
        ];

        const level = strengthLevels[strength] || strengthLevels[0];
        strengthText = level.text;
        strengthColor = level.color;

        // Calculate crack time
        calculateCrackTime();

        showResults = true;
    }

    function calculateCrackTime() {
        let charset = 0;
        if (/[a-z]/.test(password)) charset += 26;
        if (/[A-Z]/.test(password)) charset += 26;
        if (/[0-9]/.test(password)) charset += 10;
        if (/[^A-Za-z0-9]/.test(password)) charset += 32;

        const combinations = Math.pow(charset, password.length);
        const guessesPerSecond = 1000000000; // 1 billion
        const secondsToCrack = combinations / (2 * guessesPerSecond);

        if (secondsToCrack < 60) crackTime = 'Less than a minute';
        else if (secondsToCrack < 3600) crackTime = `${Math.round(secondsToCrack / 60)} minutes`;
        else if (secondsToCrack < 86400) crackTime = `${Math.round(secondsToCrack / 3600)} hours`;
        else if (secondsToCrack < 31536000) crackTime = `${Math.round(secondsToCrack / 86400)} days`;
        else crackTime = `${Math.round(secondsToCrack / 31536000)} years`;
    }

    // Auto-analyze when password changes
    $: if (password !== null) {
        analyzePassword();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Password Strength Checker
            </h2>
            <p class="text-gray-600 mb-6">
                Check your password strength and get security recommendations. 
                Analyze complexity, crack time, and receive tips for stronger passwords.
            </p>

            <div>
                <Input
                    type="password"
                    label="Password to Check"
                    bind:value={password}
                    placeholder="Enter your password"
                />
            </div>
        </div>
    </Card>

    {#if showResults}
        <Card>
            <div class="p-6 text-center">
                <div class="text-4xl font-bold {strengthColor} mb-4">
                    {strengthText}
                </div>
                <div class="text-lg text-gray-600 mb-2">
                    Estimated crack time: {crackTime}
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                        class="h-3 rounded-full transition-all duration-300 {strength >= 4 ? 'bg-green-500' : strength >= 2 ? 'bg-yellow-500' : 'bg-red-500'}" 
                        style="width: {(strength / 6) * 100}%"
                    ></div>
                </div>
                <div class="text-sm text-gray-500">
                    Strength: {strength}/6
                </div>
            </div>
        </Card>

        {#if feedback.length > 0}
            <Card>
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">
                        Recommendations
                    </h3>
                    <ul class="space-y-2">
                        {#each feedback as suggestion}
                            <li class="flex items-center space-x-2">
                                <span class="text-orange-500">⚠️</span>
                                <span class="text-gray-700">{suggestion}</span>
                            </li>
                        {/each}
                    </ul>
                </div>
            </Card>
        {/if}
    {/if}
</div>