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

  const [data, setData] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`https://data.cumbre.icu/api/job/${id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result.otherData);
          setJobDetails(result.jobDetails);

          // Recuperar título para el registro de visita
          const titleJob = result.otherData.title_job;

          // Obtener la IP, país y ciudad
          const locationResponse = await fetch('https://ipapi.co/json/');
          if (locationResponse.ok) {
            const locationData = await locationResponse.json();
            const ip = locationData.ip;
            const country_name = locationData.country_name;
            const city = locationData.city;

            // Registrar visita
            await fetch(`https://data.cumbre.icu/api/visit/${id}/${ip}/${country_name}/${city}/${titleJob}`);
          } else {
            console.error("Error al obtener la información de ubicación");
          }
        } else {
          console.error("Job no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

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
              <img
                src={isDarkMode ? "/img/cumbre_logo.png" : "/img/cumbre_logo_negro.png"}
                alt="Logo Cumbre"
                className="w-[110px]"
              />
              <span className="w-[2px] h-[15px] bg-black dark:bg-white hidden md:flex"></span>
              <div className="text-black dark:text-gray-300 text-sm hidden md:flex">
                <span>El buscador de empleos</span>
              </div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <div className="text-sm text-black dark:text-gray-400 hidden md:flex">
              <span>Con ❤️ desde <span className="text-black dark:text-white">Cúcuta</span></span>
            </div>
            <a href="https://www.cumbre.icu/contacto">
              <button className="bg-gradient-to-r from-blue-600 to-pink-600 p-2 px-4 font-bold text-white rounded-full text-sm">
                Optener Ayuda
              </button>
            </a>
          </div>
        </header>
        {/* Mostrar resultados */}
        <div className="pt-16 pb-24 px-6">
          <div className="search-results w-full lg:w-[80%] pb-10 pt-3 mx-auto rounded-lg">
            {!loading && data ? (
              <JobData data={data} jobDetails={jobDetails} />
            ) : (
              <p>Cargando datos de la vacante...</p>
            )}
          </div>
        </div>
        <Buscador query={query} />
      </div>
    </>
  );
}
