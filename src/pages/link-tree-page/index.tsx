import { ExternalLink } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";
import BankTransferCard from "@/components/bank-transfer-card";
import SocialMedia from "@/pages/home-page/social-links";

type MainLink = {
	label: string;
	description: string;
	href: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
	isExternal?: boolean;
};

const mainLinks: MainLink[] = [
	// {
	//   label: "donation",
	//   description: "donation_desc",
	//   href: "#",
	//   Icon: HandHeart,
	//   isExternal: true,
	// },
];

function LinkTreePage() {
	const { t } = useTranslation();

	return (
		<section className="section relative overflow-hidden">
			<div className="relative mx-auto flex max-w-2xl flex-col items-center">
				{/* Avatar / Logo */}
				<div className="relative">
					<div className="absolute inset-0 rounded-full bg-foreground/10 blur-xl" />
					<img
						src="/izr-golden-logo.svg"
						alt="Logo"
						className="relative w-full"
					/>
				</div>

				{/* Title & Bio */}
				<h1 className="mt-5 text-center text-2xl font-bold text-foreground">
					{t("linktree.title")}
				</h1>
				<p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
					{t("linktree.subtitle")}
				</p>

				{/* Main Links */}
				<div className="mt-8 flex w-full flex-col gap-3">
					<BankTransferCard />

					{mainLinks.map(({ label, description, href, Icon, isExternal }) => (
						<a
							key={label}
							href={href}
							target={isExternal ? "_blank" : undefined}
							rel={isExternal ? "noreferrer" : undefined}
							className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-border/80 hover:bg-background/60 hover:shadow-lg"
						>
							{/* Shine effect */}
							<div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

							<div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background/40">
								<Icon
									className="size-6 text-foreground"
									strokeWidth={1.5}
									aria-hidden="true"
								/>
							</div>

							<div className="flex-1 text-start">
								<p className="font-semibold text-foreground">
									{t(`linktree.${label}`)}
								</p>
								<p className="text-xs text-muted-foreground">
									{t(`linktree.${description}`)}
								</p>
							</div>

							<ExternalLink
								className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground rtl:group-hover:-translate-x-1 rtl:rotate-180"
								strokeWidth={1.5}
								aria-hidden="true"
							/>
						</a>
					))}
				</div>

				{/* Divider */}
				<div className="my-8 flex w-full items-center gap-3">
					<div className="h-px flex-1 bg-border/60" />
					<span className="text-xs uppercase tracking-widest text-muted-foreground">
						{t("linktree.social")}
					</span>
					<div className="h-px flex-1 bg-border/60" />
				</div>

				{/* Social Media */}
				<SocialMedia variant="linktree" />

				{/* Footer */}
				<p className="mt-10 text-center text-xs text-muted-foreground">
					© {new Date().getFullYear()} {t("linktree.footer_text")}
				</p>
			</div>
		</section>
	);
}

export default LinkTreePage;
