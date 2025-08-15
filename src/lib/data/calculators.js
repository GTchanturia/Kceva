import { CALCULATOR_CATEGORIES } from '../types/calculator.js';

/**
 * Complete list of all 100 calculators with metadata
 */
export const CALCULATORS = [
  // Financial Calculators (1-10)
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest, and loan details',
    category: 'finance',
    keywords: ['loan', 'payment', 'interest', 'finance', 'monthly'],
    icon: '💰',
    featured: true,
    requiresApi: false
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments and amortization schedule',
    category: 'finance',
    keywords: ['mortgage', 'home', 'payment', 'interest', 'property'],
    icon: '🏠',
    featured: true,
    requiresApi: false
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest and investment growth',
    category: 'finance',
    keywords: ['compound', 'interest', 'investment', 'growth', 'savings'],
    icon: '📈',
    featured: false,
    requiresApi: false
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest on loans and investments',
    category: 'finance',
    keywords: ['simple', 'interest', 'loan', 'investment'],
    icon: '📊',
    featured: false,
    requiresApi: false
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies with live rates',
    category: 'finance',
    keywords: ['currency', 'exchange', 'convert', 'money', 'forex'],
    icon: '💱',
    featured: true,
    requiresApi: true
  },
  {
    id: 'savings-goal',
    name: 'Savings Goal Calculator',
    description: 'Calculate how much to save to reach your financial goals',
    category: 'finance',
    keywords: ['savings', 'goal', 'target', 'monthly', 'plan'],
    icon: '🎯',
    featured: false,
    requiresApi: false
  },
  {
    id: 'credit-card-payoff',
    name: 'Credit Card Payoff Calculator',
    description: 'Calculate time and interest to pay off credit card debt',
    category: 'finance',
    keywords: ['credit', 'card', 'debt', 'payoff', 'interest'],
    icon: '💳',
    featured: false,
    requiresApi: false
  },
  {
    id: 'retirement-savings',
    name: 'Retirement Savings Calculator',
    description: 'Plan your retirement savings and calculate future value',
    category: 'finance',
    keywords: ['retirement', 'savings', 'pension', 'future', 'planning'],
    icon: '👴',
    featured: false,
    requiresApi: false
  },
  {
    id: 'salary-to-hourly',
    name: 'Salary to Hourly Calculator',
    description: 'Convert annual salary to hourly wage',
    category: 'finance',
    keywords: ['salary', 'hourly', 'wage', 'convert', 'annual'],
    icon: '💼',
    featured: false,
    requiresApi: false
  },
  {
    id: 'hourly-to-salary',
    name: 'Hourly to Salary Calculator',
    description: 'Convert hourly wage to annual salary',
    category: 'finance',
    keywords: ['hourly', 'salary', 'wage', 'convert', 'annual'],
    icon: '⏰',
    featured: false,
    requiresApi: false
  },

  // Health & Fitness (11-20)
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate Body Mass Index and health category',
    category: 'health',
    keywords: ['bmi', 'body', 'mass', 'index', 'weight', 'health'],
    icon: '⚖️',
    featured: true,
    requiresApi: false
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator',
    description: 'Calculate Basal Metabolic Rate and daily calories',
    category: 'health',
    keywords: ['bmr', 'metabolic', 'rate', 'calories', 'energy'],
    icon: '🔥',
    featured: false,
    requiresApi: false
  },
  {
    id: 'calorie-intake',
    name: 'Calorie Intake Calculator',
    description: 'Calculate daily calorie needs based on activity level',
    category: 'health',
    keywords: ['calorie', 'intake', 'daily', 'nutrition', 'diet'],
    icon: '🍎',
    featured: true,
    requiresApi: false
  },
  {
    id: 'body-fat-percentage',
    name: 'Body Fat Percentage Calculator',
    description: 'Estimate body fat percentage using measurements',
    category: 'health',
    keywords: ['body', 'fat', 'percentage', 'fitness', 'composition'],
    icon: '📏',
    featured: false,
    requiresApi: false
  },
  {
    id: 'water-intake',
    name: 'Water Intake Calculator',
    description: 'Calculate daily water intake recommendations',
    category: 'health',
    keywords: ['water', 'intake', 'hydration', 'daily', 'health'],
    icon: '💧',
    featured: false,
    requiresApi: false
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Weight Calculator',
    description: 'Calculate ideal weight based on height and frame',
    category: 'health',
    keywords: ['ideal', 'weight', 'height', 'healthy', 'target'],
    icon: '🎯',
    featured: false,
    requiresApi: false
  },
  {
    id: 'heart-rate-zone',
    name: 'Heart Rate Zone Calculator',
    description: 'Calculate target heart rate zones for exercise',
    category: 'health',
    keywords: ['heart', 'rate', 'zone', 'exercise', 'cardio'],
    icon: '❤️',
    featured: false,
    requiresApi: false
  },
  {
    id: 'pregnancy-due-date',
    name: 'Pregnancy Due Date Calculator',
    description: 'Calculate pregnancy due date and milestones',
    category: 'health',
    keywords: ['pregnancy', 'due', 'date', 'baby', 'conception'],
    icon: '🤱',
    featured: false,
    requiresApi: false
  },
  {
    id: 'ovulation-calculator',
    name: 'Ovulation Calculator',
    description: 'Calculate ovulation and fertile window dates',
    category: 'health',
    keywords: ['ovulation', 'fertile', 'cycle', 'conception', 'period'],
    icon: '🌸',
    featured: false,
    requiresApi: false
  },
  {
    id: 'blood-alcohol',
    name: 'Blood Alcohol Calculator',
    description: 'Estimate blood alcohol content and sobering time',
    category: 'health',
    keywords: ['blood', 'alcohol', 'bac', 'drinking', 'safety'],
    icon: '🍷',
    featured: false,
    requiresApi: false
  },

  // Math & Geometry (21-30)
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, increases, and decreases',
    category: 'math',
    keywords: ['percentage', 'percent', 'increase', 'decrease', 'math'],
    icon: '%',
    featured: true,
    requiresApi: false
  },
  {
    id: 'fraction-to-decimal',
    name: 'Fraction to Decimal Converter',
    description: 'Convert fractions to decimal numbers',
    category: 'math',
    keywords: ['fraction', 'decimal', 'convert', 'math', 'number'],
    icon: '½',
    featured: false,
    requiresApi: false
  },
  {
    id: 'decimal-to-fraction',
    name: 'Decimal to Fraction Converter',
    description: 'Convert decimal numbers to fractions',
    category: 'math',
    keywords: ['decimal', 'fraction', 'convert', 'math', 'number'],
    icon: '0.5',
    featured: false,
    requiresApi: false
  },
  {
    id: 'circle-area',
    name: 'Circle Area Calculator',
    description: 'Calculate area and circumference of a circle',
    category: 'math',
    keywords: ['circle', 'area', 'circumference', 'radius', 'geometry'],
    icon: '⭕',
    featured: false,
    requiresApi: false
  },
  {
    id: 'triangle-area',
    name: 'Triangle Area Calculator',
    description: 'Calculate area of triangles using various methods',
    category: 'math',
    keywords: ['triangle', 'area', 'base', 'height', 'geometry'],
    icon: '🔺',
    featured: false,
    requiresApi: false
  },
  {
    id: 'rectangle-area',
    name: 'Rectangle Area Calculator',
    description: 'Calculate area and perimeter of rectangles',
    category: 'math',
    keywords: ['rectangle', 'area', 'perimeter', 'length', 'width'],
    icon: '▭',
    featured: false,
    requiresApi: false
  },
  {
    id: 'sphere-volume',
    name: 'Sphere Volume Calculator',
    description: 'Calculate volume and surface area of a sphere',
    category: 'math',
    keywords: ['sphere', 'volume', 'surface', 'area', 'radius'],
    icon: '🌐',
    featured: false,
    requiresApi: false
  },
  {
    id: 'cylinder-volume',
    name: 'Cylinder Volume Calculator',
    description: 'Calculate volume and surface area of a cylinder',
    category: 'math',
    keywords: ['cylinder', 'volume', 'surface', 'area', 'radius', 'height'],
    icon: '🥫',
    featured: false,
    requiresApi: false
  },
  {
    id: 'pythagorean-theorem',
    name: 'Pythagorean Theorem Calculator',
    description: 'Calculate missing side of right triangles',
    category: 'math',
    keywords: ['pythagorean', 'theorem', 'triangle', 'hypotenuse', 'right'],
    icon: '📐',
    featured: false,
    requiresApi: false
  },
  {
    id: 'square-root',
    name: 'Square Root Calculator',
    description: 'Calculate square roots and perfect squares',
    category: 'math',
    keywords: ['square', 'root', 'sqrt', 'math', 'calculation'],
    icon: '√',
    featured: false,
    requiresApi: false
  },

  // Unit Converters (31-40)
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between meters, feet, miles, and other length units',
    category: 'conversion',
    keywords: ['length', 'convert', 'meter', 'feet', 'mile', 'distance'],
    icon: '📏',
    featured: false,
    requiresApi: false
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between kg, lbs, oz and other weight units',
    category: 'conversion',
    keywords: ['weight', 'convert', 'kg', 'pounds', 'ounce', 'mass'],
    icon: '⚖️',
    featured: false,
    requiresApi: false
  },
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    category: 'conversion',
    keywords: ['temperature', 'convert', 'celsius', 'fahrenheit', 'kelvin'],
    icon: '🌡️',
    featured: true,
    requiresApi: false
  },
  {
    id: 'speed-converter',
    name: 'Speed Converter',
    description: 'Convert between km/h, mph, and other speed units',
    category: 'conversion',
    keywords: ['speed', 'convert', 'kmh', 'mph', 'velocity'],
    icon: '🏃',
    featured: false,
    requiresApi: false
  },
  {
    id: 'time-converter',
    name: 'Time Converter',
    description: 'Convert between seconds, minutes, hours, days',
    category: 'conversion',
    keywords: ['time', 'convert', 'seconds', 'minutes', 'hours', 'days'],
    icon: '⏰',
    featured: false,
    requiresApi: false
  },
  {
    id: 'energy-converter',
    name: 'Energy Converter',
    description: 'Convert between Joules, Calories, and other energy units',
    category: 'conversion',
    keywords: ['energy', 'convert', 'joule', 'calorie', 'watt'],
    icon: '⚡',
    featured: false,
    requiresApi: false
  },
  {
    id: 'pressure-converter',
    name: 'Pressure Converter',
    description: 'Convert between Pascal, Bar, PSI and other pressure units',
    category: 'conversion',
    keywords: ['pressure', 'convert', 'pascal', 'bar', 'psi'],
    icon: '💨',
    featured: false,
    requiresApi: false
  },
  {
    id: 'volume-converter',
    name: 'Volume Converter',
    description: 'Convert between liters, gallons, and other volume units',
    category: 'conversion',
    keywords: ['volume', 'convert', 'liter', 'gallon', 'cubic'],
    icon: '🥤',
    featured: false,
    requiresApi: false
  },
  {
    id: 'data-storage-converter',
    name: 'Data Storage Converter',
    description: 'Convert between MB, GB, TB and other data storage units',
    category: 'conversion',
    keywords: ['data', 'storage', 'convert', 'mb', 'gb', 'tb', 'byte'],
    icon: '💾',
    featured: false,
    requiresApi: false
  },
  {
    id: 'fuel-efficiency-converter',
    name: 'Fuel Efficiency Converter',
    description: 'Convert between mpg, L/100km and other fuel efficiency units',
    category: 'conversion',
    keywords: ['fuel', 'efficiency', 'mpg', 'consumption', 'convert'],
    icon: '⛽',
    featured: false,
    requiresApi: false
  },

  // Date & Time (41-50)
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days',
    category: 'datetime',
    keywords: ['age', 'birthday', 'years', 'calculate', 'date'],
    icon: '🎂',
    featured: true,
    requiresApi: false
  },
  {
    id: 'days-between-dates',
    name: 'Days Between Dates Calculator',
    description: 'Calculate days, weeks, months between two dates',
    category: 'datetime',
    keywords: ['days', 'between', 'dates', 'difference', 'duration'],
    icon: '📅',
    featured: false,
    requiresApi: false
  },
  {
    id: 'date-add-subtract',
    name: 'Date Add/Subtract Calculator',
    description: 'Add or subtract days, months, years from a date',
    category: 'datetime',
    keywords: ['date', 'add', 'subtract', 'calculate', 'future', 'past'],
    icon: '➕',
    featured: false,
    requiresApi: false
  },
  {
    id: 'countdown-timer',
    name: 'Countdown Timer',
    description: 'Create countdown timers for events and deadlines',
    category: 'datetime',
    keywords: ['countdown', 'timer', 'event', 'deadline', 'remaining'],
    icon: '⏳',
    featured: false,
    requiresApi: false
  },
  {
    id: 'stopwatch',
    name: 'Stopwatch',
    description: 'Digital stopwatch with lap times and precision timing',
    category: 'datetime',
    keywords: ['stopwatch', 'timer', 'lap', 'precision', 'time'],
    icon: '⏱️',
    featured: false,
    requiresApi: false
  },
  {
    id: 'work-days-calculator',
    name: 'Work Days Calculator',
    description: 'Calculate working days between dates excluding weekends',
    category: 'datetime',
    keywords: ['work', 'business', 'days', 'exclude', 'weekends'],
    icon: '💼',
    featured: false,
    requiresApi: false
  },
  {
    id: 'world-clock',
    name: 'World Clock',
    description: 'Display time in multiple time zones around the world',
    category: 'datetime',
    keywords: ['world', 'clock', 'timezone', 'international', 'time'],
    icon: '🌍',
    featured: false,
    requiresApi: false
  },
  {
    id: 'meeting-time-planner',
    name: 'Meeting Time Planner',
    description: 'Find optimal meeting times across different time zones',
    category: 'datetime',
    keywords: ['meeting', 'time', 'planner', 'timezone', 'schedule'],
    icon: '🤝',
    featured: false,
    requiresApi: false
  },
  {
    id: 'time-until-birthday',
    name: 'Time Until Birthday Calculator',
    description: 'Calculate exact time remaining until your next birthday',
    category: 'datetime',
    keywords: ['birthday', 'countdown', 'remaining', 'celebration'],
    icon: '🎉',
    featured: false,
    requiresApi: false
  },
  {
    id: 'leap-year-checker',
    name: 'Leap Year Checker',
    description: 'Check if a year is a leap year and find leap years',
    category: 'datetime',
    keywords: ['leap', 'year', 'check', 'calendar', 'february'],
    icon: '📆',
    featured: false,
    requiresApi: false
  },

  // Education & Learning (51-60)
  {
    id: 'gpa-calculator',
    name: 'GPA Calculator',
    description: 'Calculate Grade Point Average from course grades',
    category: 'education',
    keywords: ['gpa', 'grade', 'point', 'average', 'academic'],
    icon: '🎓',
    featured: true,
    requiresApi: false
  },
  {
    id: 'grade-percentage',
    name: 'Grade Percentage Calculator',
    description: 'Convert grades to percentages and vice versa',
    category: 'education',
    keywords: ['grade', 'percentage', 'convert', 'academic', 'score'],
    icon: '📝',
    featured: false,
    requiresApi: false
  },
  {
    id: 'split-bill-calculator',
    name: 'Split Bill Calculator',
    description: 'Split restaurant bills and expenses among friends',
    category: 'lifestyle',
    keywords: ['split', 'bill', 'expense', 'friends', 'divide'],
    icon: '🧾',
    featured: false,
    requiresApi: false
  },
  {
    id: 'tip-split-bill',
    name: 'Tip Calculator',
    description: 'Calculate tips and split bills for restaurants',
    category: 'lifestyle',
    keywords: ['tip', 'restaurant', 'bill', 'gratuity', 'service'],
    icon: '🍽️',
    featured: true,
    requiresApi: false
  },
  {
    id: 'markup-markdown',
    name: 'Markup/Markdown Calculator',
    description: 'Calculate markup and markdown percentages for pricing',
    category: 'finance',
    keywords: ['markup', 'markdown', 'pricing', 'profit', 'margin'],
    icon: '🏷️',
    featured: false,
    requiresApi: false
  },
  {
    id: 'loan-to-value',
    name: 'Loan-to-Value Calculator',
    description: 'Calculate loan-to-value ratio for mortgages',
    category: 'finance',
    keywords: ['loan', 'value', 'mortgage', 'ratio', 'property'],
    icon: '🏡',
    featured: false,
    requiresApi: false
  },
  {
    id: 'prime-number-checker',
    name: 'Prime Number Checker',
    description: 'Check if a number is prime and find prime numbers',
    category: 'education',
    keywords: ['prime', 'number', 'check', 'mathematics', 'integer'],
    icon: '🔢',
    featured: false,
    requiresApi: false
  },
  {
    id: 'factorial-calculator',
    name: 'Factorial Calculator',
    description: 'Calculate factorial of numbers (n!)',
    category: 'education',
    keywords: ['factorial', 'mathematics', 'calculation', 'permutation'],
    icon: '!',
    featured: false,
    requiresApi: false
  },
  {
    id: 'mean-median-mode',
    name: 'Mean/Median/Mode Calculator',
    description: 'Calculate statistical measures of central tendency',
    category: 'education',
    keywords: ['mean', 'median', 'mode', 'statistics', 'average'],
    icon: '📊',
    featured: false,
    requiresApi: false
  },
  {
    id: 'standard-deviation',
    name: 'Standard Deviation Calculator',
    description: 'Calculate standard deviation and variance of data sets',
    category: 'education',
    keywords: ['standard', 'deviation', 'variance', 'statistics', 'data'],
    icon: '📈',
    featured: false,
    requiresApi: false
  },
  {
    id: 'ip-address-lookup',
    name: 'IP Address Lookup',
    description: 'Get location and details for any IP address',
    category: 'tech',
    keywords: ['ip', 'address', 'lookup', 'location', 'geolocation'],
    icon: '🌐',
    featured: false,
    requiresApi: true
  },

  // Technical/IT (61-70)
  {
    id: 'base64-encoder-decoder',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode and decode text using Base64 encoding',
    category: 'tech',
    keywords: ['base64', 'encode', 'decode', 'text', 'encryption'],
    icon: '🔐',
    featured: false,
    requiresApi: false
  },
  {
    id: 'url-encoder-decoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for web development',
    category: 'tech',
    keywords: ['url', 'encode', 'decode', 'web', 'development'],
    icon: '🔗',
    featured: false,
    requiresApi: false
  },
  {
    id: 'hex-to-rgb',
    name: 'HEX to RGB Converter',
    description: 'Convert HEX color codes to RGB values',
    category: 'tech',
    keywords: ['hex', 'rgb', 'color', 'convert', 'design'],
    icon: '🎨',
    featured: false,
    requiresApi: false
  },
  {
    id: 'rgb-to-hex',
    name: 'RGB to HEX Converter',
    description: 'Convert RGB color values to HEX codes',
    category: 'tech',
    keywords: ['rgb', 'hex', 'color', 'convert', 'design'],
    icon: '🌈',
    featured: false,
    requiresApi: false
  },
  {
    id: 'binary-to-decimal',
    name: 'Binary to Decimal Converter',
    description: 'Convert binary numbers to decimal format',
    category: 'tech',
    keywords: ['binary', 'decimal', 'convert', 'programming', 'math'],
    icon: '0️⃣',
    featured: false,
    requiresApi: false
  },
  {
    id: 'decimal-to-binary',
    name: 'Decimal to Binary Converter',
    description: 'Convert decimal numbers to binary format',
    category: 'tech',
    keywords: ['decimal', 'binary', 'convert', 'programming', 'math'],
    icon: '1️⃣',
    featured: false,
    requiresApi: false
  },
  {
    id: 'ascii-to-text',
    name: 'ASCII to Text Converter',
    description: 'Convert ASCII codes to readable text',
    category: 'tech',
    keywords: ['ascii', 'text', 'convert', 'character', 'encoding'],
    icon: '🔤',
    featured: false,
    requiresApi: false
  },
  {
    id: 'text-to-ascii',
    name: 'Text to ASCII Converter',
    description: 'Convert text to ASCII character codes',
    category: 'tech',
    keywords: ['text', 'ascii', 'convert', 'character', 'encoding'],
    icon: '🔢',
    featured: false,
    requiresApi: false
  },
  {
    id: 'password-strength-checker',
    name: 'Password Strength Checker',
    description: 'Check password strength and get security recommendations',
    category: 'tech',
    keywords: ['password', 'strength', 'security', 'check', 'safety'],
    icon: '🔒',
    featured: true,
    requiresApi: false
  },

  // Design & Graphics (71-80)
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate aspect ratios for images and screens',
    category: 'design',
    keywords: ['aspect', 'ratio', 'image', 'screen', 'proportion'],
    icon: '📐',
    featured: false,
    requiresApi: false
  },
  {
    id: 'golden-ratio',
    name: 'Golden Ratio Calculator',
    description: 'Calculate golden ratio proportions and measurements',
    category: 'design',
    keywords: ['golden', 'ratio', 'proportion', 'design', 'phi'],
    icon: '✨',
    featured: false,
    requiresApi: false
  },
  {
    id: 'dpi-ppi-calculator',
    name: 'DPI/PPI Calculator',
    description: 'Calculate dots per inch and pixels per inch',
    category: 'design',
    keywords: ['dpi', 'ppi', 'resolution', 'print', 'pixel'],
    icon: '🖨️',
    featured: false,
    requiresApi: false
  },
  {
    id: 'color-contrast-checker',
    name: 'Color Contrast Checker',
    description: 'Check color contrast ratios for accessibility',
    category: 'design',
    keywords: ['color', 'contrast', 'accessibility', 'wcag', 'design'],
    icon: '🎨',
    featured: false,
    requiresApi: false
  },
  {
    id: 'css-unit-converter',
    name: 'CSS Unit Converter',
    description: 'Convert between px, em, rem, and percentage units',
    category: 'design',
    keywords: ['css', 'unit', 'convert', 'px', 'em', 'rem', 'percent'],
    icon: '📱',
    featured: false,
    requiresApi: false
  },
  {
    id: 'file-size-estimator',
    name: 'File Size Estimator for Images',
    description: 'Estimate file sizes for different image formats',
    category: 'design',
    keywords: ['file', 'size', 'image', 'estimate', 'format'],
    icon: '📁',
    featured: false,
    requiresApi: false
  },
  {
    id: 'responsive-breakpoint',
    name: 'Responsive Breakpoint Calculator',
    description: 'Calculate responsive design breakpoints',
    category: 'design',
    keywords: ['responsive', 'breakpoint', 'design', 'mobile', 'tablet'],
    icon: '📱',
    featured: false,
    requiresApi: false
  },
  {
    id: '3d-box-volume',
    name: '3D Box Volume Calculator',
    description: 'Calculate volume and surface area of 3D boxes',
    category: 'design',
    keywords: ['3d', 'box', 'volume', 'surface', 'area'],
    icon: '📦',
    featured: false,
    requiresApi: false
  },
  {
    id: 'angle-converter',
    name: 'Angle Converter',
    description: 'Convert between degrees, radians, and gradians',
    category: 'design',
    keywords: ['angle', 'convert', 'degrees', 'radians', 'gradians'],
    icon: '🔄',
    featured: false,
    requiresApi: false
  },
  {
    id: 'font-size-converter',
    name: 'Font Size Converter',
    description: 'Convert between pt, px, and other font size units',
    category: 'design',
    keywords: ['font', 'size', 'convert', 'pt', 'px', 'typography'],
    icon: '🔤',
    featured: false,
    requiresApi: false
  },

  // Lifestyle & Practical (81-90)
  {
    id: 'cooking-measurement',
    name: 'Cooking Measurement Converter',
    description: 'Convert between cups, ml, grams, and cooking units',
    category: 'lifestyle',
    keywords: ['cooking', 'measurement', 'convert', 'cups', 'ml', 'grams'],
    icon: '🥄',
    featured: false,
    requiresApi: false
  },
  {
    id: 'recipe-portion-adjuster',
    name: 'Recipe Portion Adjuster',
    description: 'Scale recipe ingredients for different serving sizes',
    category: 'lifestyle',
    keywords: ['recipe', 'portion', 'scale', 'ingredients', 'serving'],
    icon: '👨‍🍳',
    featured: false,
    requiresApi: false
  },
  {
    id: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    description: 'Calculate fuel costs for trips and daily commuting',
    category: 'lifestyle',
    keywords: ['fuel', 'cost', 'trip', 'gas', 'mileage'],
    icon: '⛽',
    featured: false,
    requiresApi: false
  },
  {
    id: 'travel-time-calculator',
    name: 'Travel Time Calculator',
    description: 'Calculate travel time based on distance and speed',
    category: 'lifestyle',
    keywords: ['travel', 'time', 'distance', 'speed', 'trip'],
    icon: '🚗',
    featured: false,
    requiresApi: false
  },
  {
    id: 'body-surface-area',
    name: 'Body Surface Area Calculator',
    description: 'Calculate body surface area for medical purposes',
    category: 'lifestyle',
    keywords: ['body', 'surface', 'area', 'medical', 'health'],
    icon: '🏥',
    featured: false,
    requiresApi: false
  },
  {
    id: 'pregnancy-weight-gain',
    name: 'Pregnancy Weight Gain Calculator',
    description: 'Track healthy weight gain during pregnancy',
    category: 'lifestyle',
    keywords: ['pregnancy', 'weight', 'gain', 'healthy', 'baby'],
    icon: '🤰',
    featured: false,
    requiresApi: false
  },
  {
    id: 'loan-emi-calculator',
    name: 'Loan EMI Calculator',
    description: 'Calculate Equated Monthly Installments for loans',
    category: 'lifestyle',
    keywords: ['loan', 'emi', 'installment', 'monthly', 'payment'],
    icon: '💳',
    featured: false,
    requiresApi: false
  },
  {
    id: 'electricity-cost',
    name: 'Electricity Cost Calculator',
    description: 'Calculate electricity costs for appliances and usage',
    category: 'lifestyle',
    keywords: ['electricity', 'cost', 'energy', 'bill', 'usage'],
    icon: '💡',
    featured: false,
    requiresApi: false
  },
  {
    id: 'solar-panel-output',
    name: 'Solar Panel Output Calculator',
    description: 'Calculate solar panel energy output and savings',
    category: 'lifestyle',
    keywords: ['solar', 'panel', 'energy', 'output', 'savings'],
    icon: '☀️',
    featured: false,
    requiresApi: false
  },

  // Fun Tools (91-100)
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    description: 'Generate random numbers within specified ranges',
    category: 'fun',
    keywords: ['random', 'number', 'generator', 'dice', 'lottery'],
    icon: '🎲',
    featured: false,
    requiresApi: false
  },
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    description: 'Roll virtual dice for games and decision making',
    category: 'fun',
    keywords: ['dice', 'roll', 'game', 'random', 'decision'],
    icon: '🎲',
    featured: false,
    requiresApi: false
  },
  {
    id: 'coin-flip',
    name: 'Coin Flip',
    description: 'Flip a virtual coin for heads or tails decisions',
    category: 'fun',
    keywords: ['coin', 'flip', 'heads', 'tails', 'decision'],
    icon: '🪙',
    featured: false,
    requiresApi: false
  },
  {
    id: 'love-percentage',
    name: 'Love Percentage Calculator',
    description: 'Fun love compatibility calculator using names',
    category: 'fun',
    keywords: ['love', 'percentage', 'compatibility', 'fun', 'romance'],
    icon: '💕',
    featured: false,
    requiresApi: false
  },
  {
    id: 'zodiac-sign',
    name: 'Zodiac Sign Calculator',
    description: 'Find zodiac sign based on birth date',
    category: 'fun',
    keywords: ['zodiac', 'sign', 'astrology', 'birthday', 'horoscope'],
    icon: '♈',
    featured: false,
    requiresApi: false
  },
  {
    id: 'random-password-generator',
    name: 'Random Password Generator',
    description: 'Generate secure random passwords with options',
    category: 'fun',
    keywords: ['password', 'generator', 'random', 'secure', 'strong'],
    icon: '🔐',
    featured: true,
    requiresApi: false
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes from text or URLs.",
    category: 'fun',
    icon: "🔳",
    keywords: ["qr", "code", "generator", "url", "text"],
    featured: false,
    requiresApi: false
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    description: 'Generate various types of barcodes',
    category: 'fun',
    keywords: ['barcode', 'generator', 'code', 'scan', 'product'],
    icon: '📊',
    featured: false,
    requiresApi: false
  },
  {
    id: 'name-compatibility',
    name: 'Name Compatibility Calculator',
    description: 'Fun name compatibility checker for relationships',
    category: 'fun',
    keywords: ['name', 'compatibility', 'relationship', 'fun', 'match'],
    icon: '💑',
    featured: false,
    requiresApi: false
  },
  {
    id: 'meme-text-generator',
    name: 'Meme Text Generator',
    description: 'Generate stylized text for memes and social media',
    category: 'fun',
    keywords: ['meme', 'text', 'generator', 'social', 'media'],
    icon: '😂',
    featured: false,
    requiresApi: false
  }
];

/**
 * Get calculators by category
 * @param {string} categoryId 
 * @returns {Array} Array of calculators in the category
 */
export function getCalculatorsByCategory(categoryId) {
  return CALCULATORS.filter(calc => calc.category === categoryId);
}

/**
 * Get featured calculators for homepage
 * @returns {Array} Array of featured calculators
 */
export function getFeaturedCalculators() {
  return CALCULATORS.filter(calc => calc.featured);
}

/**
 * Search calculators by keyword
 * @param {string} query 
 * @returns {Array} Array of matching calculators
 */
export function searchCalculators(query) {
  if (!query) return [];

  const searchTerm = query.toLowerCase();
  return CALCULATORS.filter(calc =>
    calc.name.toLowerCase().includes(searchTerm) ||
    calc.description.toLowerCase().includes(searchTerm) ||
    calc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
  );
}

/**
 * Get calculator by ID
 * @param {string} id 
 * @returns {Object|null} Calculator object or null if not found
 */
export function getCalculatorById(id) {
  return CALCULATORS.find(calc => calc.id === id) || null;
}