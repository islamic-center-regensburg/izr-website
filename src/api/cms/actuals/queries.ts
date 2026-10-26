import { readItems } from "@directus/sdk";
import { queryOptions } from "@tanstack/react-query";
import { directus } from "@/lib/directus";
import type { Actual, ActualSortField } from "./types";

// Allowed sort fields (with optional "-" prefix for descending)

export type GetAllActualsParams = {
	lang: string;
	limit?: number;
	page?: number;
	sort?: ActualSortField;
};

export const actualsKeys = {
	all: ["actuals"] as const,
	lists: () => [...actualsKeys.all, "list"] as const,
	list: (params: GetAllActualsParams) =>
		[...actualsKeys.lists(), params] as const,
	details: () => [...actualsKeys.all, "detail"] as const,
	detail: (id: string, lang: string) =>
		[...actualsKeys.details(), id, lang] as const,
};

export const getAllActualsQueryOptions = ({
	lang,
	limit = 10,
	page = 1,
	sort = "-date_updated",
}: GetAllActualsParams) =>
	queryOptions({
		queryKey: actualsKeys.list({ lang, limit, page, sort }),
		queryFn: async () => {
			const data = await directus.request(
				readItems("actuals", {
					fields: ["*", { translations: ["*"] }],
					deep: {
						translations: {
							_filter: {
								languages_code: { _eq: lang },
							},
						},
					},
					sort: [sort],
					limit,
					page,
				}),
			);
			return data as Actual[];
		},
	});

export const getActualByIdQueryOptions = (id: string, lang: string) =>
	queryOptions({
		queryKey: actualsKeys.detail(id, lang),
		queryFn: async () => {
			const data = await directus.request(
				readItems("actuals", {
					fields: ["*", { translations: ["*"] }],
					deep: {
						translations: {
							_filter: {
								languages_code: { _eq: lang },
							},
						},
					},
					filter: {
						id: { _eq: id },
					},
					limit: 1,
				}),
			);
			return (data as Actual[])[0] ?? null;
		},
	});

export const getAdjacentActualsQueryOptions = (
	currentDate: string,
	lang: string,
) =>
	queryOptions({
		queryKey: [...actualsKeys.all, "adjacent", currentDate, lang] as const,
		queryFn: async () => {
			const [previous, next] = await Promise.all([
				// Previous = older post (date_updated < current)
				directus.request(
					readItems("actuals", {
						fields: ["id", { translations: ["title", "languages_code"] }],
						deep: {
							translations: {
								_filter: { languages_code: { _eq: lang } },
							},
						},
						filter: {
							date_updated: { _lt: currentDate } as any,
						},
						sort: ["-date_updated"],
						limit: 1,
					}),
				),
				// Next = newer post (date_updated > current)
				directus.request(
					readItems("actuals", {
						fields: ["id", { translations: ["title", "languages_code"] }],
						deep: {
							translations: {
								_filter: { languages_code: { _eq: lang } },
							},
						},
						filter: {
							date_updated: { _gt: currentDate } as any,
						},
						sort: ["date_updated"],
						limit: 1,
					}),
				),
			]);

			return {
				previous: (previous as Actual[])[0] ?? null,
				next: (next as Actual[])[0] ?? null,
			};
		},
		enabled: !!currentDate,
	});
