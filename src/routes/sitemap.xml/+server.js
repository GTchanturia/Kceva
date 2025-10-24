import { CALCULATORS } from "$lib/data/calculators.js";
import { CALCULATOR_CATEGORIES } from "$lib/types/calculator.js";

export async function GET() {
  const baseUrl = "https://kceva.com";

  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/about/", priority: "0.8", changefreq: "monthly" },
    { url: "/categories/", priority: "0.9", changefreq: "weekly" },
    { url: "/education/", priority: "0.8", changefreq: "weekly" },

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
      .map(
        (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}