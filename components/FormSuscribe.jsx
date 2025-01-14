import { useState, useEffect } from "react";

export default function FormSuscribe({ isVisible, onClose }) {
    const [step, setStep] = useState(0);
    const [prevStep, setPrevStep] = useState(0);
    const [direction, setDirection] = useState("forward");
    const [departments, setDepartments] = useState([]); // Almacena los departamentos
    const [cities, setCities] = useState([]); // Almacena las ciudades del departamento seleccionado

    // Estado del formulario
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        interests: [],
        notificationFrequency: "",
        phone: "",
        email: "", // Nuevo campo para correo electrónico
    });

    // Estado para manejar errores
    const [error, setError] = useState("");

    const totalSteps = 7; // Incrementado a 7 pasos

    // Componente para mostrar mensajes de error
    const ErrorMessage = ({ message }) => {
        return message ? (
            <div className="bg-red-500 text-white font-bold text-sm mt-3 w-full p-3 rounded-xl flex items-center justify-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                >
                    <path
                        d="M43.326,19.879L27.805,4.609C26.738,3.559,25.331,2.994,23.829,3c-1.497,0.012-2.9,0.607-3.95,1.674L4.609,20.195	C3.56,21.262,2.988,22.674,3,24.171s0.607,2.9,1.674,3.95l15.521,15.27C21.251,44.43,22.645,45,24.125,45c0.016,0,0.031,0,0.047,0	c1.497-0.012,2.9-0.607,3.95-1.674l15.27-15.521c1.05-1.067,1.622-2.479,1.609-3.977S44.393,20.929,43.326,19.879z M22.5,14.499	c0-0.829,0.671-1.5,1.5-1.5s1.5,0.671,1.5,1.5v12c0,0.829-0.671,1.5-1.5,1.5s-1.5-0.671-1.5-1.5V14.499z M24,34.999	c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C26,34.103,25.105,34.999,24,34.999z"
                        fill="white"
                    ></path>
                </svg>
                {message}
            </div>
        ) : null;
    };

    // Manejo de inputs
    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(""); // Limpiar el error al cambiar un campo
    };

    // Manejo de intereses
    const handleInterestAdd = (e) => {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            const newInterest = e.target.value.trim();

            // Si ya hay 4 intereses, no permitir agregar más
            if (formData.interests.length >= 4) {
                setError("Solo puedes agregar un máximo de 4 intereses.");
                e.target.value = ""; // Limpiar el input
                return;
            }

            setFormData((prev) => ({
                ...prev,
                interests: [...prev.interests, newInterest],
            }));
            e.target.value = ""; // Limpiar el input
            setError(""); // Limpiar el error si se agrega correctamente
        }
    };

    const handleInterestRemove = (interest) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.filter((i) => i !== interest),
        }));
        setError(""); // Limpiar el error al remover un interés
    };

    // Función de validación por paso
    const validateStep = () => {
        switch (step) {
            case 0:
                if (!formData.name.trim()) {
                    return "El nombre es obligatorio.";
                }
                break;
            case 1:
                if (!formData.city) {
                    return "Seleccionar una ciudad es obligatorio.";
                }
                break;
            case 2:
                if (formData.interests.length < 1) {
                    return "Debes agregar al menos un interés.";
                }
                break;
            case 3:
                if (!formData.notificationFrequency) {
                    return "Seleccionar una frecuencia de notificación es obligatorio.";
                }
                break;
            case 4:
                if (!formData.email.trim()) {
                    return "El correo electrónico es obligatorio.";
                }
                // Validación básica de correo electrónico
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email.trim())) {
                    return "Ingresa un correo electrónico válido.";
                }
                break;
            case 5:
                if (!formData.phone.trim()) {
                    return "El número de teléfono es obligatorio.";
                }
                // Validar que solo contenga números y tenga una longitud adecuada
                const phoneRegex = /^[0-9]{7,15}$/;
                if (!phoneRegex.test(formData.phone.trim())) {
                    return "Ingresa un número de teléfono válido (7-15 dígitos).";
                }
                break;
            default:
                return "";
        }
        return "";
    };

    // Botón siguiente
    const handleNext = () => {
        const validationError = validateStep();
        if (validationError) {
            setError(validationError);
            return;
        }

        if (step < totalSteps - 1) {
            setPrevStep(step); // Guardamos cuál era el step “viejo”
            setDirection("forward");
            setStep((prev) => prev + 1);
        }
    };

    // Botón atrás
    const handleBack = () => {
        if (step > 0) {
            setPrevStep(step); // Guardamos cuál era el step “viejo”
            setDirection("back");
            setStep((prev) => prev - 1);
            setError(""); // Limpiar el error al retroceder
        }
    };

    const getSlideClass = (i) => {
        if (i !== step && i !== prevStep) {
            return "hidden";
        }
        if (i === step) {
            return direction === "forward"
                ? "animate-slideInFromRight z-20"
                : "animate-slideInFromLeft z-20";
        }
        if (i === prevStep) {
            return direction === "forward"
                ? "animate-slideOutToLeft z-10"
                : "animate-slideOutToRight z-10";
        }
    };

    const sendFormData = async (data) => {
        try {
            const response = await fetch(
                "https://data.cumbre.icu/api/suscribe",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                // Si el servidor devuelve un error (código 4xx o 5xx)
                throw new Error(
                    `:V Error del servidor: ${response.status} ${response.statusText}`
                );
            }

            // Si todo salió bien, mostrar alerta de éxito
            alert("¡Se ha registrado exitosamente!");
            onClose();
        } catch (error) {
            // Manejar cualquier error (red, conexión, servidor, etc.)
            alert(`:V ¡Error al enviar los datos: ${error.message}!`);
        }
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json"
                );
                const data = await response.json();
                setDepartments(data); // Guardar la lista de departamentos
            } catch (error) {
                console.error("Error al cargar los departamentos:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleDepartmentChange = (department) => {
        const selectedDept = departments.find(
            (d) => d.departamento === department
        );
        setCities(selectedDept ? selectedDept.ciudades : []);
        handleChange("city", ""); // Limpiar la selección de ciudad
    };

    // Renderizado por "cases"
    const renderStepContent = (i) => {
        switch (i) {
            case 0:
                return (
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            ¿Cómo te llamas?
                        </h2>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                            placeholder="Escribe tu nombre"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                                focus:ring-indigo-500 focus:border-indigo-500
                                dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <ErrorMessage message={error} />
                    </div>
                );
            case 1:
                return (
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            ¿De qué ciudad eres?
                        </h2>
                        {/* Selección de departamento */}
                        <select
                            onChange={(e) =>
                                handleDepartmentChange(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="">Selecciona tu departamento</option>
                            {departments.map((dept, index) => (
                                <option key={index} value={dept.departamento}>
                                    {dept.departamento}
                                </option>
                            ))}
                        </select>

                        {/* Selección de ciudad */}
                        <select
                            value={formData.city}
                            onChange={(e) =>
                                handleChange("city", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                                    focus:ring-indigo-500 focus:border-indigo-500
                                    dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 mt-3"
                        >
                            <option value="">Selecciona tu ciudad</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        <ErrorMessage message={error} />
                    </div>
                );
            case 2:
                return (
                    <div className="">
                        <h2 className="text-base lg:text-lg font-semibold text-gray-800 dark:text-white mb-1">
                            Intereses (máx. 4)
                        </h2>
                        <p className="text-sm mb-4">
                            Agrega tus intereses y presiona Enter.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {formData.interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="flex items-center bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-[11px] lg:text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {interest}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleInterestRemove(interest)
                                        }
                                        className="ml-2 text-gray-500 hover:text-red-500"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Ejemplo: Asesor comercial, Marketing digital"
                            onKeyDown={handleInterestAdd}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                                focus:ring-indigo-500 focus:border-indigo-500
                                dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <ErrorMessage message={error} />
                    </div>
                );
            case 3:
                return (
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            Frecuencia de notificaciones
                        </h2>
                        <select
                            value={formData.notificationFrequency}
                            onChange={(e) =>
                                handleChange(
                                    "notificationFrequency",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                                focus:ring-indigo-500 focus:border-indigo-500
                                dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="daily">Diariamente</option>
                            <option value="weekly">Semanalmente</option>
                            <option value="relevant">
                                Solo las relevantes
                            </option>
                        </select>
                        <ErrorMessage message={error} />
                    </div>
                );
            case 4:
                return (
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            ¿Cuál es tu correo electrónico?
                        </h2>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                handleChange("email", e.target.value)
                            }
                            placeholder="Escribe tu correo electrónico"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                                focus:ring-indigo-500 focus:border-indigo-500
                                dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <ErrorMessage message={error} />
                    </div>
                );
            case 5:
                return (
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            ¿Cuál es tu número de teléfono?
                        </h2>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                                // Permitir solo números
                                let sanitizedValue = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                );

                                // Limitar a 10 caracteres como máximo
                                if (sanitizedValue.length > 10) {
                                    sanitizedValue = sanitizedValue.slice(
                                        0,
                                        10
                                    );
                                }

                                handleChange("phone", sanitizedValue);
                            }}
                            onBlur={(e) => {
                                // Validar si el número tiene exactamente 10 dígitos
                                if (e.target.value.length !== 10) {
                                    alert(
                                        "El número debe tener exactamente 10 dígitos."
                                    );
                                }
                            }}
                            placeholder="Escribe tu número"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm
                            focus:ring-indigo-500 focus:border-indigo-500
                            dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <ErrorMessage message={error} />
                    </div>
                );
            case 6:
                return (
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                            ¡Únete a nuestro canal de WhatsApp!
                        </h2>
                        <p className="text-[12px] lg:text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Te mantendremos informado de las últimas vacantes y
                            noticias de Cumbre Empleos.
                        </p>
                        <a
                            href="https://whatsapp.com/channel/0029Vaxz8Bx0bIdleFi33r2h"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white font-semibold text-sm py-3 px-4
                                rounded-full hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png"
                                alt="WhatsApp"
                                className="w-[20px]"
                            />
                            Ir al Canal de WhatsApp
                        </a>
                    </div>
                );
            default:
                return <div>No hay contenido</div>;
        }
    };

    // Condicional de visibilidad
    if (!isVisible) {
        return null; // No renderizar nada si el modal está oculto
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 z-50"
            onClick={onClose} // Cerrar al hacer clic en el fondo
        >
            <div
                className="relative w-[90%] max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-5 border-[2px] border-gray-400 dark:border-gray-600"
                onClick={(e) => e.stopPropagation()} // Prevenir el cierre al hacer clic dentro del modal
            >
                <div className="flex items-center justify-between mb-4 text-xl font-bold">
                    <h3>Suscríbete a nuestro boletín</h3>
                    <button
                        onClick={onClose} // Cerrar al hacer clic en el botón
                        className="px-4 py-2 rounded-full bg-red-600 font-bold text-sm text-white"
                    >
                        Cerrar
                    </button>
                </div>

                {/* Barra de progreso */}
                <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                        Paso {step + 1} de {totalSteps}
                    </span>
                    <span className="text-gray-500 dark:text-gray-300">
                        {Math.floor(((step + 1) / totalSteps) * 100)}%
                    </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-5">
                    <div
                        className="bg-gradient-to-r from-[#ff007f] to-[#8000ff] h-2 rounded-full transition-all"
                        style={{
                            width: `${((step + 1) / totalSteps) * 100}%`,
                        }}
                    />
                </div>

                {/* Contenedor con posición relativa para las “slides” */}
                <div className="relative h-52 min-h-[10rem] mb-6 overflow-hidden">
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div
                            key={i}
                            className={`absolute top-0 left-0 w-full ${getSlideClass(
                                i
                            )}`}
                        >
                            {renderStepContent(i)}
                        </div>
                    ))}
                </div>

                {/* Botones de navegación */}
                <div className="flex justify-between">
                    {step > 0 ? (
                        <button
                            onClick={handleBack}
                            className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Atrás
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < totalSteps - 1 ? (
                        <button
                            onClick={handleNext}
                            className="bg-gradient-to-r from-[#ff007f] to-[#8000ff] text-white px-4 py-2 text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={async () => {
                                const finalError = validateStep();
                                if (finalError) {
                                    setError(finalError);
                                    return;
                                }
                                await sendFormData(formData); // Pasar los datos como argumento
                            }}
                            className="bg-blue-500 text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-blue-600 transition-colors"
                        >
                            Suscribirse
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
