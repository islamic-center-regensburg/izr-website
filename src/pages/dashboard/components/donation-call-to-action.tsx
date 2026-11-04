import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DONATION_GOAL } from "@/api/cms/donors/queries";
import BankTransferCard from "@/components/bank-transfer-card";
import {
	CallToActionButton,
	CallToActionCard,
} from "@/components/call-to-action-card";
import { transferDetails } from "@/components/donation-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDonationFormatters } from "../hooks/use-donation-formatters";

export function DonationCallToAction({
	variant = "default",
}: {
	variant?: "default" | "editorial";
}) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const { currency } = useDonationFormatters();
	const editorial = variant === "editorial";
	const Surface = editorial ? Card : CallToActionCard;

	return (
		<>
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
					<CallToActionButton type="button" onClick={() => setOpen(true)}>
						{t("donation.dashboard.donate")}
						<ArrowRight aria-hidden="true" className="rtl:rotate-180" />
					</CallToActionButton>
					<Button
						type="button"
						variant="link"
						onClick={() => setOpen(true)}
						className={`h-auto min-h-6 justify-start p-0 text-start text-[13px] font-semibold whitespace-normal ${editorial ? "text-donation-primary" : "text-white"}`}
					>
						{t("donation.dashboard.bankDetails")}
						<ArrowRight
							size={14}
							aria-hidden="true"
							className="rtl:rotate-180"
						/>
					</Button>
				</Surface>
			</aside>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-h-[90dvh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{t("donation.title")}</DialogTitle>
						<DialogDescription>{t("donation.subtitle")}</DialogDescription>
					</DialogHeader>
					<BankTransferCard
						iban={transferDetails.iban}
						bic={transferDetails.bic}
						bankName={transferDetails.bankName}
						reference="Projekt SOM"
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
