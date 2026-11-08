import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DONATION_GOAL } from "@/api/cms/donors/queries";
import {
	CallToActionButton,
	CallToActionCard,
} from "@/components/call-to-action-card";
import { Card } from "@/components/ui/card";
import { useDonationFormatters } from "../hooks/use-donation-formatters";

export function DonationCallToAction({
	variant = "default",
}: {
	variant?: "default" | "editorial";
}) {
	const { t } = useTranslation();
	const { currency } = useDonationFormatters();
	const editorial = variant === "editorial";
	const Surface = editorial ? Card : CallToActionCard;

	return (
		<aside className="h-full">
			<Surface
				className={
					editorial
						? "gap-5 rounded-3xl bg-white/45 p-7 text-donation-primary backdrop-blur-xl"
						: undefined
				}
			>
				<p className="text-xs font-bold text-[#bbc863] uppercase">
					{t("donation.dashboard.everyContribution")}
				</p>
				<h2 className="text-[26px] leading-[1.3] font-semibold">
					{t("donation.dashboard.ctaTitle")}
				</h2>
				<p className="text-sm">{t("donation.dashboard.ctaDescription")}</p>
				{editorial && (
					<>
						<p className="text-3xl font-bold tabular-nums">
							<bdi>{currency.format(DONATION_GOAL)}</bdi>
						</p>
						<p className="text-xs text-donation-muted">
							{t("donation.dashboard.goal")}
						</p>
						<Link
							to="/dashboard"
							className="text-sm font-semibold hover:underline"
						>
							{t("donation.dashboard.viewDashboard")}
						</Link>
					</>
				)}
				<Link to="/linktree" className="contents">
					<CallToActionButton type="button">
						{t("donation.dashboard.donate")}
						<ArrowRight aria-hidden="true" className="rtl:rotate-180" />
					</CallToActionButton>
				</Link>
			</Surface>
		</aside>
	);
}
