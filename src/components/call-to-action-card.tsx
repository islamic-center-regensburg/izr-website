import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function CallToActionCard({
	children,
	className,
	...props
}: ComponentProps<typeof Card>) {
	return (
		<Card
			data-slot="call-to-action-card"
			className={cn(
				"relative isolate h-full gap-5 overflow-hidden rounded-2xl border-0 bg-donation-primary p-6 text-white shadow-none sm:px-8 sm:pt-7 sm:pb-8",
				className,
			)}
			{...props}
		>
			<img
				src="/islamic-bg.svg"
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute right-0 bottom-0 -z-10 h-auto w-[70%] opacity-11"
			/>
			{children}
		</Card>
	);
}

export function CallToActionButton({
	className,
	...props
}: ComponentProps<typeof Button>) {
	return (
		<Button
			className={cn(
				"mt-auto h-auto min-h-13 rounded-3xl bg-donation-gold px-5 py-3 text-[15px] font-semibold text-donation-primary whitespace-normal hover:bg-[#d9b752] focus-visible:ring-donation-gold",
				className,
			)}
			{...props}
		/>
	);
}
