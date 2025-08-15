<script>
	import { page } from "$app/stores";
	import { getCalculatorById } from "$lib/data/calculators.js";
	import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";
	import Button from "$lib/components/ui/Button.svelte";

	// Import calculator components
	import LoanCalculator from "$lib/calculators/LoanCalculator.svelte";
	import BMICalculator from "$lib/calculators/BMICalculator.svelte";
	import BMRCalculator from "$lib/calculators/BMRCalculator.svelte";
	import CalorieIntakeCalculator from "$lib/calculators/CalorieIntakeCalculator.svelte";
	import MortgageCalculator from "$lib/calculators/MortgageCalculator.svelte";
	import CurrencyConverter from "$lib/calculators/CurrencyConverter.svelte";
	import CompoundInterestCalculator from "$lib/calculators/CompoundInterestCalculator.svelte";
	import SimpleInterestCalculator from "$lib/calculators/SimpleInterestCalculator.svelte";
	import SavingsGoalCalculator from "$lib/calculators/SavingsGoalCalculator.svelte";
	import PercentageCalculator from "$lib/calculators/PercentageCalculator.svelte";
	import TemperatureConverter from "$lib/calculators/TemperatureConverter.svelte";
	import AgeCalculator from "$lib/calculators/AgeCalculator.svelte";
	import TipCalculator from "$lib/calculators/TipCalculator.svelte";
	import RandomPasswordGenerator from "$lib/calculators/RandomPasswordGenerator.svelte";
	import CreditCardPayoffCalculator from "$lib/calculators/CreditCardPayoffCalculator.svelte";
	import RetirementSavingsCalculator from "$lib/calculators/RetirementSavingsCalculator.svelte";
	import SalaryToHourlyCalculator from "$lib/calculators/SalaryToHourlyCalculator.svelte";
	import HourlyToSalaryCalculator from "$lib/calculators/HourlyToSalaryCalculator.svelte";
	import QrCodeGenerator from "$lib/calculators/QRCodeGenerator.svelte";
	import RandomNumberGenerator from "$lib/calculators/RandomNumberGenerator.svelte";
	import MemeTextGenerator from "$lib/calculators/MemeTextGenerator.svelte";
	import NameCompatibility from "$lib/calculators/NameCompatibility.svelte";
	import BarCodeGenerator from "$lib/calculators/BarCodeGenerator.svelte";
	import FractionToDecimalConverter from "$lib/calculators/FractionToDecimalConverter.svelte";
	import DecimalToFractionConverter from "$lib/calculators/DecimalToFractionConverter.svelte";
	import CircleAreaCalculator from "$lib/calculators/CircleAreaCalculator.svelte";
	import TriangleAreaCalculator from "$lib/calculators/TriangleAreaCalculator.svelte";
	import GpaCalculator from "$lib/calculators/GpaCalculator.svelte";
	import LengthConverter from "$lib/calculators/LengthConverter.svelte";
	import WeightConverter from "$lib/calculators/WeightConverter.svelte";
	import PressureConverter from "$lib/calculators/PressureConverter.svelte";
	import VolumeConverter from "$lib/calculators/VolumeConverter.svelte";
	import DataStorageConverter from "$lib/calculators/DataStorageConverter.svelte";
	import DaysBetweenDatesCalculator from "$lib/calculators/DaysBetweenDatesCalculator.svelte";
	import GradePercentageCalculator from "$lib/calculators/GradePercentageCalculator.svelte";
	import FuelEfficiencyConverter from "$lib/calculators/FuelEfficiencyConverter.svelte";
	import PasswordStrengthChecker from "$lib/calculators/PasswordStrengthChecker.svelte";
	import Base64EncoderDecoder from "$lib/calculators/Base64EncoderDecoder.svelte";
	import UrlEncoderDecoder from "$lib/calculators/UrlEncoderDecoder.svelte";
	import HexToRgbConverter from "$lib/calculators/HexToRgbConverter.svelte";
	import RgbToHexConverter from "$lib/calculators/RgbToHexConverter.svelte";
	import BinaryToDecimalConverter from "$lib/calculators/BinaryToDecimalConverter.svelte";
	import DecimalToBinaryConverter from "$lib/calculators/DecimalToBinaryConverter.svelte";
	import RectangleAreaCalculator from "$lib/calculators/RectangleAreaCalculator.svelte";
	import SphereVolumeCalculator from "$lib/calculators/SphereVolumeCalculator.svelte";
	import CylinderVolumeCalculator from "$lib/calculators/CylinderVolumeCalculator.svelte";
	import PythagoreanTheoremCalculator from "$lib/calculators/PythagoreanTheoremCalculator.svelte";
	import SquareRootCalculator from "$lib/calculators/SquareRootCalculator.svelte";
	import SpeedConverter from "$lib/calculators/SpeedConverter.svelte";
	import TimeConverter from "$lib/calculators/TimeConverter.svelte";
	import EnergyConverter from "$lib/calculators/EnergyConverter.svelte";
	import BodyFatPercentageCalculator from "$lib/calculators/BodyFatPercentageCalculator.svelte";
	import WaterIntakeCalculator from "$lib/calculators/WaterIntakeCalculator.svelte";
	import IdealWeightCalculator from "$lib/calculators/IdealWeightCalculator.svelte";
	import HeartRateZoneCalculator from "$lib/calculators/HeartRateZoneCalculator.svelte";
	import PregnancyDueDateCalculator from "$lib/calculators/PregnancyDueDateCalculator.svelte";
	import OvulationCalculator from "$lib/calculators/OvulationCalculator.svelte";
	import BloodAlcoholCalculator from "$lib/calculators/BloodAlcoholCalculator.svelte";
	import SplitBillCalculator from "$lib/calculators/SplitBillCalculator.svelte";
	import MarkupMarkdownCalculator from "$lib/calculators/MarkupMarkdownCalculator.svelte";
	import LoanToValueCalculator from "$lib/calculators/LoanToValueCalculator.svelte";
	import PrimeNumberChecker from "$lib/calculators/PrimeNumberChecker.svelte";
	import FactorialCalculator from "$lib/calculators/FactorialCalculator.svelte";
	import MeanMedianModeCalculator from "$lib/calculators/MeanMedianModeCalculator.svelte";
	import StandardDeviationCalculator from "$lib/calculators/StandardDeviationCalculator.svelte";
	import DiceRoller from "$lib/calculators/DiceRoller.svelte";
	import CoinFlip from "$lib/calculators/CoinFlip.svelte";
	import LovePercentageCalculator from "$lib/calculators/LovePercentageCalculator.svelte";
	import ZodiacSignCalculator from "$lib/calculators/ZodiacSignCalculator.svelte";
	import AspectRatioCalculator from "$lib/calculators/AspectRatioCalculator.svelte";
	import DateAddSubtractCalculator from "$lib/calculators/DateAddSubtractCalculator.svelte";
	import CountdownTimer from "$lib/calculators/CountdownTimer.svelte";
	import Stopwatch from "$lib/calculators/Stopwatch.svelte";
	import WorkDaysCalculator from "$lib/calculators/WorkDaysCalculator.svelte";
	import WorldClock from "$lib/calculators/WorldClock.svelte";
	import MeetingTimePlanner from "$lib/calculators/MeetingTimePlanner.svelte";
	import TimeUntilBirthdayCalculator from "$lib/calculators/TimeUntilBirthdayCalculator.svelte";
	import LeapYearChecker from "$lib/calculators/LeapYearChecker.svelte";
	import CookingMeasurementConverter from "$lib/calculators/CookingMeasurementConverter.svelte";

	// Get calculator from URL parameter
	$: calculatorId = $page.params.slug;
	$: calculator = getCalculatorById(calculatorId);
	$: category = calculator
		? CALCULATOR_CATEGORIES.find((cat) => cat.id === calculator.category)
		: null;

	// Component mapping
	const calculatorComponents = {
		"loan-calculator": LoanCalculator,
		"bmi-calculator": BMICalculator,
		"bmr-calculator": BMRCalculator,
		"calorie-intake": CalorieIntakeCalculator,
		"mortgage-calculator": MortgageCalculator,
		"currency-converter": CurrencyConverter,
		"compound-interest": CompoundInterestCalculator,
		"simple-interest": SimpleInterestCalculator,
		"savings-goal": SavingsGoalCalculator,
		"percentage-calculator": PercentageCalculator,
		"temperature-converter": TemperatureConverter,
		"age-calculator": AgeCalculator,
		"tip-calculator": TipCalculator,
		"random-password-generator": RandomPasswordGenerator,
		"credit-card-payoff": CreditCardPayoffCalculator,
		"retirement-savings": RetirementSavingsCalculator,
		"salary-to-hourly": SalaryToHourlyCalculator,
		"hourly-to-salary": HourlyToSalaryCalculator,
		"qr-code-generator": QrCodeGenerator,
		"random-number-generator": RandomNumberGenerator,
		"meme-text-generator": MemeTextGenerator,
		"name-compatibility": NameCompatibility,
		"barcode-generator": BarCodeGenerator,
		"fraction-to-decimal": FractionToDecimalConverter,
		"decimal-to-fraction": DecimalToFractionConverter,
		"circle-area": CircleAreaCalculator,
		"triangle-area": TriangleAreaCalculator,
		"gpa-calculator": GpaCalculator,
		"length-converter": LengthConverter,
		"weight-converter": WeightConverter,
		"pressure-converter": PressureConverter,
		"volume-converter": VolumeConverter,
		"data-storage-converter": DataStorageConverter,
		"days-between-dates": DaysBetweenDatesCalculator,
		"grade-percentage": GradePercentageCalculator,
		"fuel-efficiency-converter": FuelEfficiencyConverter,
		"password-strength-checker": PasswordStrengthChecker,
		"base64-encoder-decoder": Base64EncoderDecoder,
		"url-encoder-decoder": UrlEncoderDecoder,
		"hex-to-rgb": HexToRgbConverter,
		"rgb-to-hex": RgbToHexConverter,
		"binary-to-decimal": BinaryToDecimalConverter,
		"decimal-to-binary": DecimalToBinaryConverter,
		"rectangle-area": RectangleAreaCalculator,
		"sphere-volume": SphereVolumeCalculator,
		"cylinder-volume": CylinderVolumeCalculator,
		"pythagorean-theorem": PythagoreanTheoremCalculator,
		"square-root": SquareRootCalculator,
		"speed-converter": SpeedConverter,
		"time-converter": TimeConverter,
		"energy-converter": EnergyConverter,
		"pressure-converter": PressureConverter,
		"volume-converter": VolumeConverter,
		"data-storage-converter": DataStorageConverter,
		"days-between-dates": DaysBetweenDatesCalculator,
		"grade-percentage": GradePercentageCalculator,
		"fuel-efficiency-converter": FuelEfficiencyConverter,
		"password-strength-checker": PasswordStrengthChecker,
		"base64-encoder-decoder": Base64EncoderDecoder,
		"url-encoder-decoder": UrlEncoderDecoder,
		"hex-to-rgb": HexToRgbConverter,
		"rgb-to-hex": RgbToHexConverter,
		"binary-to-decimal": BinaryToDecimalConverter,
		"decimal-to-binary": DecimalToBinaryConverter,
		"rectangle-area": RectangleAreaCalculator,
		"sphere-volume": SphereVolumeCalculator,
		"cylinder-volume": CylinderVolumeCalculator,
		"pythagorean-theorem": PythagoreanTheoremCalculator,
		"square-root": SquareRootCalculator,
		"speed-converter": SpeedConverter,
		"time-converter": TimeConverter,
		"energy-converter": EnergyConverter,
		"body-fat-percentage": BodyFatPercentageCalculator,
		"water-intake": WaterIntakeCalculator,
		"ideal-weight": IdealWeightCalculator,
		"heart-rate-zone": HeartRateZoneCalculator,
		"pregnancy-due-date": PregnancyDueDateCalculator,
		"ovulation-calculator": OvulationCalculator,
		"blood-alcohol": BloodAlcoholCalculator,
		"split-bill-calculator": SplitBillCalculator,
		"markup-markdown": MarkupMarkdownCalculator,
		"loan-to-value": LoanToValueCalculator,
		"prime-number-checker": PrimeNumberChecker,
		"factorial-calculator": FactorialCalculator,
		"mean-median-mode": MeanMedianModeCalculator,
		"standard-deviation": StandardDeviationCalculator,
		"dice-roller": DiceRoller,
		"coin-flip": CoinFlip,
		"love-percentage": LovePercentageCalculator,
		"zodiac-sign": ZodiacSignCalculator,
		"aspect-ratio": AspectRatioCalculator,
		"date-add-subtract": DateAddSubtractCalculator,
		"countdown-timer": CountdownTimer,
		"stopwatch": Stopwatch,
		"work-days-calculator": WorkDaysCalculator,
		"world-clock": WorldClock,
		"meeting-time-planner": MeetingTimePlanner,
		"time-until-birthday": TimeUntilBirthdayCalculator,
		"leap-year-checker": LeapYearChecker,
		"cooking-measurement": CookingMeasurementConverter,
		// Add more calculator components as they are created
	};

	$: CalculatorComponent = calculator
		? calculatorComponents[calculator.id]
		: null;
</script>

<svelte:head>
	{#if calculator}
		<title>{calculator.name} - Free Online Calculator | Kceva</title>
		<meta
			name="description"
			content="{calculator.description} at Kceva.com. Free online calculator with instant results. Fast, accurate, and mobile-friendly."
		/>
		<meta
			name="keywords"
			content="Kceva, {calculator.keywords.join(', ')}, calculator, free, online, {calculator.name.toLowerCase()}"
		/>
		<link rel="canonical" href="https://kceva.com/calculator/{calculator.id}" />
		
		<!-- Structured Data for Calculator -->
		<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": "{calculator.name}",
			"description": "{calculator.description}",
			"url": "https://kceva.com/calculator/{calculator.id}",
			"applicationCategory": "UtilityApplication",
			"operatingSystem": "Any",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			},
			"publisher": {
				"@type": "Organization",
				"name": "Kceva",
				"url": "https://kceva.com"
			}
		}
		</script>
	{:else}
		<title>Calculator Not Found | Kceva - Free Online Calculators</title>
	{/if}
</svelte:head>

{#if calculator && CalculatorComponent}
	<div class="min-h-screen bg-gray-50">
		<!-- Calculator Header -->
		<section class="bg-white border-b border-gray-200 py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<!-- Breadcrumb -->
				<nav class="flex mb-6" aria-label="Breadcrumb">
					<ol class="flex items-center space-x-4">
						<li>
							<a
								href="/"
								class="text-gray-500 hover:text-gray-700"
								>Home</a
							>
						</li>
						<li>
							<svg
								class="flex-shrink-0 h-5 w-5 text-gray-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</li>
						{#if category}
							<li>
								<a
									href="/category/{category.id}"
									class="text-gray-500 hover:text-gray-700"
								>
									{category.name}
								</a>
							</li>
							<li>
								<svg
									class="flex-shrink-0 h-5 w-5 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</li>
						{/if}
						<li>
							<span class="text-gray-900 font-medium"
								>{calculator.name}</span
							>
						</li>
					</ol>
				</nav>

				<!-- Calculator Info -->
				<div class="flex items-start space-x-4">
					<div class="flex-shrink-0">
						<div
							class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl"
						>
							{calculator.icon}
						</div>
					</div>

					<div class="flex-1 min-w-0">
						<h1 class="text-3xl font-bold text-gray-900 mb-2">
							{calculator.name}
						</h1>
						<p class="text-lg text-gray-600 mb-4">
							{calculator.description}
						</p>

						<div class="flex items-center space-x-4">
							{#if category}
								<span
									class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
								>
									{category.icon}
									{category.name}
								</span>
							{/if}

							{#if calculator.requiresApi}
								<span
									class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
								>
									🌐 Uses Live Data
								</span>
							{/if}

							<span
								class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
							>
								✅ Free to Use
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Calculator Content -->
		<section class="py-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<svelte:component this={CalculatorComponent} />
			</div>
		</section>
	</div>
{:else if calculator && !CalculatorComponent}
	<!-- Calculator exists but component not implemented yet -->
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center max-w-md mx-auto">
			<div class="text-6xl mb-4">🚧</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h1>
			<p class="text-gray-600 mb-6">
				The <strong>{calculator.name}</strong> is currently under development.
				Check back soon for this calculator!
			</p>
			<div class="space-x-4">
				{#if category}
					<Button variant="primary" href="/category/{category.id}">
						Browse {category.name}
					</Button>
				{/if}
				<Button variant="outline" href="/categories">
					All Categories
				</Button>
			</div>
		</div>
	</div>
{:else}
	<!-- Calculator not found -->
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="text-6xl mb-4">❌</div>
			<h1 class="text-3xl font-bold text-gray-900 mb-4">
				Calculator Not Found
			</h1>
			<p class="text-gray-600 mb-6">
				The calculator you're looking for doesn't exist or has been
				moved.
			</p>
			<div class="space-x-4">
				<Button variant="primary" href="/categories">
					Browse Calculators
				</Button>
				<Button variant="outline" href="/">Go Home</Button>
			</div>
		</div>
	</div>
{/if}
