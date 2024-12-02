import ReactMarkdown from 'react-markdown';

export default function JobDescription({ jobDescription }) {
    return (
        <>
            <script type="text/javascript">
            	atOptions = {
            		'key' : '81de62cf173c21bf4c00f1c25d789f71',
            		'format' : 'iframe',
            		'height' : 90,
            		'width' : 728,
            		'params' : {}
            	};
            </script>
            <script type="text/javascript" src="//www.highperformanceformat.com/81de62cf173c21bf4c00f1c25d789f71/invoke.js"></script>
            <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown>{jobDescription}</ReactMarkdown>
            </div>
        </>
    );
}
