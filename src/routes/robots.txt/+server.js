export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://kceva.com/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
