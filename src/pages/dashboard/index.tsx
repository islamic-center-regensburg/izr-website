import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CardSurface } from "@/components/card-surface";
import PendingScreen from "@/components/pending-screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DonationActivity } from "./components/donation-activity";
import { DonationCallToAction } from "./components/donation-call-to-action";
import { DonationGoalCard } from "./components/donation-goal-card";
import { useDonationDashboardData } from "./hooks/use-donation-dashboard-data";

/**
 * Full dashboard for a single campaign. Omit `campaignSlug` to show the
 * deterministic "primary" campaign — used by the fullscreen kiosk display
 * (`/dashboard`, `fullscreen=true`); pass a specific `campaignSlug` to show
 * the dashboard for one campaign from the campaigns gallery (`/campaigns/$slug`).
 */
export default function DonationDashboard({
	campaignSlug,
	fullscreen = false,
}: {
	campaignSlug?: string;
	fullscreen?: boolean;
}) {
	const { t, i18n } = useTranslation();
	const section = useRef<HTMLElement>(null);
	const viewport = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const titleId = useId();
	const {
		campaign,
		projectName,
		goal,
		paidAmount,
		outstandingAmount,
		recentDonations,
		isLoading,
		isError,
		isFetching,
		refetch,
	} = useDonationDashboardData(campaignSlug);

	useEffect(() => {
		if (!fullscreen || !viewport.current || !section.current) return;
		const frame = viewport.current;
		const content = section.current;
		const resize = () => {
			setScale(
				Math.max(
					0,
					Math.min(
						1,
						(frame.clientWidth - 16) / content.offsetWidth,
						(frame.clientHeight - 16) / content.offsetHeight,
					),
				),
			);
		};
		const observer = new ResizeObserver(resize);
		observer.observe(frame);
		observer.observe(content);
		resize();
		return () => observer.disconnect();
	}, [fullscreen]);

	const dashboard = (
		<CardSurface asChild section>
			<section
				ref={section}
				aria-labelledby={titleId}
				data-slot="donation-dashboard"
				className={cn("section", fullscreen && "mt-0 rounded-none")}
			>
				<div className="relative mx-auto">
					<header className="mb-7">
						<p className="text-xs font-bold uppercase">
							{t("donation.dashboard.eyebrow", { project: projectName })}
						</p>
						<h1
							id={titleId}
							className="my-2 text-[32px] leading-[1.2] font-black sm:text-[40px]"
						>
							{t("donation.dashboard.title")}
						</h1>
						<p className="text-donation-muted">
							{t("donation.dashboard.subtitle")}
						</p>
					</header>
					{isLoading && (
						<PendingScreen compact message={t("donation.dashboard.loading")} />
					)}
					{isError && !campaign && (
						<Card
							role="alert"
							className="items-start gap-4 rounded-2xl bg-white/40 bg-linear-to-br from-white/30 to-donation-mint/20 p-8 text-donation-primary shadow-none backdrop-blur-xl"
						>
							<p>{t("donation.dashboard.error")}</p>
							<Button
								type="button"
								disabled={isFetching}
								onClick={() => refetch()}
								className="rounded-3xl bg-donation-primary px-5 py-2.5 text-white"
							>
								{t("donation.dashboard.retry")}
							</Button>
						</Card>
					)}
					{campaign && (
						<>
							<div
								className={cn(
									"grid gap-6",
									fullscreen
										? "grid-cols-[2fr_1fr]"
										: "grid-cols-1 xl:grid-cols-[2fr_1fr]!",
								)}
							>
								<DonationGoalCard
									key={i18n.language}
									total={paidAmount}
									outstanding={outstandingAmount}
									goal={goal}
									projectName={projectName ?? ""}
									fullscreen={fullscreen}
								/>
								<DonationCallToAction />
							</div>
							<DonationActivity donations={recentDonations} fullscreen={fullscreen} />
						</>
					)}
				</div>
			</section>
		</CardSurface>
	);

	if (!fullscreen) return dashboard;

	return (
		<div
			ref={viewport}
			data-slot="dashboard-viewport"
			className="relative h-dvh w-full overflow-hidden"
		>
			<div
				className="absolute top-1/2 left-1/2 w-[max(1440px,100vw)] origin-center"
				style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
			>
				{dashboard}
			</div>
		</div>
	);
}
