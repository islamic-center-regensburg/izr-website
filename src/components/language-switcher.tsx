import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type AppLocale, appLocales, STORAGE_KEY } from "@/i18n";

function LanguageSwitcher() {
	const { i18n, t } = useTranslation();
	const selectedLanguage = (i18n.resolvedLanguage ?? "en") as AppLocale;

	const handleLanguageChange = async (nextLanguage: string) => {
		const locale = nextLanguage as AppLocale;
		await i18n.changeLanguage(locale);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, locale);
		}
	};

	return (
		<div>
			<span className="sr-only">{t("nav.language")}</span>
			<Select value={selectedLanguage} onValueChange={handleLanguageChange}>
				<SelectTrigger
					className="h-10 rounded-full border-border/50 bg-background/70 px-3"
					aria-label={t("nav.language")}
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{appLocales.map((locale) => (
						<SelectItem key={locale} value={locale}>
							{locale.toUpperCase()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export default LanguageSwitcher;
