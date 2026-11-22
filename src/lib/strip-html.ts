/**
 * Strips HTML tags from a rich-text string (e.g. Directus WYSIWYG content),
 * returning plain text for use in previews/excerpts. Always sanitize the
 * HTML (e.g. with DOMPurify) before passing it here.
 */
export function stripHtml(html: string): string {
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
