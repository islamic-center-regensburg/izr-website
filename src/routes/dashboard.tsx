import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import PendingScreen from "@/components/pending-screen";
import i18n from "@/i18n";

const DonationDashboard = lazy(() => import("@/pages/dashboard"));

function DashboardPage() {
	const { fullscreen, callback, time = 60 } = Route.useSearch();

	useEffect(() => {
		if (!fullscreen) return;

		const previousLanguage = i18n.language;
		const languages = ["de-DE", "ar-SA", "en-US"] as const;
		let index = 0;
		void i18n.changeLanguage(languages[index]);

		const interval = window.setInterval(() => {
			index = (index + 1) % languages.length;
			void i18n.changeLanguage(languages[index]);
		}, 15_000);

		return () => {
			window.clearInterval(interval);
			void i18n.changeLanguage(previousLanguage);
		};
	}, [fullscreen]);

	useEffect(() => {
		if (!callback) return;

		const timeout = window.setTimeout(() => {
			window.location.assign(callback);
		}, time * 1_000);

		return () => window.clearTimeout(timeout);
	}, [callback, time]);

	return (
		<Suspense fallback={<PendingScreen />}>
			<DonationDashboard fullscreen={fullscreen} />
		</Suspense>
	);
}

export const Route = createFileRoute("/dashboard")({
	validateSearch: (
		search: Record<string, unknown>,
	): { fullscreen?: boolean; callback?: string; time?: number } => {
		const fullscreen = search.fullscreen ?? false;
		if (
			fullscreen !== true &&
			fullscreen !== false &&
			fullscreen !== "true" &&
			fullscreen !== "false"
		) {
			throw new Error("fullscreen must be true or false.");
		}

		const rawTime = search.time === undefined ? 60 : search.time;
		const time =
			typeof rawTime === "number" ||
			(typeof rawTime === "string" && rawTime.trim() !== "")
				? Number(rawTime)
				: Number.NaN;
		if (!Number.isFinite(time) || time < 0.001 || time > 2_147_483.647) {
			throw new Error("time must be between 0.001 and 2147483.647 seconds.");
		}

		let callback: string | undefined;
		if (search.callback !== undefined) {
			if (typeof search.callback !== "string" || !search.callback.trim()) {
				throw new Error("callback must be a nonempty route or HTTP(S) URL.");
			}
			callback = search.callback.trim();
			const url = new URL(callback, "https://dashboard.invalid");
			if (url.protocol !== "http:" && url.protocol !== "https:") {
				throw new Error("callback must be a route or HTTP(S) URL.");
			}
		}

		return {
			fullscreen: fullscreen === true || fullscreen === "true",
			callback,
			time,
		};
	},
	component: DashboardPage,
});
