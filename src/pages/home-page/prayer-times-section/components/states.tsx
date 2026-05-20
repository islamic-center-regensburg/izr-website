interface LoadingStateProps {
	message: string;
}

export function LoadingState({ message }: LoadingStateProps) {
	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
			<p className="text-sm text-muted-foreground">{message}</p>
		</section>
	);
}

interface ErrorStateProps {
	message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
	return (
		<section className="mt-8 rounded-3xl border border-border/40 bg-card/70 p-6">
			<p className="text-sm text-destructive">{message}</p>
		</section>
	);
}
