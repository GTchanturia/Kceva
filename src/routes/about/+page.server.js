/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    seo: {
      title: 'About kceva — 100+ Free Online Calculators',
      description: 'kceva provides 100+ free online calculators for finance, health, math, and unit conversion. No sign-up, no ads, no data collection.',
      url: 'https://kceva.com/about/'
    }
  };
}
