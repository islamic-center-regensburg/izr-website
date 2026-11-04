import { aggregate, readItems } from "@directus/sdk";
import { queryOptions } from "@tanstack/react-query";
import { directus } from "@/lib/directus";
import type { Schema } from "../schema";

export const DONATION_GOAL = 1_200_000;
const totalsOptions = {
	aggregate: { sum: ["amount"] as "amount"[], count: "*" as const },
	groupBy: ["status"] as "status"[],
	query: {
		filter: {
			amount: { _nnull: true as const, _gt: 0 },
			status: { _in: ["paid", "outstanding"] as ("paid" | "outstanding")[] },
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
		queryKey: ["donors", "dashboard", "paid", "outstanding"],
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
			if (!Array.isArray(totals) || !Array.isArray(recent)) {
				throw new Error("Invalid donation summary returned by CMS");
			}
			const amounts = { paid: 0, outstanding: 0 };
			const seen = new Set<string>();
			for (const row of totals as unknown as {
				status?: unknown;
				count?: unknown;
				sum?: { amount?: unknown };
			}[]) {
				const status = row.status;
				const rawCount = row.count;
				const count = Number(rawCount);
				if (
					(status !== "paid" && status !== "outstanding") ||
					seen.has(status) ||
					(typeof rawCount !== "string" && typeof rawCount !== "number") ||
					String(rawCount).trim() === "" ||
					!Number.isSafeInteger(count) ||
					count < 0
				) {
					throw new Error("Invalid donation summary returned by CMS");
				}
				seen.add(status);
				amounts[status] = parseAmount(
					count === 0 && row.sum?.amount === null ? 0 : row.sum?.amount,
				);
			}
			return {
				totalAmount: parseAmount(amounts.paid + amounts.outstanding),
				paidAmount: amounts.paid,
				outstandingAmount: amounts.outstanding,
				recentDonations: recent.map(parseDonation),
			};
		},
		staleTime: 2_000,
		refetchInterval: 10_000,
	});
