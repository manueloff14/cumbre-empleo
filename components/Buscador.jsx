"use client";

import { useState, useEffect, useRef } from "react";
import { AutocompleteDesktop } from "./DesktopAutocomplete";
import { AutocompleteMobile } from "./MobileAutocomplete";

export default function Buscador({ query }) {
    // Estados locales
    const [inputValue, setInputValue] = useState(query);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);

    const debounceTimer = useRef(null);

    // Actualizar el input cuando la prop 'query' cambia
    useEffect(() => {
        setInputValue(query);
    }, [query]);

    // Detectar si el usuario prefiere modo oscuro
    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener("change", handleChange);
        return () => {
            darkModeMediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    // Detectar si la pantalla es móvil (max-width: 768px)
    useEffect(() => {
        const mobileQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mobileQuery.matches);

        const handleResize = (e) => {
            setIsMobile(e.matches);
        };
        mobileQuery.addEventListener("change", handleResize);
        return () => {
            mobileQuery.removeEventListener("change", handleResize);
        };
    }, []);

    // Manejo del estado del hash (#mobile) con popstate
    useEffect(() => {
        const handlePopState = () => {
            if (window.location.hash === "#mobile") {
                setShowAutocomplete(true);
            } else {
                setShowAutocomplete(false);
            }
        };

        // Escuchar cambios en el historial
        window.addEventListener("popstate", handlePopState);

        return () => {
            // Eliminar el listener al desmontar
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    // Actualizar URL al mostrar/ocultar autocomplete móvil
    useEffect(() => {
        const currentUrl = window.location.href.split("#")[0]; // Base de la URL sin hash
        if (showAutocomplete && isMobile) {
            // Agregar `#mobile` al mostrar el autocomplete móvil
            window.history.pushState(null, "", `${currentUrl}#mobile`);
        } else if (!showAutocomplete && isMobile) {
            // Eliminar `#mobile` al ocultar el autocomplete móvil
            window.history.replaceState(null, "", currentUrl);
        }
    }, [showAutocomplete, isMobile]);

    // Maneja el cambio de texto en el input con debounce
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowAutocomplete(true);

        // Limpiar el timer existente
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Solo hacer fetch si hay texto
        if (value.trim() !== "") {
            debounceTimer.current = setTimeout(() => {
                fetchGoogleXMLAutocomplete(value);
            }, 300);
        } else {
            setSuggestions([]);
        }
    };

    // Cuando el input obtiene foco
    const handleInputFocus = () => {
        setShowAutocomplete(true);
        if (inputValue.trim() !== "") {
            fetchGoogleXMLAutocomplete(inputValue);
        }
    };

    // Llamada a la API de Autocomplete (formato XML)
    const fetchGoogleXMLAutocomplete = async (input) => {
        try {
            const url = `/api/autocomplete?input=${encodeURIComponent(input)}`;
            const response = await fetch(url, {
                headers: {
                    Accept: "application/xml, text/xml, */*; q=0.01",
                    "Content-Type": "application/xml; charset=UTF-8",
                },
            });
            if (!response.ok) {
                throw new Error("Error al llamar a /api/autocomplete");
            }

            const arrayBuffer = await response.arrayBuffer();
            const decoder = new TextDecoder("utf-8");
            const xmlText = decoder.decode(arrayBuffer);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            const suggestionNodes = xmlDoc.getElementsByTagName("suggestion");
            const formattedSuggestions = [];

            for (let i = 0; i < suggestionNodes.length; i++) {
                const dataAttr = suggestionNodes[i].getAttribute("data");
                if (dataAttr) {
                    formattedSuggestions.push({ description: dataAttr });
                }
            }
            setSuggestions(formattedSuggestions);
        } catch (error) {
            console.error("Error parseando XML desde /api/autocomplete:", error);
            setSuggestions([]);
        }
    };

    // Acción de búsqueda normal
    const handleSearch = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;
        window.location.assign(
            `https://buscador.cumbre.icu/buscar?query=${encodeURIComponent(inputValue)}`
        );
    };

    return (
        <div
            className="fixed bottom-0 left-0 w-full flex flex-col items-center shadow-lg justify-center pb-3 pt-6 px-6 lg:px-0 bg-[linear-gradient(to_bottom,transparent_5%,white_95%)] dark:bg-[linear-gradient(to_bottom,transparent_5%,black_95%)] z-[1000]"
        >
            {/* Formulario de búsqueda */}
            <form
                onSubmit={handleSearch}
                className="
                    relative w-full lg:w-[50%] 
                    flex items-center 
                    bg-gray-200 dark:bg-gray-900 
                    rounded-full 
                    border-[2px] border-gray-300 dark:border-gray-800 
                    hover:border-gray-400 dark:hover:border-gray-600 
                    transition-all duration-200
                "
            >
                <input
                    name="query"
                    type="text"
                    autoComplete="off"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Buscar empleo por título, empresa o ubicación…"
                    className="
                        w-full pl-6 pr-2 py-4 
                        bg-transparent 
                        text-black dark:text-white 
                        border-none focus:outline-none
                    "
                />

                <button
                    className="
                        flex items-center justify-center 
                        p-3 m-1 mr-2 rounded-full 
                        hover:bg-gray-400 dark:hover:bg-gray-700 
                        transition-all duration-200
                    "
                    type="submit"
                >
                    {/* Icono de búsqueda */}
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                        <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" fill={isDarkMode ? 'white' : 'black'}></path>
                    </svg>
                </button>

                {/* Autocomplete */}
                {showAutocomplete && (
                    <>
                        {isMobile ? (
                            <AutocompleteMobile
                                suggestions={suggestions}
                                handleSelectSuggestion={(s) => {
                                    setInputValue(s.description);
                                    setShowAutocomplete(false);
                                }}
                                handleApplySuggestion={(s) => {
                                    setInputValue(s.description);
                                    setShowAutocomplete(false);
                                }}
                                handleInputChange={handleInputChange}
                                initialQuery={inputValue}
                                onClose={() => setShowAutocomplete(false)}
                                isMobile={isMobile}
                                isDarkMode={isDarkMode}
                            />
                        ) : (
                            <AutocompleteDesktop
                                suggestions={suggestions}
                                inputValue={inputValue}
                                handleSelectSuggestion={(s) => {
                                    setInputValue(s.description);
                                    setShowAutocomplete(false);
                                }}
                                handleApplySuggestion={(s) => {
                                    setInputValue(s.description);
                                    setShowAutocomplete(false);
                                }}
                                isDarkMode={isDarkMode}
                            />
                        )}
                    </>
                )}
            </form>
        </div>
    );
}
