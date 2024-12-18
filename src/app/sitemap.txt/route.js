// app/sitemap.txt/route.js

export async function GET() {
  const EXTERNAL_DATA_URL = process.env.SITE_URL || 'https://empleo.cumbre.icu';

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
  <sitemap>
      <loc>${EXTERNAL_DATA_URL}/sitemap_empleos.xml</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <!-- Añade más sitemaps específicos aquí si es necesario -->
</sitemapindex>
`;

  return new Response(sitemapIndex, {
      headers: {
          'Content-Type': 'application/xml',
      },
  });
}
