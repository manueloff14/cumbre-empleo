// lib/empleos.js

export async function getEmpleos() {
    try {
        const response = await fetch('https://data.cumbre.icu/api/sitemap');

        if (!response.ok) {
            throw new Error(`Error al obtener empleos: ${response.status} ${response.statusText}`);
        }

        const empleos = await response.json();

        // Asegúrate de que los datos recibidos sean un arreglo
        if (!Array.isArray(empleos)) {
            throw new Error('El formato de datos recibido no es un arreglo.');
        }

        // Opcional: Validar que cada objeto tenga las propiedades necesarias
        const empleosValidados = empleos.map((empleo, index) => {
            if (!empleo.url || !empleo.lastmod || !empleo.changefreq || !empleo.priority) {
                console.warn(`Empleo en el índice ${index} está incompleto:`, empleo);
            }
            return empleo;
        });

        return empleosValidados;
    } catch (error) {
        console.error('Error en getEmpleos:', error);
        // Dependiendo de tu caso de uso, podrías retornar un arreglo vacío o re-lanzar el error
        return [];
        // O lanzar el error para que el manejador de rutas lo capture
        // throw error;
    }
}
