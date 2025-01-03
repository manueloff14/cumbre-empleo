// components/Vencida.jsx
import React, { useEffect } from 'react';

const Vencida = () => {
    useEffect(() => {
        // Guardar el estilo original del overflow
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // Bloquear el scroll
        document.body.style.overflow = 'hidden';
        // Restaurar el estilo original al desmontar el componente
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <>
            {/* Fondo semitransparente */}
            <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center z-50">
                {/* Contenedor del Modal */}
                <div className="bg-gradient-to-br from-red-400 to-red-600 border-2 border-red-500 dark:border-red-700 rounded-2xl p-6 text-center shadow-xl w-[80%] sm:w-[50%] lg:w-[30%] ">
                    <h3 className="text-xl font-bold text-white">
                        ¡Vacante Vencida!
                    </h3>
                    <p className="mt-2 text-white">
                        Esta vacante ya no está disponible.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Vencida;
