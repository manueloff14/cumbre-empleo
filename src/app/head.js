// app/head.js

export default function Head() {
    return (
        <>
            {/* Google tag (gtag.js) */}
            <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-D54LGRR265"
            ></script>
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
        </>
    );
}
