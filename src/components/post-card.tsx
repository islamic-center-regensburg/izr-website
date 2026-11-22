import { Link } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getAssetUrl } from "@/lib/directus-assets";
import { stripHtml } from "@/lib/strip-html";
import { CallToActionButton, CallToActionCard } from "./call-to-action-card";

interface PostCardProps {
	slug: string;
	title: string;
	description: string;
	thumbnailId?: string | null;
}

function PostCard({ slug, title, description, thumbnailId }: PostCardProps) {
	const { t } = useTranslation();
	const sanitizedHtml = useMemo(
		() => DOMPurify.sanitize(description),
		[description],
	);
	const plainText = useMemo(() => stripHtml(sanitizedHtml), [sanitizedHtml]);
	const thumbnailUrl = getAssetUrl(thumbnailId, { width: 640, height: 480, fit: "cover" });

	return (
		<Link
			to="/post/$slug"
			params={{ slug }}
			className="group block h-full min-w-0 rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-donation-gold"
		>
			<CallToActionCard thumbnailUrl={thumbnailUrl} className="min-h-72">
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
