import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { MosqueProvider } from "@/contexts";

let context:
	| {
			queryClient: QueryClient;
			mosqueName: string;
	  }
	| undefined;

export function getContext() {
	if (context) {
		return context;
	}

	const queryClient = new QueryClient();

	context = {
		queryClient,
		mosqueName: import.meta.env.VITE_MOSQUE_NAME,
	};

	return context;
}

export default function TanStackQueryProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { queryClient, mosqueName } = getContext();

	return (
		<QueryClientProvider client={queryClient}>
			<MosqueProvider mosqueName={mosqueName}>{children}</MosqueProvider>
		</QueryClientProvider>
	);
}
