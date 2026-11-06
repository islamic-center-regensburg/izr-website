import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { donationDashboardQueryOptions } from "@/api/cms/donors/queries";
import { CardSurface } from "@/components/card-surface";
import PendingScreen from "@/components/pending-screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DonationActivity } from "./components/donation-activity";
import { DonationCallToAction } from "./components/donation-call-to-action";
import { DonationGoalCard } from "./components/donation-goal-card";

export default function DonationDashboard({
	preview = false,
	fullscreen = false,
}: {
	preview?: boolean;
	fullscreen?: boolean;
}) {
	const { t, i18n } = useTranslation();
	const section = useRef<HTMLElement>(null);
	const viewport = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const titleId = useId();
	const Heading = preview ? "h2" : "h1";
	const { data, isPending, isError, isFetching, refetch } = useQuery(
		donationDashboardQueryOptions(),
	);

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
				data-preview={preview}
				className={cn(
					"section",
					preview && "mt-8 sm:py-8",
					fullscreen && "mt-0 rounded-none",
				)}
			>
				<div className="relative mx-auto">
					<header className="mb-7">
						<p className="text-xs font-bold uppercase">
							{t("donation.dashboard.eyebrow")}
						</p>
						<Heading
							id={titleId}
							className="my-2 text-[32px] leading-[1.2] font-black sm:text-[40px]"
						>
							{t("donation.dashboard.title")}
						</Heading>
						<p className="text-donation-muted">
							{t("donation.dashboard.subtitle")}
						</p>
					</header>
					{isPending && (
						<PendingScreen compact message={t("donation.dashboard.loading")} />
					)}
					{isError && (
						<Card
							role="alert"
							className="items-start gap-4 rounded-2xl bg-white/40 bg-linear-to-br from-white/30 to-donation-mint/20 p-8 text-donation-primary shadow-none backdrop-blur-xl"
						>
							<p>{t("donation.dashboard.error")}</p>
							<Button
								type="button"
								disabled={isFetching}
								onClick={() => void refetch()}
								className="rounded-3xl bg-donation-primary px-5 py-2.5 text-white"
							>
								{t("donation.dashboard.retry")}
							</Button>
						</Card>
					)}
					{data && (
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
									total={data.paidAmount}
									outstanding={data.outstandingAmount}
									preview={preview}
									section={section}
									fullscreen={fullscreen}
								/>
								<DonationCallToAction />
							</div>
							<DonationActivity
								donations={data.recentDonations}
								preview={preview}
								fullscreen={fullscreen}
							/>
						</>
					)}
					{preview && (
						<Button
							asChild
							className="ms-auto mt-6 flex h-auto min-h-13 w-fit rounded-3xl bg-donation-gold px-5 py-3 text-[15px] font-semibold text-donation-primary whitespace-normal hover:bg-[#d9b752]"
						>
							<Link to="/dashboard">
								{t("donation.dashboard.viewDashboard")}
								<ArrowRight aria-hidden="true" className="rtl:rotate-180" />
							</Link>
						</Button>
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
