import { useRef } from "react";

export default function BannerAds({ isDarkMode }) {
    const products = [
        {
            id: 1,
            name: "Audífonos Bluetooth Inalámbricos F9-5 con Diseño In-Ear - Color Negro",
            discountPercentage: 20,
            currentPrice: 35000,
            description: "Descripción breve del Product 4.",
            caracteristicas: [
                "Con micrófono incorporado.",
                "Con cancelación de ruido.",
                "Resistentes al agua."
            ],
            srcImg: "https://http2.mlstatic.com/D_NQ_NP_833098-MLU77721699939_072024-O.webp",
            envioGratis: true
        },
        {
            id: 2,
            name: "Cargador Rápido USB Tipo C - 100% Compatible y Eficiente",
            discountPercentage: 25,
            currentPrice: 40000,
            description: "Descripción breve del Product 1.",
            caracteristicas: [
                "Velocidad carga rápida",
                "Voltaje de entrada: 110V/220V",
                "Tipo de conector: USB/USB-C"
            ],
            srcImg: "https://http2.mlstatic.com/D_NQ_NP_636716-MCO77163947416_072024-O.webp",
            envioGratis: true
        },
        {
            id: 3,
            name: "Base Refrigerante con Cooler Consmo F528 para Portátiles",
            discountPercentage: 22,
            currentPrice: 45000,
            description: "Descripción breve del Product 4.",
            caracteristicas: [
                "Ventilador integrado.",
                "Luces azules modernas.",
                "Compatible hasta 17 pulgadas"
            ],
            srcImg: "https://http2.mlstatic.com/D_NQ_NP_773421-MCO49296444853_032022-O.webp",
            envioGratis: true
        },
        {
            id: 4,
            name: "Bolso Elegante para Mujer Manos Libres - Marca Karla Chacón, Color Negro",
            discountPercentage: 20,
            currentPrice: 95000,
            description: "Descripción breve del Product 4.",
            caracteristicas: [
                "Material externo sintético.",
                "Fabricación 100% vegana.",
                "Correa ajustable y removible."
            ],
            srcImg: "https://http2.mlstatic.com/D_NQ_NP_748353-MLU76331028879_052024-O.webp",
            envioGratis: true
        },
        {
            id: 5,
            name: "Power Bank 10,000 mAh con Carga Rápida 30W - USB Tipo C y Lightning, Color Negro",
            discountPercentage: 13,
            currentPrice: 155000,
            description: "Descripción breve del Product 4.",
            caracteristicas: [
                "Capacidad 10,000 mAh.",
                "Carga rápida 30W.",
                "Compatibilidad USB y TypeC."
            ],
            srcImg: "https://http2.mlstatic.com/D_NQ_NP_955522-MLU78491284045_082024-O.webp",
            envioGratis: true
        },
        {
            id: 6,
            name: "Audífonos Inalámbricos Bowmann BW-M10 TWS con Power Bank - Color Negro",
            discountPercentage: 22,
            currentPrice: 35000,
            description: "Descripción breve del Product 4.",
            caracteristicas: [
                "Asistente de voz integrado: Siri.",
                "Con micrófono incorporado.",
                "Posee 2 micrófonos integrados."
            ],
            srcImg: "https://http2.mlstatic.com/D_NQ_NP_878926-MLU71264088698_082023-O.webp",
            envioGratis: true
        }
    ];

    // Referencia para el contenedor con scroll
    const scrollContainerRef = useRef(null);

    // Funciones para desplazar la barra suavemente
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -190,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 190,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            <div
                style={{
                    background: "linear-gradient(to right, rgb(255, 208, 21), #FBBF24)", // Tonos más suaves
                    padding: "1rem", // Espacio interno ajustado
                    borderRadius: "1.5rem", // Bordes redondeados
                    marginBottom: "1rem", // Espaciado inferior
                    display: "flex", // Asegura alineación
                    alignItems: "center", // Centrado vertical
                    justifyContent: "center", // Centrado horizontal
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)", // Sombra sutil
                }}
            >
                <img
                    src="https://logodownload.org/wp-content/uploads/2018/10/mercado-libre-logo.png"
                    alt="Logo de MercadoLibre"
                    style={{
                        width: "120px", // Ajusta el tamaño
                    }}
                />
            </div>

            <div className="flex justify-between items-center mb-4 font-bold">
                <span>
                    Patrocinado
                </span>
                <div className="flex gap-3">
                    <button onClick={scrollLeft} style={{ transform: "rotate(180deg)" }} >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <path d="M 18.484375 2.984375 A 1.50015 1.50015 0 0 0 17.439453 5.5605469 L 35.878906 24 L 17.439453 42.439453 A 1.50015 1.50015 0 1 0 19.560547 44.560547 L 39.060547 25.060547 A 1.50015 1.50015 0 0 0 39.060547 22.939453 L 19.560547 3.4394531 A 1.50015 1.50015 0 0 0 18.484375 2.984375 z" fill={isDarkMode ? "white" : "black"}></path>
                        </svg>
                    </button>
                    <button onClick={scrollRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <path d="M 18.484375 2.984375 A 1.50015 1.50015 0 0 0 17.439453 5.5605469 L 35.878906 24 L 17.439453 42.439453 A 1.50015 1.50015 0 1 0 19.560547 44.560547 L 39.060547 25.060547 A 1.50015 1.50015 0 0 0 39.060547 22.939453 L 19.560547 3.4394531 A 1.50015 1.50015 0 0 0 18.484375 2.984375 z" fill={isDarkMode ? "white" : "black"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                className="no-scrollbar"
                style={{ width: "100%", overflowX: "auto" }}
            >

                {/* Contenedor con flex  */}
                <div
                    className=""
                    style={{ display: 'flex' }}
                >
                    {products.map((product, index) => {
                        // Calculamos el precio original en tiempo de ejecución
                        const originalPrice = product.currentPrice / (1 - product.discountPercentage / 100);

                        return (
                            <div
                                key={product.id}
                                style={{
                                    minWidth: "230px",
                                    // Agregamos paddingLeft excepto en el último
                                    marginRight: index === products.length - 1 ? 0 : "16px",
                                    overflow: 'visible'
                                }}
                                className="h-[100px] border-[1px] border-gray-400 dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-transform duration-300 ease-in-out relative"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(0.95)';
                                    e.currentTarget.style.borderColor = '#fff'; // Blanco
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = '';
                                    // Restablece el borde original (gris claro o el que uses por defecto)
                                    e.currentTarget.style.borderColor = '';
                                }}
                                onClick={() => {
                                    // Obtenemos la hora actual
                                    const hours = new Date().getHours();
                                    let greeting;

                                    // Asignamos el saludo dependiendo de la hora
                                    if (hours < 12) {
                                        greeting = "Buenos días";
                                    } else if (hours < 18) {
                                        greeting = "Buenas tardes";
                                    } else {
                                        greeting = "Buenas noches";
                                    }

                                    // Construimos el mensaje
                                    const message = `Hola, ${greeting}, me ha gustado el *"${product.name}"* con *ID: ${product.id}* que he visto en la página de *Cumbre Empleos*, deseo saber más información, gracias.`;

                                    // Codificamos el mensaje para la URL
                                    const encodedMessage = encodeURIComponent(message);

                                    // Abrimos WhatsApp en otra pestaña
                                    window.open(`https://wa.me/573507187007?text=${encodedMessage}`, "_blank");
                                }}
                                title={product.name}
                            >
                                <div>

                                    {/* Indicador de "Envío Gratis" flotante */}
                                    {product.envioGratis && (
                                        <div
                                            style={{
                                                background: "#FF5050", // Fondo rojo para destacar
                                                color: "#fff", // Texto blanco
                                                padding: "0.4rem 0.8rem", // Espaciado interno
                                                borderRadius: "1rem", // Bordes redondeados
                                                position: "absolute", // Posición flotante
                                                top: "1.3rem", // Desde la parte superior
                                                right: "1.3rem", // Desde la parte derecha
                                                fontSize: "0.75rem", // Tamaño del texto
                                                fontWeight: "bold", // Negrita
                                                zIndex: 1, // Asegura que esté encima de otros elementos
                                            }}
                                        >
                                            Envío Gratis
                                        </div>
                                    )}


                                    {/* Imagen del producto */}
                                    <div
                                        style={{
                                            width: '100%',       // ancho total
                                            height: '180px',     // altura fija (ajústalo a tu gusto)
                                            overflow: 'hidden',  // para que se recorte el contenido sobrante
                                            marginBottom: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <img
                                            src={product.srcImg}
                                            alt={product.name}
                                            style={{
                                                width: '100%',         // ocupa 100% del contenedor
                                                height: '100%',        // ocupa 100% del contenedor
                                                objectFit: 'cover',    // recorta vertical u horizontalmente
                                                objectPosition: 'center',
                                                borderRadius: '0.5rem',
                                            }}
                                        />
                                    </div>


                                    {/* Información del producto */}
                                    <div className="flex-1">
                                        <h3
                                            className="font-semibold mb-1"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {product.name}
                                        </h3>
                                        {
                                            product.brand && (
                                                <p className="text-sm text-gray-400">
                                                    Marca: {product.brand}
                                                </p>
                                            )
                                        }
                                        {
                                            product.tallas && (
                                                <p className="text-sm text-gray-400">
                                                    Tallas: {product.tallas}
                                                </p>
                                            )
                                        }
                                        {
                                            product.procedencia && (
                                                <p className="text-sm text-gray-400">
                                                    Procedencia: {product.procedencia}
                                                </p>
                                            )
                                        }
                                        {
                                            product.material && (
                                                <p className="text-sm text-gray-400">
                                                    Material: {product.material}
                                                </p>
                                            )
                                        }
                                        {
                                            product.caracteristicas && (
                                                /* habilitamos los puntos en la lista con styles in line */

                                                <ul className="text-xs text-gray-400" style={{ listStyle: 'disc', paddingLeft: '1rem' }}>
                                                    {product.caracteristicas.map((caracteristica, index) => (
                                                        <li key={index}>
                                                            {caracteristica}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        }
                                    </div>

                                    {/* Precios y descuento */}
                                    <div className="flex flex-col gap-4 my-3">
                                        <p className="text-sm line-through">
                                            <s className="text-gray-500">
                                                ${originalPrice.toLocaleString('es-ES', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </s>
                                            {' - '}
                                            <span className="font-bold">{product.discountPercentage}%</span>
                                        </p>
                                        <p className="text-2xl font-bold text-gray-200">
                                            ${product.currentPrice.toLocaleString('es-ES', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <button className="bg-gradient-to-r from-blue-600 to-pink-600 p-2 px-4 font-bold text-white rounded-full text-sm">
                                    ¡Comprar Ahora!
                                </button>
                            </div>
                        );
                    })}
                </div>
                <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            </div>
        </div>
    );
}
