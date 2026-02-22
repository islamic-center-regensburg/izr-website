import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getPrayerIqamaQueryOptions } from "@/api/prayer_iqama/queries";
import { getPrayerTimesForMosqueQueryOptions } from "@/api/prayer_times/queries";
import { useMosque } from "@/contexts";

type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha" | "jumah";

const prayerOrder: PrayerKey[] = [
	"fajr",
	"dhuhr",
	"asr",
	"maghrib",
	"isha",
	"jumah",
];

const emptyValue = "—";
const lri = "\u2066";
const pdi = "\u2069";

function normalizeDigits(input: string) {
	return input
		.replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))
		.replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776));
}

function formatTime(timeValue: string | null | undefined) {
	if (!timeValue) {
		return emptyValue;
	}

	const normalizedTime = normalizeDigits(timeValue.trim());
	const [hoursRaw, minutesRaw] = normalizedTime.split(":");
	const hours = Number.parseInt(hoursRaw ?? "", 10);
	const minutes = Number.parseInt(minutesRaw ?? "", 10);

	if (Number.isNaN(hours) || Number.isNaN(minutes)) {
		return normalizedTime;
	}

	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function toBidiSafeText(value: string | null | undefined) {
	if (!value || value === emptyValue) {
		return emptyValue;
	}

	const normalizedValue = normalizeDigits(value.trim());
	return `${lri}${normalizedValue}${pdi}`;
}

function addMinutesToTime(baseTime: string, offsetMinutes: number) {
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

function PrayerTimesSection() {
	const { t } = useTranslation();
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
	const gregorianDate = prayerTimes?.gregorian_date ?? emptyValue;
	const hijriDate = prayerTimes?.hijri_date ?? emptyValue;
	const iqamaByPrayer = new Map(
		(iqamaQuery.data ?? []).map((item) => [item.prayer_name, item]),
	);

	const getPrayerTime = (prayerKey: PrayerKey) => {
		if (!prayerTimes) {
			return emptyValue;
		}

		switch (prayerKey) {
			case "fajr":
				return formatTime(prayerTimes.fajr);
			case "dhuhr":
				return formatTime(prayerTimes.dhuhr);
			case "asr":
				return formatTime(prayerTimes.asr);
			case "maghrib":
				return formatTime(prayerTimes.maghrib);
			case "isha":
				return formatTime(prayerTimes.isha);
			case "jumah":
				return emptyValue;
			default:
				return emptyValue;
		}
	};

	const getIqamaTime = (prayerKey: PrayerKey) => {
		const iqama = iqamaByPrayer.get(prayerKey);
		if (!iqama) {
			return emptyValue;
		}

		if (iqama.fixed_time) {
			return formatTime(iqama.fixed_time);
		}

		if (iqama.offset_minutes !== null && iqama.offset_minutes !== undefined) {
			const basePrayerTime = getPrayerTime(prayerKey);
			if (basePrayerTime !== emptyValue) {
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

		return emptyValue;
	};

	if (isMosqueLoading || prayerTimesQuery.isLoading || iqamaQuery.isLoading) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-muted-foreground">
					{t("prayer_times.loading")}
				</p>
			</section>
		);
	}

	if (prayerTimesQuery.error || iqamaQuery.error) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("prayer_times.error")}</p>
			</section>
		);
	}

	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6  backdrop-blur-xs sm:p-8">
			<div className="mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">
						{t("prayer_times.title")}
					</h2>
					<p className="text-sm text-muted-foreground">
						{t("prayer_times.subtitle")}
					</p>
				</div>
				<div className="ml-auto mt-4 inline-block w-fit rounded-xl border border-border/50 bg-background/40 px-4 py-3 backdrop-blur-md">
					<div className="flex items-center justify-between gap-3 border-b border-border/40 py-2">
						<p className="text-xs text-muted-foreground">
							{t("prayer_times.dates.gregorian")}
						</p>
						<p className="time-ltr text-sm font-medium">
							{toBidiSafeText(gregorianDate)}
						</p>
					</div>
					<div className="flex items-center justify-between gap-3 py-2">
						<p className="text-xs text-muted-foreground">
							{t("prayer_times.dates.hijri")}
						</p>
						<p className="time-ltr text-sm font-medium">
							{toBidiSafeText(hijriDate)}
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{prayerOrder.map((prayerKey) => (
					<div
						key={prayerKey}
						className="rounded-2xl border border-border/50 bg-background/40 p-4 shadow-xs backdrop-blur-md"
					>
						<p className="text-base font-semibold">
							{t(`prayer_times.names.${prayerKey}`)}
						</p>
						<div className="mt-4 space-y-2">
							<div className="flex items-center justify-between gap-3">
								<span className="text-sm text-muted-foreground">
									{t("prayer_times.columns.prayer_time")}
								</span>
								<span className="time-ltr text-sm font-medium">
									{toBidiSafeText(getPrayerTime(prayerKey))}
								</span>
							</div>
							<div className="flex items-center justify-between gap-3">
								<span className="text-sm text-muted-foreground">
									{t("prayer_times.columns.iqama_time")}
								</span>
								<span className="time-ltr text-sm font-medium">
									{toBidiSafeText(getIqamaTime(prayerKey))}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default PrayerTimesSection;
