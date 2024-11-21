// app/sitemap_empleos.txt/route.js
import { getEmpleos } from "../lib/empleos";

export async function GET() {
    try {
        const empleos = await getEmpleos();

        // Si no hay empleos, retorna un sitemap vacío
        if (empleos.length === 0) {
            const sitemapVacio = '';

            return new Response(sitemapVacio, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        }

        // Genera una lista de URLs separadas por saltos de línea
        const urlEntries = empleos.map(empleo => empleo.url).join('\n');

        return new Response(urlEntries, {
            headers: {
                'Content-Type': 'text/plain',
                // Opcional: Añade encabezados de caché si es necesario
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
            },
        });
    } catch (error) {
        console.error('Error generando sitemap_empleos.txt:', error);

        // Retornar un error 500
        return new Response('Error interno del servidor', {
            status: 500,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
}
