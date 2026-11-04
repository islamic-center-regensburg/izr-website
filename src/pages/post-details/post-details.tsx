import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	getActualByIdQueryOptions,
	getAdjacentActualsQueryOptions,
} from "@/api/cms/actuals/queries";
import {
	CallToActionButton,
	CallToActionCard,
} from "@/components/call-to-action-card";
import { CardSurface } from "@/components/card-surface";
import PendingScreen from "@/components/pending-screen";
import { Card } from "@/components/ui/card";
import { DonationCallToAction } from "@/pages/dashboard/components/donation-call-to-action";
import { usePostContent } from "./use-post-content";
import "./post-content.css";

function ContentsLinks({
	headings,
}: {
	headings: { id: string; label: string }[];
}) {
	const { t } = useTranslation();
	return (
		<nav
			aria-label={t("posts.detail.contents")}
			className="max-h-[40vh] overflow-y-auto"
		>
			<ol className="space-y-4">
				{headings.map((heading, index) => (
					<li key={heading.id}>
						<a
							href={`#${encodeURIComponent(heading.id)}`}
							className="flex gap-4 rounded-lg py-1 text-sm leading-relaxed hover:underline focus-visible:outline-2 focus-visible:outline-donation-gold"
						>
							<span
								aria-hidden="true"
								className="shrink-0 text-xs text-donation-gold"
							>
								{String(index + 1).padStart(2, "0")}
							</span>
							<span>{heading.label}</span>
						</a>
					</li>
				))}
			</ol>
		</nav>
	);
}

function PostDetails() {
	const { id } = useParams({ from: "/post/$id" });
	const { t, i18n } = useTranslation();

	const actualQuery = useQuery(getActualByIdQueryOptions(id, i18n.language));
	const translation = actualQuery.data?.translations?.[0];
	const content = usePostContent(translation?.content || "");

	const adjacentQuery = useQuery(
		getAdjacentActualsQueryOptions(
			actualQuery.data?.date_updated ?? "",
			i18n.language,
		),
	);

	if (actualQuery.isLoading) {
		return <PendingScreen message={t("posts.loading")} />;
	}

	if (actualQuery.error || !actualQuery.data) {
		return (
			<section className="rounded-3xl border border-border/40 bg-card/70 p-6">
				<p className="text-sm text-destructive">{t("posts.error")}</p>
			</section>
		);
	}

	const previous = adjacentQuery.data?.previous;
	const next = adjacentQuery.data?.next;
	const isRtl = i18n.dir() === "rtl";

	return (
		<article className="mx-auto mt-8 max-w-6xl rounded-3xl bg-[#e8f8f5]/95 px-6 pb-16 pt-8 text-donation-primary backdrop-blur-xl sm:px-8 sm:pt-12">
			<nav
				aria-label={t("posts.detail.breadcrumb")}
				className="mb-10 flex flex-wrap gap-2 text-xs text-donation-muted"
			>
				<Link to="/" className="hover:underline">
					{t("posts.detail.home")}
				</Link>
				<span aria-hidden="true">/</span>
				<Link to="/" hash="posts" className="hover:underline">
					{t("posts.title")}
				</Link>
				<span aria-hidden="true">/</span>
				<span aria-current="page">
					{translation?.title || t("posts.untitled")}
				</span>
			</nav>
			<header className="relative mb-12 pe-0 lg:pe-72">
				<p className="mb-5 text-xs font-semibold tracking-widest text-donation-muted uppercase">
					{t("posts.detail.eyebrow")}
				</p>
				<h1 className="title-content font-serif text-5xl leading-[1.1] font-bold tracking-tight wrap-anywhere sm:text-7xl">
					{translation?.title || t("posts.untitled")}
				</h1>
				{content?.introduction && (
					<div
						className="post-content post-introduction mt-7 max-w-3xl"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized with DOMPurify in usePostContent
						dangerouslySetInnerHTML={{ __html: content.introduction }}
					/>
				)}
				<p className="mt-7 text-sm text-donation-muted">
					{t("posts.detail.publisher")}
				</p>
				<img
					src="/post-editorial-ornament.svg"
					alt=""
					aria-hidden="true"
					className="pointer-events-none absolute inset-e-0 top-0 hidden opacity-45 lg:block"
				/>
				<div className="mt-10 h-0.5 w-16 bg-donation-gold" />
			</header>
			{content && content.headings.length > 0 && (
				<details className="mb-8 rounded-3xl bg-white/45 p-5 backdrop-blur-xl lg:hidden">
					<summary className="cursor-pointer text-sm font-semibold">
						{t("posts.detail.contents")}
					</summary>
					<div className="mt-5">
						<ContentsLinks headings={content.headings} />
					</div>
				</details>
			)}
			<div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20.5rem] lg:gap-16">
				<div className="min-w-0">
					{content ? (
						<div
							className="post-content"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized with DOMPurify in usePostContent
							dangerouslySetInnerHTML={{
								__html: content.html,
							}}
						/>
					) : (
						<PendingScreen compact />
					)}
					{content && !content.html && <p>{t("posts.no_description")}</p>}
				</div>
				<aside className="space-y-6 lg:sticky lg:top-44">
					{content && content.headings.length > 0 && (
						<Card className="hidden gap-5 rounded-3xl bg-white/45 p-6 backdrop-blur-xl lg:flex">
							<h2 className="font-sans text-xs font-semibold text-donation-muted uppercase">
								{t("posts.detail.contents")}
							</h2>
							<ContentsLinks headings={content.headings} />
						</Card>
					)}
					<DonationCallToAction variant="editorial" />
				</aside>
			</div>
			<CallToActionCard className="mt-16 gap-5 rounded-3xl p-8 sm:p-10">
				<p className="text-xs tracking-widest text-donation-mint uppercase">
					{t("posts.detail.together")}
				</p>
				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
					<h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">
						{t("posts.detail.closingTitle")}
					</h2>
					<CallToActionButton asChild className="mt-0 shrink-0">
						<Link to="/dashboard">
							{t("donation.dashboard.viewDashboard")}
							<ArrowRight aria-hidden="true" className="rtl:rotate-180" />
						</Link>
					</CallToActionButton>
				</div>
				<p className="text-sm">{t("donation.dashboard.ctaDescription")}</p>
			</CallToActionCard>

			{/* Prev/Next Navigation */}
			{(previous || next) && (
				<nav
					className="mt-10 grid grid-cols-1 gap-4 border-t border-border/40 pt-6 sm:grid-cols-2"
					aria-label={t("posts.navigation.aria_label")}
				>
					{previous ? (
						<CardSurface asChild>
							<Link
								to="/post/$id"
								params={{ id: previous.id }}
								className="group flex flex-col gap-1 rounded-2xl bg-background/40 p-4 transition-colors hover:bg-accent/30 sm:col-start-1"
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
						</CardSurface>
					) : (
						<div className="hidden sm:block" />
					)}

					{next ? (
						<CardSurface asChild>
							<Link
								to="/post/$id"
								params={{ id: next.id }}
								className="group flex flex-col gap-1 rounded-2xl bg-background/40 p-4 transition-colors hover:bg-accent/30 sm:col-start-2 sm:text-end"
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
						</CardSurface>
					) : (
						<div className="hidden sm:block" />
					)}
				</nav>
			)}
			<Link
				to="/"
				hash="posts"
				className="mt-10 inline-flex items-center gap-2 text-sm hover:underline"
			>
				<ChevronLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
				{t("posts.detail.back")}
			</Link>
		</article>
	);
}

export default PostDetails;
