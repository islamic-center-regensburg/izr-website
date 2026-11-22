import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDonationFormatters } from "../hooks/use-donation-formatters";
import DonationProgressChart from "./donation-progress-chart";

const PAID_COLOR = "#173d32";
const OUTSTANDING_COLOR = "#c8a43e";
const NEEDED_COLOR = "#bfeae3";

function DonationDonut({
	title,
	centerValue,
	centerLabel,
	segments,
}: {
	title: string;
	centerValue: string;
	centerLabel: string;
	segments: { key: string; value: number; color: string }[];
}) {
	const { t } = useTranslation();
	const { currency } = useDonationFormatters();
	return (
		<figure className="mx-auto w-48 text-center">
			<figcaption className="mb-2 text-xs font-bold uppercase text-donation-muted">
				{title}
			</figcaption>
			<div className="relative size-48">
				<DonationProgressChart
					kind="donut"
					segments={segments.map(({ key, value, color }) => ({
						name: t(`donation.dashboard.${key}`),
						value,
						color,
					}))}
				/>
				<div
					className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 p-9 tabular-nums"
					aria-hidden="true"
				>
					<strong className="w-full text-lg leading-tight wrap-anywhere">
						<bdi>{centerValue}</bdi>
					</strong>
					<span className="text-[11px] leading-tight">{centerLabel}</span>
				</div>
			</div>
			<ul className="mt-3 space-y-1.5 text-xs font-medium tabular-nums">
				{segments.map(({ key, value, color }) => (
					<li key={key} className="flex items-center gap-2">
						<span
							className="size-2 shrink-0 rounded-full"
							style={{ backgroundColor: color }}
							aria-hidden="true"
						/>
						<span>{t(`donation.dashboard.${key}`)}</span>
						<bdi className="ms-auto">{currency.format(value)}</bdi>
					</li>
				))}
			</ul>
		</figure>
	);
}

export function DonationGoalCard({
	total,
	outstanding,
	goal,
	projectName,
	fullscreen = false,
}: {
	total: number;
	outstanding: number;
	goal: number;
	projectName: string;
	fullscreen?: boolean;
}) {
	const { t } = useTranslation();
	const { currency, percent } = useDonationFormatters();
	const pledged = total + outstanding;
	// `goal` can be 0 while the campaign is still loading.
	const goalRatio = goal > 0 ? pledged / goal : 0;
	const progress = Math.min(100, Math.max(0, goalRatio * 100));

	return (
		<Card
			data-slot="donation-goal"
			className={cn(
				"grid min-h-84 gap-5 rounded-2xl bg-white/40 bg-linear-to-br from-white/30 to-donation-mint/20 p-6 text-donation-primary shadow-none backdrop-blur-xl sm:px-8 sm:pt-7 sm:pb-8",
				fullscreen
					? "grid-cols-[minmax(0,1fr)_auto] gap-10"
					: "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10",
			)}
		>
			<div className="flex min-w-0 flex-col">
				<div className="flex items-center justify-between gap-3 text-donation-muted">
					<h2 className="font-sans text-xs font-bold uppercase">
						{t("donation.dashboard.total")}
					</h2>
					<Badge className="rounded-3xl bg-donation-mint px-3.5 py-2 text-[11px] font-bold text-donation-primary">
						{projectName}
					</Badge>
				</div>
				<p
					data-slot="donation-total"
					className="mt-6.5 text-[40px] leading-[1.2] font-bold tabular-nums wrap-anywhere sm:text-[clamp(32px,3.2vw,46px)]"
				>
					<bdi>{currency.format(pledged)}</bdi>
				</p>
				<p className="mt-3 font-medium">
					{t("donation.dashboard.goal")} · <bdi>{currency.format(goal)}</bdi>
				</p>
				<div
					className="mt-6 h-3 overflow-hidden rounded-3xl bg-donation-mint"
					role="progressbar"
					aria-label={t("donation.dashboard.goal")}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={progress}
					aria-valuetext={t("donation.dashboard.progress", {
						percentage: percent.format(goalRatio),
					})}
				>
					<DonationProgressChart progress={progress} kind="bar" />
				</div>
				<div className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-donation-muted tabular-nums">
					<span>{t("donation.dashboard.remaining")}</span>
					<strong className="text-lg text-donation-primary">
						<bdi>{currency.format(Math.max(0, goal - pledged))}</bdi>
					</strong>
				</div>
				<p className="mt-auto pt-7.5 text-[13px]">
					{t("donation.dashboard.encouragement")}
				</p>
			</div>
			<div
				className={cn(
					"grid self-center",
					fullscreen
						? "grid-cols-2 gap-6"
						: "grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6",
				)}
			>
				<DonationDonut
					title={t("donation.dashboard.pledgedTitle")}
					centerValue={currency.format(pledged)}
					centerLabel={t("donation.dashboard.total")}
					segments={[
						{ key: "paid", value: total, color: PAID_COLOR },
						{
							key: "outstanding",
							value: outstanding,
							color: OUTSTANDING_COLOR,
						},
					]}
				/>
				<DonationDonut
					title={t("donation.dashboard.goalTitle")}
					centerValue={percent.format(goalRatio)}
					centerLabel={t("donation.dashboard.ofGoal", {
						goal: currency.format(goal),
					})}
					segments={[
						{ key: "paid", value: total, color: PAID_COLOR },
						{
							key: "outstanding",
							value: outstanding,
							color: OUTSTANDING_COLOR,
						},
						{
							key: "stillNeeded",
							value: Math.max(0, goal - pledged),
							color: NEEDED_COLOR,
						},
					]}
				/>
			</div>
		</Card>
	);
}
