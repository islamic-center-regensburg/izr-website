import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { iqamaTimesQueryOptions } from "@/api/collections/iqama-times/queries";
import { prayerTimesDetailQueryOptions } from "@/api/collections/prayer-times/queries";
import type { PrayerKey } from "../types";

export const EMPTY_VALUE = "—";

// `izr-cms` iqama rows use "jumuah" (not "jumah"), and the hook's own
// PrayerKey keeps the UI's existing "jumah" spelling for the Friday prayer.
const PRAYER_KEY_TO_COLLECTION_PRAYER: Record<PrayerKey, string> = {
	fajr: "fajr",
	dhuhr: "dhuhr",
	asr: "asr",
	maghrib: "maghrib",
	isha: "isha",
	jumah: "jumuah",
};

const WEEKDAYS = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
] as const;

export function usePrayerTimesData() {
	const { t, i18n } = useTranslation();
	const today = new Date();
	const todayDate = toIsoDate(today);
	const todayWeekday = WEEKDAYS[today.getDay()];

	const prayerTimesQuery = useQuery(prayerTimesDetailQueryOptions(todayDate));
	const iqamaQuery = useQuery(iqamaTimesQueryOptions());

	const prayerTimes = prayerTimesQuery.data;

	// Multiple iqama rows can exist for the same prayer+weekday
	// (izr-cms-discovery.md §5) — group by prayer so all of them display.
	const todaysIqamaByPrayer = new Map<string, typeof iqamaQuery.data>();
	for (const item of iqamaQuery.data ?? []) {
		if (item.weekday !== todayWeekday) continue;
		const existing = todaysIqamaByPrayer.get(item.prayer) ?? [];
		todaysIqamaByPrayer.set(item.prayer, [...existing, item]);
	}

	// Jumu'ah only ever happens on Friday, so — unlike every other
	// prayer — its iqama time isn't "today's"; it's always the
	// configured Friday time, shown every day of the week.
	const jumuahIqamas = (iqamaQuery.data ?? []).filter(
		(item) => item.prayer === "jumuah" && item.weekday === "friday",
	);

	const prayerTimeGetters: Record<PrayerKey, () => string> = {
		fajr: () => formatTime(prayerTimes?.fajr),
		dhuhr: () => formatTime(prayerTimes?.dhuhr),
		asr: () => formatTime(prayerTimes?.asr),
		maghrib: () => formatTime(prayerTimes?.maghrib),
		isha: () => formatTime(prayerTimes?.isha),
		// `jumuah` is only meaningful on Fridays; formatTime already falls
		// back to EMPTY_VALUE when it's null/missing on other days.
		jumah: () => formatTime(prayerTimes?.jumuah),
	};

	const getPrayerTime = (prayerKey: PrayerKey) =>
		prayerTimeGetters[prayerKey]?.() ?? EMPTY_VALUE;

	const getIqamaTimes = (prayerKey: PrayerKey): string[] => {
		const iqamas =
			prayerKey === "jumah"
				? jumuahIqamas
				: todaysIqamaByPrayer.get(PRAYER_KEY_TO_COLLECTION_PRAYER[prayerKey]);
		if (!iqamas || iqamas.length === 0) {
			return [];
		}

		return iqamas.map((iqama) => {
			if (iqama.type === "fixed") {
				return formatTime(iqama.fixed_time);
			}

			if (iqama.offset_minutes) {
				const basePrayerTime = getPrayerTime(prayerKey);
				if (basePrayerTime !== EMPTY_VALUE) {
					const calculated = addMinutesToTime(basePrayerTime, iqama.offset_minutes);
					if (calculated) {
						return calculated;
					}
				}

				const sign = iqama.offset_minutes >= 0 ? "+" : "";
				return `${sign}${Math.abs(iqama.offset_minutes)} min`;
			}

			return EMPTY_VALUE;
		});
	};

	// `prayer_times` has no `gregorian_date`/`shuruq` display fields (the
	// old backend's shape) — format them from `date`/`sunrise`. The Hijri
	// date comes from `prayer_times.hijri` ("YYYY-MM-DD" in the Hijri
	// calendar — the source of truth, not derived from the Gregorian
	// `date`) and is formatted with localized month names below.
	// `numberingSystem: "latn"` matches the rest of the app's date/time
	// formatting (see use-donation-formatters.ts) — plain digits even in
	// Arabic, rather than Intl's default Eastern Arabic-Indic numerals.
	const gregorianDate = prayerTimes
		? new Intl.DateTimeFormat(i18n.language, { dateStyle: "long", numberingSystem: "latn" }).format(
				new Date(`${prayerTimes.date}T00:00:00`),
			)
		: EMPTY_VALUE;
	const hijriDate = formatHijriDate(prayerTimes?.hijri, t);
	const shuruq = formatTime(prayerTimes?.sunrise);

	return {
		prayerTimes,
		gregorianDate,
		hijriDate,
		shuruq,
		getPrayerTime,
		getIqamaTimes,
		isLoading: prayerTimesQuery.isLoading || iqamaQuery.isLoading,
		error: prayerTimesQuery.error || iqamaQuery.error,
	};
}

function toIsoDate(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

// `prayer_times.hijri` stores "YYYY-MM-DD" in the Hijri calendar as plain
// digits (izr-cms-discovery.md §7's schema note) — not a value `Intl` can
// format, since it's independent of (not derived from) the Gregorian
// `date`. Render it with localized month names instead.
function formatHijriDate(
	hijri: string | null | undefined,
	t: (key: string) => string,
): string {
	if (!hijri) return EMPTY_VALUE;

	const [yearRaw, monthRaw, dayRaw] = hijri.split("-");
	const year = Number.parseInt(yearRaw ?? "", 10);
	const month = Number.parseInt(monthRaw ?? "", 10);
	const day = Number.parseInt(dayRaw ?? "", 10);
	if (!Number.isInteger(year) || month < 1 || month > 12 || !Number.isInteger(day)) {
		return hijri;
	}

	const monthName = t(`prayer_times.hijri_months.${month}`);
	return `${day} ${monthName} ${year}`;
}

// Utility functions
function formatTime(timeValue: string | null | undefined): string {
	if (!timeValue) return EMPTY_VALUE;

	const trimmedTime = timeValue.trim();
	const [hoursRaw, minutesRaw] = trimmedTime.split(":");
	const hours = Number.parseInt(hoursRaw ?? "", 10);
	const minutes = Number.parseInt(minutesRaw ?? "", 10);

	if (Number.isNaN(hours) || Number.isNaN(minutes)) {
		return trimmedTime;
	}

	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function addMinutesToTime(baseTime: string, offsetMinutes: number): string | null {
	const [hoursRaw, minutesRaw] = baseTime.split(":");
	const hours = Number.parseInt(hoursRaw ?? "", 10);
	const minutes = Number.parseInt(minutesRaw ?? "", 10);

	if (Number.isNaN(hours) || Number.isNaN(minutes)) {
		return null;
	}

	const totalMinutes = (hours * 60 + minutes + offsetMinutes + 24 * 60) % (24 * 60);
	const nextHours = Math.floor(totalMinutes / 60);
	const nextMinutes = totalMinutes % 60;

	return `${String(nextHours).padStart(2, "0")}:${String(nextMinutes).padStart(2, "0")}`;
}
