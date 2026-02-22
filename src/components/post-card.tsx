import { Link } from "@tanstack/react-router";

interface PostCardProps {
	id: string;
	title: string;
	description: string;
}

function truncateText(text: string, maxLength: number) {
	if (text.length <= maxLength) {
		return text;
	}

	return `${text.slice(0, maxLength).trim()}...`;
}

function PostCard({ id, title, description }: PostCardProps) {
	return (
		<Link
			to="/post/$id"
			params={{ id }}
			className="block rounded-2xl border border-border/50 bg-background/40 p-5 shadow-xs transition-colors hover:bg-accent/30"
		>
			<h3 className="text-lg font-semibold tracking-tight">{title}</h3>
			<p className="mt-3 text-sm text-muted-foreground">
				{truncateText(description, 140)}
			</p>
		</Link>
	);
}

export default PostCard;
