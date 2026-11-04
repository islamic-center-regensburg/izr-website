import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useId, useRef } from "react";
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
}: {
	preview?: boolean;
}) {
	const { t } = useTranslation();
	const section = useRef<HTMLElement>(null);
	const titleId = useId();
	const Heading = preview ? "h2" : "h1";
	const { data, isPending, isError, isFetching, refetch } = useQuery(
		donationDashboardQueryOptions(),
	);

	return (
		<CardSurface asChild section>
			<section
				ref={section}
				aria-labelledby={titleId}
				data-slot="donation-dashboard"
				data-preview={preview}
				className={cn("section ", preview && "mt-8 sm:py-8")}
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
							<div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr]! gap-6">
								<DonationGoalCard
									total={data.paidAmount}
									outstanding={data.outstandingAmount}
									preview={preview}
									section={section}
								/>
								<DonationCallToAction />
							</div>
							<DonationActivity
								donations={data.recentDonations}
								preview={preview}
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
}
