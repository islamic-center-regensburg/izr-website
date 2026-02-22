import { Link } from "@tanstack/react-router";
import Markdown from "react-markdown";

interface PostCardProps {
	id: string;
	title: string;
	description: string;
}

function PostCard({ id, title, description }: PostCardProps) {
	return (
		<Link
			to="/post/$id"
			params={{ id }}
			className="block rounded-2xl border border-border/50 bg-background/40 p-5 shadow-xs transition-colors hover:bg-accent/30"
		>
			<h3 className="title-content text-lg font-semibold tracking-tight">
				{title}
			</h3>
			<div className="markdown-content mt-3 overflow-hidden text-sm text-muted-foreground [display:-webkit-box] [line-clamp:4] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
				<Markdown
					components={{
						p: ({ children }) => <span>{children} </span>,
						ul: ({ children }) => <span>{children}</span>,
						ol: ({ children }) => <span>{children}</span>,
						li: ({ children }) => <span>• {children} </span>,
						strong: ({ children }) => (
							<strong className="font-semibold text-foreground">
								{children}
							</strong>
						),
						em: ({ children }) => <em className="italic">{children}</em>,
						code: ({ children }) => (
							<code className="time-ltr rounded bg-accent/50 px-1 py-0.5 text-xs text-foreground">
								{children}
							</code>
						),
						br: () => <br />,
					}}
				>
					{description}
				</Markdown>
			</div>
		</Link>
	);
}

export default PostCard;
