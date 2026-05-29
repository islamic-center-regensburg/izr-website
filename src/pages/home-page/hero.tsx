import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

function Hero() {
	const { t } = useTranslation();
	return (
		<section className="flex items-center justify-center overflow-hidden">
			<div className="relative mx-auto max-w-3xl text-center">
				<p className="mb-4 inline-flex rounded-full border border-border/60 bg-background/70 px-4 py-1 text-sm text-foreground">
					{t("hero.badge")}
				</p>
				<h1 className="text-primary text-balance inline-flex flex-wrap items-center justify-center gap-3 text-4xl font-bold tracking-tight sm:text-7xl">
					<img src="/white-mosque.png" alt="Hero Background" className="w-50" />
					<span>{t("hero.title")}</span>
				</h1>
				<p className="mx-auto tatweel mt-5 max-w-2xl text-pretty text-base text-foreground sm:text-lg">
					{t("hero.subtitle")}
				</p>

				<div className="mt-8 flex justify-center">
					<Link
						to="/about"
						className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
					>
						{t("hero.cta")}
					</Link>
				</div>
			</div>
		</section>
	);
}

export default Hero;
