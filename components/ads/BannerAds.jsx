import { useRef } from "react";

export default function BannerAds({ isDarkMode }) {
    const products = [
        {
            id: 1,
            name: "Morral Acrílico Pequeño",
            discountPercentage: 22,
            currentPrice: 79900,
            description: "Descripción breve del Product 4.",
            material: "Lona de Alta Resistencia",
            srcImg: "https://i.ibb.co/HNn7JcY/IMG-20250106-WA0039.jpg"
        },
        {
            id: 2,
            name: "Bolso Mediano TOTTO Liso",
            discountPercentage: 25,
            currentPrice: 89900,
            description: "Descripción breve del Product 1.",
            procedencia: "Producto Importado 🇱🇷",
            srcImg: "https://i.ibb.co/B6znhqx/Whats-App-Image-2025-01-06-at-2-45-02-PM.jpg"
        },
        {
            id: 3,
            name: "Morral Acrílico Pequeño",
            discountPercentage: 22,
            currentPrice: 79900,
            description: "Descripción breve del Product 4.",
            material: "Lona de Alta Resistencia",
            srcImg: "https://i.ibb.co/r0cMpCb/IMG-20250106-WA0038.jpg"
        },
        {
            id: 4,
            name: "Morral Acrílico Pequeño",
            discountPercentage: 22,
            currentPrice: 79900,
            description: "Descripción breve del Product 4.",
            material: "Lona de Alta Resistencia",
            srcImg: "https://i.ibb.co/XL5vv4C/IMG-20250106-WA0037.jpg"
        },
        {
            id: 5,
            name: "Morral Acrílico Pequeño",
            discountPercentage: 22,
            currentPrice: 79900,
            description: "Descripción breve del Product 4.",
            material: "Lona de Alta Resistencia",
            srcImg: "https://i.ibb.co/7WrB9q6/IMG-20250106-WA0036.jpg"
        },
        {
            id: 6,
            name: "Morral Acrílico Pequeño",
            discountPercentage: 22,
            currentPrice: 79900,
            description: "Descripción breve del Product 4.",
            material: "Lona de Alta Resistencia",
            srcImg: "https://i.ibb.co/fpJ3Whb/IMG-20250106-WA0035.jpg"
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
                                    minWidth: "180px",
                                    // Agregamos paddingLeft excepto en el último
                                    marginRight: index === products.length - 1 ? 0 : "16px",
                                    overflow: 'visible'
                                }}
                                className="h-[100px] border-[1px] border-gray-400 dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-transform duration-300 ease-in-out"
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
                                    const message = `Hola, ${greeting}, me ha gustado el "${product.name}" con ID: ${product.id} que he visto en la página de Cumbre Empleos, deseo saber más información, gracias.`;

                                    // Codificamos el mensaje para la URL
                                    const encodedMessage = encodeURIComponent(message);

                                    // Abrimos WhatsApp en otra pestaña
                                    window.open(`https://wa.me/573507187007?text=${encodedMessage}`, "_blank");
                                }}
                                title={product.name}
                            >
                                <div>
                                    {/* Imagen del producto */}
                                    <div
                                        style={{
                                            width: '100%',       // ancho total
                                            height: '160px',     // altura fija (ajústalo a tu gusto)
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
