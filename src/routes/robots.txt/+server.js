export async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://kceva.com/sitemap.xml

# Disallow sensitive areas
Disallow: /admin/
Disallow: /private/

Crawl-delay: 1`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "max-age=86400"
    }
  });
}