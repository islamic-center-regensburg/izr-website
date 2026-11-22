import DOMPurify from "dompurify";
import { Calendar, MapPin } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CallToActionCard } from "@/components/call-to-action-card";
import { getAssetUrl } from "@/lib/directus-assets";
import { stripHtml } from "@/lib/strip-html";

interface EventCardProps {
	title: string;
	description: string;
	location?: string | null;
	startsAt: string;
	thumbnailId?: string | null;
}

function EventCard({ title, description, location, startsAt, thumbnailId }: EventCardProps) {
	const { i18n } = useTranslation();
	const sanitizedHtml = useMemo(() => DOMPurify.sanitize(description), [description]);
	const plainText = useMemo(() => stripHtml(sanitizedHtml), [sanitizedHtml]);
	const thumbnailUrl = getAssetUrl(thumbnailId, { width: 640, height: 480, fit: "cover" });

	const formattedDate = useMemo(() => {
		const date = new Date(startsAt);
		if (Number.isNaN(date.getTime())) return null;
		return new Intl.DateTimeFormat(i18n.language, {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(date);
	}, [startsAt, i18n.language]);

	return (
		<CallToActionCard thumbnailUrl={thumbnailUrl} className="min-h-72">
			<h3 className="title-content text-2xl leading-snug font-semibold wrap-anywhere">
				{title}
			</h3>
			{plainText && (
				<p className="line-clamp-3 text-sm leading-relaxed text-white/85">{plainText}</p>
			)}
			<div className="mt-auto space-y-1.5 text-sm text-white/90">
				{formattedDate && (
					<p className="flex items-center gap-2">
						<Calendar aria-hidden="true" className="size-4 shrink-0" />
						<span>{formattedDate}</span>
					</p>
				)}
				{location && (
					<p className="flex items-center gap-2">
						<MapPin aria-hidden="true" className="size-4 shrink-0" />
						<span className="line-clamp-1">{location}</span>
					</p>
				)}
			</div>
		</CallToActionCard>
	);
}

export default EventCard;
