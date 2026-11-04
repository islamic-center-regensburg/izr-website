import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export function useDonationFormatters() {
	const { i18n } = useTranslation();
	return useMemo(
		() => ({
			currency: new Intl.NumberFormat(i18n.language, {
				numberingSystem: "latn",
				style: "currency",
				currency: "EUR",
				maximumFractionDigits: 2,
				minimumFractionDigits: 0,
			}),
			dates: new Intl.DateTimeFormat(i18n.language, {
				numberingSystem: "latn",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
			percent: new Intl.NumberFormat(i18n.language, {
				numberingSystem: "latn",
				style: "percent",
				maximumFractionDigits: 2,
			}),
		}),
		[i18n.language],
	);
}
