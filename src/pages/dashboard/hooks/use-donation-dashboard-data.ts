import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { campaignDetailQueryOptions, primaryCampaignQueryOptions } from "@/api/collections/campaigns/queries";
import { dashboardDonationsForCampaignQueryOptions } from "@/api/collections/donations/queries";
import { pickTranslation } from "@/api/collections/translations";

// Live-ish polling so a dashboard left open (e.g. on the physical display)
// reflects new donations within seconds, matching the previous backend's
// polling behaviour.
const STALE_TIME_MS = 2_000;
const REFETCH_INTERVAL_MS = 10_000;

export type RecentDonation = {
	id: number;
	amount: string;
	donatedAt: string;
	method: string;
};

/**
 * @param campaignSlug Specific campaign to show, by its translation slug.
 * Omit to fall back to the deterministic "primary" campaign — used by the
 * fullscreen kiosk display (`/dashboard`), which has no way to target a
 * particular campaign.
 */
export function useDonationDashboardData(campaignSlug?: string) {
	const { i18n } = useTranslation();

	// Two separate `useQuery` calls (rather than branching which
	// `queryOptions()` call to spread) because `campaignDetailQueryOptions`
	// and `primaryCampaignQueryOptions` have structurally different query
	// keys/`enabled` types — a conditional union of the two breaks
	// `useQuery`'s overload resolution. Only one of the two is ever
	// actually enabled at a time.
	const detailQuery = useQuery({
		...campaignDetailQueryOptions(campaignSlug ?? ""),
		staleTime: STALE_TIME_MS,
		refetchInterval: REFETCH_INTERVAL_MS,
	});
	const primaryQuery = useQuery({
		...primaryCampaignQueryOptions(),
		enabled: campaignSlug === undefined,
		staleTime: STALE_TIME_MS,
		refetchInterval: REFETCH_INTERVAL_MS,
	});
	const campaignQuery = campaignSlug !== undefined ? detailQuery : primaryQuery;
	const campaign = campaignQuery.data;

	const donationsQuery = useQuery({
		...dashboardDonationsForCampaignQueryOptions(campaign?.id ?? Number.NaN),
		staleTime: STALE_TIME_MS,
		refetchInterval: REFETCH_INTERVAL_MS,
	});
	const donations = donationsQuery.data ?? [];

	// Decided scope: a single featured campaign, confirmed donations count
	// as "paid", pending ones as "outstanding" (not yet confirmed), general
	// (uncampaigned) donations are out of scope entirely since we're
	// already filtering to one specific campaign's donations.
	let paidAmount = 0;
	let outstandingAmount = 0;
	const recentConfirmed: RecentDonation[] = [];
	for (const donation of donations) {
		const amount = Number.parseFloat(donation.amount);
		if (!Number.isFinite(amount)) continue;

		if (donation.status === "confirmed") {
			paidAmount += amount;
			recentConfirmed.push({
				id: donation.id ?? 0,
				amount: donation.amount,
				donatedAt: donation.donated_at,
				method: donation.method,
			});
		} else if (donation.status === "pending") {
			outstandingAmount += amount;
		}
	}
	// `donations` is already sorted by `-donated_at`; keep only the latest 4.
	const recentDonations = recentConfirmed.slice(0, 4);

	const translation = campaign
		? pickTranslation(campaign.translations, i18n.language)
		: undefined;
	const projectName = translation?.name;
	const goal = campaign?.target_amount ? Number.parseFloat(campaign.target_amount) : 0;

	const isLoading = campaignQuery.isLoading || (Boolean(campaign) && donationsQuery.isLoading);
	const isError = campaignQuery.isError || donationsQuery.isError;

	return {
		campaign,
		projectName,
		goal,
		paidAmount,
		outstandingAmount,
		recentDonations,
		isLoading,
		isError,
		isFetching: campaignQuery.isFetching || donationsQuery.isFetching,
		refetch: () => {
			void campaignQuery.refetch();
			void donationsQuery.refetch();
		},
	};
}
