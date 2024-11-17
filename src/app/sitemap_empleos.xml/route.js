// app/sitemap_empleos.xml/route.js
import { getEmpleos } from "../lib/empleos";

export async function GET() {
    try {
        const empleos = await getEmpleos();

        // Si no hay empleos, puedes decidir qué hacer. Aquí, generamos un sitemap vacío.
        if (empleos.length === 0) {
            const sitemapVacio = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- No hay URLs para mostrar -->
</urlset>`;

            return new Response(sitemapVacio, {
                headers: {
                    'Content-Type': 'application/xml',
                },
            });
        }

        // Genera los elementos <url> dinámicamente a partir de los empleos
        const urlEntries = empleos.map(empleo => {
            return `
    <url>
        <loc>${empleo.url}</loc>
        <lastmod>${new Date(empleo.lastmod).toISOString()}</lastmod>
        <changefreq>${empleo.changefreq}</changefreq>
        <priority>${empleo.priority}</priority>
    </url>`;
        }).join('');

        // Construye el XML completo del sitemap
        const sitemapEmpleos = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urlEntries}
</urlset>
`;

        return new Response(sitemapEmpleos, {
            headers: {
                'Content-Type': 'application/xml',
                // Opcional: Añade encabezados de caché si es necesario
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
            },
        });
    } catch (error) {
        console.error('Error generando sitemap_empleos.xml:', error);

        // Opcional: Retornar un error 500
        return new Response('Error interno del servidor', {
            status: 500,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
}
