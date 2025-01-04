import localFont from "next/font/local";
import "./globals.css";
import LayoutBanner from "../../components/LayoutBanner";
/* import ClickPopupAdvanced from "../../components/PopUpScript"; */

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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* <LayoutBanner /> */}

        {/* <ClickPopupAdvanced /> */}
      </body>
    </html>
  );
}
