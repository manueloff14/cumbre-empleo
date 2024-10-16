export async function generateMetadata({ params }) {
    const { id } = params;
    try {
        const response = await fetch(`https://cumbre-server.onrender.com/api/blog/${id}`);
        if (response.ok) {
            const data = await response.json();
            return {
                title: `Trabajo de ${data.title_job} | Cumbre Buscador` || "Título no disponible",
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
