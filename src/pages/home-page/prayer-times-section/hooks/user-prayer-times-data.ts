import { useQuery } from "@tanstack/react-query";
import { getPrayerIqamaQueryOptions } from "@/api/prayer_iqama/queries";
import { getPrayerTimesForMosqueQueryOptions } from "@/api/prayer_times/queries";
import { useMosque } from "@/contexts";
import type { PrayerKey } from "../types";
export const EMPTY_VALUE = "—";

export function usePrayerTimesData() {
	const { mosque, isLoading: isMosqueLoading } = useMosque();

	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();

	const prayerTimesQuery = useQuery(
		getPrayerTimesForMosqueQueryOptions({
			mosque_id: mosque?.id ?? "",
			query: { year, month, day, source: "stored" },
		}),
	);

	const iqamaQuery = useQuery(getPrayerIqamaQueryOptions(mosque?.id ?? ""));

	const prayerTimes = prayerTimesQuery.data?.[0];

	// Map prayer names to arrays of iqama times
	const iqamaByPrayer = new Map<PrayerKey, typeof iqamaQuery.data>();
	(iqamaQuery.data ?? []).forEach((item) => {
		const existing = iqamaByPrayer.get(item.prayer_name as PrayerKey) ?? [];
		iqamaByPrayer.set(item.prayer_name as PrayerKey, [...existing, item]);
	});

	const prayerTimeGetters: Record<PrayerKey, () => string> = {
		fajr: () => formatTime(prayerTimes?.fajr),
		dhuhr: () => formatTime(prayerTimes?.dhuhr),
		asr: () => formatTime(prayerTimes?.asr),
		maghrib: () => formatTime(prayerTimes?.maghrib),
		isha: () => formatTime(prayerTimes?.isha),
		jumah: () => EMPTY_VALUE,
	};

	const getPrayerTime = (prayerKey: PrayerKey) =>
		prayerTimeGetters[prayerKey]?.() ?? EMPTY_VALUE;

	const getIqamaTimes = (prayerKey: PrayerKey): string[] => {
		const iqamas = iqamaByPrayer.get(prayerKey);
		if (!iqamas || iqamas.length === 0) {
			return [];
		}

		return iqamas.map((iqama) => {
			if (iqama.mode === "fixed") {
				return formatTime(iqama.fixed_time);
			}

			if (iqama.offset_minutes) {
				const basePrayerTime = getPrayerTime(prayerKey);
				if (basePrayerTime !== EMPTY_VALUE) {
					const calculated = addMinutesToTime(
						basePrayerTime,
						iqama.offset_minutes,
					);
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

	return {
		prayerTimes,
		getPrayerTime,
		getIqamaTimes,
		isLoading:
			isMosqueLoading || prayerTimesQuery.isLoading || iqamaQuery.isLoading,
		error: prayerTimesQuery.error || iqamaQuery.error,
	};
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

function addMinutesToTime(
	baseTime: string,
	offsetMinutes: number,
): string | null {
	const [hoursRaw, minutesRaw] = baseTime.split(":");
	const hours = Number.parseInt(hoursRaw ?? "", 10);
	const minutes = Number.parseInt(minutesRaw ?? "", 10);

	if (Number.isNaN(hours) || Number.isNaN(minutes)) {
		return null;
	}

	const totalMinutes =
		(hours * 60 + minutes + offsetMinutes + 24 * 60) % (24 * 60);
	const nextHours = Math.floor(totalMinutes / 60);
	const nextMinutes = totalMinutes % 60;

	return `${String(nextHours).padStart(2, "0")}:${String(nextMinutes).padStart(2, "0")}`;
}
