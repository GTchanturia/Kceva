/**
 * @typedef {Object} Calculator
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string[]} keywords
 * @property {string} icon - SVG icon name (matches Icon.svelte paths map)
 * @property {boolean} featured
 * @property {boolean} requiresApi
 */

/**
 * @typedef {Object} CalculatorCategory
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon - SVG icon name key for Icon.svelte
 * @property {string} color - Tailwind color name
 */

export const CALCULATOR_CATEGORIES = [
  {
    id: 'finance',
    name: 'Finance',
    description: 'Loan, mortgage, interest, and investment calculators',
    icon: 'finance',
    color: 'emerald'
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    description: 'BMI, calorie, and health-related calculators',
    icon: 'health',
    color: 'red'
  },
  {
    id: 'math',
    name: 'Math & Geometry',
    description: 'Mathematical calculations and geometric formulas',
    icon: 'math',
    color: 'blue'
  },
  {
    id: 'conversion',
    name: 'Unit Converters',
    description: 'Convert between different units of measurement',
    icon: 'conversion',
    color: 'orange'
  },
  {
    id: 'datetime',
    name: 'Date & Time',
    description: 'Date calculations and time zone tools',
    icon: 'datetime',
    color: 'violet'
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Academic and educational calculators',
    icon: 'education',
    color: 'indigo'
  },
  {
    id: 'tech',
    name: 'Tech & IT',
    description: 'Programming and technical conversion tools',
    icon: 'tech',
    color: 'gray'
  },
  {
    id: 'design',
    name: 'Design & Graphics',
    description: 'Design-related calculations and converters',
    icon: 'design',
    color: 'pink'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Everyday practical calculators',
    icon: 'lifestyle',
    color: 'teal'
  },
  {
    id: 'fun',
    name: 'Fun Tools',
    description: 'Entertainment and random generators',
    icon: 'fun',
    color: 'yellow'
  },
  {
    id: 'Extra',
    name: 'Productivity',
    description: 'Everyday working tools: PDF, QR, image tools',
    icon: 'extra',
    color: 'slate'
  }
];

// Color system: maps category color name → Tailwind classes used in components
export const CATEGORY_COLORS = {
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  red:     { bg: 'bg-red-600',     light: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200' },
  blue:    { bg: 'bg-blue-600',    light: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  orange:  { bg: 'bg-orange-500',  light: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200' },
  violet:  { bg: 'bg-violet-600',  light: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
  indigo:  { bg: 'bg-indigo-600',  light: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200' },
  gray:    { bg: 'bg-gray-700',    light: 'bg-gray-50',    text: 'text-gray-700',    border: 'border-gray-200' },
  pink:    { bg: 'bg-pink-600',    light: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-200' },
  teal:    { bg: 'bg-teal-600',    light: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200' },
  yellow:  { bg: 'bg-amber-500',   light: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  slate:   { bg: 'bg-slate-600',   light: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200' },
  cyan:    { bg: 'bg-cyan-600',    light: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'border-cyan-200' },
  purple:  { bg: 'bg-purple-600',  light: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200' },
};
