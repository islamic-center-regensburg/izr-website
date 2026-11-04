import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function PendingScreen({
	message,
	compact = false,
	className,
}: {
	message?: string;
	compact?: boolean;
	className?: string;
}) {
	const { t } = useTranslation();

	return (
		<div
			role="status"
			data-slot="pending-screen"
			className={cn(
				"flex w-full flex-col items-center justify-center gap-6 px-6 py-12 text-center text-primary",
				compact ? "min-h-64" : "min-h-[60svh]",
				className,
			)}
		>
			<div
				className="relative flex size-28 items-center justify-center"
				aria-hidden="true"
			>
				<div className="absolute -inset-4 rounded-full bg-donation-mint/50 blur-2xl" />
				<div className="absolute inset-0 rounded-full border border-primary/10" />
				<div className="absolute inset-0 animate-[spin_2.8s_linear_infinite] rounded-full border-2 border-transparent border-t-donation-gold motion-reduce:animate-none">
					<span className="absolute start-3 top-3 size-2 rounded-full bg-donation-gold shadow-sm" />
				</div>
				<div className="absolute inset-3 animate-[spin_1.8s_linear_infinite_reverse] rounded-full border-[3px] border-primary/10 border-t-primary motion-reduce:animate-none" />
				<div className="relative flex size-16 items-center justify-center rounded-full bg-white shadow-sm">
					<img
						src="/IZR_LOGO_ROUND_WHITE_BG.png"
						alt=""
						className="size-14 rounded-full object-contain"
					/>
				</div>
			</div>
			<div className="max-w-sm space-y-2">
				<p className="text-xl font-semibold">
					{message ?? t("common.loading")}
				</p>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{t("common.loading_description")}
				</p>
			</div>
		</div>
	);
}
