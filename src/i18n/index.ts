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
				badge: "as-salamu alaykum",
				title: "Islamisches Zentrum Regensburg",
				subtitle:
					"Ein Ort für Gemeinschaft, Lernen und spirituelles Wachstum im Herzen von Regensburg.",
				cta: "Mehr erfahren",
			},
			footer: {
				copyright: "Islamisches Zentrum Regensburg. Alle Rechte vorbehalten",
				instagram: "Instagram",
				tiktok: "TikTok",
				facebook: "Facebook",
				email: "E-Mail",
				follow_us: "Folgen Sie uns",
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
					prayer_time: "Adhan",
					iqama_time: "Iqama",
				},
				names: {
					fajr: "Fajr",
					dhuhr: "Dhuhr",
					schuruq: "Schuruq",
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
				no_description: "Dieses Beitrag ist nicht verfügbar auf Deutsch.",
				attachments_title: "Anhänge",
				attachments_empty: "Keine Anhänge verfügbar.",
			},
			donation: {
				title: "Spenden",
				subtitle: "Unterstützen Sie unsere Moschee per Banküberweisung",
				description:
					"Mit Ihrer Spende helfen Sie uns, den Moscheebetrieb, Bildungsangebote und soziale Projekte aufrechtzuerhalten. Jeder Beitrag zählt.",
				fields: {
					iban: "IBAN",
					bic: "BIC",
					holder: "Kontoinhaber",
				},
				transfer_note:
					'Bitte geben Sie bei der Überweisung nach Möglichkeit den Verwendungszweck "Spende" an.',
			},
			home: {
				welcome: "Willkommen im Islamischen Zentrum Regensburg",
			},
			about: {
				title:
					"Willkommen im Islamischen Zentrum Regensburg (IZR) – Ar-Rahman-Moschee",
				paragraphs: {
					p1: "Das Islamische Zentrum Regensburg (IZR) – die Ar-Rahman-Moschee – ist seit vielen Jahren ein lebendiger Treffpunkt für Muslime und alle, die uns kennenlernen möchten. Mitten in Regensburg, in der <address>Alten Straubinger Straße 33, 93055 Regensburg</address>, haben wir ein Zuhause für Gebet, Begegnung und Gemeinschaft geschaffen.",
					p2: "Bei uns wird jeden Tag gemeinsam gebetet – Fajr, Dhuhr, Asr, Maghrib und Isha – und das Freitagsgebet bringt unsere Gemeinschaft regelmäßig zusammen. Neben den Gebeten organisieren wir Veranstaltungen, Bildungsangebote und Aktivitäten für Jung und Alt. Aktuelle Gebetszeiten, Neuigkeiten und Erinnerungen findest du jederzeit bequem in unserer App.",
					p3: "Uns ist Offenheit wichtig – nicht nur als Wort, sondern gelebt. Beim 'Tag der offenen Moschee' heißen wir alle Neugierigen herzlich willkommen: Schau rein, stell Fragen, komm ins Gespräch. Unsere Imame und das Team sind immer für dich da.",
					p4: "Einblicke in unser Leben und unsere Community gibt es auch auf Instagram:",
					p5: "Wir freuen uns auf dich – wann immer du kommst.",
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
					reservation: {
						label: "Raumreservierung",
						email: "n.bouzgarrou@iz-regensburg.de",
					},
				},
				website_text: "Weitere Informationen finden Sie auf unserer Website:",
			},
			common: {
				close: "Schließen",
				download: "Herunterladen",
				copy_success: "In die Zwischenablage kopiert",
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
				badge: "as-salamu alaykum",
				title: "Islamic Center Regensburg",
				subtitle:
					"A place for community, learning, and spiritual growth in the heart of Regensburg.",
				cta: "Learn more",
			},
			footer: {
				copyright: "Islamic Center Regensburg. All rights reserved",
				instagram: "Instagram",
				tiktok: "TikTok",
				facebook: "Facebook",
				email: "Email",
				follow_us: "Follow us",
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
					prayer_time: "Adhan",
					iqama_time: "Iqama",
				},
				names: {
					fajr: "Fajr",
					shuruq: "Shuruq",
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
				no_description: "This post is not available in English.",
				attachments_title: "Attachments",
				attachments_empty: "No attachments available.",
			},
			donation: {
				title: "Donations",
				subtitle: "Support our mosque by bank transfer",
				description:
					"Your donation helps us maintain the mosque, provide educational activities, and support community initiatives. Every contribution matters.",
				fields: {
					iban: "IBAN",
					bic: "BIC",
					holder: "Account Holder",
				},
				transfer_note:
					'When possible, please use "Donation" as the transfer reference.',
			},
			home: {
				welcome: "Welcome to the Islamic Center Regensburg",
			},
			about: {
				title:
					"Welcome to the Islamic Center Regensburg (IZR) – Ar-Rahman Mosque",
				paragraphs: {
					p1: "The Islamic Center Regensburg (IZR) – the Ar-Rahman Mosque – has long been a living, breathing home for Muslims and anyone curious to connect. Right in the heart of Regensburg, at <address>Alte Straubinger Straße 33, 93055 Regensburg</address>, we've built a place of prayer, warmth, and genuine community.",
					p2: "Every day we pray together — Fajr, Dhuhr, Asr, Maghrib, and Isha — and Jumu'ah brings our community together every Friday. Beyond prayers, we organize events, learning circles, and activities for all ages. Prayer times, news, and reminders are always just a tap away in our app.",
					p3: "Openness isn't just a value for us — it's something we live. On Open Mosque Day and beyond, we welcome everyone who's curious: come in, ask questions, have a conversation. Our imams and team are always happy to meet you where you are.",
					p4: "For a real glimpse into our community life, follow us on Instagram:",
					p5: "However and whenever you come — you're welcome here.",
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
					reservation: {
						label: "Room Reservation",
						email: "n.bouzgarrou@iz-regensburg.de",
					},
				},
				website_text: "More information is available on our website:",
			},
			common: {
				close: "Close",
				download: "Download",
				copy_success: "Copied to clipboard",
			},
		},
	},
	ar: {
		translation: {
			nav: {
				home: "الرئيسية",
				about: "حول",
				language: "اللغة",
				title: "المركز الإسلامي بريغنسبورغ",
			},
			hero: {
				badge: "السلام عليكم",
				title: "المركـــــز الإسلامي بريغنسبورغ",
				subtitle:
					"بيتٌ يجمع المسلمين في ريغنسبورغ، مكانٌ للعبادة، والعلم، والتآخي، وتنمية الإيمان، وتعزيز روح المجتمع في قلب المدينة",
				cta: "اعرف المزيد",
			},
			footer: {
				copyright: "المركز الإسلامي بريغنسبورغ. جميع الحقوق محفوظة",
				instagram: "إنستغرام",
				tiktok: "تيك توك",
				facebook: "فيسبوك",
				email: "البريد الإلكتروني",
				follow_us: "تابعونا",
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
					prayer_time: "الأذان",
					iqama_time: "الإقامة",
				},
				names: {
					fajr: "الفجر",
					shuruq: "الشروق",
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
				no_description: "هذا المنشور غير متاح باللغة العربية.",
				attachments_title: "المرفقات",
				attachments_empty: "لا توجد مرفقات متاحة.",
			},
			donation: {
				title: "التبرعات",
				subtitle: "ادعموا مسجدنا عبر التحويل البنكي",
				description:
					"يساعدنا تبرعكم في الحفاظ على المسجد، وتقديم الأنشطة التعليمية، ودعم المبادرات المجتمعية. كل مساهمة لها أثر.",
				fields: {
					iban: "رقم IBAN",
					bic: "رمز BIC",
					holder: "اسم صاحب الحساب",
				},
				transfer_note: 'يرجى كتابة "تبرع" كمرجع للتحويل قدر الإمكان.',
			},
			home: {
				welcome: "مرحبًا بكم في المركز الإسلامي بريغنسبورغ",
			},
			about: {
				title: "مرحبًا بكم في المركز الإسلامي بريغنسبورغ (IZR) – مسجد الرحمن",
				paragraphs: {
					p1: "المركز الإسلامي بريغنسبورغ (IZR) – مسجد الرحمن – منذ سنوات طويلة وهو بيتٌ دافئ يجمع المسلمين وكل من يرغب في التعرف علينا. في قلب ريغنسبورغ، في <address>Alte Straubinger Straße 33, 93055 Regensburg</address>، بنينا مكانًا للصلاة، واللقاء، والأخوّة الحقيقية.",
					p2: "نُقيم الصلوات الخمس يوميًا – الفجر والظهر والعصر والمغرب والعشاء – وتجمعنا صلاة الجمعة كل أسبوع في أجواء إيمانية مميزة. وإلى جانب الصلاة، ننظّم فعاليات ودروسًا وأنشطة للصغار والكبار على حدٍّ سواء. مواقيت الصلاة والأخبار والتذكيرات دائمًا في متناول يدك عبر تطبيقنا.",
					p3: "الانفتاح ليس شعارًا عندنا، بل أسلوب حياة. في يوم المسجد المفتوح وفي كل يوم، نرحب بكل من يريد أن يعرف، يسأل، ويتحاور. أئمتنا وفريقنا دائمًا هنا من أجلك.",
					p4: "لتعيش لحظات من حياتنا ومجتمعنا، تابعونا على إنستغرام:",
					p5: "مهما كان وقت زيارتك – أهلًا وسهلًا بك دائمًا.",
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
					reservation: {
						label: "حجز الغرف",
						email: "n.bouzgarrou@iz-regensburg.de",
					},
				},
				website_text: "لمزيد من المعلومات، تفضلوا بزيارة موقعنا:",
			},
			common: {
				close: "إغلاق",
				download: "تحميل",
				copy_success: "تم النسخ إلى الحافظة",
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
