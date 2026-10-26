import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { useMemo } from "react";

interface PostCardProps {
	id: string;
	title: string;
	description: string;
}

function stripHtml(html: string): string {
	if (typeof window === "undefined") {
		// SSR fallback: regex strip
		return html
			.replace(/<[^>]*>/g, " ")
			.replace(/\s+/g, " ")
			.trim();
	}
	const tmp = document.createElement("div");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}

function PostCard({ id, title, description }: PostCardProps) {
	const sanitizedHtml = useMemo(
		() => DOMPurify.sanitize(description),
		[description],
	);
	const plainText = useMemo(() => stripHtml(sanitizedHtml), [sanitizedHtml]);

	return (
		<Link
			to="/post/$id"
			params={{ id }}
			className="block rounded-2xl border border-border/50 bg-background/40 p-5 shadow-xs transition-colors hover:bg-accent/30"
		>
			<h3 className="title-content text-lg font-semibold tracking-tight">
				{title}
			</h3>
			<p className="mt-3 line-clamp-3 text-sm text-foreground">{plainText}</p>
		</Link>
	);
}

export default PostCard;
