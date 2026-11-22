import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { newsListQueryOptions } from "@/api/collections/news/queries";
import { pickTranslation } from "@/api/collections/translations";
import { CardSurface } from "./card-surface";
import PendingScreen from "./pending-screen";
import PostCard from "./post-card";

function PostsSection() {
	const { t, i18n } = useTranslation();

	const newsQuery = useQuery(newsListQueryOptions({ limit: 6 }));

	if (newsQuery.isLoading) {
		return (
			<div id="posts" className="scroll-mt-44">
				<PendingScreen compact className="mt-8" message={t("posts.loading")} />
			</div>
		);
	}

	if (newsQuery.error) {
		return (
			<section
				id="posts"
				className="mt-8 scroll-mt-44 rounded-3xl border border-border/40 bg-card/70 p-6"
			>
				<p className="text-sm text-destructive">{t("posts.error")}</p>
			</section>
		);
	}

	const news = newsQuery.data ?? [];

	return (
		<CardSurface asChild section>
			<section
				id="posts"
				className="mt-8 scroll-mt-44 rounded-3xl bg-transparent p-6 backdrop-blur-md sm:p-8"
			>
				<div className="mb-5">
					<h2 className="text-4xl font-semibold tracking-tight">
						{t("posts.title")}
					</h2>
				</div>

				{news.length === 0 ? (
					<p className="text-sm text-foreground">{t("posts.empty")}</p>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{news.map((item) => {
							const translation = pickTranslation(item.translations, i18n.language);

							return (
								<PostCard
									key={item.id}
									slug={translation?.slug ?? ""}
									title={translation?.title || t("posts.untitled")}
									description={translation?.body || t("posts.no_description")}
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

export default PostsSection;
