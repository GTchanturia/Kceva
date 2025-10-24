export async function GET() {
  const robots = `# kceva.com - Robots.txt
# Allow all search engines to crawl our site

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Sitemaps
Sitemap: https://kceva.com/sitemap.xml

# Crawl rate (1 second delay between requests)
Crawl-delay: 1

# Google-specific directives
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /private/

# Bing-specific directives
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /private/`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400"
    }
  });
}