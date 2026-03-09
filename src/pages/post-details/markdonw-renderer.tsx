import Markdown from "react-markdown";

function MarkdonwRenderer({ content }: { content: string }) {
	return (
		<Markdown
			components={{
				h1: ({ children }) => (
					<h2 className="mb-3 mt-5 text-2xl font-semibold text-foreground first:mt-0">
						{children}
					</h2>
				),
				h2: ({ children }) => (
					<h3 className="mb-2 mt-4 text-xl font-semibold text-foreground">
						{children}
					</h3>
				),
				p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
				ul: ({ children }) => (
					<ul className="mb-3 list-disc space-y-1 ps-6">{children}</ul>
				),
				ol: ({ children }) => (
					<ol className="mb-3 list-decimal space-y-1 ps-6">{children}</ol>
				),
				li: ({ children }) => <li>{children}</li>,
				strong: ({ children }) => (
					<strong className="font-semibold text-foreground">{children}</strong>
				),
				em: ({ children }) => <em className="italic">{children}</em>,
				code: ({ children }) => (
					<code className="time-ltr rounded bg-accent/50 px-1 py-0.5 text-sm text-foreground">
						{children}
					</code>
				),
				a: ({ href, children }) => (
					<a
						href={href}
						target="_blank"
						rel="noreferrer"
						className="time-ltr text-primary underline underline-offset-4"
					>
						{children}
					</a>
				),
			}}
		>
			{content}
		</Markdown>
	);
}

export default MarkdonwRenderer;
