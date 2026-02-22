import Hero from "@/components/Hero";
import PostsSection from "@/components/posts-section";
import PrayerTimesSection from "@/components/prayer-times-section";

function HomePage() {
	return (
		<div className="py-10">
			<Hero />
			<PrayerTimesSection />
			<PostsSection />
		</div>
	);
}

export default HomePage;
