import { lazy, Suspense } from "react";

const Hero = lazy(() => import("@/pages/home-page/hero"));
const PrayerTimesSection = lazy(
	() => import("@/pages/home-page/prayer-times-section/prayer-times-section"),
);
const DonationSection = lazy(() => import("@/components/donation-section"));
const PostsSection = lazy(() => import("@/components/posts-section"));

function SectionFallback({ heightClass }: { heightClass: string }) {
	return (
		<div className="container mx-auto px-4">
			<div
				className={`w-full animate-pulse rounded-2xl bg-primary/10 ${heightClass}`}
			/>
		</div>
	);
}

function HomePage() {
	return (
		<div className="py-10">
			<Suspense fallback={<SectionFallback heightClass="h-screen" />}>
				<Hero />
				<PrayerTimesSection />
				<DonationSection />
				<PostsSection />
			</Suspense>
		</div>
	);
}

export default HomePage;
