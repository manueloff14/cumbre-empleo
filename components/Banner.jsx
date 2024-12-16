"use client";

import { useState, useEffect } from "react";

const TIMER_DURATION = 15; // 30 segundos para la cuenta regresiva

const Banner = ({ setHasBannerBeenShown }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION); // Usar la constante TIMER_DURATION
    const [progress, setProgress] = useState(0); // Progreso de la cuenta regresiva
    const [isOnAdPage, setIsOnAdPage] = useState(true); // Estado para saber si el usuario está en la página del banner
    const [timerActive, setTimerActive] = useState(false); // Evitar múltiples temporizadores

    // Mostrar el banner cuando se hace scroll más del 50%
    useEffect(() => {
        const handleScroll = () => {
            const scrollPercentage =
                (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercentage > 0.5 && !showBanner) {
                setShowBanner(true); // Mostrar el banner cuando el 50% de la página ha sido desplazado
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [showBanner]);

    // Detectar cuando el usuario navega a otra página
    useEffect(() => {
        const handlePageChange = () => {
            setIsOnAdPage(false); // El usuario ha navegado a otra página
        };

        window.addEventListener("beforeunload", handlePageChange);

        return () => window.removeEventListener("beforeunload", handlePageChange);
    }, []);

    // Controlar la cuenta regresiva
    useEffect(() => {
        if (!isOnAdPage || !timerActive) return; // Si no estamos en la página del anuncio o si ya no hay un temporizador activo, no hacer nada

        const countdown = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0)); // Decrementar el tiempo, pero no ir por debajo de 0
            setProgress((prev) => Math.min(prev + 10, 100)); // Asegurarse de que el progreso no pase de 100%

            if (timeLeft === 1) { // Cuando llega a 0
                setShowCloseButton(true); // Mostrar el botón de cerrar
                clearInterval(countdown); // Detener el intervalo
            }
        }, 1000);

        setTimer(countdown); // Guardar el temporizador para poder limpiarlo más tarde

        return () => clearInterval(countdown); // Limpiar el intervalo cuando el componente se desmonte o cambie de página
    }, [timerActive, isOnAdPage, timeLeft]);

    // Función al hacer clic en el botón de ver anuncio
    const handleButtonClick = () => {
        if (timerActive) return; // Si ya hay un temporizador en marcha, no hacer nada

        // Abrir la URL en una nueva pestaña
        window.open("https://luglawhaulsano.net/4/8641456", "_blank");

        // Iniciar la cuenta regresiva cuando el usuario hace clic
        setShowCloseButton(false); // Deshabilitar el botón de cierre hasta que se inicie el temporizador
        setTimeLeft(TIMER_DURATION); // Reiniciar el temporizador a 30 segundos
        setProgress(0); // Reiniciar el progreso
        setTimerActive(true); // Marcar que el temporizador está activo
    };

    // Función para cerrar el banner
    const closeBanner = () => {
        clearInterval(timer); // Limpiar el temporizador si el usuario cierra el banner
        setShowBanner(false);
        setShowCloseButton(false);
        setTimeLeft(TIMER_DURATION); // Resetear el contador
        setProgress(0); // Resetear el progreso
        setTimerActive(false); // Desactivar el temporizador
        setHasBannerBeenShown(true); // Marcar que el banner ya se mostró
    };

    // Bloquear el scroll mientras el banner está visible
    useEffect(() => {
        if (showBanner) {
            document.body.style.overflow = "hidden"; // Bloquear el scroll
        } else {
            document.body.style.overflow = "auto"; // Restaurar el scroll cuando el banner se cierre
        }

        // Limpiar el estilo de overflow cuando el componente se desmonta
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showBanner]);

    if (!showBanner) return null; // No renderizar nada si el banner no debe mostrarse

    const ButtonVerAdd = (
        <button
            onClick={handleButtonClick}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
            Ver anuncio
        </button>
    );

    const ButtonCloseAdd = (
        <button
            onClick={closeBanner}
            className="w-full py-3 px-6 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
            Cerrar Anuncio
        </button>
    );

    return (
        <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-20 dark:bg-opacity-80 backdrop-blur-md text-black dark:text-white p-6 flex items-center justify-center z-[5000]">
            <div className="relative bg-gray-300 dark:bg-gray-900 p-8 rounded-3xl w-[90%] sm:w-[70%] lg:w-[50%] shadow-xl">
                {/* Botón de cierre */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Publicidad Patrocinada</h1>
                    {showCloseButton && (
                        <button
                            onClick={closeBanner}
                            className="text-3xl text-gray-400 hover:text-white focus:outline-none transition"
                        >
                            &times;
                        </button>
                    )}
                </div>

                {/* Mensaje explicativo */}
                <p className="text-sm lg:text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Estás viendo esta publicidad para ayudarnos a mejorar y ofrecerte un mejor servicio. Tu apoyo es clave para financiar nuestro contenido y mantenerlo gratuito para todos.
                </p>

                {/* Círculo de progreso con cuenta regresiva */}
                <div className="w-full flex justify-center text-white">
                    <div className="w-32 h-32 relative mb-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 rounded-full">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-semibold">{timeLeft}s</span>
                        </div>
                        <div className="absolute w-full h-full rounded-full border-4 border-gray-200 animate-spin-slow"></div>
                    </div>
                </div>

                {/* Mensaje de cuenta regresiva */}
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-6 text-center">
                    {showCloseButton ? 'Muchas gracias por ayudarnos :D' : 'Agradecemos enormemente que nos ayudes :D'}
                </p>

                {/* Botón de acción */}
                {showCloseButton ? ButtonCloseAdd : ButtonVerAdd}
            </div>
        </div>
    );
};

export default Banner;
