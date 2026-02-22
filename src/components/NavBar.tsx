import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/language-switcher";

function Navbar() {
	const { t } = useTranslation();

	const navLinks = [
		{ to: "/", label: t("nav.home") },
		{ to: "/about", label: t("nav.about") },
	];

	return (
		<header className="sticky top-4 z-50 px-4">
			<nav className="container mx-auto h-20 flex items-center justify-between  gap-4 rounded-full border border-border/30 bg-background/60 px-10 py-2 shadow-xs backdrop-blur-sm">
				<div className="flex items-center gap-3">
					<img
						className="h-20 w-20 rounded-full"
						src="/IZR_LOGO_ROUND_WHITE_BG.png"
						alt="Islamic Center Regensburg logo"
					/>
					<div className="flex flex-col leading-tight">
						<span className="font-semibold">{t("nav.title")}</span>
					</div>
				</div>
				<div className="flex items-center gap-1">
					{navLinks.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
							activeProps={{ className: "bg-accent text-foreground" }}
						>
							{item.label}
						</Link>
					))}
					<LanguageSwitcher />
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
