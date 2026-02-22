import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import Markdown from "react-markdown";
import {
	getPostByIdQueryOptions,
	getPostMediaQueryOptions,
} from "@/api/post/queries";

export const Route = createFileRoute("/post/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { t, i18n } = useTranslation();

	const postQuery = useQuery(
		getPostByIdQueryOptions({
			post_id: id,
			query: {
				language: i18n.language as "de" | "en" | "ar",
			},
		}),
	);

	const selectedTranslation =
		postQuery.data?.translations.find(
			(item) => item.language === i18n.language,
		) ?? postQuery.data?.translations[0];

	const mediaQuery = useQuery(
		getPostMediaQueryOptions({
			mosque_id: postQuery.data?.mosque_id ?? "",
			dir: selectedTranslation?.media ?? "",
		}),
	);

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

	const imageSources = Array.from(
		new Set(
			(mediaQuery.data ?? [])
				.filter((item) => {
					const objectPath = item.object.toLowerCase();
					return (
						objectPath.endsWith(".png") ||
						objectPath.endsWith(".jpg") ||
						objectPath.endsWith(".jpeg") ||
						objectPath.endsWith(".webp")
					);
				})
				.map((item) => item.url.replace("minio", "localhost")),
		),
	);

	const attachmentFiles = Array.from(
		new Map(
			(mediaQuery.data ?? []).map((item) => [
				item.object,
				{
					name: item.object.split("/").pop() ?? item.object,
					url: item.url.replace("minio", "localhost"),
				},
			]),
		).values(),
	);

	return (
		<article className="rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-xs sm:p-8">
			<h1 className="text-3xl font-bold tracking-tight">
				{translation?.title || t("posts.untitled")}
			</h1>
			<div className="markdown-content mt-4 text-base leading-relaxed text-muted-foreground">
				<Markdown
					components={{
						h1: ({ children }) => (
							<h2 className="mb-3 mt-5 text-2xl font-semibold text-foreground first:mt-0">
								{children}
							</h2>
						),
						h2: ({ children }) => (
							<h3 className="mb-2 mt-4 text-xl font-semibold text-foreground">
								{children}
							</h3>
						),
						p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
						ul: ({ children }) => (
							<ul className="mb-3 list-disc space-y-1 pl-6">{children}</ul>
						),
						ol: ({ children }) => (
							<ol className="mb-3 list-decimal space-y-1 pl-6">{children}</ol>
						),
						li: ({ children }) => <li>{children}</li>,
						strong: ({ children }) => (
							<strong className="font-semibold text-foreground">
								{children}
							</strong>
						),
						em: ({ children }) => <em className="italic">{children}</em>,
						code: ({ children }) => (
							<code className="time-ltr rounded bg-accent/50 px-1 py-0.5 text-sm text-foreground">
								{children}
							</code>
						),
						a: ({ href, children }) => (
							<a
								href={href}
								target="_blank"
								rel="noreferrer"
								className="time-ltr text-primary underline underline-offset-4"
							>
								{children}
							</a>
						),
					}}
				>
					{translation?.description || t("posts.no_description")}
				</Markdown>
			</div>

			<div className="mt-6">
				<h2 className="text-lg font-semibold">
					{t("posts.attachments_title")}
				</h2>
				{attachmentFiles.length === 0 ? (
					<p className="mt-2 text-sm text-muted-foreground">
						{t("posts.attachments_empty")}
					</p>
				) : (
					<ul className="mt-3 space-y-2">
						{attachmentFiles.map((file) => (
							<li key={file.url}>
								<a
									href={file.url}
									download={file.name}
									target="_blank"
									rel="noreferrer"
									className="text-sm text-primary underline underline-offset-4"
								>
									{file.name}
								</a>
							</li>
						))}
					</ul>
				)}
			</div>

			{imageSources.length > 0 && (
				<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
					{imageSources.map((source) => (
						<img
							key={source}
							src={source}
							alt={translation?.title || t("posts.untitled")}
							className="h-auto w-full rounded-2xl border border-border/40 object-cover"
						/>
					))}
				</div>
			)}
		</article>
	);
}
