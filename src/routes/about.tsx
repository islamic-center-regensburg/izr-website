import { createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";

export const Route = createFileRoute("/about")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();

	const contactItems = [
		{
			label: t("about.contacts.first_chairman.label"),
			email: t("about.contacts.first_chairman.email"),
		},
		{
			label: t("about.contacts.board.label"),
			email: t("about.contacts.board.email"),
		},
		{
			label: t("about.contacts.it.label"),
			email: t("about.contacts.it.email"),
		},
		{
			label: t("about.contacts.rental.label"),
			email: t("about.contacts.rental.email"),
		},
	];

	return (
		<section className="mx-auto mt-8 rounded-3xl border border-border/40 bg-transparent backdrop-blur-xs sm:p-8">
			<div className="mx-auto space-y-6">
				<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
					{t("about.title")}
				</h1>

				<p className="text-base leading-relaxed text-muted-foreground">
					<Trans
						i18nKey="about.paragraphs.p1"
						components={{
							address: (
								<span className="time-ltr inline font-medium text-foreground" />
							),
						}}
					/>
				</p>
				<p className="text-base leading-relaxed text-muted-foreground">
					{t("about.paragraphs.p2")}
				</p>
				<p className="text-base leading-relaxed text-muted-foreground">
					{t("about.paragraphs.p3")}
				</p>
				<p className="text-base leading-relaxed text-muted-foreground">
					{t("about.paragraphs.p4")}
				</p>

				<div className="rounded-2xl border border-border/50 bg-background/40 p-5 backdrop-blur-sm">
					<p className="text-base leading-relaxed text-muted-foreground">
						{t("about.instagram_text")}{" "}
						<a
							href="https://instagram.com/islamischeszentrumregensburg_"
							target="_blank"
							rel="noreferrer"
							className="time-ltr font-medium text-primary underline underline-offset-4"
						>
							@islamischeszentrumregensburg_
						</a>
					</p>
				</div>

				<div className="space-y-3">
					<h2 className="text-xl font-semibold">{t("about.contact_title")}</h2>
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{contactItems.map((item) => (
							<div
								key={item.email}
								className="rounded-2xl border border-primary/40 bg-primary p-4 text-primary-foreground"
							>
								<p className="text-sm opacity-90">{item.label}</p>
								<a
									href={`mailto:${item.email}`}
									className="time-ltr mt-1 block break-all text-sm font-semibold underline underline-offset-4"
								>
									{item.email}
								</a>
							</div>
						))}
					</div>
				</div>

				<p className="text-base leading-relaxed text-muted-foreground">
					{t("about.paragraphs.p5")}
				</p>
			</div>
		</section>
	);
}
