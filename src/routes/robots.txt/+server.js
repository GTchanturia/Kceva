export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://kceva.com/sitemap.xml

# Disallow admin or private areas if any
# Disallow: /admin/
# Disallow: /private/

# Allow all calculators and categories
Allow: /calculator/
Allow: /category/
Allow: /categories
Allow: /about

# Crawl delay (optional)
Crawl-delay: 1`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=86400'
    }
  });
}