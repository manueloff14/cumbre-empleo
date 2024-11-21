// app/robots.txt/route.js

export async function GET() {
    const EXTERNAL_DATA_URL = process.env.SITE_URL || 'https://empleo.cumbre.icu';

    const robotsTxt = `
User-agent: *
Allow: /
  
Sitemap: ${EXTERNAL_DATA_URL}/sitemap_empleos.txt
  `;

    return new Response(robotsTxt.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
