import { cn } from "@/lib/utils";
import islamic_bg from "/islamic-bg.svg";

function Bg({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative flex min-h-screen w-full flex-1 flex-col bg-[#f0fdfa]",
				className,
			)}
		>
			{/* Mint Fresh Breeze Background */}
			<div
				className="pointer-events-none absolute inset-0 z-0"
				style={{
					background: "#ffffff",
					backgroundImage: `
						radial-gradient(
							circle at top center,
							rgba(56, 193, 182, 0.5),
							transparent 70%
						)
					`,
					filter: "blur(80px)",
					backgroundRepeat: "no-repeat",
				}}
			/>
			<img
				src={islamic_bg}
				alt="Islamic Background"
				className="pointer-events-none absolute right-0 bottom-0 z-0 h-auto w-full object-contain md:w-1/2"
			/>
			<img
				src={islamic_bg}
				alt="Islamic Background"
				className="pointer-events-none absolute left-0 top-0 z-0 h-auto w-1/2 rotate-180 object-contain md:w-1/3"
			/>

			{/* Content wrapper — now participates in flex layout */}
			<div className="relative z-10 flex flex-1 flex-col">{children}</div>
		</div>
	);
}

export default Bg;
