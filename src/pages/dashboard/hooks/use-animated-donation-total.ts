import { type RefObject, useEffect, useRef, useState } from "react";

const ANIMATION_DURATION = 2800;

export function useAnimatedDonationTotal(
	target: number,
	section: RefObject<HTMLElement | null>,
) {
	const [value, setValue] = useState(0);
	const current = useRef(0);

	useEffect(() => {
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0;
		let observer: IntersectionObserver | undefined;
		const update = (next: number) => {
			current.current = next;
			setValue(next);
		};
		const start = () => {
			observer?.disconnect();
			if (motion.matches) {
				update(target);
				return;
			}
			const from = current.current;
			let started: number | undefined;
			const tick = (time: number) => {
				started ??= time;
				const elapsed = Math.min(1, (time - started) / ANIMATION_DURATION);
				update(from + (target - from) * elapsed * elapsed);
				if (elapsed < 1) frame = requestAnimationFrame(tick);
			};
			frame = requestAnimationFrame(tick);
		};
		const handleMotion = () => {
			if (motion.matches) {
				cancelAnimationFrame(frame);
				observer?.disconnect();
				update(target);
			}
		};
		motion.addEventListener("change", handleMotion);
		if (
			motion.matches ||
			!section.current ||
			!("IntersectionObserver" in window)
		) {
			start();
		} else {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) start();
				},
				{ threshold: 0.1 },
			);
			observer.observe(section.current);
		}
		return () => {
			cancelAnimationFrame(frame);
			observer?.disconnect();
			motion.removeEventListener("change", handleMotion);
		};
	}, [target, section]);

	const step =
		target > 0 ? Math.max(1, 10 ** (Math.floor(Math.log10(target)) - 2)) : 1;
	return {
		animatedTotal: value,
		displayedTotal: value === target ? value : Math.floor(value / step) * step,
	};
}
