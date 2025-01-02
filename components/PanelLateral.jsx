"use client"

import { useState, useEffect } from "react";

export default function PanelLateral({ data, jobDetails }) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <div className="p-4 border-[1px] border-gray-300 dark:border-gray-500 rounded-3xl mt-3 lg:mt-0">
            <div className="border-b-[1px] border-gray-300 dark:border-gray-500 w-full flex flex-col items-center mb-3 pb-3">
                {/* poner la imagen jobDetails.img_empresa y si no está disponible poner "https://www.elempleo.com/resources/Content/dist/images/areas/JobsOffers/JobOfferDetail/icono-empresa-confidencial.jpg" */}
                <img src={jobDetails.img_empresa || "https://www.elempleo.com/resources/Content/dist/images/areas/JobsOffers/JobOfferDetail/icono-empresa-confidencial.jpg"} alt="" className="rounded-lg w-32 border-[1px] border-gray-300 dark:border-transparent bg-white" />
                <h2 className="my-2 mb-1 font-bold text-lg text-center">{data.company}</h2>
                <span className="text-sm" >{jobDetails.area}</span>
            </div>
            <div>

                <div className="flex flex-col items-start">
                    <a href={`https://${jobDetails.fuente}`}>
                        <div className="text-xs flex items-center gap-2 p-3 rounded-full border-[1px] border-gray-300 dark:border-gray-700 w-auto text-blue-700 dark:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 48 48">
                                <path d="M 24 4 C 15.81 4 8.7599219 8.94 5.6699219 16 L 9.0097656 16 C 10.906787 12.451375 14.036384 9.6594901 17.816406 8.1757812 C 16.507609 10.210641 15.469773 12.891594 14.810547 16 L 17.869141 16 C 19.149141 10.46 21.67 7 24 7 C 26.33 7 28.850859 10.46 30.130859 16 L 33.189453 16 C 32.530227 12.891594 31.492391 10.210641 30.183594 8.1757812 C 33.963616 9.6594901 37.093213 12.451375 38.990234 16 L 42.330078 16 C 39.240078 8.94 32.19 4 24 4 z M 14.638672 18.027344 A 1.250125 1.250125 0 0 0 13.464844 19.103516 L 12.642578 24.261719 L 11.146484 20.804688 A 1.250125 1.250125 0 0 0 8.8535156 20.804688 L 7.3574219 24.261719 L 6.5351562 19.103516 A 1.250125 1.250125 0 0 0 5.3300781 18.033203 A 1.250125 1.250125 0 0 0 4.0664062 19.496094 L 5.5664062 28.896484 A 1.250125 1.250125 0 0 0 7.9472656 29.195312 L 10 24.447266 L 12.052734 29.195312 A 1.250125 1.250125 0 0 0 14.433594 28.896484 L 15.933594 19.496094 A 1.250125 1.250125 0 0 0 14.638672 18.027344 z M 28.638672 18.027344 A 1.250125 1.250125 0 0 0 27.464844 19.103516 L 26.642578 24.261719 L 25.146484 20.804688 A 1.250125 1.250125 0 0 0 22.853516 20.804688 L 21.357422 24.261719 L 20.535156 19.103516 A 1.250125 1.250125 0 0 0 19.330078 18.033203 A 1.250125 1.250125 0 0 0 18.066406 19.496094 L 19.566406 28.896484 A 1.250125 1.250125 0 0 0 21.947266 29.195312 L 24 24.447266 L 26.052734 29.195312 A 1.250125 1.250125 0 0 0 28.433594 28.896484 L 29.933594 19.496094 A 1.250125 1.250125 0 0 0 28.638672 18.027344 z M 42.638672 18.027344 A 1.250125 1.250125 0 0 0 41.464844 19.103516 L 40.642578 24.261719 L 39.146484 20.804688 A 1.250125 1.250125 0 0 0 36.853516 20.804688 L 35.357422 24.261719 L 34.535156 19.103516 A 1.250125 1.250125 0 0 0 33.330078 18.033203 A 1.250125 1.250125 0 0 0 32.066406 19.496094 L 33.566406 28.896484 A 1.250125 1.250125 0 0 0 35.947266 29.195312 L 38 24.447266 L 40.052734 29.195312 A 1.250125 1.250125 0 0 0 42.433594 28.896484 L 43.933594 19.496094 A 1.250125 1.250125 0 0 0 42.638672 18.027344 z M 5.6699219 32 C 8.7599219 39.06 15.81 44 24 44 C 32.19 44 39.240078 39.06 42.330078 32 L 38.990234 32 C 37.093213 35.548625 33.963616 38.34051 30.183594 39.824219 C 31.492391 37.789359 32.530227 35.108406 33.189453 32 L 30.130859 32 C 28.850859 37.54 26.33 41 24 41 C 21.67 41 19.149141 37.54 17.869141 32 L 14.810547 32 C 15.469773 35.108406 16.507609 37.789359 17.816406 39.824219 C 14.036384 38.34051 10.906787 35.548625 9.0097656 32 L 5.6699219 32 z" fill={isDarkMode ? 'white' : 'black'}></path>
                            </svg>
                            {jobDetails.fuente}
                        </div>
                    </a>
                </div>

                <div className="text-sm space-y-2 my-3">
                    <div>
                        <span>Título: <span className="text-gray-500 dark:text-gray-300">{data.title_job}</span></span>
                    </div>
                    <div>
                        <span>Empresa: <span className="text-gray-500 dark:text-gray-300">{data.company}</span></span>
                    </div>
                    <div>
                        <span>Salario: <span className="text-gray-500 dark:text-gray-300">{jobDetails.salary || "No especificado"}</span></span>
                    </div>
                    <div>
                        <span>Ubicación: <span className="text-gray-500 dark:text-gray-300">{data.location || "No especificado"}</span></span>
                    </div>
                    <div>
                        <span>Fecha de publicación: <span className="text-gray-500 dark:text-gray-300">{jobDetails.date_pub || "No especificado"}</span></span>
                    </div>
                    <div>
                        <span>Fecha de vencimiento: <span className="text-gray-500 dark:text-gray-300">{jobDetails.date_ven || "No especificado"}</span></span>
                    </div>
                    <div>
                        <span>Tipo de contrato: <span className="text-gray-500 dark:text-gray-300">{data.contrato || "No especificado"}</span></span>
                    </div>
                    <div>
                        <span>Horario: <span className="text-gray-500 dark:text-gray-300">{data.horario || "No especificado"}</span></span>
                    </div>
                </div>

                <a href={data.job_url} target="_blank" rel="noopener noreferrer">
                    <button className="flex gap-3 items-center justify-center p-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-900 w-full text-sm border-[1px] border-gray-300 dark:border-gray-600">
                        Aplicar ahora
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z" fill={isDarkMode ? 'white' : 'black'}></path>
                        </svg>
                    </button>
                </a>
            </div>
        </div>
    )
}