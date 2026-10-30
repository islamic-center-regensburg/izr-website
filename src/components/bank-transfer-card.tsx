import {
	Check,
	ChevronDown,
	Copy,
	Download,
	Landmark,
	QrCode,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type BankTransferCardProps = {
	iban?: string;
	bic?: string;
	bankName?: string;
	reference?: string;
};

type BankField = {
	key: string;
	label: string;
	value: string;
	mono?: boolean;
};

function BankTransferCard(props: BankTransferCardProps) {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [showQR, setShowQR] = useState(false);
	const [copiedKey, setCopiedKey] = useState<string | null>(null);

	const bankData = {
		recipient: "Islamisches Zentrum Regensburg e.V.",
		iban:
			props.iban ??
			import.meta.env.VITE_BANK_IBAN ??
			"DE91 7505 0000 0027 2213 16",
		bic: props.bic ?? import.meta.env.VITE_BANK_BIC ?? "BYLADEM1REG",
		bankName:
			props.bankName ??
			import.meta.env.VITE_BANK_NAME ??
			"Sparkasse Regensburg",
		reference:
			props.reference ?? import.meta.env.VITE_BANK_REFERENCE ?? "Projekt SOM",
	};

	const fields: BankField[] = [
		{
			key: "recipient",
			label: t("linktree.bank.recipient"),
			value: bankData.recipient,
		},
		{
			key: "iban",
			label: t("linktree.bank.iban"),
			value: bankData.iban,
			mono: true,
		},
		{
			key: "bic",
			label: t("linktree.bank.bic"),
			value: bankData.bic,
			mono: true,
		},
		{
			key: "bankName",
			label: t("linktree.bank.bank_name"),
			value: bankData.bankName,
		},
		{
			key: "reference",
			label: t("linktree.bank.reference"),
			value: bankData.reference,
		},
	];

	// EPC QR Code format (SEPA Credit Transfer)
	// Supported by most European banking apps (Sparkasse, Deutsche Bank, etc.)
	const epcQrData = [
		"BCD", // Service Tag
		"002", // Version
		"1", // Character set (UTF-8)
		"SCT", // Identification (SEPA Credit Transfer)
		bankData.bic, // BIC
		bankData.recipient, // Recipient Name
		bankData.iban.replace(/\s/g, ""), // IBAN (no spaces)
		"EUR", // Amount currency (empty = user chooses)
		"", // Purpose
		"", // Reference
		bankData.reference, // Remittance info
	].join("\n");

	const handleCopy = async (key: string, value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopiedKey(key);
			setTimeout(() => setCopiedKey(null), 2000);
		} catch (err) {
			console.error("Copy failed", err);
		}
	};

	const handleCopyAll = async () => {
		const allData = fields.map((f) => `${f.label}: ${f.value}`).join("\n");
		await handleCopy("all", allData);
	};

	const handleDownloadQR = () => {
		const svg = document.getElementById("epc-qr-code");
		if (!svg) return;

		const svgData = new XMLSerializer().serializeToString(svg);
		const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = "bank-transfer-qr.svg";
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 backdrop-blur-md transition-all hover:border-border/80">
			{/* Trigger */}
			{!isOpen && (
				<div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
			)}

			<button
				type="button"
				onClick={() => setIsOpen((v) => !v)}
				aria-expanded={isOpen}
				className="flex w-full items-center gap-4 p-4 text-start transition-colors hover:bg-background/60"
			>
				<div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background/40">
					<Landmark
						className="size-6 text-foreground"
						strokeWidth={1.5}
						aria-hidden="true"
					/>
				</div>

				<div className="flex-1">
					<p className="font-semibold text-foreground">
						{t("linktree.bank.bank_transfer")}
					</p>
					<p className="text-xs text-muted-foreground">
						{t("linktree.bank.bank_transfer_desc")}
					</p>
				</div>

				<ChevronDown
					className={cn(
						"size-5 text-muted-foreground transition-transform duration-300",
						isOpen && "rotate-180",
					)}
					strokeWidth={1.5}
					aria-hidden="true"
				/>
			</button>

			{/* Expandable Content */}
			<div
				className={cn(
					"grid transition-all duration-300 ease-in-out",
					isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
				)}
			>
				<div className="overflow-hidden">
					<div className="border-t border-border/40 p-4">
						{/* Fields */}
						<div className="flex flex-col gap-2">
							{fields.map((field) => (
								<div
									key={field.key}
									className="flex items-center gap-2 rounded-lg border border-border/30 bg-background/30 p-3"
								>
									<div className="min-w-0 flex-1">
										<p className="text-xs text-muted-foreground">
											{field.label}
										</p>
										<p
											dir="ltr"
											className={cn(
												"truncate text-left text-sm font-medium text-foreground",
												field.mono && "font-mono tracking-wide",
											)}
										>
											{field.value}
										</p>
									</div>
									<button
										type="button"
										onClick={() => handleCopy(field.key, field.value)}
										aria-label={t("bank.copy", { field: field.label })}
										className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/40 text-muted-foreground transition-all hover:bg-background/80 hover:text-foreground active:scale-95"
									>
										{copiedKey === field.key ? (
											<Check
												className="size-4 text-green-500"
												strokeWidth={2}
												aria-hidden="true"
											/>
										) : (
											<Copy
												className="size-4"
												strokeWidth={1.5}
												aria-hidden="true"
											/>
										)}
									</button>
								</div>
							))}
						</div>

						{/* Action buttons */}
						<div className="mt-4 flex flex-wrap gap-2">
							<button
								type="button"
								onClick={handleCopyAll}
								className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/40 bg-background/40 px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-background/80 active:scale-95"
							>
								{copiedKey === "all" ? (
									<>
										<Check
											className="size-4 text-green-500"
											strokeWidth={2}
											aria-hidden="true"
										/>
										{t("bank.copied")}
									</>
								) : (
									<>
										<Copy
											className="size-4"
											strokeWidth={1.5}
											aria-hidden="true"
										/>
										{t("linktree.bank.copy_all")}
									</>
								)}
							</button>

							<button
								type="button"
								onClick={() => setShowQR((v) => !v)}
								aria-expanded={showQR}
								className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border/40 bg-background/40 px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-background/80 active:scale-95"
							>
								<QrCode
									className="size-4"
									strokeWidth={1.5}
									aria-hidden="true"
								/>
								{showQR
									? t("linktree.bank.hide_qr")
									: t("linktree.bank.show_qr")}
							</button>
						</div>

						{/* QR Code */}
						<div
							className={cn(
								"grid transition-all duration-300 ease-in-out",
								showQR
									? "mt-4 grid-rows-[1fr] opacity-100"
									: "mt-0 grid-rows-[0fr] opacity-0",
							)}
						>
							<div className="overflow-hidden">
								<div className="flex flex-col items-center gap-3 rounded-xl border border-border/30 bg-white p-4">
									<QRCodeSVG
										id="epc-qr-code"
										value={epcQrData}
										size={200}
										level="M"
										marginSize={2}
									/>
									<p className="text-center text-xs text-gray-600">
										{t("linktree.bank.qr_hint")}
									</p>
									<button
										type="button"
										onClick={handleDownloadQR}
										className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
									>
										<Download
											className="size-3.5"
											strokeWidth={1.5}
											aria-hidden="true"
										/>
										{t("linktree.bank.download_qr")}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BankTransferCard;
