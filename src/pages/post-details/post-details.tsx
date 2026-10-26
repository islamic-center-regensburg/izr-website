import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	getActualByIdQueryOptions,
	getAdjacentActualsQueryOptions,
} from "@/api/cms/actuals/queries";

function PostDetails() {
	const { id } = useParams({ from: "/post/$id" });
	const { t, i18n } = useTranslation();

	const actualQuery = useQuery(getActualByIdQueryOptions(id, i18n.language));

	const adjacentQuery = useQuery(
		getAdjacentActualsQueryOptions(
			actualQuery.data?.date_updated ?? "",
			i18n.language,
		),
	);

	if (actualQuery.isLoading) {
		return (
			<section className="rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-foreground">{t("posts.loading")}</p>
			</section>
		);
	}

	if (actualQuery.error || !actualQuery.data) {
		return (
			<section className="rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("posts.error")}</p>
			</section>
		);
	}

	const translation = actualQuery.data.translations?.[0];
	const previous = adjacentQuery.data?.previous;
	const next = adjacentQuery.data?.next;
	const isRtl = i18n.dir() === "rtl";

	return (
		<article className="rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8">
			<h1 className="title-content text-3xl font-bold tracking-tight font-serif!">
				{translation?.title || t("posts.untitled")}
			</h1>

			<div
				className="post-content prose prose-sm dark:prose-invert mt-4 max-w-none text-base leading-relaxed text-foreground [&_li]:ms-10"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: content comes from trusted CMS
				dangerouslySetInnerHTML={{
					__html: translation?.content || t("posts.no_description"),
				}}
			/>

			{/* Prev/Next Navigation */}
			{(previous || next) && (
				<nav
					className="mt-10 grid grid-cols-1 gap-4 border-t border-border/40 pt-6 sm:grid-cols-2"
					aria-label={t("posts.navigation.aria_label")}
				>
					{previous ? (
						<Link
							to="/post/$id"
							params={{ id: previous.id }}
							className="group flex flex-col gap-1 rounded-2xl border border-border/40 bg-background/40 p-4 transition-colors hover:bg-accent/30 sm:col-start-1"
						>
							<span className="flex items-center gap-1 text-xs text-foreground/60">
								{isRtl ? (
									<ChevronRight className="h-3 w-3" />
								) : (
									<ChevronLeft className="h-3 w-3" />
								)}
								{t("posts.navigation.previous")}
							</span>
							<span className="line-clamp-1 text-sm font-semibold tracking-tight group-hover:text-primary">
								{previous.translations?.[0]?.title ?? t("posts.untitled")}
							</span>
						</Link>
					) : (
						<div className="hidden sm:block" />
					)}

					{next ? (
						<Link
							to="/post/$id"
							params={{ id: next.id }}
							className="group flex flex-col gap-1 rounded-2xl border border-border/40 bg-background/40 p-4 transition-colors hover:bg-accent/30 sm:col-start-2 sm:text-end"
						>
							<span className="flex items-center gap-1 text-xs text-foreground/60 sm:justify-end">
								{t("posts.navigation.next")}
								{isRtl ? (
									<ChevronLeft className="h-3 w-3" />
								) : (
									<ChevronRight className="h-3 w-3" />
								)}
							</span>
							<span className="line-clamp-1 text-sm font-semibold tracking-tight group-hover:text-primary">
								{next.translations?.[0]?.title ?? t("posts.untitled")}
							</span>
						</Link>
					) : (
						<div className="hidden sm:block" />
					)}
				</nav>
			)}
		</article>
	);
}

export default PostDetails;
