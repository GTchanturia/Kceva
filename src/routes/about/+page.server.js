/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    seo: {
      title: 'About kceva — Your Trusted Source for 100+ Free Online Calculators',
      description:
        'Learn about kceva.com, your trusted source for 100+ free online calculators and converters. Fast, accurate, privacy-focused tools for finance, health, math, and more.',
      image: 'https://kceva.com/og-image.png',
      url: 'https://kceva.com/about/'
    }
  };
}
