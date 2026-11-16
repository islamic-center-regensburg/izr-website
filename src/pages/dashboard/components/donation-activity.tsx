import { useId } from "react";
import { useTranslation } from "react-i18next";
import type { Donation } from "@/api/cms/donors/queries";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDonationFormatters } from "../hooks/use-donation-formatters";

export function DonationActivity({
	donations,
	preview,
	fullscreen = false,
}: {
	donations: Donation[];
	preview: boolean;
	fullscreen?: boolean;
}) {
	const { t } = useTranslation();
	const { currency, dates } = useDonationFormatters();
	const titleId = useId();
	const Heading = preview ? "h3" : "h2";
	const recent = preview ? donations.slice(0, 1) : donations;

	return (
		<Card className="mt-7 gap-0 rounded-2xl bg-white/40 bg-linear-to-br from-white/30 to-donation-mint/20 px-4 py-5 text-donation-primary shadow-none backdrop-blur-xl sm:px-7 sm:pt-6 sm:pb-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<Heading id={titleId} className="font-sans text-2xl font-bold">
					{t(`donation.dashboard.${preview ? "latest" : "recent"}`)}
				</Heading>
				<p className="text-[11px] font-bold text-donation-muted uppercase">
					{t("donation.dashboard.everyContribution")}
				</p>
			</div>
			{recent.length === 0 ? (
				<p className="py-12 text-donation-muted">
					{t("donation.dashboard.empty")}
				</p>
			) : (
				<>
					<ul
						aria-labelledby={titleId}
						className={cn(
							"mt-4 flex-col gap-2",
							fullscreen ? "hidden" : "flex sm:hidden",
						)}
					>
						{recent.map((donation, index) => (
							<li
								key={`${donation.date_of_donation}-${donation.payment_method}-${donation.amount}-${index}`}
								className="flex items-center justify-between gap-4 rounded-2xl border border-donation-border bg-white/30 px-4 py-3 first:bg-donation-mint/30 nth-3:bg-white/20"
							>
								<div className="flex min-w-0 flex-col">
									<time
										dateTime={donation.date_of_donation}
										className="text-xs font-normal text-donation-muted"
									>
										{dates.format(new Date(donation.date_of_donation))}
									</time>
									<span className="truncate text-sm font-medium">
										{t(
											`donation.dashboard.paymentMethods.${donation.payment_method}`,
										)}
									</span>
								</div>
								<span className="shrink-0 text-base font-bold">
									<bdi>{currency.format(Number(donation.amount))}</bdi>
								</span>
							</li>
						))}
					</ul>
					<Table
						aria-labelledby={titleId}
						className={cn(
							"border-separate border-spacing-y-2 text-start text-[15px]",
							fullscreen ? "table" : "hidden sm:table",
						)}
					>
						<TableHeader>
							<TableRow className="border-0 hover:bg-transparent">
								{["date", "paymentMethod", "amount"].map((key) => (
									<TableHead
										key={key}
										scope="col"
										className="h-auto px-3 py-2 text-start text-[11px] font-bold text-donation-muted uppercase last:text-end sm:px-5"
									>
										{t(`donation.dashboard.${key}`)}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{recent.map((donation, index) => (
								<TableRow
									key={`${donation.date_of_donation}-${donation.payment_method}-${donation.amount}-${index}`}
									className="border-0 first:bg-donation-mint/30 first:[&_td]:border-donation-mint nth-3:bg-white/20 [&_td]:h-16 [&_td]:border-y [&_td]:border-donation-border [&_td]:px-3 [&_td]:py-3 sm:[&_td]:px-5"
								>
									<TableCell className="rounded-s-2xl border-s text-sm font-normal text-donation-muted sm:w-41">
										<time dateTime={donation.date_of_donation}>
											{dates.format(new Date(donation.date_of_donation))}
										</time>
									</TableCell>
									<TableCell className="font-medium">
										{t(
											`donation.dashboard.paymentMethods.${donation.payment_method}`,
										)}
									</TableCell>
									<TableCell className="rounded-e-2xl border-e text-end text-base font-bold">
										<bdi>{currency.format(Number(donation.amount))}</bdi>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			)}
			<p className="mt-2 text-xs text-donation-muted">
				{t(`donation.dashboard.${preview ? "previewPrivacy" : "privacy"}`)}
			</p>
		</Card>
	);
}
