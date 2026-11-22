import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { upcomingEventsQueryOptions } from "@/api/collections/events/queries";
import { pickTranslation } from "@/api/collections/translations";
import { CardSurface } from "./card-surface";
import EventCard from "./event-card";
import PendingScreen from "./pending-screen";

function EventsSection() {
	const { t, i18n } = useTranslation();

	const eventsQuery = useQuery(upcomingEventsQueryOptions());

	if (eventsQuery.isLoading) {
		return (
			<div id="events" className="scroll-mt-44">
				<PendingScreen compact className="mt-8" message={t("events.loading")} />
			</div>
		);
	}

	if (eventsQuery.error) {
		return (
			<section
				id="events"
				className="mt-8 scroll-mt-44 rounded-3xl border border-border/40 bg-card/70 p-6"
			>
				<p className="text-sm text-destructive">{t("events.error")}</p>
			</section>
		);
	}

	const events = eventsQuery.data ?? [];

	return (
		<CardSurface asChild section>
			<section
				id="events"
				className="mt-8 scroll-mt-44 rounded-3xl bg-transparent p-6 backdrop-blur-md sm:p-8"
			>
				<div className="mb-5">
					<h2 className="text-4xl font-semibold tracking-tight">{t("events.title")}</h2>
				</div>

				{events.length === 0 ? (
					<p className="text-sm text-foreground">{t("events.empty")}</p>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{events.map((item) => {
							const translation = pickTranslation(item.translations, i18n.language);

							return (
								<EventCard
									key={item.id}
									title={translation?.title || t("events.untitled")}
									description={translation?.description || t("events.no_description")}
									location={translation?.location}
									startsAt={item.starts_at}
									thumbnailId={typeof item.thumbnail === "string" ? item.thumbnail : undefined}
								/>
							);
						})}
					</div>
				)}
			</section>
		</CardSurface>
	);
}

export default EventsSection;
