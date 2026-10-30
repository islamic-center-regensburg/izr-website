import { Facebook, Instagram, Mail, Music2 } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils"; // adjust if your path differs

type SocialLink = {
	label: string;
	href: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
	isExternal?: boolean;
};

const socialLinks: SocialLink[] = [
	{
		label: "instagram",
		href: "https://www.instagram.com/islamischeszentrumregensburg_?igsh=MXhmNTF6MGlnM3VnMg==",
		Icon: Instagram,
		isExternal: true,
	},
	{
		label: "tiktok",
		href: "https://www.tiktok.com/@islamischeszentrumrgbg?_r=1&_t=ZN-94Y7HXyU1NG",
		Icon: Music2,
		isExternal: true,
	},
	{
		label: "facebook",
		href: "https://www.facebook.com/share/1Znf4eZyN3/?mibextid=wwXIfr",
		Icon: Facebook,
		isExternal: true,
	},
	{
		label: "email",
		href: "mailto:vorstand@iz-regensburg.de",
		Icon: Mail,
	},
];

type Variant = "footer" | "linktree" | "theme";

type SocialMediaProps = {
	variant?: Variant;
	showTitle?: boolean;
	className?: string;
};

const variantStyles: Record<
	Variant,
	{
		title: string;
		link: string;
	}
> = {
	// Dark background (original footer style)
	footer: {
		title: "text-white/90",
		link: "border-white/25 bg-white/10 text-white hover:bg-white/20",
	},
	// Glass card inside a themed section (linktree)
	linktree: {
		title: "text-foreground",
		link: "border-border/40 bg-background/40 text-foreground backdrop-blur-md hover:border-border/80 hover:bg-background/60",
	},
	// Pure theme-aware (works in cards without blur)
	theme: {
		title: "text-foreground",
		link: "border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground",
	},
};

function SocialMedia({
	variant = "footer",
	showTitle = true,
	className,
}: SocialMediaProps) {
	const { t } = useTranslation();
	const styles = variantStyles[variant];

	const translatedLinks = socialLinks.map((link) => ({
		...link,
		label: t(`footer.${link.label}`),
	}));

	return (
		<div className={cn("w-full max-w-3xl px-4", className)}>
			{showTitle && (
				<p
					className={cn(
						"text-center text-sm font-semibold tracking-wide",
						styles.title,
					)}
				>
					{t("footer.follow_us")}
				</p>
			)}
			<div
				className={cn(
					"grid grid-cols-2 gap-2 sm:grid-cols-4",
					showTitle && "mt-3",
				)}
			>
				{translatedLinks.map(({ label, href, Icon, isExternal }) => (
					<a
						key={label}
						href={href}
						target={isExternal ? "_blank" : undefined}
						rel={isExternal ? "noreferrer" : undefined}
						aria-label={label}
						className={cn(
							"inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
							styles.link,
						)}
					>
						<Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
						<span>{label}</span>
					</a>
				))}
			</div>
		</div>
	);
}

export default SocialMedia;
