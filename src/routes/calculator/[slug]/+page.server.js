import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
import { getCalculatorById } from '$lib/data/calculators/index.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const calculator = getCalculatorById(params.slug);

  if (!calculator) {
    throw error(404, `Calculator "${params.slug}" not found`);
  }

  const category = CALCULATOR_CATEGORIES.find(c => c.id === calculator.category) || null;

  return {
    seo: {
      title: `${calculator.name} — Free Online Calculator | kceva`,
      description: `${calculator.description} Use our free ${calculator.name.toLowerCase()} instantly. No sign-up required. Fast, accurate, and mobile-friendly.`,
      keywords: [calculator.name.toLowerCase(), ...(calculator.keywords || []), 'free', 'calculator', 'online'].join(', '),
      url: `https://kceva.com/calculator/${calculator.id}/`
    },
    calculator,
    category
  };
}
