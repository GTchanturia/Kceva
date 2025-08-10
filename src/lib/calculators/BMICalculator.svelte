<script>
	/**
	 * BMI Calculator Component
	 * Calculates Body Mass Index and provides health category
	 */
	
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { calculateBMI } from '$lib/utils/calculations.js';
	import { convertLength, convertWeight } from '$lib/utils/calculations.js';
	
	// Input values
	let weight = 70;
	let height = 175;
	let weightUnit = 'kg';
	let heightUnit = 'cm';
	
	// Results
	let bmi = 0;
	let category = '';
	let showResults = false;
	
	// Unit options
	const weightUnits = [
		{ value: 'kg', label: 'Kilograms (kg)' },
		{ value: 'lb', label: 'Pounds (lb)' },
		{ value: 'st', label: 'Stones (st)' }
	];
	
	const heightUnits = [
		{ value: 'cm', label: 'Centimeters (cm)' },
		{ value: 'm', label: 'Meters (m)' },
		{ value: 'ft', label: 'Feet (ft)' },
		{ value: 'in', label: 'Inches (in)' }
	];
	
	// Calculate BMI
	function calculateBMIResult() {
		if (weight <= 0 || height <= 0) {
			showResults = false;
			return;
		}
		
		// Convert to metric units (kg and meters)
		let weightInKg = weight;
		let heightInM = height;
		
		// Convert weight to kg
		if (weightUnit !== 'kg') {
			weightInKg = convertWeight(weight, weightUnit, 'kg');
		}
		
		// Convert height to meters
		if (heightUnit === 'cm') {
			heightInM = height / 100;
		} else if (heightUnit !== 'm') {
			const heightInCm = convertLength(height, heightUnit, 'cm');
			heightInM = heightInCm / 100;
		}
		
		const result = calculateBMI(weightInKg, heightInM);
		bmi = result.bmi;
		category = result.category;
		showResults = true;
	}
	
	// Get category color
	function getCategoryColor(cat) {
		switch (cat) {
			case 'Underweight':
				return 'text-blue-600 bg-blue-50 border-blue-200';
			case 'Normal weight':
				return 'text-green-600 bg-green-50 border-green-200';
			case 'Overweight':
				return 'text-yellow-600 bg-yellow-50 border-yellow-200';
			case 'Obese':
				return 'text-red-600 bg-red-50 border-red-200';
			default:
				return 'text-gray-600 bg-gray-50 border-gray-200';
		}
	}
	
	// Auto-calculate when inputs change
	$: if (weight && height) {
		calculateBMIResult();
	}
</script>

<div class="max-w-4xl mx-auto space-y-6">
	<!-- Calculator Input -->
	<Card>
		<div class="p-6">
			<h2 class="text-2xl font-bold text-gray-900 mb-6">BMI Calculator</h2>
			<p class="text-gray-600 mb-6">
				Calculate your Body Mass Index (BMI) to assess if your weight is in a healthy range.
			</p>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Weight Input -->
				<div class="space-y-4">
					<Input
						type="number"
						label="Weight"
						bind:value={weight}
						placeholder="70"
						min="1"
						step="0.1"
					/>
					<Select
						label="Weight Unit"
						bind:value={weightUnit}
						options={weightUnits}
					/>
				</div>
				
				<!-- Height Input -->
				<div class="space-y-4">
					<Input
						type="number"
						label="Height"
						bind:value={height}
						placeholder="175"
						min="1"
						step="0.1"
					/>
					<Select
						label="Height Unit"
						bind:value={heightUnit}
						options={heightUnits}
					/>
				</div>
			</div>
		</div>
	</Card>
	
	<!-- Results -->
	{#if showResults}
		<Card>
			<div class="p-6">
				<h3 class="text-xl font-semibold text-gray-900 mb-6">Your BMI Result</h3>
				
				<div class="text-center mb-6">
					<div class="text-5xl font-bold text-blue-600 mb-2">
						{bmi}
					</div>
					<div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border {getCategoryColor(category)}">
						{category}
					</div>
				</div>
				
				<!-- BMI Scale -->
				<div class="mb-6">
					<h4 class="text-lg font-semibold text-gray-900 mb-4">BMI Categories</h4>
					<div class="space-y-2">
						<div class="flex items-center justify-between p-3 rounded-lg {category === 'Underweight' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
							<span class="font-medium">Underweight</span>
							<span class="text-sm text-gray-600">BMI less than 18.5</span>
						</div>
						<div class="flex items-center justify-between p-3 rounded-lg {category === 'Normal weight' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}">
							<span class="font-medium">Normal weight</span>
							<span class="text-sm text-gray-600">BMI 18.5 - 24.9</span>
						</div>
						<div class="flex items-center justify-between p-3 rounded-lg {category === 'Overweight' ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}">
							<span class="font-medium">Overweight</span>
							<span class="text-sm text-gray-600">BMI 25 - 29.9</span>
						</div>
						<div class="flex items-center justify-between p-3 rounded-lg {category === 'Obese' ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}">
							<span class="font-medium">Obese</span>
							<span class="text-sm text-gray-600">BMI 30 or greater</span>
						</div>
					</div>
				</div>
				
				<!-- Health Information -->
				<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<h4 class="font-semibold text-blue-900 mb-2">Important Note</h4>
					<p class="text-blue-800 text-sm">
						BMI is a useful screening tool, but it doesn't directly measure body fat or account for muscle mass, 
						bone density, and other factors. Consult with a healthcare professional for a comprehensive health assessment.
					</p>
				</div>
			</div>
		</Card>
	{/if}
</div>