import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CallToActionButton, CallToActionCard } from "./call-to-action-card";

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
	const { t } = useTranslation();
	const sanitizedHtml = useMemo(
		() => DOMPurify.sanitize(description),
		[description],
	);
	const plainText = useMemo(() => stripHtml(sanitizedHtml), [sanitizedHtml]);

	return (
		<Link
			to="/post/$id"
			params={{ id }}
			className="group block h-full min-w-0 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-donation-gold"
		>
			<CallToActionCard className="min-h-72">
				<h3 className="title-content text-2xl leading-snug font-semibold wrap-anywhere">
					{title}
				</h3>
				<p className="line-clamp-3 text-sm leading-relaxed text-white/85">
					{plainText}
				</p>
				<CallToActionButton asChild className="group-hover:bg-[#d9b752]">
					<span>
						{t("posts.read_more")}
						<ArrowRight aria-hidden="true" className="rtl:rotate-180" />
					</span>
				</CallToActionButton>
			</CallToActionCard>
		</Link>
	);
}

export default PostCard;
