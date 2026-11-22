import { useParams } from "@tanstack/react-router";
import DonationDashboard from "@/pages/dashboard";

function CampaignDashboardPage() {
	const { slug } = useParams({ from: "/campaigns/$slug" });
	return <DonationDashboard campaignSlug={slug} />;
}

export default CampaignDashboardPage;
