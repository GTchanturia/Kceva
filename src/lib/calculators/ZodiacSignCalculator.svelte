<script>
    /**
     * Zodiac Sign Calculator Component
     * Find zodiac sign based on birth date
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let birthDate = '';

    // Results
    let zodiacSign = null;
    let showResults = false;

    // Zodiac signs with dates and characteristics
    const zodiacSigns = [
        {
            name: 'Aries',
            emoji: '♈',
            dates: 'March 21 - April 19',
            element: 'Fire',
            quality: 'Cardinal',
            rulingPlanet: 'Mars',
            traits: ['Energetic', 'Confident', 'Pioneering', 'Independent'],
            compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
            startMonth: 3, startDay: 21, endMonth: 4, endDay: 19
        },
        {
            name: 'Taurus',
            emoji: '♉',
            dates: 'April 20 - May 20',
            element: 'Earth',
            quality: 'Fixed',
            rulingPlanet: 'Venus',
            traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
            compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
            startMonth: 4, startDay: 20, endMonth: 5, endDay: 20
        },
        {
            name: 'Gemini',
            emoji: '♊',
            dates: 'May 21 - June 20',
            element: 'Air',
            quality: 'Mutable',
            rulingPlanet: 'Mercury',
            traits: ['Adaptable', 'Curious', 'Communicative', 'Witty'],
            compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo'],
            startMonth: 5, startDay: 21, endMonth: 6, endDay: 20
        },
        {
            name: 'Cancer',
            emoji: '♋',
            dates: 'June 21 - July 22',
            element: 'Water',
            quality: 'Cardinal',
            rulingPlanet: 'Moon',
            traits: ['Nurturing', 'Intuitive', 'Protective', 'Emotional'],
            compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
            startMonth: 6, startDay: 21, endMonth: 7, endDay: 22
        },
        {
            name: 'Leo',
            emoji: '♌',
            dates: 'July 23 - August 22',
            element: 'Fire',
            quality: 'Fixed',
            rulingPlanet: 'Sun',
            traits: ['Confident', 'Generous', 'Creative', 'Dramatic'],
            compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
            startMonth: 7, startDay: 23, endMonth: 8, endDay: 22
        },
        {
            name: 'Virgo',
            emoji: '♍',
            dates: 'August 23 - September 22',
            element: 'Earth',
            quality: 'Mutable',
            rulingPlanet: 'Mercury',
            traits: ['Analytical', 'Practical', 'Helpful', 'Perfectionist'],
            compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
            startMonth: 8, startDay: 23, endMonth: 9, endDay: 22
        },
        {
            name: 'Libra',
            emoji: '♎',
            dates: 'September 23 - October 22',
            element: 'Air',
            quality: 'Cardinal',
            rulingPlanet: 'Venus',
            traits: ['Diplomatic', 'Balanced', 'Social', 'Artistic'],
            compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
            startMonth: 9, startDay: 23, endMonth: 10, endDay: 22
        },
        {
            name: 'Scorpio',
            emoji: '♏',
            dates: 'October 23 - November 21',
            element: 'Water',
            quality: 'Fixed',
            rulingPlanet: 'Pluto',
            traits: ['Intense', 'Passionate', 'Mysterious', 'Determined'],
            compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
            startMonth: 10, startDay: 23, endMonth: 11, endDay: 21
        },
        {
            name: 'Sagittarius',
            emoji: '♐',
            dates: 'November 22 - December 21',
            element: 'Fire',
            quality: 'Mutable',
            rulingPlanet: 'Jupiter',
            traits: ['Adventurous', 'Optimistic', 'Philosophical', 'Independent'],
            compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
            startMonth: 11, startDay: 22, endMonth: 12, endDay: 21
        },
        {
            name: 'Capricorn',
            emoji: '♑',
            dates: 'December 22 - January 19',
            element: 'Earth',
            quality: 'Cardinal',
            rulingPlanet: 'Saturn',
            traits: ['Ambitious', 'Disciplined', 'Responsible', 'Patient'],
            compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
            startMonth: 12, startDay: 22, endMonth: 1, endDay: 19
        },
        {
            name: 'Aquarius',
            emoji: '♒',
            dates: 'January 20 - February 18',
            element: 'Air',
            quality: 'Fixed',
            rulingPlanet: 'Uranus',
            traits: ['Independent', 'Innovative', 'Humanitarian', 'Eccentric'],
            compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
            startMonth: 1, startDay: 20, endMonth: 2, endDay: 18
        },
        {
            name: 'Pisces',
            emoji: '♓',
            dates: 'February 19 - March 20',
            element: 'Water',
            quality: 'Mutable',
            rulingPlanet: 'Neptune',
            traits: ['Compassionate', 'Intuitive', 'Artistic', 'Dreamy'],
            compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
            startMonth: 2, startDay: 19, endMonth: 3, endDay: 20
        }
    ];

    // Find zodiac sign based on birth date
    function findZodiacSign() {
        if (!birthDate) {
            showResults = false;
            return;
        }

        const date = new Date(birthDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        zodiacSign = zodiacSigns.find(sign => {
            if (sign.startMonth === sign.endMonth) {
                return month === sign.startMonth && day >= sign.startDay && day <= sign.endDay;
            } else {
                return (month === sign.startMonth && day >= sign.startDay) ||
                       (month === sign.endMonth && day <= sign.endDay);
            }
        });

        showResults = !!zodiacSign;
    }

    // Auto-calculate when birth date changes
    $: if (birthDate) {
        findZodiacSign();
    }

    // Get element color
    function getElementColor(element) {
        const colors = {
            'Fire': 'text-red-600 bg-red-50 border-red-200',
            'Earth': 'text-green-600 bg-green-50 border-green-200',
            'Air': 'text-blue-600 bg-blue-50 border-blue-200',
            'Water': 'text-purple-600 bg-purple-50 border-purple-200'
        };
        return colors[element] || 'text-gray-600 bg-gray-50 border-gray-200';
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Zodiac Sign Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Discover your zodiac sign based on your birth date. Learn about your astrological 
                characteristics, element, ruling planet, and compatibility with other signs.
            </p>

            <div class="max-w-md">
                <Input
                    type="date"
                    label="Birth Date"
                    bind:value={birthDate}
                    required
                />
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults && zodiacSign}
        <!-- Main Zodiac Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-8xl mb-4">{zodiacSign.emoji}</div>
                <div class="text-4xl font-bold text-purple-600 mb-2">
                    {zodiacSign.name}
                </div>
                <div class="text-xl text-gray-600 mb-4">
                    {zodiacSign.dates}
                </div>
                <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium {getElementColor(zodiacSign.element)} border">
                    {zodiacSign.element} Sign
                </div>
            </div>
        </Card>

        <!-- Sign Details -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    {zodiacSign.name} Characteristics
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <h4 class="font-semibold text-purple-900 mb-2">✨ Key Traits</h4>
                            <div class="flex flex-wrap gap-2">
                                {#each zodiacSign.traits as trait}
                                    <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                                        {trait}
                                    </span>
                                {/each}
                            </div>
                        </div>

                        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 class="font-semibold text-blue-900 mb-2">🌟 Astrological Info</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Element:</span>
                                    <span class="font-medium">{zodiacSign.element}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Quality:</span>
                                    <span class="font-medium">{zodiacSign.quality}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Ruling Planet:</span>
                                    <span class="font-medium">{zodiacSign.rulingPlanet}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 class="font-semibold text-green-900 mb-2">💕 Compatible Signs</h4>
                            <div class="grid grid-cols-2 gap-2">
                                {#each zodiacSign.compatibility as compatibleSign}
                                    {@const compatibleZodiac = zodiacSigns.find(z => z.name === compatibleSign)}
                                    <div class="text-center p-2 bg-green-100 rounded">
                                        <div class="text-lg">{compatibleZodiac?.emoji}</div>
                                        <div class="text-xs text-green-800">{compatibleSign}</div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- All Zodiac Signs Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    All Zodiac Signs
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {#each zodiacSigns as sign}
                        <div class="p-3 rounded-lg border {sign.name === zodiacSign.name ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}">
                            <div class="flex items-center space-x-3 mb-2">
                                <span class="text-2xl">{sign.emoji}</span>
                                <div>
                                    <div class="font-semibold text-gray-900">{sign.name}</div>
                                    <div class="text-xs text-gray-600">{sign.dates}</div>
                                </div>
                            </div>
                            <div class="text-xs text-gray-500">
                                {sign.element} • {sign.rulingPlanet}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- Elements Information -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Zodiac Elements
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 class="font-semibold text-red-900 mb-2">🔥 Fire Signs</h4>
                        <div class="text-red-800 text-sm space-y-1">
                            <div>Aries, Leo, Sagittarius</div>
                            <div class="text-xs">Passionate, energetic, spontaneous</div>
                        </div>
                    </div>

                    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 class="font-semibold text-green-900 mb-2">🌍 Earth Signs</h4>
                        <div class="text-green-800 text-sm space-y-1">
                            <div>Taurus, Virgo, Capricorn</div>
                            <div class="text-xs">Practical, reliable, grounded</div>
                        </div>
                    </div>

                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 class="font-semibold text-blue-900 mb-2">💨 Air Signs</h4>
                        <div class="text-blue-800 text-sm space-y-1">
                            <div>Gemini, Libra, Aquarius</div>
                            <div class="text-xs">Intellectual, social, communicative</div>
                        </div>
                    </div>

                    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 class="font-semibold text-purple-900 mb-2">🌊 Water Signs</h4>
                        <div class="text-purple-800 text-sm space-y-1">
                            <div>Cancer, Scorpio, Pisces</div>
                            <div class="text-xs">Emotional, intuitive, empathetic</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Disclaimer -->
        <Card>
            <div class="p-6 bg-yellow-50 border border-yellow-200">
                <h3 class="text-lg font-semibold text-yellow-900 mb-2">
                    🌟 For Entertainment Only
                </h3>
                <p class="text-yellow-800 text-sm">
                    Astrology and zodiac signs are for entertainment and cultural interest. 
                    They are not scientifically proven and should not be used for making important life decisions.
                </p>
            </div>
        </Card>
    {/if}
</div>