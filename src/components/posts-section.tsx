import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getAllActualsQueryOptions } from "@/api/cms/actuals/queries";
import PostCard from "./post-card";

function PostsSection() {
	const { t, i18n } = useTranslation();

	const actualsQuery = useQuery(
		getAllActualsQueryOptions({
			lang: i18n.language,
			limit: 6,
			sort: "-date_updated",
		}),
	);

	if (actualsQuery.isLoading) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-foreground">{t("posts.loading")}</p>
			</section>
		);
	}

	if (actualsQuery.error) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("posts.error")}</p>
			</section>
		);
	}

	const actuals = actualsQuery.data ?? [];

	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8 shadow-md">
			<div className="mb-5">
				<h2 className="text-4xl font-semibold tracking-tight">
					{t("posts.title")}
				</h2>
			</div>

			{actuals.length === 0 ? (
				<p className="text-sm text-foreground">{t("posts.empty")}</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{actuals.map((actual) => {
						// Translations are already filtered by language from the API,
						// but keep a safe fallback just in case
						const translation = actual.translations?.[0];

						return (
							<PostCard
								key={actual.id}
								id={actual.id}
								title={translation?.title || t("posts.untitled")}
								description={translation?.content || t("posts.no_description")}
							/>
						);
					})}
				</div>
			)}
		</section>
	);
}

export default PostsSection;
