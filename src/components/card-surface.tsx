import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import { Slot } from "radix-ui";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionSlot = motion.create(Slot.Root);

export function CardSurface({
	asChild = false,
	section = false,
	className,
	...props
}: Omit<HTMLMotionProps<"div">, "children"> & {
	asChild?: boolean;
	section?: boolean;
	children?: ReactNode;
}) {
	const reducedMotion = useReducedMotion();
	const Comp = asChild ? MotionSlot : motion.div;

	return (
		<Comp
			className={cn(
				"border-0 shadow-none transition-shadow duration-300 hover:shadow-lg hover:ring-1 hover:ring-border/60 focus-within:shadow-lg focus-within:ring-1 focus-within:ring-border/60",
				className,
			)}
			whileHover={
				reducedMotion
					? undefined
					: { y: section ? 0 : -4, scale: section ? 1.003 : 1.015 }
			}
			transition={{ type: "spring", stiffness: 240, damping: 26 }}
			{...props}
		/>
	);
}
