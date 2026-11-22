import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import PendingScreen from "@/components/pending-screen";
import { getContext } from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,

		context,

		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: PendingScreen,
		defaultPendingMs: 200,
		defaultPendingMinMs: 400,
	});

	// Streams each route loader's prefetched query cache to the client as
	// part of the SSR payload, and hydrates it there automatically. Without
	// this, `queryClient.ensureQueryData(...)` in a loader would populate
	// the cache on the server only — the client would see an empty cache
	// and refetch from scratch, defeating the point of prefetching.
	// `wrapQueryClient: false` because TanStackQueryProvider already
	// renders QueryClientProvider with this same queryClient.
	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient,
		wrapQueryClient: false,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}

