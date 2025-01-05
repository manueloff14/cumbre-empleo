import { useRef } from "react";

export default function BannerAds({ isDarkMode }) {
    const products = [
        {
            id: 1,
            name: "Zapato Dama Cocido Personalizado",
            discountPercentage: 10,
            currentPrice: 75000,
            description: "Descripción breve del Product 1.",
            tallas: "35, 36, 37, 38, 39, 40",
            srcImg: "https://i.ibb.co/H4T9ctP/Whats-App-Image-2025-01-04-at-9-59-36-AM.jpg"
        },
        {
            id: 2,
            name: "Trio Morral Escolar con Ruedas",
            discountPercentage: 20,
            currentPrice: 110000,
            description: "Descripción breve del Product 4.",
            material: "Lona importada",
            srcImg: "https://i.ibb.co/K0kfkXb/Whats-App-Image-2025-01-04-at-10-00-54-AM.jpg"
        },
        {
            id: 3,
            name: "Zapato Dama Cocido Personalizado",
            discountPercentage: 10,
            currentPrice: 75000,
            description: "Descripción breve del Product 1.",
            tallas: "35, 36, 37, 38, 39, 40",
            srcImg: "https://i.ibb.co/RY9tf49/Whats-App-Image-2025-01-04-at-9-59-38-AM-1.jpg"
        },
        {
            id: 4,
            name: "Trio Morral Escolar con Ruedas",
            discountPercentage: 20,
            currentPrice: 110000,
            description: "Descripción breve del Product 4.",
            material: "Lona importada",
            srcImg: "https://i.ibb.co/8Bb1GXj/Whats-App-Image-2025-01-04-at-10-00-53-AM-1.jpg"
        },
        {
            id: 5,
            name: "Zapato Dama Cocido Personalizado",
            discountPercentage: 10,
            currentPrice: 75000,
            description: "Descripción breve del Product 1.",
            tallas: "35, 36, 37, 38, 39, 40",
            srcImg: "https://i.ibb.co/nghtBMS/Whats-App-Image-2025-01-04-at-9-59-38-AM.jpg"
        },
        {
            id: 6,
            name: "Trio Morral Escolar con Ruedas",
            discountPercentage: 20,
            currentPrice: 110000,
            description: "Descripción breve del Product 4.",
            material: "Lona importada",
            srcImg: "https://i.ibb.co/DzBnwwq/Whats-App-Image-2025-01-04-at-10-00-53-AM.jpg"
        }
    ];

    // Referencia para el contenedor con scroll
    const scrollContainerRef = useRef(null);

    // Funciones para desplazar la barra suavemente
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -210,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 210,
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
                                    marginRight: index === products.length - 1 ? 0 : "16px"
                                }}
                                className="h-[100px] border-[1px] border-gray-400 dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between cursor-pointer"
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
                                        className="flex items-center justify-center h-64"
                                        style={{ marginBottom: '10px' }}
                                    >
                                        <img
                                            src={product.srcImg}
                                            alt={product.name}
                                            className="max-h-full w-auto object-contain rounded-xl"
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
