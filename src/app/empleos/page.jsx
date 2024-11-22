// src/app/empleos/page.jsx

import React from 'react';
import { getEmpleos } from '../lib/empleos';

export const metadata = {
    title: "Lista de Empleos",
    description: "Todos los empleos disponibles en Cumbre Empleos",
    viewport: "width=device-width, initial-scale=1.0",
};

const EmpleosPage = async () => {
    const empleos = await getEmpleos();

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Empleos Disponibles</h1>
            {empleos.length === 0 ? (
                <p className="text-center text-gray-500">No se encontraron empleos.</p>
            ) : (
                <ul className="space-y-4">
                    {empleos.map((empleo, index) => (
                        <li key={index} className="p-4 border border-gray-700 rounded-lg shadow hover:bg-gray-900 hover:cursor-pointer transition-all duration-100">
                            <a
                                href={empleo.url}
                                className="text-blue-600 hover:underline font-semibold"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {empleo.url}
                            </a>
                            <div className="mt-2 text-sm text-gray-600">
                                <span className="font-medium">Última modificación:</span>{' '}
                                {new Date(empleo.lastmod).toLocaleDateString()}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default EmpleosPage;
