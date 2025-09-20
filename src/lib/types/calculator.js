/**
 * @typedef {Object} Calculator
 * @property {string} id - Unique identifier for the calculator
 * @property {string} name - Display name of the calculator
 * @property {string} description - Brief description of what the calculator does
 * @property {string} category - Category the calculator belongs to
 * @property {string[]} keywords - Keywords for search functionality
 * @property {string} icon - Icon class or emoji for the calculator
 * @property {boolean} featured - Whether to feature on homepage
 * @property {boolean} requiresApi - Whether the calculator needs external API
 */

/**
 * @typedef {Object} CalculatorCategory
 * @property {string} id - Unique identifier for the category
 * @property {string} name - Display name of the category
 * @property {string} description - Brief description of the category
 * @property {string} icon - Icon for the category
 * @property {string} color - Color theme for the category
 */

export const CALCULATOR_CATEGORIES = [
  {
    id: 'Extra',
    name: 'Extra',
    description: 'Every Day working tools',
    icon: '📄',
    color: 'teal'
  },
  {
    id: 'finance',
    name: 'Financial Calculators',
    description: 'Loan, mortgage, interest, and investment calculators',
    icon: '📊',
    color: 'emerald'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'BMI, calorie, and health-related calculators',
    icon: '🏋️‍♂️',
    color: 'blue'
  },
  {
    id: 'math',
    name: 'Math & Geometry',
    description: 'Mathematical calculations and geometric formulas',
    icon: '📐',
    color: 'purple'
  },
  {
    id: 'conversion',
    name: 'Unit Converters',
    description: 'Convert between different units of measurement',
    icon: '⚙️',
    color: 'orange'
  },
  {
    id: 'datetime',
    name: 'Date & Time',
    description: 'Date calculations and time zone tools',
    icon: '📅',
    color: 'red'
  },
  {
    id: 'education',
    name: 'Education & Learning',
    description: 'Academic and educational calculators',
    icon: '📚',
    color: 'indigo'
  },

    {
    id: 'education',
    name: 'road maps',
    description: 'Education for smart people',
    icon: 'X',
    color: 'Black'
  },
  {
    id: 'tech',
    name: 'Technical/IT',
    description: 'Programming and technical conversion tools',
    icon: '💻',
    color: 'gray'
  },
  {
    id: 'design',
    name: 'Design & Graphics',
    description: 'Design-related calculations and converters',
    icon: '📏',
    color: 'pink'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Practical',
    description: 'Everyday practical calculators',
    icon: '🛠',
    color: 'teal'
  },
  {
    id: 'fun',
    name: 'Fun Tools',
    description: 'Entertainment and random generators',
    icon: '🎯',
    color: 'yellow'
  }
];