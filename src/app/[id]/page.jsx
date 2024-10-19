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

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`https://cumbre-server.onrender.com/api/job/${id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result.otherData);
          setJobDetails(result.jobDetails);
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

  return (
    <>
      <div>
        <header class="fixed top-0 left-0 w-full py-4 px-6 bg-[#0a0a0a] flex justify-between items-center z-20">
          <a href="https://cumbre.icu">
            <div className="flex items-center gap-2">
              <img
                src="/img/cumbre_logo.png"
                alt="Logo Cumbre"
                class="w-[110px]"
              />
              <span className="w-[2px] h-[15px] bg-white hidden md:flex"></span>
              <div className="text-gray-300 text-sm hidden md:flex">
                <span>El buscador de empleos</span>
              </div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400 hidden md:flex">
              <span>Con ❤️ desde <span className="text-white">Cúcuta</span></span>
            </div>
            <a href="">
              <button className="bg-gradient-to-r from-blue-600 to-pink-600 p-2 px-4 font-bold text-white rounded-full text-sm">
                Optener Ayuda
              </button>
            </a>
          </div>
        </header>
        {/* Mostrar resultados */}
        <div class="pt-16 pb-24 px-6">
          <div class="search-results w-full lg:w-[80%] pb-10 pt-3 mx-auto rounded-lg">
            {!loading && data ? (
              <JobData data={data} jobDetails={jobDetails} />
            ) : (
              <p>Cargando datos del trabajo...</p>
            )}
          </div>
        </div>
        <Buscador query={query} />
      </div>
    </>
  );
}
