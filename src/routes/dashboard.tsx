import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import PendingScreen from "@/components/pending-screen";

const DonationDashboard = lazy(() => import("@/pages/dashboard"));

function DashboardPage() {
	return (
		<Suspense fallback={<PendingScreen />}>
			<DonationDashboard />
		</Suspense>
	);
}

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});
