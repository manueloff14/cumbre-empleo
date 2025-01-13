import { useState } from "react";
import BannerAds from "./ads/BannerAds";
import JobDescription from "./JobDescription";
import PanelLateral from "./PanelLateral";
import FormSuscribe from "./FormSuscribe"; // Importamos el componente

export default function JobData({ data, jobDetails, isExpired, isDarkMode }) {
    const [showForm, setShowForm] = useState(false); // Estado para controlar si se muestra el formulario

    const handleButtonClick = () => {
        setShowForm(true); // Mostramos el formulario al hacer clic
    };

    const handleCloseForm = () => {
        setShowForm(false); // Ocultamos el formulario
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 items-start py-3 pt-0">
            <ul className="flex flex-col gap-4 w-full lg:w-[60%]">
                {/* Condicional para mostrar el mensaje basado en isExpired */}
                {/* <div className="w-full">
                    {isExpired ? '' : <BannerAds isDarkMode={isDarkMode} />}
                </div> */}
                
                {/* Botón para mostrar el formulario */}
                {!showForm && (
                    <button
                        onClick={handleButtonClick} // Evento de clic para mostrar el formulario
                        className="text-sm w-full bg-gradient-to-r from-[#ff007f] to-[#8000ff] text-white font-bold py-3 rounded-full border-2 border-[#ffffff] dark:border-[#0a0a0a] hover:border-white transition duration-300 flex items-center justify-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <path d="M38.498 36H9.502c-1.205 0-2.31-.607-2.955-1.625S5.822 32.1 6.335 31.01L9 25.648v-6.267c0-8.239 6.271-14.987 14.277-15.364l0 0c4.151-.188 8.08 1.271 11.075 4.128C37.35 11.004 39 14.859 39 19v6.648l2.65 5.333c.527 1.119.448 2.377-.197 3.395S39.703 36 38.498 36zM23.348 5.516h.01H23.348zM18.09 38c.478 2.833 2.942 5 5.91 5s5.431-2.167 5.91-5H18.09z" fill="white"></path>
                        </svg>
                        Recibir vacantes personalizadas
                    </button>
                )}

                {/* Formulario de Suscripción */}
                <FormSuscribe isVisible={showForm} onClose={handleCloseForm} />

                {/* Descripción del Trabajo */}
                <JobDescription jobDescription={data.jobDescription} />
            </ul>
            <div className="w-full lg:w-[50%]">
                <PanelLateral data={data} jobDetails={jobDetails} />
            </div>
        </div>
    );
}
