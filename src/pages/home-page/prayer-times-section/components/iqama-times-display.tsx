import { useTranslation } from "react-i18next";
import { EMPTY_VALUE } from "../hooks/user-prayer-times-data";

interface IqamaTimesDisplayProps {
	iqamaTimes: string[];
}

export function IqamaTimesDisplay({ iqamaTimes }: IqamaTimesDisplayProps) {
	const { t } = useTranslation();

	if (iqamaTimes.length === 0) {
		return (
			<div className="flex items-center justify-between gap-3">
				<span className="text-sm text-foreground">
					{t("prayer_times.columns.iqama_time")}
				</span>
				<span className="time-ltr text-sm font-medium">{EMPTY_VALUE}</span>
			</div>
		);
	}

	if (iqamaTimes.length === 1) {
		return (
			<div className="flex items-center justify-between gap-3">
				<span className="text-sm text-foreground">
					{t("prayer_times.columns.iqama_time")}
				</span>
				<span className="time-ltr text-sm font-medium">{iqamaTimes[0]}</span>
			</div>
		);
	}
	return (
		<div className="flex items-center justify-between gap-3">
			<span className="text-sm text-foreground">
				{t("prayer_times.columns.iqama_time")}
			</span>
			<span className="time-ltr text-sm font-medium">
				{iqamaTimes.join(" / ")}
			</span>
		</div>
	);
}
