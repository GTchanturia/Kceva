import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
import { getCalculatorsByCategory } from '$lib/data/calculators/index.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const categoriesWithCounts = CALCULATOR_CATEGORIES.map(category => ({
    ...category,
    calculatorCount: getCalculatorsByCategory(category.id).length
  }));

  return {
    seo: {
      title: 'Calculator Categories — Browse 100+ Free Tools | kceva',
      description:
        'Browse all calculator categories at kceva.com including finance, health, math, unit conversion, and more. Find the perfect free calculator tool for your needs.',
      image: 'https://kceva.com/og-image.png',
      url: 'https://kceva.com/categories/'
    },
    categories: categoriesWithCounts
  };
}
