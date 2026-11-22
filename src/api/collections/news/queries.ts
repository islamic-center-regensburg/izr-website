import type { QueryFilter } from "@directus/sdk";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsNews } from "../../generated/sdk.gen";
import type { ItemsNews, ItemsNewsTranslations } from "../../generated/types.gen";
import type { DirectusSchema } from "../schema";

// The generated `ItemsNews.thumbnail` type expands to the full Directus
// `Files` object (folder/uploader/etc., several levels deep) because that's
// what the field *could* return if deep-fetched — but every query here only
// ever requests the bare field, so it's always just the file's id. Re-typing
// it keeps that huge generated shape from leaking into (and blowing up type
// inference in) every consumer of these functions. `translations[].news_id`
// is re-typed too — it's `number | ItemsNews` (the parent again, with that
// same un-narrowed `thumbnail`), a back-reference this app never expands.
type NewsTranslation = Omit<ItemsNewsTranslations, "news_id"> & { news_id?: number | string };
export type NewsItem = Omit<ItemsNews, "thumbnail" | "translations"> & {
	thumbnail?: string | null;
	translations?: Array<number | NewsTranslation> | null;
};

export const newsKeys = {
	all: ["news"] as const,
	lists: () => [...newsKeys.all, "list"] as const,
	list: (params: GetNewsListParams) => [...newsKeys.lists(), params] as const,
	details: () => [...newsKeys.all, "detail"] as const,
	detail: (slug: string) => [...newsKeys.details(), slug] as const,
	adjacent: (publishedAt: string) => [...newsKeys.all, "adjacent", publishedAt] as const,
};

export type GetNewsListParams = {
	limit?: number;
};

// "published" + visibility-window filtering is not enforced by the backend
// (izr-cms-discovery.md §5) — every consumer must apply it. `published_at`/
// `expires_at` empty means "always visible" on that side of the window.
function publishedNewsFilter(
	now: string,
): QueryFilter<DirectusSchema, DirectusSchema["news"][number]> {
	return {
		status: { _eq: "published" },
		_and: [
			{ _or: [{ published_at: { _null: true } }, { published_at: { _lte: now } }] },
			{ _or: [{ expires_at: { _null: true } }, { expires_at: { _gte: now } }] },
		],
	};
}

const fetchNewsList = createServerFn({ method: "GET" })
	.inputValidator((params: GetNewsListParams) => params)
	.handler(async ({ data: { limit = 20 } }) => {
		const now = new Date().toISOString();
		const { data: body } = await readItemsNews({
			query: {
				// `filter` is a plain string param (JSON-encoded) — the
				// OpenAPI-declared "form" object style can't serialize
				// Directus's nested filter trees (see openapi-ts.config.ts).
				filter: JSON.stringify(publishedNewsFilter(now)),
				sort: ["-published_at"],
				fields: ["*", "translations.*"],
				limit,
			},
			throwOnError: true,
		});
		return (body?.data ?? []) as NewsItem[];
	});

// News items have no slug of their own — slugs live per-language on
// `translations` (izr-cms-discovery.md §4) — so looking one up means
// filtering `translations.slug` rather than requesting a single item by id.
const fetchNewsDetail = createServerFn({ method: "GET" })
	.inputValidator((slug: string) => slug)
	.handler(async ({ data: slug }) => {
		const { data: body } = await readItemsNews({
			query: {
				filter: JSON.stringify({ translations: { slug: { _eq: slug } } }),
				fields: ["*", "translations.*"],
				limit: 1,
			},
			throwOnError: true,
		});
		return body?.data?.[0] as NewsItem | undefined;
	});

const fetchAdjacentNews = createServerFn({ method: "GET" })
	.inputValidator((publishedAt: string) => publishedAt)
	.handler(async ({ data: publishedAt }) => {
		const minimalFields = [
			"id",
			"translations.title",
			"translations.slug",
			"translations.languages_code",
		];

		const [previous, next] = await Promise.all([
			readItemsNews({
				query: {
					filter: JSON.stringify({
						status: { _eq: "published" },
						published_at: { _lt: publishedAt },
					}),
					sort: ["-published_at"],
					fields: minimalFields,
					limit: 1,
				},
				throwOnError: true,
			}),
			readItemsNews({
				query: {
					filter: JSON.stringify({
						status: { _eq: "published" },
						published_at: { _gt: publishedAt },
					}),
					sort: ["published_at"],
					fields: minimalFields,
					limit: 1,
				},
				throwOnError: true,
			}),
		]);

		return {
			previous: (previous.data?.data?.[0] ?? null) as NewsItem | null,
			next: (next.data?.data?.[0] ?? null) as NewsItem | null,
		};
	});

export const newsListQueryOptions = (params: GetNewsListParams = {}) =>
	queryOptions({
		queryKey: newsKeys.list(params),
		queryFn: () => fetchNewsList({ data: params }),
	});

export const newsDetailQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: newsKeys.detail(slug),
		queryFn: () => fetchNewsDetail({ data: slug }),
		enabled: slug.length > 0,
	});

// Prev/next navigation on the post detail page. Deliberately only checks
// `status`/`published_at` (not the full visibility window from
// `publishedNewsFilter`) — a slightly looser gate is an acceptable
// trade-off for secondary navigation.
export const adjacentNewsQueryOptions = (publishedAt: string | undefined) =>
	queryOptions({
		queryKey: newsKeys.adjacent(publishedAt ?? ""),
		queryFn: () => fetchAdjacentNews({ data: publishedAt ?? "" }),
		enabled: Boolean(publishedAt),
	});
