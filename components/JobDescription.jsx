import ReactMarkdown from 'react-markdown';

export default function JobDescription({ jobDescription }) {
    return (
        <div className="prose max-w-none dark:prose-invert">
            <ReactMarkdown>{jobDescription}</ReactMarkdown>
        </div>
    );
}
