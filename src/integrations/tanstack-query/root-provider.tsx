import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

type Context = {
	queryClient: QueryClient;
};

let clientContext: Context | undefined;

function createContext(): Context {
	return {
		queryClient: new QueryClient(),
	};
}

export function getContext(): Context {
	// On the server, every request must get its own fresh QueryClient —
	// memoizing it here would leak one user's cached data (and their
	// server-only Directus reads) into every other request handled by the
	// same Node process. In the browser there's only one "request" (the
	// page load), so we memoize once and reuse it across client-side
	// navigation to keep the cache warm.
	if (typeof document === "undefined") {
		return createContext();
	}

	if (!clientContext) {
		clientContext = createContext();
	}

	return clientContext;
}

export default function TanStackQueryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { queryClient } = getContext();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

