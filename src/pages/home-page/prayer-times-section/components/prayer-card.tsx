import { useTranslation } from "react-i18next";
import { EMPTY_VALUE } from "../hooks/user-prayer-times-data";
import type { PrayerKey } from "../types";
import { IqamaTimesDisplay } from "./iqama-times-display";

interface PrayerCardProps {
	prayerKey: PrayerKey;
	prayerTime: string;
	iqamaTimes: string[];
}

export function PrayerCard({
	prayerKey,
	prayerTime,
	iqamaTimes,
}: PrayerCardProps) {
	const { t } = useTranslation();

	return (
		<div className="rounded-2xl border border-border/50 bg-background/40 p-4 shadow-xs backdrop-blur-md">
			<p className="text-base font-semibold">
				{t(`prayer_times.names.${prayerKey}`)}
			</p>
			<div className="mt-4 space-y-2">
				{prayerTime !== EMPTY_VALUE && (
					<div className="flex items-center justify-between gap-3">
						<span className="text-sm text-foreground">
							{t("prayer_times.columns.prayer_time")}
						</span>
						<span className="time-ltr text-sm font-medium">{prayerTime}</span>
					</div>
				)}
				<IqamaTimesDisplay iqamaTimes={iqamaTimes} />
			</div>
		</div>
	);
}
