import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsLanguages } from "../../generated/sdk.gen";

export const languagesKeys = {
	all: ["languages"] as const,
};

// Shared reference data (`de`/`en`/`ar`) used by every translation
// collection; includes `direction` (`ltr`/`rtl`) — use it instead of
// hardcoding RTL detection for Arabic (izr-cms-discovery.md §4).
const fetchLanguages = createServerFn({ method: "GET" }).handler(async () => {
	const { data: body } = await readItemsLanguages({ throwOnError: true });
	return body?.data ?? [];
});

export const languagesQueryOptions = () =>
	queryOptions({
		queryKey: languagesKeys.all,
		queryFn: () => fetchLanguages(),
		// Rarely changes; avoid refetching it on every mount.
		staleTime: 60 * 60 * 1000,
	});
