/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
  return {
    seo: {
      title: 'kceva — 100+ Free Online Calculators & Converters',
      description:
        'Access 100+ free online calculators and converters for finance, health, math, unit conversion, and more. Fast, accurate, mobile-friendly tools with live currency rates.',
      image: 'https://kceva.com/og-image.png',
      url: `https://kceva.com${url.pathname}`
    }
  };
}
