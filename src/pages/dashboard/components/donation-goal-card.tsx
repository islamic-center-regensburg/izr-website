import type { RefObject } from "react";
import { useTranslation } from "react-i18next";
import { DONATION_GOAL } from "@/api/cms/donors/queries";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAnimatedDonationTotal } from "../hooks/use-animated-donation-total";
import { useDonationFormatters } from "../hooks/use-donation-formatters";
import DonationProgressChart from "./donation-progress-chart";

export function DonationGoalCard({
	total,
	preview,
	section,
}: {
	total: number;
	preview: boolean;
	section: RefObject<HTMLElement | null>;
}) {
	const { t } = useTranslation();
	const { currency, percent } = useDonationFormatters();
	const { animatedTotal, displayedTotal } = useAnimatedDonationTotal(
		total,
		section,
	);
	const Heading = preview ? "h3" : "h2";
	const progress = Math.min(100, Math.max(0, (total / DONATION_GOAL) * 100));
	const animatedProgress = Math.min(
		100,
		Math.max(0, (animatedTotal / DONATION_GOAL) * 100),
	);

	return (
		<Card
			data-slot="donation-goal"
			className="grid min-h-84 grid-cols-1 gap-5 rounded-2xl bg-white/40 bg-linear-to-br from-white/30 to-donation-mint/20 p-6 text-donation-primary shadow-none backdrop-blur-xl sm:grid-cols-[minmax(0,1fr)_220px] sm:gap-12 sm:px-8 sm:pt-7 sm:pb-8"
		>
			<div className="flex min-w-0 flex-col">
				<div className="flex items-center justify-between gap-3 text-donation-muted">
					<Heading className="font-sans text-xs font-bold uppercase">
						{t("donation.dashboard.raised")}
					</Heading>
					<Badge className="rounded-3xl bg-donation-mint px-3.5 py-2 text-[11px] font-bold text-donation-primary">
						{t("donation.dashboard.project")}
					</Badge>
				</div>
				<p
					data-slot="donation-total"
					className="mt-6.5 text-[40px] leading-[1.2] font-bold tabular-nums wrap-anywhere sm:text-[clamp(32px,3.2vw,46px)]"
				>
					<span className="sr-only">{currency.format(total)}</span>
					<bdi aria-hidden="true">{currency.format(displayedTotal)}</bdi>
				</p>
				<p className="mt-3 font-medium">
					{t("donation.dashboard.goal")} ·{" "}
					<bdi>{currency.format(DONATION_GOAL)}</bdi>
				</p>
				<div
					className="mt-6 h-3 overflow-hidden rounded-3xl bg-donation-mint"
					aria-hidden="true"
				>
					<DonationProgressChart progress={animatedProgress} kind="bar" />
				</div>
				<div className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-donation-muted tabular-nums">
					<span>{t("donation.dashboard.remaining")}</span>
					<strong className="text-lg text-donation-primary">
						<span className="sr-only">
							{currency.format(Math.max(0, DONATION_GOAL - total))}
						</span>
						<bdi aria-hidden="true">
							{currency.format(Math.max(0, DONATION_GOAL - displayedTotal))}
						</bdi>
					</strong>
				</div>
				<p className="mt-auto pt-7.5 text-[13px]">
					{t("donation.dashboard.encouragement")}
				</p>
			</div>
			<div className="self-center justify-self-center text-center">
				<div
					className="relative size-55"
					role="progressbar"
					aria-label={t("donation.dashboard.goal")}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={progress}
					aria-valuetext={t("donation.dashboard.progress", {
						percentage: percent.format(total / DONATION_GOAL),
					})}
				>
					<DonationProgressChart progress={animatedProgress} kind="donut" />
					<div
						className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8 tabular-nums"
						aria-hidden="true"
					>
						<strong className="text-[34px] leading-[1.35]">
							<bdi>{percent.format(animatedTotal / DONATION_GOAL)}</bdi>
						</strong>
						<span className="text-xs">
							{t("donation.dashboard.goalReached")}
						</span>
					</div>
				</div>
				<p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium tabular-nums">
					<span
						className="size-[7px] shrink-0 rounded-full bg-donation-primary"
						aria-hidden="true"
					/>
					<span className="sr-only">
						{t("donation.dashboard.collected", {
							amount: currency.format(total),
						})}
					</span>
					<span aria-hidden="true">
						{t("donation.dashboard.collected", {
							amount: currency.format(displayedTotal),
						})}
					</span>
				</p>
			</div>
		</Card>
	);
}
