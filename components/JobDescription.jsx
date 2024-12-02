import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

export default function JobDescription({ jobDescription }) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key' : '81de62cf173c21bf4c00f1c25d789f71',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "//www.highperformanceformat.com/81de62cf173c21bf4c00f1c25d789f71/invoke.js";
    document.body.appendChild(script2);

    return () => {
      // Limpiar los scripts cuando el componente se desmonte
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{jobDescription}</ReactMarkdown>
    </div>
  );
}
