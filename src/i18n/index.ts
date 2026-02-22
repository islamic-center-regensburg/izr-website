import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type AppLocale = "de" | "en" | "ar";

const STORAGE_KEY = "izr_locale";

const resources = {
	de: {
		translation: {
			nav: {
				home: "Startseite",
				about: "Über uns",
				language: "Sprache",
				title: "Islamisches Zentrum Regensburg",
			},
			hero: {
				badge: "Willkommen",
				title: "Islamisches Zentrum Regensburg",
				subtitle:
					"Ein Ort für Gemeinschaft, Lernen und spirituelles Wachstum im Herzen von Regensburg.",
				cta: "Mehr erfahren",
			},
			prayer_times: {
				title: "Gebetszeiten",
				subtitle: "Tägliche Gebets- und Iqama-Zeiten",
				loading: "Gebetszeiten werden geladen...",
				error: "Gebetszeiten konnten nicht geladen werden.",
				dates: {
					gregorian: "Gregorianisches Datum",
					hijri: "Hijri-Datum",
				},
				columns: {
					prayer: "Gebet",
					prayer_time: "Gebetszeit",
					iqama_time: "Iqama",
				},
				names: {
					fajr: "Fajr",
					dhuhr: "Dhuhr",
					asr: "Asr",
					maghrib: "Maghrib",
					isha: "Isha",
					jumah: "Jumah",
				},
			},
			posts: {
				title: "Aktuelle Beiträge",
				loading: "Beiträge werden geladen...",
				error: "Beiträge konnten nicht geladen werden.",
				empty: "Noch keine Beiträge verfügbar.",
				untitled: "Ohne Titel",
				no_description: "Keine Beschreibung verfügbar.",
				attachments_title: "Anhänge",
				attachments_empty: "Keine Anhänge verfügbar.",
			},
			home: {
				welcome: "Willkommen im Islamischen Zentrum Regensburg",
			},
			about: {
				title: "Über diese Webseite",
			},
		},
	},
	en: {
		translation: {
			nav: {
				home: "Home",
				about: "About",
				language: "Language",
				title: "Islamic Center of Regensburg",
			},
			hero: {
				badge: "Welcome",
				title: "Islamic Center Regensburg",
				subtitle:
					"A place for community, learning, and spiritual growth in the heart of Regensburg.",
				cta: "Learn more",
			},
			prayer_times: {
				title: "Prayer Times",
				subtitle: "Daily prayer and iqama schedule",
				loading: "Loading prayer times...",
				error: "Failed to load prayer times.",
				dates: {
					gregorian: "Gregorian Date",
					hijri: "Hijri Date",
				},
				columns: {
					prayer: "Prayer",
					prayer_time: "Prayer Time",
					iqama_time: "Iqama",
				},
				names: {
					fajr: "Fajr",
					dhuhr: "Dhuhr",
					asr: "Asr",
					maghrib: "Maghrib",
					isha: "Isha",
					jumah: "Jumu'ah",
				},
			},
			posts: {
				title: "Latest Posts",
				loading: "Loading posts...",
				error: "Failed to load posts.",
				empty: "No posts available yet.",
				untitled: "Untitled",
				no_description: "No description available.",
				attachments_title: "Attachments",
				attachments_empty: "No attachments available.",
			},
			home: {
				welcome: "Welcome to the Islamic Center Regensburg",
			},
			about: {
				title: "About this website",
			},
		},
	},
	ar: {
		translation: {
			nav: {
				home: "الرئيسية",
				about: "حول",
				language: "اللغة",
				title: "المركز الإسلامي في ريغنسبورغ",
			},
			hero: {
				badge: "مرحبًا بكم",
				title: "المركز الإسلامي في ريغنسبورغ",
				subtitle: "مكان للمجتمع والتعلم والنمو الروحي في قلب ريغنسبورغ.",
				cta: "اعرف المزيد",
			},
			prayer_times: {
				title: "مواقيت الصلاة",
				subtitle: "مواقيت الصلاة والإقامة اليومية",
				loading: "جارٍ تحميل المواقيت...",
				error: "تعذّر تحميل مواقيت الصلاة.",
				dates: {
					gregorian: "التاريخ الميلادي",
					hijri: "التاريخ الهجري",
				},
				columns: {
					prayer: "الصلاة",
					prayer_time: "وقت الصلاة",
					iqama_time: "الإقامة",
				},
				names: {
					fajr: "الفجر",
					dhuhr: "الظهر",
					asr: "العصر",
					maghrib: "المغرب",
					isha: "العشاء",
					jumah: "الجمعة",
				},
			},
			posts: {
				title: "أحدث المنشورات",
				loading: "جارٍ تحميل المنشورات...",
				error: "تعذّر تحميل المنشورات.",
				empty: "لا توجد منشورات متاحة بعد.",
				untitled: "بدون عنوان",
				no_description: "لا يوجد وصف متاح.",
				attachments_title: "المرفقات",
				attachments_empty: "لا توجد مرفقات متاحة.",
			},
			home: {
				welcome: "مرحبًا بكم في المركز الإسلامي في ريغنسبورغ",
			},
			about: {
				title: "حول هذا الموقع",
			},
		},
	},
} as const;

function detectInitialLanguage(): AppLocale {
	if (typeof window === "undefined") {
		return "de";
	}

	const stored = window.localStorage.getItem(STORAGE_KEY);
	if (stored === "de" || stored === "en" || stored === "ar") {
		return stored;
	}

	const browserLanguage = window.navigator.language.toLowerCase();
	if (browserLanguage.startsWith("de")) {
		return "de";
	}
	if (browserLanguage.startsWith("ar")) {
		return "ar";
	}

	return "en";
}

void i18n.use(initReactI18next).init({
	resources,
	lng: detectInitialLanguage(),
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export const appLocales: AppLocale[] = ["de", "en", "ar"];
export { STORAGE_KEY };
export default i18n;
