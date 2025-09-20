// Calculator component map
// This file centralizes imports for calculator components and exposes a
// dictionary from calculator id -> Svelte component for rendering.

// Finance
import LoanCalculator from "$lib/calculators/Finance/LoanCalculator.svelte";
import MortgageCalculator from "$lib/calculators/Finance/MortgageCalculator.svelte";
import CurrencyConverter from "$lib/calculators/Finance/CurrencyConverter.svelte";
import CompoundInterestCalculator from "$lib/calculators/Finance/CompoundInterestCalculator.svelte";
import SimpleInterestCalculator from "$lib/calculators/Finance/SimpleInterestCalculator.svelte";
import HourlyToSalaryCalculator from "$lib/calculators/Finance/HourlyToSalaryCalculator.svelte";
import RoiCalculator from "$lib/calculators/Finance/RoiCalculator.svelte";
import BudgetPlanner from "$lib/calculators/Finance/BudgetPlanner.svelte";
import NetWorth from "$lib/calculators/Finance/NetWorth.svelte";

// Health
import BMICalculator from "$lib/calculators/Health/BMICalculator.svelte";
import BMRCalculator from "$lib/calculators/Health/BMRCalculator.svelte";

import CalorieIntakeCalculator from "$lib/calculators/Health/CalorieIntakeCalculator.svelte";
import BodyFatPercentageCalculator from "$lib/calculators/Health/BodyFatPercentageCalculator.svelte";
import WaterIntakeCalculator from "$lib/calculators/WaterIntakeCalculator.svelte";
import IdealWeightCalculator from "$lib/calculators/IdealWeightCalculator.svelte";
import HeartRateZoneCalculator from "$lib/calculators/HeartRateZoneCalculator.svelte";
import PregnancyDueDateCalculator from "$lib/calculators/Lifestyle/PregnancyDueDateCalculator.svelte";
import OvulationCalculator from "$lib/calculators/OvulationCalculator.svelte";
import TdeeCalculator from "$lib/calculators/TDEECalculator.svelte";

// Math
import PercentageCalculator from "$lib/calculators/Math/PercentageCalculator.svelte";
import FractionToDecimalConverter from "$lib/calculators/Math/FractionToDecimalConverter.svelte";
import DecimalToBinaryConverter from "$lib/calculators/Math/DecimalToBinaryConverter.svelte";
import CircleAreaCalculator from "$lib/calculators/Math/CircleAreaCalculator.svelte";
import TriangleAreaCalculator from "$lib/calculators/Math/TriangleAreaCalculator.svelte";
import RectangleAreaCalculator from "$lib/calculators/Math/RectangleAreaCalculator.svelte";
import SphereVolumeCalculator from "$lib/calculators/Math/SphereVolumeCalculator.svelte";
import CylinderVolumeCalculator from "$lib/calculators/Math/CylinderVolumeCalculator.svelte";
import PythagoreanTheoremCalculator from "$lib/calculators/PythagoreanTheoremCalculator.svelte";
import SquareRootCalculator from "$lib/calculators/Math/SquareRootCalculator.svelte";
import QuadraticCalculator from "$lib/calculators/Math/QuadraticCalculator.svelte";
import ExponentCalculator from "$lib/calculators/Math/ExponentCalculator.svelte";
import PermutationCalculator from "$lib/calculators/Education/PermutationCalculator.svelte";

// Converters
import TemperatureConverter from "$lib/calculators/UnitConverters/TemperatureConverter.svelte";
import LengthConverter from "$lib/calculators/UnitConverters/LengthConverter.svelte";
import WeightConverter from "$lib/calculators/UnitConverters/WeightConverter.svelte";
import PressureConverter from "$lib/calculators/UnitConverters/PressureConverter.svelte";
import VolumeConverter from "$lib/calculators/UnitConverters/VolumeConverter.svelte";
import DataStorageConverter from "$lib/calculators/UnitConverters/DataStorageConverter.svelte";
import SpeedConverter from "$lib/calculators/UnitConverters/SpeedConverter.svelte";
import TimeConverter from "$lib/calculators/UnitConverters/TimeConverter.svelte";
import EnergyConverter from "$lib/calculators/UnitConverters/EnergyConverter.svelte";
import FuelEfficiencyConverter from "$lib/calculators/UnitConverters/FuelEfficiencyConverter.svelte";
import AngleConverter from "$lib/calculators/Design/AngleConverter.svelte";
import FontSizeConverter from "$lib/calculators/FontSizeConverter.svelte";

// Datetime
import AgeCalculator from "$lib/calculators/Datetime/AgeCalculator.svelte";
import DaysBetweenDatesCalculator from "$lib/calculators/Datetime/DaysBetweenDatesCalculator.svelte";
import DateAddSubtractCalculator from "$lib/calculators/Datetime/DateAddSubtractCalculator.svelte";
import CountdownTimer from "$lib/calculators/Datetime/CountdownTimer.svelte";
import Stopwatch from "$lib/calculators/Datetime/Stopwatch.svelte";
import WorkDaysCalculator from "$lib/calculators/Datetime/WorkDaysCalculator.svelte";
import WorldClock from "$lib/calculators/Datetime/WorldClock.svelte";
import MeetingTimePlanner from "$lib/calculators/Datetime/MeetingTimePlanner.svelte";
import TimeUntilBirthdayCalculator from "$lib/calculators/TimeUntilBirthdayCalculator.svelte";
import LeapYearChecker from "$lib/calculators/Datetime/LeapYearChecker.svelte";

// Education
import GpaCalculator from "$lib/calculators/Education/GpaCalculator.svelte";
import GradePercentageCalculator from "$lib/calculators/Education/GradePercentageCalculator.svelte";
import PrimeNumberChecker from "$lib/calculators/Education/PrimeNumberChecker.svelte";
import FactorialCalculator from "$lib/calculators/Education/FactorialCalculator.svelte";
import MeanMedianModeCalculator from "$lib/calculators/Education/MeanMedianModeCalculator.svelte";
import StandardDeviationCalculator from "$lib/calculators/Education/StandardDeviationCalculator.svelte";
import ProbabilityCalculator from "$lib/calculators/Education/ProbabilityCalculator.svelte";

// Tech
import PasswordStrengthChecker from "$lib/calculators/PasswordStrengthChecker.svelte";
import Base64EncoderDecoder from "$lib/calculators/Tech/Base64EncoderDecoder.svelte";
import UrlEncoderDecoder from "$lib/calculators/UrlEncoderDecoder.svelte";
import HexToRgbConverter from "$lib/calculators/HexToRgbConverter.svelte";
import RgbToHexConverter from "$lib/calculators/RgbToHexConverter.svelte";
import BinaryToDecimalConverter from "$lib/calculators/Tech/BinaryToDecimalConverter.svelte";
import AsciiToTextConverter from "$lib/calculators/Tech/AsciiToTextConverter.svelte";
import TextToAsciiConverter from "$lib/calculators/TextToAsciiConverter.svelte";
import IpAddressLookup from "$lib/calculators/IpAddressLookup.svelte";

// Design & Extra
import GoldenRatioCalculator from "$lib/calculators/GoldenRatioCalculator.svelte";
import DpiPpiCalculator from "$lib/calculators/DpiPpiCalculator.svelte";
import ColorContrastChecker from "$lib/calculators/Design/ColorContrastChecker.svelte";
import CssUnitConverter from "$lib/calculators/Design/CssUnitConverter.svelte";
import FileSizeEstimator from "$lib/calculators/FileSizeEstimator.svelte";
import ResponsiveBreakpointCalculator from "$lib/calculators/ResponsiveBreakpointCalculator.svelte";
import ImageImprovement from "$lib/calculators/Extra/ImageImprovement.svelte";

// Lifestyle
import RecipePortionAdjuster from "$lib/calculators/Lifestyle/RecipePortionAdjuster.svelte";
import FuelCostCalculator from "$lib/calculators/Lifestyle/FuelCostCalculator.svelte";
import TravelTimeCalculator from "$lib/calculators/Lifestyle/TravelTimeCalculator.svelte";
import BodySurfaceAreaCalculator from "$lib/calculators/Lifestyle/BodySurfaceAreaCalculator.svelte";
import PregnancyWeightGainCalculator from "$lib/calculators/PregnancyWeightGainCalculator.svelte";
import LoanEmiCalculator from "$lib/calculators/LoanEmiCalculator.svelte";
import ElectricityCostCalculator from "$lib/calculators/Lifestyle/ElectricityCostCalculator.svelte";
import SolarPanelOutputCalculator from "$lib/calculators/Lifestyle/SolarPanelOutputCalculator.svelte";
import SplitBillCalculator from "$lib/calculators/Lifestyle/SplitBillCalculator.svelte";
import TipCalculator from "$lib/calculators/Lifestyle/TipCalculator.svelte";

// Fun
import RandomPasswordGenerator from "$lib/calculators/Fun/RandomPasswordGenerator.svelte";
import RandomNumberGenerator from "$lib/calculators/RandomNumberGenerator.svelte";
import MemeTextGenerator from "$lib/calculators/MemeTextGenerator.svelte";
import NameCompatibility from "$lib/calculators/NameCompatibility.svelte";
import BarCodeGenerator from "$lib/calculators/Fun/BarCodeGenerator.svelte";
import DiceRoller from "$lib/calculators/DiceRoller.svelte";
import CoinFlip from "$lib/calculators/Fun/CoinFlip.svelte";
import LovePercentageCalculator from "$lib/calculators/LovePercentageCalculator.svelte";
import ZodiacSignCalculator from "$lib/calculators/ZodiacSignCalculator.svelte";
import QrCodeGenerator from "$lib/calculators/QRCodeGenerator.svelte";

//Education
import RoadMap from "$lib/calculators/RoadMap.svelte";

export const calculatorComponents = {
  "loan-calculator": LoanCalculator,
  "bmi-calculator": BMICalculator,
  "bmr-calculator": BMRCalculator,
  "calorie-intake": CalorieIntakeCalculator,
  "mortgage-calculator": MortgageCalculator,
  "currency-converter": CurrencyConverter,
  "compound-interest": CompoundInterestCalculator,
  "simple-interest": SimpleInterestCalculator,
  "savings-goal": SplitBillCalculator, // placeholder if exists? adjust if needed
  "percentage-calculator": PercentageCalculator,
  "temperature-converter": TemperatureConverter,
  "age-calculator": AgeCalculator,
  "tip-calculator": TipCalculator,
  "random-password-generator": RandomPasswordGenerator,
  "credit-card-payoff": LoanEmiCalculator, // adjust mapping if separate exists
  "retirement-savings": NetWorth, // adjust mapping if separate exists
  "salary-to-hourly": TravelTimeCalculator, // adjust mapping if separate exists
  "hourly-to-salary": HourlyToSalaryCalculator,
  "qr-code-generator": QrCodeGenerator,
  "random-number-generator": RandomNumberGenerator,
  "meme-text-generator": MemeTextGenerator,
  "name-compatibility": NameCompatibility,
  "barcode-generator": BarCodeGenerator,
  "fraction-to-decimal": FractionToDecimalConverter,
  "decimal-to-fraction": DecimalToBinaryConverter, // adjust mapping if separate exists
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
  "body-fat-percentage": BodyFatPercentageCalculator,
  "water-intake": WaterIntakeCalculator,
  "ideal-weight": IdealWeightCalculator,
  "heart-rate-zone": HeartRateZoneCalculator,
  "pregnancy-due-date": PregnancyDueDateCalculator,
  "ovulation-calculator": OvulationCalculator,
  "blood-alcohol": ElectricityCostCalculator, // adjust mapping if separate exists
  "split-bill-calculator": SplitBillCalculator,
  "markup-markdown": PercentageCalculator, // adjust mapping if separate exists
  "loan-to-value": LoanCalculator, // adjust mapping if separate exists
  "prime-number-checker": PrimeNumberChecker,
  "factorial-calculator": FactorialCalculator,
  "mean-median-mode": MeanMedianModeCalculator,
  "standard-deviation": StandardDeviationCalculator,
  "dice-roller": DiceRoller,
  "coin-flip": CoinFlip,
  "love-percentage": LovePercentageCalculator,
  "zodiac-sign": ZodiacSignCalculator,
  "aspect-ratio": GoldenRatioCalculator,
  "date-add-subtract": DateAddSubtractCalculator,
  "countdown-timer": CountdownTimer,
  "stopwatch": Stopwatch,
  "work-days-calculator": WorkDaysCalculator,
  "world-clock": WorldClock,
  "meeting-time-planner": MeetingTimePlanner,
  "time-until-birthday": TimeUntilBirthdayCalculator,
  "leap-year-checker": LeapYearChecker,
  "golden-ratio": GoldenRatioCalculator,
  "dpi-ppi-calculator": DpiPpiCalculator,
  "color-contrast-checker": ColorContrastChecker,
  "css-unit-converter": CssUnitConverter,
  "file-size-estimator": FileSizeEstimator,
  "responsive-breakpoint": ResponsiveBreakpointCalculator,
  "angle-converter": AngleConverter,
  "font-size-converter": FontSizeConverter,
  "recipe-portion-adjuster": RecipePortionAdjuster,
  "fuel-cost-calculator": FuelCostCalculator,
  "travel-time-calculator": TravelTimeCalculator,
  "body-surface-area": BodySurfaceAreaCalculator,
  "pregnancy-weight-gain": PregnancyWeightGainCalculator,
  "loan-emi-calculator": LoanEmiCalculator,
  "electricity-cost": ElectricityCostCalculator,
  "solar-panel-output": SolarPanelOutputCalculator,
  "ascii-to-text": AsciiToTextConverter,
  "text-to-ascii": TextToAsciiConverter,
  "ip-address-lookup": IpAddressLookup,
  "roi-calculator": RoiCalculator,
  "budget-planner": BudgetPlanner,
  "net-worth": NetWorth,
  "tdee-calculator": TdeeCalculator,
  "quadratic-solver": QuadraticCalculator,
  "exponent-calculator": ExponentCalculator,
  "image-improvement": ImageImprovement,
  "permutation-calculator": PermutationCalculator,
  "roadmap":RoadMap
};


