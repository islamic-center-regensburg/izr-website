import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { campaignsListQueryOptions } from "@/api/collections/campaigns/queries";
import { dashboardDonationsForCampaignsQueryOptions } from "@/api/collections/donations/queries";
import { pickTranslation } from "@/api/collections/translations";

export type CampaignSummary = {
	id: number | undefined;
	slug: string | undefined;
	name: string;
	description?: string;
	thumbnailId?: string | null;
	/** Undefined when the campaign has no fundraising goal to show progress against. */
	goal?: number;
	paidAmount: number;
	outstandingAmount: number;
};

export function useCampaignsGalleryData() {
	const { i18n } = useTranslation();

	const campaignsQuery = useQuery(campaignsListQueryOptions());
	const campaigns = campaignsQuery.data ?? [];
	const campaignIds = campaigns
		.map((campaign) => campaign.id)
		.filter((id): id is number => id !== undefined);

	const donationsQuery = useQuery(dashboardDonationsForCampaignsQueryOptions(campaignIds));
	const donations = donationsQuery.data ?? [];

	// Decided scope (matches the single-campaign dashboard): confirmed
	// donations count as "paid", pending ones as "outstanding" (not yet
	// confirmed), general (uncampaigned) donations are out of scope.
	const totalsByCampaign = new Map<number, { paid: number; outstanding: number }>();
	for (const donation of donations) {
		// `campaign` isn't expanded (no nested fields requested), so it's
		// always the raw foreign-key number here, never an object.
		const campaignId = typeof donation.campaign === "number" ? donation.campaign : null;
		if (campaignId === null) continue;
		const amount = Number.parseFloat(donation.amount);
		if (!Number.isFinite(amount)) continue;

		const totals = totalsByCampaign.get(campaignId) ?? { paid: 0, outstanding: 0 };
		if (donation.status === "confirmed") {
			totals.paid += amount;
		} else if (donation.status === "pending") {
			totals.outstanding += amount;
		}
		totalsByCampaign.set(campaignId, totals);
	}

	const items: CampaignSummary[] = campaigns.map((campaign) => {
		const translation = pickTranslation(campaign.translations, i18n.language);
		const totals = campaign.id !== undefined ? totalsByCampaign.get(campaign.id) : undefined;

		return {
			id: campaign.id,
			slug: translation?.slug,
			name: translation?.name ?? "",
			description: translation?.description ?? undefined,
			thumbnailId: typeof campaign.thumbnail === "string" ? campaign.thumbnail : undefined,
			goal: campaign.target_amount ? Number.parseFloat(campaign.target_amount) : undefined,
			paidAmount: totals?.paid ?? 0,
			outstandingAmount: totals?.outstanding ?? 0,
		};
	});

	return {
		items,
		isLoading: campaignsQuery.isLoading || (campaignIds.length > 0 && donationsQuery.isLoading),
		isError: campaignsQuery.isError || donationsQuery.isError,
	};
}
