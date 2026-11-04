import { aggregate, readItems } from "@directus/sdk";
import { queryOptions } from "@tanstack/react-query";
import { directus } from "@/lib/directus";
import type { Schema } from "../schema";

export const DONATION_GOAL = 1_200_000;
const totalsOptions = {
	aggregate: { sum: ["amount"] as "amount"[], count: "*" as const },
	query: {
		filter: {
			amount: { _nnull: true as const, _gt: 0 },
			status: { _eq: "paid" as const },
		},
	},
};

export interface Donation {
	amount: string;
	date_of_donation: string;
	payment_method: "cash" | "bank";
}

function parseAmount(value: unknown): number {
	if (
		(typeof value !== "string" && typeof value !== "number") ||
		(typeof value === "string" && value.trim() === "")
	) {
		throw new Error("Invalid donation amount returned by CMS");
	}
	const amount = Number(value);
	if (!Number.isFinite(amount) || amount < 0) {
		throw new Error("Invalid donation amount returned by CMS");
	}
	return amount;
}

function parseDonation(value: unknown): Donation {
	if (
		typeof value !== "object" ||
		value === null ||
		!("amount" in value) ||
		!("date_of_donation" in value) ||
		typeof value.date_of_donation !== "string" ||
		!Number.isFinite(Date.parse(value.date_of_donation)) ||
		!("payment_method" in value) ||
		(value.payment_method !== "cash" && value.payment_method !== "bank")
	) {
		throw new Error("Invalid donation returned by CMS");
	}
	if (parseAmount(value.amount) <= 0) {
		throw new Error("Invalid donation amount returned by CMS");
	}
	return {
		amount: String(value.amount),
		date_of_donation: value.date_of_donation,
		payment_method: value.payment_method,
	};
}

export const donationDashboardQueryOptions = () =>
	queryOptions({
		queryKey: ["donors", "dashboard", "paid"],
		queryFn: async () => {
			const [totals, recent] = await Promise.all([
				directus.request(
					aggregate<Schema, "donors", typeof totalsOptions>(
						"donors",
						totalsOptions,
					),
				),
				directus.request(
					readItems("donors", {
						fields: ["amount", "date_of_donation", "payment_method"],
						filter: {
							amount: { _nnull: true, _gt: 0 },
							status: { _eq: "paid" },
						},
						sort: ["-date_of_donation"],
						limit: 4,
					}),
				),
			]);
			const rawCount = totals[0]?.count;
			const count = Number(rawCount);
			if (
				(typeof rawCount !== "string" && typeof rawCount !== "number") ||
				rawCount === "" ||
				!Number.isSafeInteger(count) ||
				count < 0 ||
				!Array.isArray(recent)
			) {
				throw new Error("Invalid donation summary returned by CMS");
			}
			return {
				totalAmount: parseAmount(
					count === 0 && totals[0]?.sum?.amount === null
						? 0
						: totals[0]?.sum?.amount,
				),
				recentDonations: recent.map(parseDonation),
			};
		},
		staleTime: 2_000,
		refetchInterval: 10_000,
	});
