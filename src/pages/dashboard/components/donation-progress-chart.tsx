import type { EChartsOption } from "echarts";
import { BarChart, GaugeChart } from "echarts/charts";
import { GraphicComponent, GridComponent } from "echarts/components";
import { init, use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

use([BarChart, GaugeChart, GraphicComponent, GridComponent, SVGRenderer]);

export default function DonationProgressChart({
	progress,
	kind,
}: {
	progress: number;
	kind: "donut" | "bar";
}) {
	const container = useRef<HTMLDivElement>(null);
	const instance = useRef<ReturnType<typeof init> | null>(null);

	useEffect(() => {
		if (!container.current) return;
		const chart = init(container.current, undefined, { renderer: "svg" });
		instance.current = chart;
		const resize = () => chart.resize();
		const observer = new ResizeObserver(resize);
		observer.observe(container.current);
		return () => {
			observer.disconnect();
			chart.dispose();
			instance.current = null;
		};
	}, []);

	useEffect(() => {
		// The shared counting clock drives both charts, including reduced motion.
		const option: EChartsOption =
			kind === "donut"
				? {
						animation: false,
						series: [
							{
								type: "gauge",
								startAngle: 90,
								endAngle: -270,
								radius: "84.55%",
								min: 0,
								max: 100,
								axisLine: {
									lineStyle: {
										width: 18,
										color: [[1, "rgba(23, 61, 50, 0.1)"]],
									},
								},
								progress: {
									show: true,
									width: 18,
									itemStyle: { color: "#173d32" },
								},
								pointer: { show: false },
								axisTick: { show: false },
								splitLine: { show: false },
								axisLabel: { show: false },
								detail: { show: false },
								title: { show: false },
								data: [{ value: progress }],
								silent: true,
							},
						],
						graphic: [
							{
								type: "circle",
								shape: {
									cx:
										110 +
										84 * Math.cos((progress / 100) * Math.PI * 2 - Math.PI / 2),
									cy:
										110 +
										84 * Math.sin((progress / 100) * Math.PI * 2 - Math.PI / 2),
									r: 4,
								},
								style: { fill: "#c8a43e" },
								invisible: progress <= 0 || progress >= 100,
								silent: true,
								z: 10,
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
	}, [progress, kind]);

	return (
		<div
			ref={container}
			data-slot={`donation-chart-${kind}`}
			className={kind === "donut" ? "size-55" : "h-3 w-full rtl:-scale-x-100"}
			aria-hidden="true"
		/>
	);
}
