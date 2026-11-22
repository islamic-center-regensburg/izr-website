import { createFileRoute } from "@tanstack/react-router";
import CampaignDashboardPage from "@/pages/campaign-dashboard/campaign-dashboard-page";

export const Route = createFileRoute("/campaigns/$slug")({
	component: CampaignDashboardPage,
});
