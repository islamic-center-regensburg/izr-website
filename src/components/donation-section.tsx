import { useTranslation } from "react-i18next";
import BankTransferCard from "./bank-transfer-card";
import { CardSurface } from "./card-surface";

export const transferDetails = {
	iban: "DE30 7505 0000 0026 7651 56",
	bic: "BYLADEM1RBG",
	holder: "Islamisches Zentrum Regensburg e.V.",
	bankName: "Sparkasse Regensburg",
} as const;

function DonationSection() {
	const { t } = useTranslation();

	return (
		<CardSurface asChild section>
			<section className="mt-8 rounded-3xl bg-transparent p-6 backdrop-blur-md sm:p-8">
				<div className="mb-5">
					<h2 className="text-4xl font-semibold tracking-tight">
						{t("donation.title")}
					</h2>
					<p className="mt-2 text-sm text-foreground">
						{t("donation.subtitle")}
					</p>
				</div>

				<p className="text-sm leading-7 text-foreground/90 mb-5">
					{t("donation.description")}
				</p>

				<BankTransferCard
					iban={transferDetails.iban}
					bic={transferDetails.bic}
					bankName={transferDetails.bankName}
					reference={"Projekt SOM / Allgemeine Spende etc."}
				/>
			</section>
		</CardSurface>
	);
}

export default DonationSection;
