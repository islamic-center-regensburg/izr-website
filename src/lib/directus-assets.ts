/**
 * Builds a browser-safe URL for a Directus file (e.g. a `thumbnail` field),
 * routed through our own `/api/assets/$id` proxy rather than Directus
 * directly — see that route for why.
 */
export function getAssetUrl(
	fileId: string | null | undefined,
	params?: Record<string, string | number>,
): string | undefined {
	console.log("Id : ", fileId)
	if (!fileId) return undefined;
	const search = params
		? `?${new URLSearchParams(
				Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)])),
			)}`
		: "";
	return `/api/assets/${fileId}${search}`;
}
