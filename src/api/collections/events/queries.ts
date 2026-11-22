import type { QueryFilter } from "@directus/sdk";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsEvents, readSingleItemsEvents } from "../../generated/sdk.gen";
import type { ItemsEvents, ItemsEventsTranslations } from "../../generated/types.gen";
import type { DirectusSchema } from "../schema";

// See news/queries.ts's `NewsItem` for why `thumbnail` and
// `translations[].events_id` are re-typed here — same generated-`Files` /
// circular-back-reference blowup, same fix.
type EventTranslation = Omit<ItemsEventsTranslations, "events_id"> & { events_id?: number | string };
export type EventItem = Omit<ItemsEvents, "thumbnail" | "translations"> & {
	thumbnail?: string | null;
	translations?: Array<number | EventTranslation> | null;
};

export const eventsKeys = {
	all: ["events"] as const,
	lists: () => [...eventsKeys.all, "list"] as const,
	upcoming: () => [...eventsKeys.lists(), "upcoming"] as const,
	details: () => [...eventsKeys.all, "detail"] as const,
	detail: (id: number) => [...eventsKeys.details(), id] as const,
};

// "published" visibility is not enforced by the backend
// (izr-cms-discovery.md §5) — every consumer must filter it explicitly.
// `ends_at` is not validated to be after `starts_at` either, but that's a
// data-authoring concern, not something a read query can correct for.
function upcomingPublishedEventsFilter(
	now: string,
): QueryFilter<DirectusSchema, DirectusSchema["events"][number]> {
	return {
		status: { _eq: "published" },
		starts_at: { _gte: now },
	};
}

const fetchUpcomingEvents = createServerFn({ method: "GET" }).handler(async () => {
	const now = new Date().toISOString();
	// `client.get()` unwraps the HTTP status code (200), but the resolved
	// `data` is still Directus's own `{ data, meta }` envelope — unwrap
	// again to get the actual array/item.
	const { data: body } = await readItemsEvents({
		query: {
			filter: JSON.stringify(upcomingPublishedEventsFilter(now)),
			sort: ["starts_at"],
			fields: ["*", "translations.*"],
		},
		throwOnError: true,
	});
	return (body?.data ?? []) as EventItem[];
});

const fetchEventDetail = createServerFn({ method: "GET" })
	.inputValidator((id: number) => id)
	.handler(async ({ data: id }) => {
		const { data: body } = await readSingleItemsEvents({
			path: { id },
			query: { fields: ["*", "translations.*"] },
			throwOnError: true,
		});
		return body?.data as EventItem | undefined;
	});

export const upcomingEventsQueryOptions = () =>
	queryOptions({
		queryKey: eventsKeys.upcoming(),
		queryFn: () => fetchUpcomingEvents(),
	});

export const eventDetailQueryOptions = (id: number) =>
	queryOptions({
		queryKey: eventsKeys.detail(id),
		queryFn: () => fetchEventDetail({ data: id }),
		enabled: Number.isFinite(id),
	});
