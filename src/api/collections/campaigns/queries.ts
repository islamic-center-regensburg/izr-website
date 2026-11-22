import type { QueryFilter } from "@directus/sdk";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsCampaigns } from "../../generated/sdk.gen";
import type { ItemsCampaigns, ItemsCampaignsTranslations } from "../../generated/types.gen";
import type { DirectusSchema } from "../schema";

// See news/queries.ts's `NewsItem` for why `thumbnail` and
// `translations[].campaigns_id` are re-typed here — same generated-`Files`
// / circular-back-reference blowup, same fix.
type CampaignTranslation = Omit<ItemsCampaignsTranslations, "campaigns_id"> & {
	campaigns_id?: number | string;
};
export type CampaignItem = Omit<ItemsCampaigns, "thumbnail" | "translations"> & {
	thumbnail?: string | null;
	translations?: Array<number | CampaignTranslation> | null;
};

export const campaignsKeys = {
	all: ["campaigns"] as const,
	lists: () => [...campaignsKeys.all, "list"] as const,
	list: () => [...campaignsKeys.lists()] as const,
	details: () => [...campaignsKeys.all, "detail"] as const,
	detail: (slug: string) => [...campaignsKeys.details(), slug] as const,
	primary: () => [...campaignsKeys.all, "primary"] as const,
};

// Visibility is not enforced by the backend (izr-cms-discovery.md §5).
// Campaigns use draft/active/completed/archived (NOT draft/published like
// news and events — see schemas/donations/campaigns.yaml).
function activeCampaignsFilter(): QueryFilter<DirectusSchema, DirectusSchema["campaigns"][number]> {
	return { status: { _eq: "active" } };
}

const fetchCampaignsList = createServerFn({ method: "GET" }).handler(async () => {
	const { data: body } = await readItemsCampaigns({
		query: {
			filter: JSON.stringify(activeCampaignsFilter()),
			sort: ["-starts_at"],
			fields: ["*", "translations.*"],
		},
		throwOnError: true,
	});
	return (body?.data ?? []) as CampaignItem[];
});

// Campaigns have no slug of their own — slugs live per-language on
// `translations` (izr-cms-discovery.md §4) — so looking one up means
// filtering `translations.slug` rather than requesting a single item by id.
const fetchCampaignDetail = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const { data: body } = await readItemsCampaigns({
			query: {
				filter: JSON.stringify({ translations: { slug: { _eq: slug } } }),
				fields: ["*", "translations.*"],
				limit: 1,
			},
			throwOnError: true,
		});
		return body?.data?.[0] as CampaignItem | undefined;
	});

// There's no "featured campaign" flag in the schema, so the dashboard needs
// a deterministic pick: the earliest-started active campaign that actually
// has a fundraising goal (a campaign with no `target_amount` has no
// progress to show against).
const fetchPrimaryCampaign = createServerFn({ method: "GET" }).handler(async () => {
	const { data: body } = await readItemsCampaigns({
		query: {
			filter: JSON.stringify({
				...activeCampaignsFilter(),
				target_amount: { _nnull: true },
			}),
			sort: ["starts_at"],
			fields: ["*", "translations.*"],
			limit: 1,
		},
		throwOnError: true,
	});
	return (body?.data?.[0] ?? null) as CampaignItem | null;
});

export const campaignsListQueryOptions = () =>
	queryOptions({
		queryKey: campaignsKeys.list(),
		queryFn: () => fetchCampaignsList(),
	});

export const campaignDetailQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: campaignsKeys.detail(slug),
		queryFn: () => fetchCampaignDetail({ data: slug }),
		enabled: slug.length > 0,
	});

export const primaryCampaignQueryOptions = () =>
	queryOptions({
		queryKey: campaignsKeys.primary(),
		queryFn: () => fetchPrimaryCampaign(),
	});
