import { useQuery } from "@tanstack/react-query";
import * as echarts from "echarts";
import { Gift, Target, TrendingUp, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Donation {
	amount: string;
	date_of_donation: string;
	source: "card" | "cash" | "bank" | "zeffy";
}

interface DonorsResponse {
	data: Donation[];
}

const sourceColors: Record<string, string> = {
	card: "#3b82f6",
	cash: "#10b981",
	bank: "#f59e0b",
	zeffy: "#8b5cf6",
};

const sourceLabels: Record<string, string> = {
	card: "Card",
	cash: "Cash",
	bank: "Bank Transfer",
	zeffy: "Zeffy",
};

async function fetchDonors(): Promise<DonorsResponse> {
	const baseUrl =
		import.meta.env.VITE_API_BASE_URL || "https://api.iz-regensburg.de";
	const response = await fetch(`${baseUrl}/cms/som/items/donors?limit=-1`);
	if (!response.ok) {
		throw new Error("Failed to fetch donors data");
	}
	return response.json();
}

export default function DonationDashboard() {
	const { t } = useTranslation();
	const chartRef = useRef<HTMLDivElement>(null);
	const chartInstance = useRef<echarts.ECharts | null>(null);
	const pieChartRef = useRef<HTMLDivElement>(null);
	const pieChartInstance = useRef<echarts.ECharts | null>(null);

	const { data, isLoading, error } = useQuery({
		queryKey: ["donors"],
		queryFn: fetchDonors,
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		if (!chartRef.current || !data) return;

		const donations = data.data;

		// Calculate donations over time (monthly)
		const donationsByDate = donations.reduce(
			(acc, donation) => {
				const date = new Date(donation.date_of_donation);
				const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

				if (!acc[monthKey]) {
					acc[monthKey] = { total: 0, sources: {} as Record<string, number> };
				}
				const amount = Number.parseFloat(donation.amount);
				acc[monthKey].total += amount;
				acc[monthKey].sources[donation.source] =
					(acc[monthKey].sources[donation.source] || 0) + amount;

				return acc;
			},
			{} as Record<string, { total: number; sources: Record<string, number> }>,
		);

		const sortedMonths = Object.keys(donationsByDate).sort();

		// Initialize chart
		if (!chartInstance.current) {
			chartInstance.current = echarts.init(chartRef.current);
		}

		const option: echarts.EChartsOption = {
			backgroundColor: "transparent",
			tooltip: {
				trigger: "axis",
				backgroundColor: "rgba(20, 20, 20, 0.95)",
				borderColor: "#444",
				borderWidth: 1,
				textStyle: {
					color: "#fff",
					fontSize: 12,
				},
				padding: [8, 12],
				axisPointer: {
					type: "cross",
					lineStyle: {
						color: "#555",
						width: 1,
					},
				},
				formatter: (params: any) => {
					if (!Array.isArray(params)) return "";
					let html = `<div style="font-weight: bold; margin-bottom: 8px;">${params[0].axisValue}</div>`;
					params.forEach((param: any) => {
						if (param.value !== undefined && param.value !== null) {
							html += `<div style="display: flex; align-items: center; margin: 4px 0;">
								<span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${param.color}; margin-right: 8px;"></span>
								<span>${param.seriesName}:</span>
								<span style="font-weight: bold; margin-left: auto; margin-left: 16px;">€${param.value.toLocaleString("de-DE", { maximumFractionDigits: 2 })}</span>
							</div>`;
						}
					});
					return html;
				},
			},
			grid: {
				left: 60,
				right: 30,
				top: 30,
				bottom: 60,
			},
			xAxis: {
				type: "category",
				data: sortedMonths,
				axisLine: {
					lineStyle: {
						color: "#333",
					},
				},
				axisLabel: {
					color: "#999",
				},
			},
			yAxis: {
				type: "value",
				axisLine: {
					lineStyle: {
						color: "#333",
					},
				},
				splitLine: {
					lineStyle: {
						color: "#222",
					},
				},
				axisLabel: {
					color: "#999",
					formatter: "€{value}",
				},
			},
			series: [
				{
					name: "Card",
					data: sortedMonths.map(
						(month) => donationsByDate[month].sources.card || 0,
					),
					type: "bar",
					stack: "total",
					itemStyle: {
						color: sourceColors.card,
					},
				},
				{
					name: "Cash",
					data: sortedMonths.map(
						(month) => donationsByDate[month].sources.cash || 0,
					),
					type: "bar",
					stack: "total",
					itemStyle: {
						color: sourceColors.cash,
					},
				},
				{
					name: "Bank Transfer",
					data: sortedMonths.map(
						(month) => donationsByDate[month].sources.bank || 0,
					),
					type: "bar",
					stack: "total",
					itemStyle: {
						color: sourceColors.bank,
					},
				},
				{
					name: "Zeffy",
					data: sortedMonths.map(
						(month) => donationsByDate[month].sources.zeffy || 0,
					),
					type: "bar",
					stack: "total",
					itemStyle: {
						color: sourceColors.zeffy,
					},
				},
			],
		};

		chartInstance.current.setOption(option);

		const handleResize = () => {
			chartInstance.current?.resize();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [data]);

	useEffect(() => {
		if (!pieChartRef.current || !data) return;

		const donations = data.data;

		const sourceStats = donations.reduce(
			(acc, donation) => {
				const amount = Number.parseFloat(donation.amount);
				if (!acc[donation.source]) {
					acc[donation.source] = 0;
				}
				acc[donation.source] += amount;
				return acc;
			},
			{} as Record<string, number>,
		);

		if (!pieChartInstance.current) {
			pieChartInstance.current = echarts.init(pieChartRef.current);
		}

		const pieData = Object.entries(sourceStats).map(([source, amount]) => ({
			name: sourceLabels[source as keyof typeof sourceLabels],
			value: amount,
			itemStyle: {
				color: sourceColors[source as keyof typeof sourceColors],
			},
		}));

		const pieOption: echarts.EChartsOption = {
			backgroundColor: "transparent",
			tooltip: {
				trigger: "item",
				backgroundColor: "rgba(20, 20, 20, 0.95)",
				borderColor: "#444",
				borderWidth: 1,
				textStyle: {
					color: "#fff",
					fontSize: 12,
				},
				padding: [8, 12],
				formatter: (params: Record<string, any>) => {
					return `<div>
						<div style="font-weight: bold; margin-bottom: 6px;">${params.name}</div>
						<div style="display: flex; align-items: center;">
							<span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: ${params.color}; margin-right: 8px;"></span>
							<span>Amount: <strong>€${params.value.toLocaleString("de-DE", { maximumFractionDigits: 2 })}</strong></span>
						</div>
						<div style="margin-top: 6px; font-weight: bold; color: #4ade80;">${params.percent}%</div>
					</div>`;
				},
			},
			legend: {
				orient: "vertical",
				left: "left",
				textStyle: {
					color: "#999",
				},
			},
			series: [
				{
					type: "pie",
					radius: "50%",
					data: pieData,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(255, 255, 255, 0.5)",
						},
					},
					label: {
						color: "#999",
					},
				},
			],
		};

		pieChartInstance.current.setOption(pieOption);

		const handleResize = () => {
			pieChartInstance.current?.resize();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [data]);

	if (isLoading) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8 shadow-md">
				<p className="text-sm text-foreground">Loading donation data...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8 shadow-md">
				<p className="text-sm text-destructive">
					Failed to load donation dashboard
				</p>
			</section>
		);
	}

	if (!data) {
		return null;
	}

	const donations = data.data;
	const GOAL = 1000000;

	const totalAmount = donations.reduce(
		(sum, d) => sum + Number.parseFloat(d.amount),
		0,
	);

	const sourceStats = donations.reduce(
		(acc, donation) => {
			const amount = Number.parseFloat(donation.amount);
			if (!acc[donation.source]) {
				acc[donation.source] = 0;
			}
			acc[donation.source] += amount;
			return acc;
		},
		{} as Record<string, number>,
	);

	const progressPercentage = (totalAmount / GOAL) * 100;
	const remainingAmount = Math.max(0, GOAL - totalAmount);

	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-transparent p-6 backdrop-blur-md sm:p-8 shadow-md">
			<div className="mb-12">
				<h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
					{t("donation.title")}
				</h2>
				<p className="mt-2 text-sm text-foreground/70">
					Donation Statistics & Impact
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<div className="group relative rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-blue-500/0 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20">
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative">
						<div className="flex items-center justify-between">
							<p className="text-xs uppercase tracking-wide text-foreground/60">
								Total Raised
							</p>
							<TrendingUp className="size-5 text-blue-500" />
						</div>
						<p className="mt-3 text-3xl font-bold text-blue-500">
							€
							{totalAmount.toLocaleString("de-DE", {
								maximumFractionDigits: 0,
							})}
						</p>
						<p className="mt-2 text-xs text-foreground/50">
							{donations.length} donations received
						</p>
					</div>
				</div>

				<div className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-purple-500/0 p-6 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative">
						<div className="flex items-center justify-between">
							<p className="text-xs uppercase tracking-wide text-foreground/60">
								Goal
							</p>
							<Target className="size-5 text-purple-500" />
						</div>
						<p className="mt-3 text-3xl font-bold text-purple-500">
							€{GOAL.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
						</p>
						<p className="mt-2 text-xs text-foreground/50">
							Our target for 2026
						</p>
					</div>
				</div>

				<div className="group relative rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-green-500/0 p-6 backdrop-blur-md transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20">
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative">
						<div className="flex items-center justify-between">
							<p className="text-xs uppercase tracking-wide text-foreground/60">
								Remaining
							</p>
							<Gift className="size-5 text-green-500" />
						</div>
						<p className="mt-3 text-3xl font-bold text-green-500">
							€
							{remainingAmount.toLocaleString("de-DE", {
								maximumFractionDigits: 0,
							})}
						</p>
						<p className="mt-2 text-xs text-foreground/50">
							Until goal reached
						</p>
					</div>
				</div>

				<div className="group relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/0 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/20">
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					<div className="relative">
						<div className="flex items-center justify-between">
							<p className="text-xs uppercase tracking-wide text-foreground/60">
								Average
							</p>
							<Zap className="size-5 text-amber-500" />
						</div>
						<p className="mt-3 text-3xl font-bold text-amber-500">
							€
							{(totalAmount / donations.length).toLocaleString("de-DE", {
								maximumFractionDigits: 0,
							})}
						</p>
						<p className="mt-2 text-xs text-foreground/50">Per donation</p>
					</div>
				</div>
			</div>

			<div className="rounded-3xl border border-border/40 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 backdrop-blur-md mb-8">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold">Campaign Progress</h3>
					<span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
						{progressPercentage.toFixed(1)}%
					</span>
				</div>

				<div className="relative h-3 w-full overflow-hidden rounded-full bg-background/60 shadow-inner">
					<div
						className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 transition-all duration-1000 ease-out"
						style={{ width: `${Math.min(progressPercentage, 100)}%` }}
					/>
					<div
						className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent"
						style={{ width: `${Math.min(progressPercentage, 100)}%` }}
					/>
				</div>

				<div className="mt-4 flex justify-between text-sm text-foreground/60">
					<span>
						€{totalAmount.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
					</span>
					<span>
						€{GOAL.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
				<div className="rounded-3xl border border-border/40 bg-gradient-to-br from-background/60 to-background/30 p-8 backdrop-blur-md">
					<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
						<div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
						Donations by Source
					</h3>
					<div className="space-y-4">
						{(["card", "cash", "bank", "zeffy"] as const).map((source) => {
							const amount = sourceStats[source] || 0;
							const percentage =
								totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
							return (
								<div key={source} className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div
												className="w-3 h-3 rounded-full shadow-lg"
												style={{ backgroundColor: sourceColors[source] }}
											/>
											<span className="font-medium text-sm">
												{sourceLabels[source]}
											</span>
										</div>
										<span className="text-sm font-bold text-foreground/80">
											€
											{amount.toLocaleString("de-DE", {
												maximumFractionDigits: 0,
											})}
										</span>
									</div>
									<div className="h-2 w-full overflow-hidden rounded-full bg-background/40">
										<div
											className="h-full rounded-full transition-all duration-500"
											style={{
												width: `${percentage}%`,
												backgroundColor: sourceColors[source],
												opacity: 0.8,
											}}
										/>
									</div>
									<div className="text-xs text-foreground/50 text-right">
										{percentage.toFixed(1)}%
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="rounded-3xl border border-border/40 bg-gradient-to-br from-background/60 to-background/30 p-8 backdrop-blur-md">
					<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
						<div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
						Source Distribution
					</h3>
					<div ref={pieChartRef} style={{ width: "100%", height: "300px" }} />
				</div>
			</div>

			<div className="rounded-3xl border border-border/40 bg-gradient-to-br from-background/60 to-background/30 p-8 backdrop-blur-md">
				<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
					<div className="w-1 h-6 rounded-full bg-gradient-to-b from-green-500 to-blue-500" />
					Donation Trends Over Time
				</h3>
				<div ref={chartRef} style={{ width: "100%", height: "400px" }} />
			</div>
		</section>
	);
}
