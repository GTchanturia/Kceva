import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
import { getCalculatorsByCategory } from '$lib/data/calculators/index.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const category = CALCULATOR_CATEGORIES.find(c => c.id === params.slug);

  if (!category) {
    throw error(404, `Category "${params.slug}" not found`);
  }

  const calculators = getCalculatorsByCategory(category.id);

  return {
    seo: {
      title: `${category.name} — ${calculators.length} Free Calculators | kceva`,
      description: `${category.description} Browse ${calculators.length} free calculators in the ${category.name} category at kceva.com. Fast, accurate, mobile-friendly tools.`,
      image: 'https://kceva.com/og-image.png',
      url: `https://kceva.com/category/${category.id}/`
    },
    category,
    calculators
  };
}
