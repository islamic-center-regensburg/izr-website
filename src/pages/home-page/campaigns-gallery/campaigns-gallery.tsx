import { useTranslation } from "react-i18next";
import { CardSurface } from "@/components/card-surface";
import PendingScreen from "@/components/pending-screen";
import { CampaignCard } from "./campaign-card";
import { useCampaignsGalleryData } from "./hooks/use-campaigns-gallery-data";

function CampaignsGallery() {
	const { t } = useTranslation();
	const { items, isLoading, isError } = useCampaignsGalleryData();

	if (isLoading) {
		return (
			<PendingScreen compact className="mt-8" message={t("donation.gallery.loading")} />
		);
	}

	if (isError) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("donation.gallery.error")}</p>
			</section>
		);
	}

	return (
		<CardSurface asChild section>
			<section className="mt-8 rounded-3xl bg-transparent p-6 backdrop-blur-md sm:p-8">
				<div className="mb-5">
					<h2 className="text-4xl font-semibold tracking-tight">
						{t("donation.gallery.title")}
					</h2>
					<p className="mt-2 text-sm text-foreground">
						{t("donation.gallery.subtitle")}
					</p>
				</div>

				{items.length === 0 ? (
					<p className="text-sm text-foreground">{t("donation.gallery.empty")}</p>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((campaign) => (
							<CampaignCard key={campaign.id} campaign={campaign} />
						))}
					</div>
				)}
			</section>
		</CardSurface>
	);
}

export default CampaignsGallery;
