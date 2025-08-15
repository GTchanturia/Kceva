<script>
    /**
     * Love Percentage Calculator Component
     * Fun love compatibility calculator using names
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let firstName = '';
    let secondName = '';

    // Results
    let lovePercentage = 0;
    let compatibilityLevel = '';
    let showResults = false;
    let error = '';

    // Calculate love percentage
    function calculateLovePercentage() {
        error = '';
        
        if (!firstName.trim() || !secondName.trim()) {
            error = 'Please enter both names';
            showResults = false;
            return;
        }

        // Fun algorithm based on name characteristics
        const name1 = firstName.toLowerCase().replace(/\s/g, '');
        const name2 = secondName.toLowerCase().replace(/\s/g, '');
        
        // Calculate based on various name properties
        let score = 0;
        
        // Length compatibility
        const lengthDiff = Math.abs(name1.length - name2.length);
        score += Math.max(0, 20 - lengthDiff * 2);
        
        // Common letters
        const commonLetters = name1.split('').filter(letter => name2.includes(letter)).length;
        score += commonLetters * 3;
        
        // Vowel compatibility
        const vowels = 'aeiou';
        const vowels1 = name1.split('').filter(letter => vowels.includes(letter)).length;
        const vowels2 = name2.split('').filter(letter => vowels.includes(letter)).length;
        score += Math.min(vowels1, vowels2) * 2;
        
        // First letter bonus
        if (name1[0] === name2[0]) {
            score += 10;
        }
        
        // Add some randomness based on name combination
        const combinedName = name1 + name2;
        let hash = 0;
        for (let i = 0; i < combinedName.length; i++) {
            hash = ((hash << 5) - hash + combinedName.charCodeAt(i)) & 0xffffffff;
        }
        score += Math.abs(hash) % 30;

        // Normalize to 0-100
        lovePercentage = Math.min(100, Math.max(0, score));
        
        // Determine compatibility level
        if (lovePercentage >= 90) compatibilityLevel = 'Perfect Match! 💕';
        else if (lovePercentage >= 80) compatibilityLevel = 'Excellent Compatibility! 💖';
        else if (lovePercentage >= 70) compatibilityLevel = 'Very Good Match! 💗';
        else if (lovePercentage >= 60) compatibilityLevel = 'Good Compatibility! 💝';
        else if (lovePercentage >= 50) compatibilityLevel = 'Average Match 💛';
        else if (lovePercentage >= 30) compatibilityLevel = 'Needs Work 💙';
        else compatibilityLevel = 'Challenging Match 💔';

        showResults = true;
    }

    // Auto-calculate when names change
    $: if (firstName && secondName) {
        calculateLovePercentage();
    }

    // Get love advice based on percentage
    function getLoveAdvice(percentage) {
        if (percentage >= 80) {
            return "You two are meant to be! Your names show incredible compatibility.";
        } else if (percentage >= 60) {
            return "Great potential! With some effort, this could be a wonderful relationship.";
        } else if (percentage >= 40) {
            return "There's definitely something there! Communication will be key to success.";
        } else {
            return "Opposites attract! Sometimes the most unexpected combinations work best.";
        }
    }

    // Fun facts generator
    function getFunFacts() {
        if (!showResults) return [];
        
        return [
            `Your names have ${firstName.length + secondName.length} letters combined`,
            `The first letters ${firstName[0]?.toUpperCase() || ''} and ${secondName[0]?.toUpperCase() || ''} ${firstName[0]?.toLowerCase() === secondName[0]?.toLowerCase() ? 'match perfectly!' : 'create an interesting contrast'}`,
            `This combination appears once in every ${Math.floor(100 / Math.max(1, lovePercentage))} relationships`,
            `Your love score is ${lovePercentage > 50 ? 'above' : 'below'} the cosmic average of 50%`
        ];
    }

    $: funFacts = getFunFacts();
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Love Percentage Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Discover your love compatibility percentage! Enter two names and see how well they match. 
                This is a fun tool for entertainment purposes only.
            </p>

            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        type="text"
                        label="First Name"
                        bind:value={firstName}
                        placeholder="Enter first name"
                    />

                    <Input
                        type="text"
                        label="Second Name"
                        bind:value={secondName}
                        placeholder="Enter second name"
                    />
                </div>

                {#if error}
                    <div class="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p class="text-red-700 text-sm">{error}</p>
                    </div>
                {/if}

                <div class="text-center">
                    <Button variant="primary" size="lg" on:click={calculateLovePercentage}>
                        💕 Calculate Love Compatibility
                    </Button>
                </div>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main Result -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-6xl mb-4">💖</div>
                <div class="text-5xl font-bold text-pink-600 mb-4">
                    {lovePercentage}%
                </div>
                <div class="text-2xl text-gray-600 mb-2">
                    Love Compatibility
                </div>
                <div class="text-xl font-semibold text-pink-700">
                    {compatibilityLevel}
                </div>
            </Card>

        <!-- Names Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-3xl font-bold text-gray-900 mb-4">
                    {firstName} 💕 {secondName}
                </div>
                <div class="text-lg text-gray-600">
                    {getLoveAdvice(lovePercentage)}
                </div>
            </Card>
        </Card>

        <!-- Compatibility Meter -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">
                    Compatibility Meter
                </h3>

                <div class="relative">
                    <div class="w-full bg-gray-200 rounded-full h-6 mb-4">
                        <div 
                            class="h-6 rounded-full transition-all duration-1000 {lovePercentage >= 80 ? 'bg-pink-500' : lovePercentage >= 60 ? 'bg-purple-500' : lovePercentage >= 40 ? 'bg-blue-500' : 'bg-gray-400'}" 
                            style="width: {lovePercentage}%"
                        ></div>
                    </div>
                    
                    <div class="flex justify-between text-sm text-gray-600">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Fun Facts -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Fun Facts About Your Names
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {#each funFacts as fact}
                        <div class="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                            <p class="text-pink-800 text-sm">💫 {fact}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Love Scale -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Love Compatibility Scale
                </h3>

                <div class="space-y-3">
                    {#each [
                        { range: '90-100%', level: 'Perfect Match', emoji: '💕', description: 'Soulmates destined to be together' },
                        { range: '80-89%', level: 'Excellent', emoji: '💖', description: 'Amazing compatibility and connection' },
                        { range: '70-79%', level: 'Very Good', emoji: '💗', description: 'Strong potential for lasting love' },
                        { range: '60-69%', level: 'Good', emoji: '💝', description: 'Good foundation for a relationship' },
                        { range: '50-59%', level: 'Average', emoji: '💛', description: 'Moderate compatibility, work needed' },
                        { range: '30-49%', level: 'Challenging', emoji: '💙', description: 'Requires effort and understanding' },
                        { range: '0-29%', level: 'Difficult', emoji: '💔', description: 'Major differences to overcome' }
                    ] as level}
                        <div class="flex items-center justify-between p-3 rounded-lg {lovePercentage >= parseInt(level.range.split('-')[0]) && lovePercentage <= parseInt(level.range.split('-')[1].replace('%', '')) ? 'bg-pink-50 border border-pink-200' : 'bg-gray-50'}">
                            <div class="flex items-center space-x-3">
                                <span class="text-xl">{level.emoji}</span>
                                <div>
                                    <span class="font-medium">{level.level}</span>
                                    <span class="text-sm text-gray-600 ml-2">({level.range})</span>
                                </div>
                            </div>
                            <span class="text-sm text-gray-500">{level.description}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Disclaimer -->
        <Card>
            <div class="p-6 bg-yellow-50 border border-yellow-200">
                <h3 class="text-lg font-semibold text-yellow-900 mb-2">
                    🎭 Just for Fun!
                </h3>
                <p class="text-yellow-800 text-sm">
                    This love calculator is purely for entertainment purposes. Real relationships are built on 
                    communication, trust, shared values, and mutual respect - not name compatibility algorithms!
                </p>
            </div>
        </Card>
    {/if}
</div>