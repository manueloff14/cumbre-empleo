export async function generateMetadata({ params }) {
    const { id } = params;
    try {
        const response = await fetch(`https://data.cumbre.icu/api/blog/${id}`);
        if (response.ok) {
            const data = await response.json();
            return {
                title: `Trabajo de ${data.title_job} | Cumbre Buscador` || "Título no disponible",
                description: `Encuentra trabajo como ${data.title_job} en Colombia. Cumbre te conecta con las mejores oportunidades de empleo en Bogotá y otras ciudades del país. Descubre vacantes de asesores bancarios, comerciales, y más en el sector financiero, ventas y atención al cliente. ¡Cumbre, tu aliado en la búsqueda de empleo!`,
            };
        }
        return {
            title: "Job no encontrado",
        };
    } catch (error) {
        return {
            title: "Error al cargar el job",
        };
    }
}

export default function JobLayout({ children }) {
    return (
        <html lang="es">
            <body>
                {children}
            </body>
        </html>
    );
}
