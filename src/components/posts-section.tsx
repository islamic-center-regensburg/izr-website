import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getAllPostsQueryOptions } from "@/api/post/queries";
import { useMosque } from "@/contexts";
import PostCard from "./post-card";

function PostsSection() {
	const { t, i18n } = useTranslation();
	const { mosque, isLoading: isMosqueLoading } = useMosque();

	const postsQuery = useQuery(
		getAllPostsQueryOptions({
			mosque_id: mosque?.id ?? "",
			query: {
				size: 6,
			},
		}),
	);

	if (isMosqueLoading || postsQuery.isLoading) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-muted-foreground">{t("posts.loading")}</p>
			</section>
		);
	}

	if (postsQuery.error) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("posts.error")}</p>
			</section>
		);
	}

	const posts = postsQuery.data?.data ?? [];

	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-xs sm:p-8">
			<div className="mb-5">
				<h2 className="text-2xl font-semibold tracking-tight">
					{t("posts.title")}
				</h2>
			</div>

			{posts.length === 0 ? (
				<p className="text-sm text-muted-foreground">{t("posts.empty")}</p>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => {
						const translation =
							post.translations.find(
								(item) => item.language === i18n.language,
							) ?? post.translations[0];

						return (
							<PostCard
								key={post.id}
								id={post.id}
								title={translation?.title || t("posts.untitled")}
								description={
									translation?.description || t("posts.no_description")
								}
							/>
						);
					})}
				</div>
			)}
		</section>
	);
}

export default PostsSection;
