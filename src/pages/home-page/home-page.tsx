import { lazy, Suspense } from "react";
import PendingScreen from "@/components/pending-screen";

const Hero = lazy(() => import("@/pages/home-page/hero"));
const PrayerTimesSection = lazy(
	() => import("@/pages/home-page/prayer-times-section/prayer-times-section"),
);
const DonationSection = lazy(() => import("@/components/donation-section"));
const CampaignsGallery = lazy(
	() => import("@/pages/home-page/campaigns-gallery/campaigns-gallery"),
);
const PostsSection = lazy(() => import("@/components/posts-section"));
const EventsSection = lazy(() => import("@/components/events-section"));

function HomePage() {
	return (
		<div className="py-10">
			<Suspense fallback={<PendingScreen />}>
				<Hero />
				<CampaignsGallery />
				<PrayerTimesSection />
				<DonationSection />
				<EventsSection />
				<PostsSection />
			</Suspense>
		</div>
	);
}

export default HomePage;

