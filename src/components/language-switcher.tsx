import { Check, ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type AppLocale, appLocales, STORAGE_KEY } from "@/i18n";

const LANGUAGE_NAMES: Record<AppLocale, string> = {
	"en-US": "English",
	"de-DE": "Deutsch",
	"ar-SA": "العربية",
};

function LanguageSwitcher({ onSwitch }: { onSwitch?: () => void }) {
	const { i18n, t } = useTranslation();
	const selectedLanguage = (i18n.resolvedLanguage ?? "en-US") as AppLocale;

	const handleLanguageChange = async (locale: AppLocale) => {
		await i18n.changeLanguage(locale);
		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, locale);
		}
		onSwitch?.();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="inline-flex h-10 items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 text-sm font-medium transition-colors hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring"
				aria-label={t("nav.language")}
			>
				<Languages className="h-4 w-4 opacity-70" />
				<span>{LANGUAGE_NAMES[selectedLanguage]}</span>
				<ChevronDown className="h-4 w-4 opacity-50" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[150px]">
				{appLocales.map((locale) => (
					<DropdownMenuItem
						key={locale}
						onClick={() => handleLanguageChange(locale)}
						className="flex items-center justify-between gap-4 cursor-pointer"
					>
						<span>{LANGUAGE_NAMES[locale]}</span>
						{locale === selectedLanguage && (
							<Check className="h-4 w-4 text-primary" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default LanguageSwitcher;
