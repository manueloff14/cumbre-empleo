"use client";

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import JobData from '../../../components/JobData';
import Buscador from '../../../components/Buscador';

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id;
  const query = searchParams.get('query');

  // Estados
  const [data, setData] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar el mensaje de error

  // Para tema oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://data.cumbre.icu'}/api/job/${id}`
        );

        if (!response.ok) {
          // Si el status code no es 2xx, mostramos un error
          setErrorMessage("No se encontró el trabajo solicitado");
        } else {
          const result = await response.json();

          if (!result?.otherData) {
            // Si vino la respuesta pero `otherData` no existe o es null
            setErrorMessage("El trabajo no está disponible en este momento");
          } else {
            // Asignamos los datos
            setData(result.otherData);
            setJobDetails(result.jobDetails);

            // Recuperar título para el registro de visita
            const titleJob = result.otherData.title_job;

            const guardarVisita = async ({ title }) => {
              console.log(`Guardando visita para query: ${query}`);
              try {
                // Obtener ubicación del usuario (sin caché)
                const locationResponse = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
                if (locationResponse.ok) {
                  const locationData = await locationResponse.json();
                  const ip = locationData.ip;
                  const country_name = locationData.country_name;
                  const city = locationData.city;
                  console.log(`Datos de ubicación: IP=${ip}, País=${country_name}, Ciudad=${city}`);

                  // Guardar la visita
                  await fetch(`https://data.cumbre.icu/api/visit/${id}/${ip}/${country_name}/${city}/${title}`, {
                    cache: 'no-store'
                  });
                } else {
                  console.warn('No se pudo obtener la ubicación, usando valores predeterminados');
                  await fetch(`https://data.cumbre.icu/api/visit/${id}/0.0.0.0/0/0/${title}`, {
                    cache: 'no-store'
                  });
                }
              } catch (error) {
                console.error("Error al guardar la visita:", error);
              }
            };

            // Llamada sin await para no bloquear
            guardarVisita({ title: titleJob });
          }
        }
      } catch (error) {
        console.error("Error al obtener el job:", error);
        setErrorMessage("Hubo un problema cargando la información. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, query]);

  // Manejo de tema oscuro
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <div>
        <header className="fixed top-0 left-0 w-full py-4 px-6 bg-white dark:bg-[#0a0a0a] flex justify-between items-center z-20">
          <a href="https://buscador.cumbre.icu">
            <div className="flex items-center gap-2">
              <div className='bg-[url("/img/cumbre_logo_negro.png")] dark:bg-[url("/img/cumbre_logo.png")] bg-cover bg-center w-[100px] h-[30px]'></div>
              <span className="w-[2px] h-[15px] bg-black dark:bg-white hidden md:flex"></span>
              <div className="text-black dark:text-gray-300 text-sm hidden md:flex">
                <span>El buscador de empleos</span>
              </div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <div className="text-sm text-black dark:text-gray-400 hidden md:flex">
              <span>
                Con ❤️ desde <span className="text-black dark:text-white">Cúcuta</span>
              </span>
            </div>
            <a href="https://www.cumbre.icu/contacto">
              <button className="bg-gradient-to-r from-blue-600 to-pink-600 p-2 px-4 font-bold text-white rounded-full text-sm">
                Optener Ayuda
              </button>
            </a>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="pt-16 pb-[45px] px-6">
          <div className="search-results w-full lg:w-[80%] pb-10 pt-3 mx-auto rounded-lg">
            {/* 1. Loading */}
            {loading && (
              <div className='flex justify-center items-center h-24'>
                <div className="border-4 border-t-white dark:border-t-transparent border-black dark:border-white rounded-full h-7 w-7 animate-spin"></div>
              </div>
            )}

            {/* 2. Error */}
            {!loading && errorMessage && (
              <div className="mt-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-800 dark:to-red-950 border-2 border-red-200 dark:border-red-700 shadow-lg rounded-xl px-6 py-8 w-full sm:max-w-md mx-auto flex flex-col items-center text-center space-y-4">
                <h2 className="text-2xl text-red-600 dark:text-red-200 font-bold">
                  ¡Ups! Algo salió mal...
                </h2>

                <p className="text-red-800 dark:text-red-100">
                  {errorMessage}
                </p>

                <span className="text-red-700 dark:text-red-100 text-sm">
                  La URL
                  <code className="bg-red-200 dark:bg-red-700 px-1 py-0.5 rounded mx-1 text-red-800 dark:text-white">
                    {typeof window !== 'undefined' ? window.location.href : ''}
                  </code>
                  parece ser incorrecta. ¡Por favor, revísala o intenta con otra.
                </span>
              </div>
            )}

            {/* 3. Datos cargados exitosamente */}
            {!loading && !errorMessage && data && (
              <JobData data={data} jobDetails={jobDetails} />
            )}
          </div>
        </div>

        <Buscador query={query} />
      </div>
    </>
  );
}
