import { useTranslation } from "react-i18next";
import { PrayerCard } from "./components/prayer-card";
import { SectionHeader } from "./components/section-header";
import { ErrorState, LoadingState } from "./components/states";
import {
	EMPTY_VALUE,
	usePrayerTimesData,
} from "./hooks/user-prayer-times-data";
import type { PrayerKey } from "./types";

const PRAYER_ORDER: PrayerKey[] = [
	"fajr",
	"dhuhr",
	"asr",
	"maghrib",
	"isha",
	"jumah",
];

function PrayerTimesSection() {
	const { t } = useTranslation();
	const { prayerTimes, getPrayerTime, getIqamaTimes, isLoading, error } =
		usePrayerTimesData();

	if (isLoading) {
		return <LoadingState message={t("prayer_times.loading")} />;
	}

	if (error) {
		return <ErrorState message={t("prayer_times.error")} />;
	}

	if (!prayerTimes) {
		return null;
	}

	const hasPrayerTimes = [
		prayerTimes.fajr,
		prayerTimes.dhuhr,
		prayerTimes.asr,
		prayerTimes.maghrib,
		prayerTimes.isha,
	].some((time) => time);

	if (!hasPrayerTimes) {
		return null;
	}

	const gregorianDate = prayerTimes.gregorian_date ?? EMPTY_VALUE;
	const hijriDate = prayerTimes.hijri_date ?? EMPTY_VALUE;
	const shuruq = prayerTimes.shuruq ?? EMPTY_VALUE;

	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8 shadow-md">
			<SectionHeader
				gregorianDate={gregorianDate}
				hijriDate={hijriDate}
				shuruq={shuruq}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{PRAYER_ORDER.map((prayerKey) => (
					<PrayerCard
						key={prayerKey}
						prayerKey={prayerKey}
						prayerTime={getPrayerTime(prayerKey)}
						iqamaTimes={getIqamaTimes(prayerKey)}
					/>
				))}
			</div>
		</section>
	);
}

export default PrayerTimesSection;
