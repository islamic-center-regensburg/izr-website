import { useTranslation } from "react-i18next";

interface DateInfoProps {
	gregorianDate: string;
	hijriDate: string;
	shuruq: string;
}

export function DateInfo({ gregorianDate, hijriDate, shuruq }: DateInfoProps) {
	const { t } = useTranslation();

	return (
		<div className="mt-2 rounded-xl border border-border/50 bg-background/40 px-4 py-3 backdrop-blur-md sm:mt-0">
			<div className="flex items-center justify-between gap-3 border-b border-border/40 py-2">
				<p className="text-xs text-muted-foreground">
					{t("prayer_times.dates.gregorian")}
				</p>
				<p className="time-ltr text-sm font-medium">{gregorianDate}</p>
			</div>
			<div className="flex items-center justify-between gap-3 py-2 border-b border-border/40">
				<p className="text-xs text-muted-foreground">
					{t("prayer_times.dates.hijri")}
				</p>
				<p className="time-ltr text-sm font-medium">{hijriDate}</p>
			</div>
			<div className="flex items-center justify-between gap-3 py-2">
				<p className="text-xs text-muted-foreground">
					{t("prayer_times.names.shuruq")}
				</p>
				<p className="time-ltr text-sm font-medium">{shuruq}</p>
			</div>
		</div>
	);
}
