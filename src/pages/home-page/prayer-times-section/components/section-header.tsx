import { cx } from "class-variance-authority";
import { useTranslation } from "react-i18next";
import { DateInfo } from "./date-info";

interface SectionHeaderProps {
	gregorianDate: string;
	hijriDate: string;
	shuruq: string;
}

export function SectionHeader({
	gregorianDate,
	hijriDate,
	shuruq,
}: SectionHeaderProps) {
	const { t, i18n } = useTranslation();

	return (
		<div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div
				className={cx(
					"flex flex-col h-full self-start",
					i18n.language === "ar" ? "ml-auto" : "mr-auto",
				)}
			>
				<h2 className="text-4xl font-semibold tracking-tight">
					{t("prayer_times.title")}
				</h2>
				<p className="text-sm text-muted-foreground">
					{t("prayer_times.subtitle")}
				</p>
			</div>
			<DateInfo
				gregorianDate={gregorianDate}
				hijriDate={hijriDate}
				shuruq={shuruq}
			/>
		</div>
	);
}
