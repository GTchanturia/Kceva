<script>
    /**
     * Grade Percentage Calculator Component
     * Convert between grades and percentages
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Input values
    let calculationType = 'points-to-percentage';
    let pointsEarned = 85;
    let totalPoints = 100;
    let percentage = 85;

    // Results
    let letterGrade = '';
    let gpaPoints = 0;
    let resultPercentage = 0;
    let showResults = false;

    // Calculation types
    const calculationTypes = [
        { value: 'points-to-percentage', label: 'Points to Percentage' },
        { value: 'percentage-to-letter', label: 'Percentage to Letter Grade' }
    ];

    // Grade scale
    const gradeScale = [
        { min: 97, max: 100, letter: 'A+', gpa: 4.0 },
        { min: 93, max: 96, letter: 'A', gpa: 4.0 },
        { min: 90, max: 92, letter: 'A-', gpa: 3.7 },
        { min: 87, max: 89, letter: 'B+', gpa: 3.3 },
        { min: 83, max: 86, letter: 'B', gpa: 3.0 },
        { min: 80, max: 82, letter: 'B-', gpa: 2.7 },
        { min: 77, max: 79, letter: 'C+', gpa: 2.3 },
        { min: 73, max: 76, letter: 'C', gpa: 2.0 },
        { min: 70, max: 72, letter: 'C-', gpa: 1.7 },
        { min: 67, max: 69, letter: 'D+', gpa: 1.3 },
        { min: 65, max: 66, letter: 'D', gpa: 1.0 },
        { min: 0, max: 64, letter: 'F', gpa: 0.0 }
    ];

    // Calculate grade
    function calculateGrade() {
        if (calculationType === 'points-to-percentage') {
            if (totalPoints <= 0 || pointsEarned < 0) {
                showResults = false;
                return;
            }
            
            resultPercentage = (pointsEarned / totalPoints) * 100;
            const grade = gradeScale.find(g => resultPercentage >= g.min && resultPercentage <= g.max);
            letterGrade = grade?.letter || 'F';
            gpaPoints = grade?.gpa || 0.0;
        } else {
            if (percentage < 0 || percentage > 100) {
                showResults = false;
                return;
            }
            
            resultPercentage = percentage;
            const grade = gradeScale.find(g => percentage >= g.min && percentage <= g.max);
            letterGrade = grade?.letter || 'F';
            gpaPoints = grade?.gpa || 0.0;
        }

        showResults = true;
    }

    // Auto-calculate when inputs change
    $: if (calculationType === 'points-to-percentage' && pointsEarned !== null && totalPoints !== null) {
        calculateGrade();
    } else if (calculationType === 'percentage-to-letter' && percentage !== null) {
        calculateGrade();
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                Grade Percentage Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Convert between points, percentages, and letter grades. 
                Calculate your grade based on points earned or convert percentages to letter grades.
            </p>

            <div class="space-y-6">
                <Select
                    label="Calculation Type"
                    bind:value={calculationType}
                    options={calculationTypes}
                />

                {#if calculationType === 'points-to-percentage'}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            type="number"
                            label="Points Earned"
                            bind:value={pointsEarned}
                            placeholder="85"
                            min="0"
                            step="0.1"
                        />

                        <Input
                            type="number"
                            label="Total Points"
                            bind:value={totalPoints}
                            placeholder="100"
                            min="1"
                            step="0.1"
                        />
                    </div>
                {:else}
                    <div class="max-w-md">
                        <Input
                            type="number"
                            label="Percentage"
                            bind:value={percentage}
                            placeholder="85"
                            min="0"
                            max="100"
                            step="0.1"
                        />
                    </div>
                {/if}
            </div>
        </div>
    </Card>

    {#if showResults}
        <Card>
            <div class="p-6 text-center">
                <div class="text-6xl font-bold text-blue-600 mb-4">
                    {letterGrade}
                </div>
                <div class="text-2xl text-gray-600 mb-2">
                    {formatNumber(resultPercentage, 1)}%
                </div>
                <div class="text-lg text-gray-600">
                    GPA: {formatNumber(gpaPoints, 1)}
                </div>
            </div>
        </Card>

        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Grade Scale Reference
                </h3>

                <div class="space-y-2">
                    {#each gradeScale as grade}
                        <div class="flex justify-between items-center p-3 rounded-lg {resultPercentage >= grade.min && resultPercentage <= grade.max ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
                            <span class="font-medium">{grade.letter}</span>
                            <span class="text-sm text-gray-600">{grade.min}% - {grade.max}%</span>
                            <span class="text-sm text-gray-600">GPA: {grade.gpa}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    {/if}
</div>