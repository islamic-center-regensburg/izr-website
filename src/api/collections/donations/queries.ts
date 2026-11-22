import type { QueryFilter } from "@directus/sdk";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsDonations } from "../../generated/sdk.gen";
import type { ItemsDonations } from "../../generated/types.gen";
import type { DirectusSchema } from "../schema";

// See campaigns/queries.ts's `CampaignItem` for the underlying issue —
// `ItemsDonations.campaign` is `number | ItemsCampaigns`, and that full
// `ItemsCampaigns` (with its `Files`-typed `thumbnail`) leaks in even
// though no query here ever expands `campaign.*`. Re-typed to what every
// query here actually gets back: a raw foreign-key number.
type DonationItem = Omit<ItemsDonations, "campaign"> & { campaign?: number | null };

export const donationsKeys = {
	all: ["donations"] as const,
	confirmedForCampaign: (campaignId: number) =>
		[...donationsKeys.all, "confirmed-for-campaign", campaignId] as const,
	dashboardForCampaign: (campaignId: number) =>
		[...donationsKeys.all, "dashboard-for-campaign", campaignId] as const,
	dashboardForCampaigns: (campaignIds: readonly number[]) =>
		[...donationsKeys.all, "dashboard-for-campaigns", campaignIds] as const,
};

// Campaign progress has no stored total — it must be computed from
// confirmed donations. `pending`/`refunded` donations must be excluded
// entirely, not just zero-weighted (izr-cms-discovery.md §5).
function confirmedDonationsForCampaignFilter(
	campaignId: number,
): QueryFilter<DirectusSchema, DirectusSchema["donations"][number]> {
	return {
		campaign: { _eq: campaignId },
		status: { _eq: "confirmed" },
	};
}

const fetchConfirmedDonationsForCampaign = createServerFn({ method: "GET" })
	.inputValidator((campaignId: number) => campaignId)
	.handler(async ({ data: campaignId }) => {
		const { data: body } = await readItemsDonations({
			query: {
				filter: JSON.stringify(confirmedDonationsForCampaignFilter(campaignId)),
				// `donated_at` and `method` are required fields on the
				// generated Zod response schema even though this query
				// doesn't need them — omitting them makes response
				// validation fail (every field Directus doesn't return
				// comes back as `undefined`, which fails a required
				// `z.string()`). Always select every required field.
				fields: ["amount", "currency", "donated_at", "method"],
				limit: -1,
			},
			throwOnError: true,
		});
		return (body?.data ?? []) as DonationItem[];
	});

// For the donation dashboard: confirmed + pending (never `refunded`) so it
// can show both received and still-outstanding amounts for the campaign.
function dashboardDonationsForCampaignFilter(
	campaignId: number,
): QueryFilter<DirectusSchema, DirectusSchema["donations"][number]> {
	return {
		campaign: { _eq: campaignId },
		status: { _in: ["confirmed", "pending"] },
	};
}

const fetchDashboardDonationsForCampaign = createServerFn({ method: "GET" })
	.inputValidator((campaignId: number) => campaignId)
	.handler(async ({ data: campaignId }) => {
		const { data: body } = await readItemsDonations({
			query: {
				filter: JSON.stringify(dashboardDonationsForCampaignFilter(campaignId)),
				fields: ["id", "amount", "currency", "donated_at", "method", "status"],
				sort: ["-donated_at"],
				limit: -1,
			},
			throwOnError: true,
		});
		return (body?.data ?? []) as DonationItem[];
	});

export const confirmedDonationsForCampaignQueryOptions = (campaignId: number) =>
	queryOptions({
		queryKey: donationsKeys.confirmedForCampaign(campaignId),
		queryFn: () => fetchConfirmedDonationsForCampaign({ data: campaignId }),
		enabled: Number.isFinite(campaignId),
	});

export const dashboardDonationsForCampaignQueryOptions = (campaignId: number) =>
	queryOptions({
		queryKey: donationsKeys.dashboardForCampaign(campaignId),
		queryFn: () => fetchDashboardDonationsForCampaign({ data: campaignId }),
		enabled: Number.isFinite(campaignId),
	});

// Bulk variant of the above, for the campaigns gallery: computes every
// card's progress from one request instead of one per campaign.
function dashboardDonationsForCampaignsFilter(
	campaignIds: readonly number[],
): QueryFilter<DirectusSchema, DirectusSchema["donations"][number]> {
	return {
		campaign: { _in: [...campaignIds] },
		status: { _in: ["confirmed", "pending"] },
	};
}

const fetchDashboardDonationsForCampaigns = createServerFn({ method: "GET" })
	.inputValidator((campaignIds: number[]) => campaignIds)
	.handler(async ({ data: campaignIds }) => {
		if (campaignIds.length === 0) return [];
		const { data: body } = await readItemsDonations({
			query: {
				filter: JSON.stringify(dashboardDonationsForCampaignsFilter(campaignIds)),
				fields: ["id", "campaign", "amount", "currency", "donated_at", "method", "status"],
				sort: ["-donated_at"],
				limit: -1,
			},
			throwOnError: true,
		});
		return (body?.data ?? []) as DonationItem[];
	});

export const dashboardDonationsForCampaignsQueryOptions = (campaignIds: readonly number[]) => {
	// Sort for a stable query key regardless of the caller's array order.
	const sortedIds = [...campaignIds].sort((a, b) => a - b);
	return queryOptions({
		queryKey: donationsKeys.dashboardForCampaigns(sortedIds),
		queryFn: () => fetchDashboardDonationsForCampaigns({ data: sortedIds }),
		enabled: sortedIds.length > 0,
	});
};
