// app/robots.txt/route.js

export async function GET() {
    const EXTERNAL_DATA_URL = process.env.SITE_URL || 'https://empleo.cumbre.icu';

    const robotsTxt = `
User-agent: *
Allow: /
  
Sitemap: ${EXTERNAL_DATA_URL}/sitemap.xml
  `;

    return new Response(robotsTxt.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
