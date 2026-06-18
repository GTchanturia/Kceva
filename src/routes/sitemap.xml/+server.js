import { CALCULATORS } from "$lib/data/calculators.js";
import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const baseUrl = "https://kceva.com";
  const now = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/categories/", priority: "0.9", changefreq: "weekly" },
    { url: "/education/", priority: "0.8", changefreq: "weekly" },
    { url: "/about/", priority: "0.7", changefreq: "monthly" },
  ];

  const categoryPages = CALCULATOR_CATEGORIES.map((category) => ({
    url: `/category/${category.id}/`,
    priority: "0.8",
    changefreq: "weekly"
  }));

  const calculatorPages = CALCULATORS.map((calculator) => ({
    url: `/calculator/${calculator.id}/`,
    priority: calculator.featured ? "0.9" : "0.7",
    changefreq: "monthly"
  }));

  const allPages = [...staticPages, ...categoryPages, ...calculatorPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
    .map(
      (p) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
