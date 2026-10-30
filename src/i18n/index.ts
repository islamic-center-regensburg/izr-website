import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arAbout from "./locales/ar/about.json";
import arCommon from "./locales/ar/common.json";
import arDonation from "./locales/ar/donation.json";
import arFooter from "./locales/ar/footer.json";
import arHero from "./locales/ar/hero.json";
import arHome from "./locales/ar/home.json";
import arLinktree from "./locales/ar/linktree.json";
import arNav from "./locales/ar/nav.json";
import arPosts from "./locales/ar/posts.json";
import arPrayerTimes from "./locales/ar/prayer_times.json";
import deAbout from "./locales/de/about.json";
import deCommon from "./locales/de/common.json";
import deDonation from "./locales/de/donation.json";
import deFooter from "./locales/de/footer.json";
import deHero from "./locales/de/hero.json";
import deHome from "./locales/de/home.json";
import deLinktree from "./locales/de/linktree.json";
import deNav from "./locales/de/nav.json";
import dePosts from "./locales/de/posts.json";
import dePrayerTimes from "./locales/de/prayer_times.json";
import enAbout from "./locales/en/about.json";
import enCommon from "./locales/en/common.json";
import enDonation from "./locales/en/donation.json";
import enFooter from "./locales/en/footer.json";
import enHero from "./locales/en/hero.json";
import enHome from "./locales/en/home.json";
import enLinktree from "./locales/en/linktree.json";
import enNav from "./locales/en/nav.json";
import enPosts from "./locales/en/posts.json";
import enPrayerTimes from "./locales/en/prayer_times.json";

export type AppLocale = "de-DE" | "en-US" | "ar-SA";

const STORAGE_KEY = "izr_locale";

const resources = {
	de: {
		translation: {
			nav: deNav,
			hero: deHero,
			footer: deFooter,
			prayer_times: dePrayerTimes,
			posts: dePosts,
			donation: deDonation,
			home: deHome,
			about: deAbout,
			common: deCommon,
			linktree: deLinktree,
		},
	},
	en: {
		translation: {
			nav: enNav,
			hero: enHero,
			footer: enFooter,
			prayer_times: enPrayerTimes,
			posts: enPosts,
			donation: enDonation,
			home: enHome,
			about: enAbout,
			common: enCommon,
			linktree: enLinktree,
		},
	},
	ar: {
		translation: {
			nav: arNav,
			hero: arHero,
			footer: arFooter,
			prayer_times: arPrayerTimes,
			posts: arPosts,
			donation: arDonation,
			home: arHome,
			about: arAbout,
			common: arCommon,
			linktree: arLinktree,
		},
	},
} as const;

function detectInitialLanguage(): AppLocale {
	if (typeof window === "undefined") {
		return "de-DE";
	}

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "de-DE" || stored === "en-US" || stored === "ar-SA") {
		return stored;
	}

	const browserLanguage = window.navigator.language.toLowerCase();
	if (browserLanguage.startsWith("de-DE")) {
		return "de-DE";
	}
	if (browserLanguage.startsWith("ar-SA")) {
		return "ar-SA";
	}

	return "en-US";
}

void i18n.use(initReactI18next).init({
	resources,
	lng: detectInitialLanguage(),
	fallbackLng: "en-US",
	interpolation: {
		escapeValue: false,
	},
});

export const appLocales: AppLocale[] = ["de-DE", "en-US", "ar-SA"];
export { STORAGE_KEY };
export default i18n;
