import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/language-switcher";

function Navbar() {
	const { t } = useTranslation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ to: "/", label: t("nav.home") },
		{ to: "/about", label: t("nav.about") },
	];

	return (
		<header className="sticky top-4 z-50 px-4">
			<div className="container relative mx-auto">
				<nav className="h-20 flex items-center justify-between gap-4 rounded-full border border-border/30 bg-background/60 px-4 py-2 shadow-xs backdrop-blur-sm md:px-10">
					<Link to="/">
						<div className="flex items-center gap-3">
							<img
								className="h-16 w-16 rounded-full md:h-20 md:w-20"
								src="/IZR_LOGO_ROUND_WHITE_BG.png"
								alt="Islamic Center Regensburg logo"
							/>
							<div className="flex flex-col leading-tight">
								<span className="text-sm font-semibold md:text-base">
									{t("nav.title")}
								</span>
							</div>
						</div>
					</Link>
					<div className="hidden items-center gap-1 md:flex">
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

					<div className="flex items-center gap-2 md:hidden">
						<button
							type="button"
							onClick={() => setIsMobileMenuOpen((prev) => !prev)}
							aria-expanded={isMobileMenuOpen}
							aria-controls="mobile-nav-menu"
							aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground/90 backdrop-blur-sm transition-colors hover:bg-accent"
						>
							<span className="sr-only">Toggle menu</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<title>{isMobileMenuOpen ? "Close menu" : "Open menu"}</title>
								{isMobileMenuOpen ? (
									<path d="M18 6 6 18M6 6l12 12" />
								) : (
									<path d="M4 7h16M4 12h16M4 17h16" />
								)}
							</svg>
						</button>
					</div>
				</nav>

				{isMobileMenuOpen && (
					<div
						id="mobile-nav-menu"
						className="absolute left-0 right-0 top-full mt-3 rounded-3xl border border-border/30 bg-background/60 p-3 shadow-xs backdrop-blur-sm md:hidden"
					>
						<div className="flex flex-col gap-1">
							{navLinks.map((item) => (
								<Link
									key={item.to}
									to={item.to}
									onClick={() => setIsMobileMenuOpen(false)}
									className="rounded-2xl px-4 py-3 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
									activeProps={{ className: "bg-accent text-foreground" }}
								>
									{item.label}
								</Link>
							))}
							<div className="px-1 py-2">
								<LanguageSwitcher />
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
