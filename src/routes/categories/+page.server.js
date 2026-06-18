import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
import { getCalculatorsByCategory } from '$lib/data/calculators/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const categories = CALCULATOR_CATEGORIES.map(cat => ({
    ...cat,
    calculatorCount: getCalculatorsByCategory(cat.id).length
  }));

  return {
    seo: {
      title: 'Calculator Categories — 100+ Free Tools | kceva',
      description: 'Browse all calculator categories at kceva.com — finance, health, math, unit conversion, design, tech, and more. Fast, free, mobile-friendly.',
      url: 'https://kceva.com/categories/'
    },
    categories
  };
}
