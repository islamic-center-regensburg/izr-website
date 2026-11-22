import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsIqamaTimes } from "../../generated/sdk.gen";

export const iqamaTimesKeys = {
	all: ["iqama-times"] as const,
};

// Multiple rows can legitimately exist for the same prayer+weekday
// (izr-cms-discovery.md §5) — fetch and display all of them, don't dedupe
// or assume uniqueness. Exactly one of `fixed_time`/`offset_minutes` is
// meaningful per row depending on `type`; the other isn't cleared by the
// schema, so callers must branch on `type`, not just check for a truthy
// value.
const fetchIqamaTimes = createServerFn({ method: "GET" }).handler(async () => {
	const { data: body } = await readItemsIqamaTimes({
		query: { sort: ["prayer", "weekday"] },
		throwOnError: true,
	});
	return body?.data ?? [];
});

export const iqamaTimesQueryOptions = () =>
	queryOptions({
		queryKey: iqamaTimesKeys.all,
		queryFn: () => fetchIqamaTimes(),
	});
