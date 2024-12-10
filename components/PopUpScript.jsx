"use client"

import { useEffect, useState } from "react";

// Este componente se encarga de abrir un pop-up basado en el tiempo y el desplazamiento
const ClickPopupAdvanced = ({ url = "https://www.profitablecpmrate.com/i3xmafydrk?key=98edb28b00ff50f618d97908d27a238e", timeLimit = 5000, scrollLimit = 70, sessionLimit = 1 }) => {
    const [hasPopupShown, setHasPopupShown] = useState(false); // Para asegurarse de que el pop-up no se muestre más veces
    const [sessionCount, setSessionCount] = useState(0); // Para controlar la cantidad de veces que se abre en una sesión

    useEffect(() => {
        // Se asegura de que no se muestre más de la cantidad definida por sesión
        const sessionStorageKey = "popupSessionCount";
        const storedSessionCount = sessionStorage.getItem(sessionStorageKey);
        if (storedSessionCount) {
            setSessionCount(parseInt(storedSessionCount, 10));
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollPosition / docHeight * 100 > scrollLimit && !hasPopupShown) {
                // Mostrar pop-up cuando el usuario haya desplazado un porcentaje de la página
                showPopup();
            }
        };

        const handleTimeout = () => {
            if (!hasPopupShown && sessionCount < sessionLimit) {
                // Si el tiempo límite ha pasado y el pop-up no se ha mostrado
                showPopup();
            }
        };

        const showPopup = () => {
            // Abrir la ventana emergente solo una vez y solo si cumple con las condiciones
            setHasPopupShown(true);
            setSessionCount((prevCount) => {
                const newCount = prevCount + 1;
                sessionStorage.setItem(sessionStorageKey, newCount); // Guardar el número de veces que se ha mostrado en esta sesión
                return newCount;
            });
            window.open(url, "_blank"); // Abrir la ventana emergente
        };

        // Configurar temporizador para el tiempo límite
        const timeoutId = setTimeout(handleTimeout, timeLimit); // Después del tiempo definido (5 segundos por defecto)

        // Configurar el evento de scroll
        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timeoutId); // Limpiar el temporizador
            window.removeEventListener("scroll", handleScroll); // Limpiar el evento de scroll
        };
    }, [url, timeLimit, scrollLimit, sessionCount, hasPopupShown, sessionLimit]);

    return null; // Este componente no renderiza nada, solo maneja la lógica de pop-up
};

export default ClickPopupAdvanced;
