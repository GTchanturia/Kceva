/**
 * Mathematical calculation utilities for calculators
 */

/**
 * Financial Calculations
 */

/**
 * Calculate loan payment using PMT formula
 * @param {number} principal - Loan amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} periods - Number of payment periods
 * @returns {number} Monthly payment amount
 */
export function calculateLoanPayment(principal, rate, periods) {
  if (rate === 0) return principal / periods;
  
  const monthlyRate = rate / 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / 
                  (Math.pow(1 + monthlyRate, periods) - 1);
  
  return payment;
}

/**
 * Calculate compound interest
 * @param {number} principal - Initial amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} time - Time in years
 * @param {number} compound - Compounding frequency per year
 * @returns {Object} Final amount and interest earned
 */
export function calculateCompoundInterest(principal, rate, time, compound = 12) {
  const amount = principal * Math.pow(1 + rate / compound, compound * time);
  const interest = amount - principal;
  
  return {
    finalAmount: amount,
    interestEarned: interest
  };
}

/**
 * Calculate simple interest
 * @param {number} principal - Initial amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} time - Time in years
 * @returns {Object} Final amount and interest earned
 */
export function calculateSimpleInterest(principal, rate, time) {
  const interest = principal * rate * time;
  const amount = principal + interest;
  
  return {
    finalAmount: amount,
    interestEarned: interest
  };
}

/**
 * Health Calculations
 */

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in meters
 * @returns {Object} BMI value and category
 */
export function calculateBMI(weight, height) {
  const bmi = weight / (height * height);
  
  let category;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category
  };
}

/**
 * Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories per day
 */
export function calculateBMR(weight, height, age, gender) {
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  
  return Math.round(bmr);
}

/**
 * Mathematical Calculations
 */

/**
 * Calculate circle area and circumference
 * @param {number} radius - Circle radius
 * @returns {Object} Area and circumference
 */
export function calculateCircle(radius) {
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  
  return {
    area: Math.round(area * 100) / 100,
    circumference: Math.round(circumference * 100) / 100
  };
}

/**
 * Calculate triangle area using base and height
 * @param {number} base - Triangle base
 * @param {number} height - Triangle height
 * @returns {number} Triangle area
 */
export function calculateTriangleArea(base, height) {
  return (base * height) / 2;
}

/**
 * Calculate rectangle area and perimeter
 * @param {number} length - Rectangle length
 * @param {number} width - Rectangle width
 * @returns {Object} Area and perimeter
 */
export function calculateRectangle(length, width) {
  const area = length * width;
  const perimeter = 2 * (length + width);
  
  return {
    area,
    perimeter
  };
}

/**
 * Calculate sphere volume and surface area
 * @param {number} radius - Sphere radius
 * @returns {Object} Volume and surface area
 */
export function calculateSphere(radius) {
  const volume = (4/3) * Math.PI * Math.pow(radius, 3);
  const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
  
  return {
    volume: Math.round(volume * 100) / 100,
    surfaceArea: Math.round(surfaceArea * 100) / 100
  };
}

/**
 * Solve Pythagorean theorem
 * @param {number} a - Side a (can be null)
 * @param {number} b - Side b (can be null)
 * @param {number} c - Hypotenuse c (can be null)
 * @returns {Object} All three sides
 */
export function calculatePythagorean(a, b, c) {
  if (a && b && !c) {
    c = Math.sqrt(a * a + b * b);
  } else if (a && !b && c) {
    b = Math.sqrt(c * c - a * a);
  } else if (!a && b && c) {
    a = Math.sqrt(c * c - b * b);
  }
  
  return {
    a: Math.round(a * 100) / 100,
    b: Math.round(b * 100) / 100,
    c: Math.round(c * 100) / 100
  };
}

/**
 * Unit Conversion Functions
 */

/**
 * Convert temperature between units
 * @param {number} value - Temperature value
 * @param {string} from - Source unit (C, F, K)
 * @param {string} to - Target unit (C, F, K)
 * @returns {number} Converted temperature
 */
export function convertTemperature(value, from, to) {
  // Convert to Celsius first
  let celsius;
  switch (from) {
    case 'F':
      celsius = (value - 32) * 5/9;
      break;
    case 'K':
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }
  
  // Convert from Celsius to target
  switch (to) {
    case 'F':
      return celsius * 9/5 + 32;
    case 'K':
      return celsius + 273.15;
    default:
      return celsius;
  }
}

/**
 * Convert length between units
 * @param {number} value - Length value
 * @param {string} from - Source unit
 * @param {string} to - Target unit
 * @returns {number} Converted length
 */
export function convertLength(value, from, to) {
  // Conversion factors to meters
  const toMeters = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.34
  };
  
  // Convert to meters, then to target unit
  const meters = value * toMeters[from];
  return meters / toMeters[to];
}

/**
 * Convert weight between units
 * @param {number} value - Weight value
 * @param {string} from - Source unit
 * @param {string} to - Target unit
 * @returns {number} Converted weight
 */
export function convertWeight(value, from, to) {
  // Conversion factors to grams
  const toGrams = {
    mg: 0.001,
    g: 1,
    kg: 1000,
    oz: 28.3495,
    lb: 453.592,
    st: 6350.29
  };
  
  // Convert to grams, then to target unit
  const grams = value * toGrams[from];
  return grams / toGrams[to];
}