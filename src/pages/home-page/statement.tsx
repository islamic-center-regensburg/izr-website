import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statement = {
	title:
		"Stellungnahme des IZR zum Anschlag auf den Christopher Street Day (CSD) in Berlin",
	content: `Mit großer Bestürzung und tiefer Trauer verurteilen wir den Anschlag auf den Christopher Street Day (CSD) in Berlin. Unsere Gedanken und Gebete sind bei den Opfern, ihren Angehörigen sowie bei allen Menschen, die von dieser schrecklichen Tat betroffen sind.
Aus islamischer Sicht ist diese Tat aufs Schärfste zu verurteilen. Sie steht in vollkommenem Widerspruch zu den Lehren des Islam, seinen ethischen Grundlagen und seinen universellen Prinzipien. Nichts kann einen solchen Akt der Gewalt rechtfertigen.
Der Islam lehrt die Heiligkeit und Unverletzlichkeit jedes menschlichen Lebens. Jede Seele ist heilig. Jeder Körper ist heilig. Die Würde jedes Menschen ist heilig. Auch die Ehre und das Ansehen eines Menschen sind zu achten und zu schützen. Der Qur’an betont die individuelle Verantwortung des Menschen und erklärt unmissverständlich:
„Keine lasttragende Seele wird die Last einer anderen tragen.“ (Qur’an 6:164)
Niemand darf aufgrund seiner Zugehörigkeit zu einer Gruppe, seiner Identität, seiner Lebensweise oder wegen der Taten anderer verantwortlich gemacht oder gar zum Opfer von Hass und Gewalt werden.
Zu den grundlegenden Lehren des Islam gehört der Schutz der Menschen vor Schaden. Der Prophet Muhammad (Friede sei mit ihm) sagte:
„Der Muslim ist derjenige, vor dessen Hand und Zunge die Menschen sicher sind.“
Damit macht der Islam unmissverständlich deutlich, dass das Verhältnis zu den Mitmenschen auf Respekt, Sicherheit, Barmherzigkeit und dem Schutz ihrer Rechte beruhen muss.
Der Qur’an lehrt ferner:
„Wer einen Menschen tötet, ohne dass dieser einen Mord begangen oder Unheil auf Erden gestiftet hat, so ist es, als habe er die gesamte Menschheit getötet. Und wer einem Menschen das Leben rettet, so ist es, als habe er die gesamte Menschheit gerettet.“ (Qur’an 5:32)
Sollte sich der Verdacht einer extremistischen oder islamistisch begründeten Motivation bestätigen, betonen wir ausdrücklich: Eine solche Tat ist nicht nur kriminell und menschenverachtend, sondern auch eindeutig unislamisch. Wer Religion missbraucht, um Hass zu säen, Menschen gegeneinander aufzubringen oder Gewalt auszuüben, handelt gegen die Lehren des Islam und verrät dessen zentrale Botschaft von Barmherzigkeit, Gerechtigkeit und dem Schutz des menschlichen Lebens.
Als Islamisches Zentrum Regensburg stehen wir an der Seite aller Menschen, die Opfer von Hass, Diskriminierung und Gewalt werden. Niemand darf aufgrund seiner sexuellen Orientierung, seiner geschlechtlichen Identität, seiner Religion, seiner Herkunft oder anderer persönlicher Merkmale zur Zielscheibe von Gewalt werden.
Gerade in Zeiten gesellschaftlicher Spannungen braucht es Besonnenheit, Zusammenhalt und eine klare Haltung gegen jede Form von Extremismus und Menschenfeindlichkeit. Unsere gemeinsame Antwort auf Hass und Gewalt muss der entschlossene Einsatz für Menschenwürde, Sicherheit, Freiheit und ein friedliches Miteinander sein.
Wir bekräftigen: Diese Tat ist abscheulich, verwerflich und mit den Werten des Islam unvereinbar. Der Islam schützt das Leben, die Würde, die Freiheit und die Sicherheit aller Menschen.
Ebenso warnen wir davor, diese abscheuliche Tat zu instrumentalisieren, um Islamfeindlichkeit, antimuslimischen Rassismus oder rechtsextremistische Narrative zu fördern. Eine einzelne Straftat darf niemals dazu führen, eine gesamte Religionsgemeinschaft unter Generalverdacht zu stellen oder Millionen friedlicher Muslime für die Taten Einzelner verantwortlich zu machen.
Weder der Islam noch die Muslime tragen die Verantwortung für die Tat eines Einzelnen. Im Gegenteil: Musliminnen und Muslime leiden selbst unter den Folgen solcher Verbrechen. Nach jeder Tat dieser Art sehen sie sich erneut mit Pauschalverdächtigungen, Vorurteilen und der Erwartung konfrontiert, sich von Handlungen distanzieren zu müssen, die sie bereits aufgrund ihrer religiösen Überzeugung entschieden ablehnen und verurteilen.
Der Islam lehrt Frieden, Freiheit und Barmherzigkeit. Diese Werte bilden das Herz seiner Botschaft. Genau diese Werte werden durch extremistische Gewalt angegriffen und missbraucht. Terroristen und Extremisten greifen nicht nur unschuldige Menschen an, sondern auch die Grundprinzipien des Islam selbst. Sie schaden dem gesellschaftlichen Zusammenhalt, fördern Hass und Spaltung und treffen damit Muslime und Nichtmuslime gleichermaßen.
Deshalb weisen wir jede Form der Kollektivschuld entschieden zurück. Wer die Verbrechen von Extremisten dazu nutzt, Hass gegen Muslime zu schüren oder den Islam als Ganzes zu diffamieren, folgt letztlich derselben Logik der Ausgrenzung und Spaltung, die auch Extremisten antreibt. Unser gemeinsames Ziel muss vielmehr sein, jeder Form von Extremismus – sei es religiös begründet, islamfeindlich, rechtsextrem oder anderweitig motiviert – entschlossen entgegenzutreten und die Werte von Menschenwürde, Freiheit, Frieden und gegenseitigem Respekt zu verteidigen.
Die Antwort auf Terror, Hass und Gewalt darf niemals neuer Hass, neue Ausgrenzung oder die Verurteilung ganzer Bevölkerungsgruppen sein. Vielmehr müssen wir gemeinsam für eine Gesellschaft eintreten, in der Menschen unterschiedlicher Herkunft, Überzeugungen und Lebensweisen in Sicherheit, Freiheit und gegenseitigem Respekt zusammenleben können. Nur so schützen wir die Werte, die Extremisten angreifen wollen, und stärken den gesellschaftlichen Zusammenhalt, den sie zerstören möchten.
        `,
};

function Statement() {
	const { t } = useTranslation();
	const [showMore, setShowMore] = React.useState(false);
	console.log("Show more value:", showMore); // Debugging line to check the current language
	return (
		<section className="mt-8 mb-10 flex flex-col rounded-3xl shadow-md bg-transparent p-6 backdrop-blur-md sm:p-8 space-y-4">
			<h1 className="text-3xl font-bold text-primary text-center">
				{statement.title}
			</h1>
			<p
				dir="ltr"
				className={cn("text-sm text-justify", !showMore && "line-clamp-6")}
			>
				{statement.content}
			</p>
			<Button
				className="bg-primary mx-auto text-white py-2 px-4 rounded-full hover:bg-primary/80"
				type="button"
				onClick={() => setShowMore(!showMore)}
			>
				{t("common.show_more")}
			</Button>
		</section>
	);
}

export default Statement;
