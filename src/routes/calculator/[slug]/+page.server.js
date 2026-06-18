import { getCalculatorById } from '$lib/data/calculators/index.js';
import { CALCULATOR_CATEGORIES } from '$lib/types/calculator.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const calculator = getCalculatorById(params.slug);

  if (!calculator) {
    throw error(404, `Calculator "${params.slug}" not found`);
  }

  const category = CALCULATOR_CATEGORIES.find(c => c.id === calculator.category);

  return {
    seo: {
      title: `${calculator.name} — Free Online Calculator | kceva`,
      description: `${calculator.description} Use our free ${calculator.name.toLowerCase()} at kceva.com. Get instant, accurate results. Fast, mobile-friendly, and completely free.`,
      image: 'https://kceva.com/og-image.png',
      url: `https://kceva.com/calculator/${calculator.id}/`,
      keywords: [calculator.name.toLowerCase(), ...calculator.keywords, 'calculator', 'free', 'online'].join(', ')
    },
    calculator,
    category: category || null
  };
}
