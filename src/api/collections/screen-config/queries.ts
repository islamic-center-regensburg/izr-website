import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { readItemsScreenConfig } from "../../generated/sdk.gen";

export const screenConfigKeys = {
	all: ["screen-config"] as const,
};

// `screen_config` is a Directus singleton — one object, not an array
// (izr-cms-discovery.md §3, §6).
const fetchScreenConfig = createServerFn({ method: "GET" }).handler(async () => {
	const { data: body } = await readItemsScreenConfig({ throwOnError: true });
	return body?.data;
});

export const screenConfigQueryOptions = () =>
	queryOptions({
		queryKey: screenConfigKeys.all,
		queryFn: () => fetchScreenConfig(),
	});
