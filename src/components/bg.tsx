function Bg({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen w-full bg-[#f0fdfa]">
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
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
					backgroundSize: "40px 40px",
					WebkitMaskImage:
						"radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
					maskImage:
						"radial-gradient(ellipse 80% 80% at 100% 100%, #000 50%, transparent 90%)",
				}}
			/>
			{/* Your Content/Components */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}

export default Bg;
