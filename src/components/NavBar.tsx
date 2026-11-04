import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/language-switcher";

const MotionLink = motion.create(Link);

function Navbar() {
	const { t } = useTranslation();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const reducedMotion = useReducedMotion();
	const expanded = isHovered || isFocused;
	const transition = reducedMotion
		? { duration: 0 }
		: { type: "spring" as const, stiffness: 240, damping: 26 };

	const navLinks = [
		{ to: "/", label: t("nav.home"), description: t("nav.descriptions.home") },
		{
			to: "/about",
			label: t("nav.about"),
			description: t("nav.descriptions.about"),
		},
		{
			to: "/linktree",
			label: t("nav.linktree"),
			description: t("nav.descriptions.linktree"),
		},
		{
			to: "/dashboard",
			label: t("nav.dashboard"),
			description: t("nav.descriptions.dashboard"),
		},
	];

	return (
		<header className="sticky top-4 z-50 h-20 shrink-0 px-4">
			<div className="container relative mx-auto h-20">
				<motion.nav
					initial={false}
					animate={expanded ? "expanded" : "rest"}
					variants={{
						rest: { height: 80 },
						expanded: { height: "var(--expanded-nav-height)" },
					}}
					transition={transition}
					onHoverStart={() => setIsHovered(true)}
					onHoverEnd={() => setIsHovered(false)}
					onFocusCapture={() => setIsFocused(true)}
					onBlurCapture={(event) => {
						if (!event.currentTarget.contains(event.relatedTarget))
							setIsFocused(false);
					}}
					className="absolute inset-x-0 top-0 flex h-20 items-center justify-between gap-4 rounded-[2.5rem] border border-border/30 bg-background/90 px-4 py-2 shadow-xs backdrop-blur-md [--expanded-nav-height:120px] lg:px-8 lg:[--expanded-nav-height:144px]"
				>
					<Link to="/">
						<div className="flex items-center gap-3">
							<motion.img
								transition={transition}
								variants={{ rest: { scale: 1 }, expanded: { scale: 1.25 } }}
								className="h-14 w-14 shrink-0 rounded-full lg:me-2 lg:h-20 lg:w-20"
								src="/IZR_LOGO_ROUND_WHITE_BG.png"
								alt="Islamic Center Regensburg logo"
							/>
							<div className="flex flex-col leading-tight">
								<span className="text-sm tatweel font-semibold lg:text-base">
									{t("nav.title")}
								</span>
								<motion.span
									aria-hidden={!expanded}
									variants={{
										rest: { height: 0, opacity: 0, y: -4 },
										expanded: { height: "auto", opacity: 1, y: 0 },
									}}
									transition={transition}
									className="max-w-64 overflow-hidden text-xs leading-relaxed text-muted-foreground"
								>
									<span className="block pt-2">{t("nav.tagline")}</span>
								</motion.span>
							</div>
						</div>
					</Link>
					<div className="hidden items-center gap-2 lg:flex">
						{navLinks.map((item) => (
							<MotionLink
								transition={transition}
								whileHover={reducedMotion ? undefined : { y: -4, scale: 1.07 }}
								whileTap={reducedMotion ? undefined : { scale: 0.97 }}
								key={item.to}
								to={item.to}
								className="min-w-0 rounded-2xl px-3 py-3 text-sm text-foreground/80 outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
								activeProps={{ className: "bg-accent text-foreground" }}
							>
								<motion.span
									variants={{
										rest: { fontSize: 14 },
										expanded: { fontSize: 16 },
									}}
									transition={transition}
									className="block font-medium"
								>
									{item.label}
								</motion.span>
								<motion.span
									aria-hidden={!expanded}
									variants={{
										rest: { height: 0, opacity: 0 },
										expanded: { height: "auto", opacity: 1 },
									}}
									transition={transition}
									className="block max-w-32 overflow-hidden text-xs leading-relaxed text-muted-foreground"
								>
									<span className="block pt-1.5">{item.description}</span>
								</motion.span>
							</MotionLink>
						))}
						<LanguageSwitcher />
					</div>

					<div className="flex shrink-0 items-center gap-2 lg:hidden">
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
				</motion.nav>

				{isMobileMenuOpen && (
					<motion.div
						id="mobile-nav-menu"
						initial={false}
						animate={{ top: expanded ? 120 : 80 }}
						transition={transition}
						className="absolute left-0 right-0 mt-3 rounded-3xl border border-border/30 bg-background/90 p-3 shadow-xs backdrop-blur-md lg:hidden"
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
								<LanguageSwitcher onSwitch={() => setIsMobileMenuOpen(false)} />
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
