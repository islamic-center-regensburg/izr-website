import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const DonationDashboard = lazy(() => import("@/components/donation-dashboard"));

function DashboardFallback() {
	return (
		<div className="container mx-auto px-4">
			<div className="w-full animate-pulse rounded-2xl bg-primary/10 h-screen" />
		</div>
	);
}

function DashboardPage() {
	return (
		<div className="py-10">
			<Suspense fallback={<DashboardFallback />}>
				<DonationDashboard />
			</Suspense>
		</div>
	);
}

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});
