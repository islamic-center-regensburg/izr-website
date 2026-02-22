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
				title:
					"Willkommen im Islamischen Zentrum Regensburg (IZR) – Ar-Rahman-Moschee",
				paragraphs: {
					p1: "Seit vielen Jahren ist das Islamische Zentrum Regensburg (IZR) ein wichtiger Treffpunkt und ein Herzstück der muslimischen Gemeinde in Regensburg. Unsere Moschee befindet sich in der <address>Alten Straubinger Straße 33, 93055 Regensburg</address>.",
					p2: "Unser Zentrum setzt sich aktiv für die Förderung der islamischen Religion, Kultur und Traditionen ein. Neben den täglichen Gebeten – darunter Fajr, Dhuhr, Asr, Maghrib und Isha – bieten wir zahlreiche religiöse, kulturelle und gemeinschaftliche Aktivitäten an. Die aktuellen Gebetszeiten sowie Neuigkeiten und wichtige Erinnerungen können Sie bequem über unsere App abrufen.",
					p3: "Ein besonderes Anliegen ist uns der offene Dialog und das gegenseitige Kennenlernen. Beim „Tag der offenen Moschee“ heißen wir alle Interessierten herzlich willkommen, unseren Glaubensalltag kennenzulernen, Fragen zu stellen und mit uns ins Gespräch zu kommen. Unsere Imame und Verantwortlichen stehen Ihnen dabei jederzeit gerne zur Verfügung.",
					p4: "Bleiben Sie informiert und folgen Sie uns auf Instagram unter",
					p5: "Gemeinsam beten, lernen und feiern wir in einer offenen und respektvollen Gemeinschaft – jeder ist bei uns jederzeit herzlich willkommen.",
				},
				instagram_text:
					"Bleiben Sie informiert und folgen Sie uns auf Instagram unter",
				contact_title: "Kontakt",
				contacts: {
					first_chairman: {
						label: "Erster Vorstand",
						email: "h.elouadhane@iz-regensburg.de",
					},
					board: {
						label: "Vorstand",
						email: "vorstand@iz-regensburg.de",
					},
					it: {
						label: "App / Website / IT",
						email: "mohamed.bellil@iz-regensburg.de",
					},
					rental: {
						label: "Raumvermietung",
						email: "n.bouzgarrou@iz-regensburg.de",
					},
				},
				website_text: "Weitere Informationen finden Sie auf unserer Website:",
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
				title:
					"Welcome to the Islamic Center Regensburg (IZR) – Ar-Rahman Mosque",
				paragraphs: {
					p1: "For many years, the Islamic Center Regensburg (IZR) has been an important meeting point and a central part of the Muslim community in Regensburg. Our mosque is located at <address>Alte Straubinger Straße 33, 93055 Regensburg</address>.",
					p2: "Our center is actively committed to promoting Islamic religion, culture, and traditions. In addition to the daily prayers — including Fajr, Dhuhr, Asr, Maghrib, and Isha — we offer many religious, cultural, and community activities. Current prayer times, news, and important reminders are available conveniently through our app.",
					p3: "Open dialogue and mutual understanding are especially important to us. During the “Open Mosque Day,” we warmly welcome everyone interested in learning about our daily religious life, asking questions, and having conversations with us. Our imams and responsible team members are always happy to assist you.",
					p4: "Stay informed and follow us on Instagram at",
					p5: "Together we pray, learn, and celebrate in an open and respectful community — everyone is always warmly welcome.",
				},
				instagram_text: "Stay informed and follow us on Instagram at",
				contact_title: "Contact",
				contacts: {
					first_chairman: {
						label: "First Chairman",
						email: "h.elouadhane@iz-regensburg.de",
					},
					board: {
						label: "Board",
						email: "vorstand@iz-regensburg.de",
					},
					it: {
						label: "App / Website / IT",
						email: "mohamed.bellil@iz-regensburg.de",
					},
					rental: {
						label: "Room Rental",
						email: "n.bouzgarrou@iz-regensburg.de",
					},
				},
				website_text: "More information is available on our website:",
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
				title: "مرحبًا بكم في المركز الإسلامي في ريغنسبورغ (IZR) – مسجد الرحمن",
				paragraphs: {
					p1: "منذ سنوات عديدة، يُعد المركز الإسلامي في ريغنسبورغ (IZR) نقطة لقاء مهمة وقلبًا نابضًا للجالية المسلمة في ريغنسبورغ. يقع مسجدنا في <address>Alte Straubinger Straße 33, 93055 Regensburg</address>.",
					p2: "يلتزم مركزنا بشكل فعّال بدعم الدين الإسلامي والثقافة والتقاليد الإسلامية. وإلى جانب الصلوات اليومية — الفجر والظهر والعصر والمغرب والعشاء — نقدم العديد من الأنشطة الدينية والثقافية والمجتمعية. كما يمكنكم الاطلاع بسهولة على مواقيت الصلاة الحالية والأخبار والتذكيرات المهمة عبر تطبيقنا.",
					p3:
						"يهمّنا بشكل خاص الحوار المفتوح والتعارف المتبادل. وفي " +
						"يوم المسجد المفتوح" +
						" نرحب بجميع المهتمين للتعرف على حياتنا الإيمانية اليومية، وطرح الأسئلة، والتحاور معنا. أئمتنا والمسؤولون لدينا على استعداد دائم لخدمتكم بكل سرور.",
					p4: "ابقوا على اطلاع وتابعونا على إنستغرام عبر",
					p5: "نصلي ونتعلم ونحتفل معًا في مجتمع منفتح ومحترم — الجميع مرحب بهم لدينا في كل وقت.",
				},
				instagram_text: "ابقوا على اطلاع وتابعونا على إنستغرام عبر",
				contact_title: "التواصل",
				contacts: {
					first_chairman: {
						label: "الرئيس الأول",
						email: "h.elouadhane@iz-regensburg.de",
					},
					board: {
						label: "مجلس الإدارة",
						email: "vorstand@iz-regensburg.de",
					},
					it: {
						label: "التطبيق / الموقع / تقنية المعلومات",
						email: "mohamed.bellil@iz-regensburg.de",
					},
					rental: {
						label: "تأجير القاعة",
						email: "n.bouzgarrou@iz-regensburg.de",
					},
				},
				website_text: "لمزيد من المعلومات، تفضلوا بزيارة موقعنا:",
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
