import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useMatch,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import DocumentLanguageSync from "@/components/document-language-sync";
import Navbar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import "@/i18n";
import Bg from "@/components/bg";
import Footer from "@/pages/home-page/footer";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Islamisches Zentrum Regensburg",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const dashboardMatch = useMatch({ from: "/dashboard", shouldThrow: false });
	const fullscreen = dashboardMatch?.search.fullscreen === true;

	return (
		<html lang="de-DE">
			<head>
				<HeadContent />
			</head>
			<body
				className={
					fullscreen
						? "flex h-dvh flex-col overflow-hidden"
						: "flex min-h-screen flex-col"
				}
			>
				<TanStackQueryProvider>
					<DocumentLanguageSync />
					<Bg
						className={
							fullscreen
								? "flex min-h-0 flex-1 flex-col overflow-hidden"
								: "flex flex-1 flex-col"
						}
					>
						{!fullscreen && <Navbar />}
						<main
							className={
								fullscreen
									? "w-full flex-1 overflow-visible"
									: "container m-auto flex-1 overflow-visible pt-20 w-full"
							}
						>
							{children}
						</main>
						{!fullscreen && (
							<footer>
								<Footer />
							</footer>
						)}
					</Bg>

					<Toaster />
					{!fullscreen && (
						<TanStackDevtools
							config={{ position: "bottom-right" }}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
					)}
				</TanStackQueryProvider>
				<Scripts />
			</body>
		</html>
	);
}
