import type { QueryFilter } from "@directus/sdk";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsPrayerTimes, readSingleItemsPrayerTimes } from "../../generated/sdk.gen";
import type { DirectusSchema } from "../schema";

export const prayerTimesKeys = {
	all: ["prayer-times"] as const,
	range: (from: string, to: string) => [...prayerTimesKeys.all, "range", from, to] as const,
	detail: (date: string) => [...prayerTimesKeys.all, "detail", date] as const,
};

export type GetPrayerTimesRangeParams = {
	from: string;
	to: string;
};

function dateRangeFilter(
	from: string,
	to: string,
): QueryFilter<DirectusSchema, DirectusSchema["prayer_times"][number]> {
	return { date: { _between: [from, to] } };
}

const fetchPrayerTimesRange = createServerFn({ method: "GET" })
	.inputValidator((params: GetPrayerTimesRangeParams) => params)
	.handler(async ({ data: { from, to } }) => {
		const { data: body } = await readItemsPrayerTimes({
			query: {
				filter: JSON.stringify(dateRangeFilter(from, to)),
				sort: ["date"],
			},
			throwOnError: true,
		});
		console.log(body?.data)

		return body?.data ?? [];
	});

const fetchPrayerTimesDetail = createServerFn({ method: "GET" })
	.inputValidator((date: string) => date)
	.handler(async ({ data: date }) => {
		const { data: body } = await readSingleItemsPrayerTimes({
			path: { id: date },
			throwOnError: true,
		});
		console.log(body?.data)
		return body?.data;
	});

// `prayer_times`'s primary key is `date` (a "YYYY-MM-DD" string), not an
// auto-increment id (izr-cms-discovery.md §6).
export const prayerTimesRangeQueryOptions = (params: GetPrayerTimesRangeParams) =>
	queryOptions({
		queryKey: prayerTimesKeys.range(params.from, params.to),
		queryFn: () => fetchPrayerTimesRange({ data: params }),
	});

export const prayerTimesDetailQueryOptions = (date: string) =>
	queryOptions({
		queryKey: prayerTimesKeys.detail(date),
		queryFn: () => fetchPrayerTimesDetail({ data: date }),
		enabled: Boolean(date),
	});
