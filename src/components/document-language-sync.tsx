import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function DocumentLanguageSync() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const lang = i18n.resolvedLanguage ?? "en";
		document.documentElement.lang = lang;
		document.documentElement.dir = i18n.dir(lang);
	}, [i18n, i18n.resolvedLanguage]);

	return null;
}

export default DocumentLanguageSync;
