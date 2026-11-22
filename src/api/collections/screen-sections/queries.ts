import type { QueryFilter } from "@directus/sdk";
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsScreenSections } from "../../generated/sdk.gen";
import type { DirectusSchema } from "../schema";

export const screenSectionsKeys = {
	all: ["screen-sections"] as const,
};

// `visible_from`/`visible_until` define a display window (start inclusive,
// end exclusive); empty means unbounded on that side
// (izr-cms-discovery.md §5).
function activeScreenSectionsFilter(
	now: string,
): QueryFilter<DirectusSchema, DirectusSchema["screen_sections"][number]> {
	return {
		enabled: { _eq: true },
		_and: [
			{ _or: [{ visible_from: { _null: true } }, { visible_from: { _lte: now } }] },
			{ _or: [{ visible_until: { _null: true } }, { visible_until: { _gt: now } }] },
		],
	};
}

const fetchActiveScreenSections = createServerFn({ method: "GET" }).handler(async () => {
	const now = new Date().toISOString();
	const { data: body } = await readItemsScreenSections({
		query: {
			filter: JSON.stringify(activeScreenSectionsFilter(now)),
			// Sort by `sort`, ties by `id` (izr-cms-discovery.md §5).
			sort: ["sort", "id"],
		},
		throwOnError: true,
	});
	return body?.data ?? [];
});

export const activeScreenSectionsQueryOptions = () =>
	queryOptions({
		queryKey: screenSectionsKeys.all,
		queryFn: () => fetchActiveScreenSections(),
	});
