import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

type PostContent = {
	source: string;
	html: string;
	introduction: string;
	headings: { id: string; label: string }[];
};

export function usePostContent(source: string) {
	const [content, setContent] = useState<PostContent | null>(null);

	useEffect(() => {
		const document = new DOMParser().parseFromString(
			DOMPurify.sanitize(source, { FORBID_ATTR: ["style"] }),
			"text/html",
		);
		for (const node of document.querySelectorAll("p, li")) {
			if (
				!node.textContent?.trim() &&
				!node.querySelector("img, video, audio, iframe, table")
			) {
				node.remove();
			}
		}
		const first = document.body.firstElementChild;
		const introduction =
			first?.tagName === "BLOCKQUOTE" && first.textContent?.trim()
				? first.innerHTML
				: "";
		if (introduction) first?.remove();

		const usedIds = new Set(
			Array.from(document.querySelectorAll("[id]"), (node) => node.id),
		);
		const headings = Array.from(document.querySelectorAll("h2")).flatMap(
			(heading, index) => {
				const label = heading.textContent?.trim();
				if (!label) return [];
				if (!heading.id) {
					let id = `post-section-${index + 1}`;
					while (usedIds.has(id)) id += "-heading";
					heading.id = id;
					usedIds.add(id);
				}
				return [{ id: heading.id, label }];
			},
		);
		setContent({
			source,
			html: document.body.innerHTML,
			introduction,
			headings,
		});
	}, [source]);

	return content?.source === source ? content : null;
}
