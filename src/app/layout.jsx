import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics: Script de carga asincrónica */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RCP7TR5LLW"
          strategy="afterInteractive"
        />

        {/* Google Analytics: Configuración */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RCP7TR5LLW');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
