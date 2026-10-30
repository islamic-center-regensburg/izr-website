import { useTranslation } from "react-i18next";
import BankTransferCard from "./bank-transfer-card";

const transferDetails = {
	iban: "DE30 7505 0000 0026 7651 56",
	bic: "BYLADEM1RBG",
	holder: "Islamisches Zentrum Regensburg e.V.",
} as const;

function DonationSection() {
	const { t } = useTranslation();

	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8 shadow-md">
			<div className="mb-5">
				<h2 className="text-4xl font-semibold tracking-tight">
					{t("donation.title")}
				</h2>
				<p className="mt-2 text-sm text-foreground">{t("donation.subtitle")}</p>
			</div>

			<p className="text-sm leading-7 text-foreground/90 mb-5">
				{t("donation.description")}
			</p>

			<BankTransferCard
				iban={transferDetails.iban}
				bic={transferDetails.bic}
				bankName={transferDetails.holder}
				reference={"Projekt SOM / Allgemeine Spende etc."}
			/>
		</section>
	);
}

export default DonationSection;
