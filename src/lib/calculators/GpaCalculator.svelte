<script>
    /**
     * GPA Calculator Component
     * Calculate Grade Point Average from course grades and credit hours
     */

    import Card from "$lib/components/ui/Card.svelte";
    import Input from "$lib/components/ui/Input.svelte";
    import Select from "$lib/components/ui/Select.svelte";
    import Button from "$lib/components/ui/Button.svelte";
    import { formatNumber } from "$lib/utils/helpers.js";

    // Course structure
    let courses = [
        { name: 'Course 1', grade: 'A', credits: 3 },
        { name: 'Course 2', grade: 'B+', credits: 3 },
        { name: 'Course 3', grade: 'A-', credits: 4 }
    ];

    // Results
    let gpa = 0;
    let totalCredits = 0;
    let totalQualityPoints = 0;
    let showResults = false;

    // Grade options with point values
    const gradeOptions = [
        { value: 'A+', label: 'A+ (4.0)', points: 4.0 },
        { value: 'A', label: 'A (4.0)', points: 4.0 },
        { value: 'A-', label: 'A- (3.7)', points: 3.7 },
        { value: 'B+', label: 'B+ (3.3)', points: 3.3 },
        { value: 'B', label: 'B (3.0)', points: 3.0 },
        { value: 'B-', label: 'B- (2.7)', points: 2.7 },
        { value: 'C+', label: 'C+ (2.3)', points: 2.3 },
        { value: 'C', label: 'C (2.0)', points: 2.0 },
        { value: 'C-', label: 'C- (1.7)', points: 1.7 },
        { value: 'D+', label: 'D+ (1.3)', points: 1.3 },
        { value: 'D', label: 'D (1.0)', points: 1.0 },
        { value: 'D-', label: 'D- (0.7)', points: 0.7 },
        { value: 'F', label: 'F (0.0)', points: 0.0 }
    ];

    // Calculate GPA
    function calculateGPA() {
        totalCredits = 0;
        totalQualityPoints = 0;

        courses.forEach(course => {
            if (course.credits > 0 && course.grade) {
                const gradePoints = getGradePoints(course.grade);
                totalCredits += course.credits;
                totalQualityPoints += gradePoints * course.credits;
            }
        });

        if (totalCredits > 0) {
            gpa = totalQualityPoints / totalCredits;
            showResults = true;
        } else {
            showResults = false;
        }
    }

    // Get grade points for a letter grade
    function getGradePoints(grade) {
        const gradeOption = gradeOptions.find(option => option.value === grade);
        return gradeOption ? gradeOption.points : 0;
    }

    // Add new course
    function addCourse() {
        courses = [...courses, { name: `Course ${courses.length + 1}`, grade: 'A', credits: 3 }];
    }

    // Remove course
    function removeCourse(index) {
        courses = courses.filter((_, i) => i !== index);
        calculateGPA();
    }

    // Auto-calculate when courses change
    $: if (courses.length > 0) {
        calculateGPA();
    }

    // Get GPA classification
    function getGPAClassification(gpaValue) {
        if (gpaValue >= 3.8) return { text: 'Summa Cum Laude', color: 'text-green-600' };
        if (gpaValue >= 3.5) return { text: 'Magna Cum Laude', color: 'text-blue-600' };
        if (gpaValue >= 3.2) return { text: 'Cum Laude', color: 'text-purple-600' };
        if (gpaValue >= 3.0) return { text: 'Good Standing', color: 'text-gray-600' };
        if (gpaValue >= 2.0) return { text: 'Satisfactory', color: 'text-yellow-600' };
        return { text: 'Below Standards', color: 'text-red-600' };
    }

    $: gpaClassification = getGPAClassification(gpa);
</script>

<div class="max-w-4xl mx-auto space-y-6">
    <!-- Calculator Input -->
    <Card>
        <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
                GPA Calculator
            </h2>
            <p class="text-gray-600 mb-6">
                Calculate your Grade Point Average (GPA) by entering your courses, 
                grades, and credit hours. Supports standard 4.0 scale grading system.
            </p>

            <!-- Courses List -->
            <div class="space-y-4">
                {#each courses as course, index}
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                        <Input
                            type="text"
                            label="Course Name"
                            bind:value={course.name}
                            placeholder="Course Name"
                        />

                        <Select
                            label="Grade"
                            bind:value={course.grade}
                            options={gradeOptions}
                        />

                        <Input
                            type="number"
                            label="Credit Hours"
                            bind:value={course.credits}
                            placeholder="3"
                            min="0"
                            max="10"
                            step="0.5"
                        />

                        <div class="flex items-end">
                            <Button
                                variant="outline"
                                size="sm"
                                on:click={() => removeCourse(index)}
                                className="w-full"
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Add Course Button -->
            <div class="mt-4">
                <Button variant="outline" on:click={addCourse}>
                    + Add Course
                </Button>
            </div>
        </div>
    </Card>

    <!-- Results -->
    {#if showResults}
        <!-- Main GPA Display -->
        <Card>
            <div class="p-6 text-center">
                <div class="text-6xl font-bold text-blue-600 mb-4">
                    {formatNumber(gpa, 2)}
                </div>
                <div class="text-xl text-gray-600 mb-2">
                    Grade Point Average
                </div>
                <div class="text-lg {gpaClassification.color} font-semibold">
                    {gpaClassification.text}
                </div>
            </div>
        </Card>

        <!-- GPA Breakdown -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    GPA Calculation Breakdown
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600 mb-1">
                            {formatNumber(totalQualityPoints, 1)}
                        </div>
                        <div class="text-sm text-gray-600">Total Quality Points</div>
                    </div>

                    <div class="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div class="text-2xl font-bold text-green-600 mb-1">
                            {formatNumber(totalCredits, 1)}
                        </div>
                        <div class="text-sm text-gray-600">Total Credit Hours</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600 mb-1">
                            {courses.length}
                        </div>
                        <div class="text-sm text-gray-600">Total Courses</div>
                    </div>
                </div>

                <!-- Course Details Table -->
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grade
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Credits
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Grade Points
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quality Points
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each courses as course}
                                {@const gradePoints = getGradePoints(course.grade)}
                                {@const qualityPoints = gradePoints * course.credits}
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {course.name}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {course.grade}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {course.credits}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        {formatNumber(gradePoints, 1)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                                        {formatNumber(qualityPoints, 1)}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>

        <!-- GPA Scale Reference -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    GPA Scale Reference
                </h3>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {#each gradeOptions as grade}
                        <div class="text-center p-3 bg-gray-50 rounded-lg">
                            <div class="font-semibold text-gray-900">{grade.value}</div>
                            <div class="text-sm text-gray-600">{grade.points}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>

        <!-- GPA Classifications -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    Academic Standing Classifications
                </h3>

                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span class="font-medium text-green-900">Summa Cum Laude</span>
                        <span class="text-green-700">3.8 - 4.0</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span class="font-medium text-blue-900">Magna Cum Laude</span>
                        <span class="text-blue-700">3.5 - 3.79</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span class="font-medium text-purple-900">Cum Laude</span>
                        <span class="text-purple-700">3.2 - 3.49</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span class="font-medium text-gray-900">Good Standing</span>
                        <span class="text-gray-700">3.0 - 3.19</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span class="font-medium text-yellow-900">Satisfactory</span>
                        <span class="text-yellow-700">2.0 - 2.99</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span class="font-medium text-red-900">Below Standards</span>
                        <span class="text-red-700">Below 2.0</span>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Tips -->
        <Card>
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">
                    GPA Tips & Information
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-semibold text-blue-900 mb-2">
                            📚 How GPA is Calculated
                        </h4>
                        <p class="text-blue-800 text-sm">
                            GPA = Total Quality Points ÷ Total Credit Hours. 
                            Quality Points = Grade Points × Credit Hours for each course.
                        </p>
                    </div>

                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 class="font-semibold text-green-900 mb-2">
                            🎯 Improving Your GPA
                        </h4>
                        <p class="text-green-800 text-sm">
                            Focus on courses with higher credit hours, as they have more impact. 
                            Retaking failed courses can also help improve your overall GPA.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    {/if}
</div>