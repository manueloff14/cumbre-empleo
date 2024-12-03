import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

export default function JobDescription({ jobDescription }) {
  useEffect(() => {
    // Seleccionar todos los elementos con la clase 'addScript'
    const scriptContainers = document.querySelectorAll('.addScript');

    if (scriptContainers.length === 0) {
      console.error("No se encontraron contenedores con la clase 'addScript'");
      return;
    }

    // Array para almacenar los scripts creados
    const scripts = [];

    // Crear e insertar el script en cada contenedor
    scriptContainers.forEach((container) => {
      // Crear el script con el nuevo código
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = "//pl25175659.profitablecpmrate.com/68e0ba06e2a776b8623ef01baf8e8f00/invoke.js";

      // Insertar el script dentro del contenedor
      container.appendChild(script);

      // Almacenar el script para poder limpiarlo luego
      scripts.push({ container, script });
    });

    // Limpiar los scripts cuando el componente se desmonte
    return () => {
      scripts.forEach(({ container, script }) => {
        container.removeChild(script);
      });
    };
  }, []);

  return (
    <>
      {/* Primer contenedor con la clase 'addScript' */}
      <div
        className="addScript w-full bg-gray-900 p-2 rounded-3xl"
      >
        <div className='p-3'>
          <strong>Patrocinado</strong>
        </div>
        {/* El script insertará el contenedor aquí */}
        <div id="container-68e0ba06e2a776b8623ef01baf8e8f00"></div>
      </div>

      {/* Aquí se muestra el contenido de ReactMarkdown */}
      <div className="prose max-w-none dark:prose-invert">
        <ReactMarkdown>{jobDescription}</ReactMarkdown>
      </div>
    </>
  );
}
