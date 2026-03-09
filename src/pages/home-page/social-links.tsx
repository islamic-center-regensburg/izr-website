import { Facebook, Instagram, Mail, Music2 } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";

type SocialLink = {
	label: string;
	href: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
	isExternal?: boolean;
};

const socialLinks: SocialLink[] = [
	{
		label: "instagram",
		href: import.meta.env.VITE_INSTAGRAM_LINK,
		Icon: Instagram,
		isExternal: true,
	},
	{
		label: "tiktok",
		href: import.meta.env.VITE_TIKTOK_LINK,
		Icon: Music2,
		isExternal: true,
	},
	{
		label: "facebook",
		href: import.meta.env.VITE_FACEBOOK_LINK,
		Icon: Facebook,
		isExternal: true,
	},
	{
		label: "email",
		href: `mailto:${import.meta.env.VITE_EMAIL_ADDRESS}`,
		Icon: Mail,
	},
];

function SocialMedia() {
	const { t } = useTranslation();
	const translatedLinks = socialLinks.map((link) => ({
		...link,
		label: t(`footer.${link.label}`),
	}));
	return (
		<div className="w-full max-w-3xl px-4">
			<p className="text-center text-sm font-semibold tracking-wide text-white/90">
				{t("footer.follow_us")}
			</p>
			<div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
				{translatedLinks.map(({ label, href, Icon, isExternal }) => (
					<a
						key={label}
						href={href}
						target={isExternal ? "_blank" : undefined}
						rel={isExternal ? "noreferrer" : undefined}
						aria-label={label}
						className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
					>
						<Icon className="size-4" aria-hidden="true" />
						<span>{label}</span>
					</a>
				))}
			</div>
		</div>
	);
}

export default SocialMedia;
