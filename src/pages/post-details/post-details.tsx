import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getPostByIdQueryOptions } from "@/api/post/queries";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import MarkdonwRenderer from "./markdonw-renderer";
import ZoomableImage from "./zoomable-image";

function PostDetails() {
	const { id } = useParams({ from: "/post/$id" });
	const { t, i18n } = useTranslation();
	const postQuery = useQuery(
		getPostByIdQueryOptions({
			post_id: id,
			query: {
				language: i18n.language as "de" | "en" | "ar",
			},
		}),
	);

	if (postQuery.data?.translations.length === 0) {
	}
	const selectedTranslation = postQuery.data?.translations[0];

	if (postQuery.isLoading) {
		return (
			<section className="rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-muted-foreground">{t("posts.loading")}</p>
			</section>
		);
	}

	if (postQuery.error || !postQuery.data) {
		return (
			<section className="rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("posts.error")}</p>
			</section>
		);
	}

	const translation = selectedTranslation;
	const mediaItems = translation?.media ?? [];

	const imageSources = Array.from(
		new Set(
			mediaItems
				.filter((item) => {
					const objectPath = item.object.toLowerCase();
					return (
						objectPath.endsWith(".png") ||
						objectPath.endsWith(".jpg") ||
						objectPath.endsWith(".jpeg") ||
						objectPath.endsWith(".webp")
					);
				})
				.map((item) => item.url),
		),
	);

	return (
		<article className="rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-xs sm:p-8">
			<h1 className="title-content text-3xl font-bold tracking-tight">
				{translation?.title || t("posts.untitled")}
			</h1>
			<div className="markdown-content mt-4 text-base leading-relaxed text-muted-foreground">
				<MarkdonwRenderer
					content={translation?.description || t("posts.no_description")}
				/>
			</div>

			{imageSources.length > 0 && (
				<div className="mt-8">
					<Carousel
						opts={{ align: "start", loop: imageSources.length > 1 }}
						className="w-full"
					>
						<CarouselContent>
							{imageSources.map((source) => (
								<CarouselItem
									key={source}
									className="sm:basis-1/2 lg:basis-1/3"
								>
									<ZoomableImage
										src={source}
										alt={translation?.title || t("posts.untitled")}
										className=" h-full w-auto md:h-96 md:w-auto cursor-pointer rounded-2xl border border-border/40 object-cover"
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						{imageSources.length > 1 && (
							<>
								<CarouselPrevious />
								<CarouselNext />
							</>
						)}
					</Carousel>
				</div>
			)}
		</article>
	);
}

export default PostDetails;
