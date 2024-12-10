import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cargando la vacante",
  description: "Cargando la vacante",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* <meta name="yandex-verification" content="c5813a86fdb6a392" /> */}
        {/* Incluir script externo */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D54LGRR265"
        ></script>
        {/* Incluir script inline */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-D54LGRR265');
            `,
          }}
        ></script>
        <meta name="monetag" content="0e36d4ac78c415595124f07b72e2faa3" />
        <script src="https://alwingulla.com/88/tag.min.js" data-zone="116701" async data-cfasync="false"></script>
        {/* Incluir el script de jq_show1 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function jq_show1() {
                var script1 = document.createElement("script");
                script1.type = "text/javascript";
                script1.src = "https://o-oo.ooo/js/yxup.js";

                var done1 = false;
                script1.onload = script1.onreadystatechange = function () {
                  if (!done1 && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done1 = true;

                    // Obtener dimensiones y posición de la ventana
                    window.yx_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    window.yx_h = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) + 30;
                    window.yx_l = window.screenX || window.screenLeft;
                    window.yx_t = window.screenY || window.screenTop;

                    // Crear y configurar el segundo script
                    var script2 = document.createElement("script");
                    script2.type = "text/javascript";
                    script2.text = \`
                      yXpop.config({ safe: true });
                      yXpop.Cookie.remove('yXpop0');
                      yXpop.add('https://www.profitablecpmrate.com/i3xmafydrk?key=98edb28b00ff50f618d97908d27a238e', {
                        under: false,
                        newTab: false,
                        width: \${window.yx_w},
                        height: \${window.yx_h},
                        top: \${window.yx_t},
                        left: \${window.yx_l}
                      });
                    \`;
                    document.head.appendChild(script2);
                  }
                };

                // Agregar el script principal al documento
                document.head.appendChild(script1);
              })();

              // Inicializar si no ha sido definido previamente
              if (typeof window.yxlp === "undefined") {
                window.yxlp = true;
                jq_show1();
              }
            `,
          }}
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
