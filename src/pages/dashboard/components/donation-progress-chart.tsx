import type { EChartsOption } from "echarts";
import { BarChart, PieChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { init, use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import { useDonationFormatters } from "../hooks/use-donation-formatters";

use([BarChart, PieChart, TooltipComponent, GridComponent, SVGRenderer]);

const FONT_FAMILY = "Thmanyah, sans-serif";

export interface DonutSegment {
	name: string;
	value: number;
	color: string;
}

type Props =
	| { kind: "bar"; progress: number }
	| { kind: "donut"; segments: DonutSegment[] };

export default function DonationProgressChart(props: Props) {
	const { kind } = props;
	const progress = props.kind === "bar" ? props.progress : 0;
	const segmentsKey = JSON.stringify(
		props.kind === "donut" ? props.segments : [],
	);
	const { currency, percent } = useDonationFormatters();
	const container = useRef<HTMLDivElement>(null);
	const instance = useRef<ReturnType<typeof init> | null>(null);

	useEffect(() => {
		if (!container.current) return;
		const chart = init(container.current, undefined, { renderer: "svg" });
		instance.current = chart;
		const observer = new ResizeObserver(() => chart.resize());
		observer.observe(container.current);
		return () => {
			observer.disconnect();
			chart.dispose();
			instance.current = null;
		};
	}, []);

	useEffect(() => {
		const segments: DonutSegment[] = JSON.parse(segmentsKey);
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const option: EChartsOption =
			kind === "donut"
				? {
						textStyle: { fontFamily: FONT_FAMILY },
						animation: !reducedMotion,
						animationDuration: 1200,
						tooltip: {
							trigger: "item",
							confine: true,
							borderColor: "#173d32",
							textStyle: {
								color: "#173d32",
								fontSize: 12,
								fontFamily: FONT_FAMILY,
							},
							extraCssText: `font-family: ${FONT_FAMILY};`,
							formatter: (params) => {
								const item = Array.isArray(params) ? params[0] : params;
								return `${item.marker}${item.name}<br/><b>${currency.format(
									Number(item.value),
								)}</b> · ${percent.format((item.percent ?? 0) / 100)}`;
							},
						},
						series: [
							{
								type: "pie",
								radius: ["66%", "86%"],
								padAngle: 1,
								itemStyle: { borderRadius: 4 },
								label: { show: false },
								labelLine: { show: false },
								emptyCircleStyle: { color: "#bfeae3" },
								emphasis: { scale: true, scaleSize: 5 },
								data: segments.map((segment) => ({
									name: segment.name,
									value: segment.value,
									itemStyle: { color: segment.color },
								})),
							},
						],
					}
				: {
						animation: false,
						grid: { left: 0, right: 0, top: 0, bottom: 0 },
						xAxis: { type: "value", min: 0, max: 100, show: false },
						yAxis: { type: "category", data: [""], show: false },
						series: [
							{
								type: "bar",
								data: [progress],
								barWidth: 12,
								showBackground: true,
								backgroundStyle: { color: "#bfeae3", borderRadius: 6 },
								itemStyle: { color: "#173d32", borderRadius: 6 },
								silent: true,
							},
						],
					};
		instance.current?.setOption(option);
	}, [progress, kind, segmentsKey, currency, percent]);

	return (
		<div
			ref={container}
			data-slot={`donation-chart-${kind}`}
			className={kind === "donut" ? "size-full" : "h-3 w-full rtl:-scale-x-100"}
			aria-hidden="true"
		/>
	);
}
