import { CopyIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "./ui/button";

const transferDetails = {
	iban: "DE30 7505 0000 0026 7651 56",
	bic: "BYLADEM1RBG",
	holder: "Islamisches Zentrum Regensburg",
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

			<p className="text-sm leading-7 text-foreground/90">
				{t("donation.description")}
			</p>

			<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="rounded-2xl border border-border/50 bg-background/40 p-4 shadow-xs backdrop-blur-md flex justify-between">
					<div>
						<p className="text-xs text-foreground">
							{t("donation.fields.iban")}
						</p>
						<p className="mt-2 break-all font-mono text-sm font-medium time-ltr">
							{transferDetails.iban}
						</p>
					</div>
					<Button
						variant={"ghost"}
						size={"icon-sm"}
						onClick={() => {
							navigator.clipboard.writeText(transferDetails.iban);
							toast.success(t("common.copy_success"));
						}}
					>
						<CopyIcon className="size-4" />
					</Button>
				</div>
				<div className="rounded-2xl border border-border/50 bg-background/40 p-4 shadow-xs backdrop-blur-md flex justify-between">
					<div>
						<p className="text-xs text-foreground">
							{t("donation.fields.bic")}
						</p>
						<p className="mt-2 break-all font-mono text-sm font-medium time-ltr">
							{transferDetails.bic}
						</p>
					</div>
					<Button
						variant={"ghost"}
						size={"icon-sm"}
						onClick={() => {
							navigator.clipboard.writeText(transferDetails.bic);
							toast.success(t("common.copy_success"));
						}}
					>
						<CopyIcon className="size-4" />
					</Button>
				</div>
				<div className="rounded-2xl border border-border/50 bg-background/40 p-4 shadow-xs backdrop-blur-md flex justify-between">
					<div>
						<p className="text-xs text-foreground">
							{t("donation.fields.holder")}
						</p>
						<p className="mt-2 text-sm font-medium">{transferDetails.holder}</p>
					</div>
					<Button
						variant={"ghost"}
						size={"icon-sm"}
						onClick={() => {
							navigator.clipboard.writeText(transferDetails.holder);
							toast.success(t("common.copy_success"));
						}}
					>
						<CopyIcon className="size-4" />
					</Button>
				</div>
			</div>

			<p className="mt-4 text-xs text-foreground">
				{t("donation.transfer_note")}
			</p>
		</section>
	);
}

export default DonationSection;
