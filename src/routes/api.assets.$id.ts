import { createFileRoute } from "@tanstack/react-router";

/**
 * Proxies Directus asset downloads (thumbnails) through our own server.
 *
 * `/assets/:id` on Directus requires the same bearer auth as every other
 * collection (izr-cms-discovery.md §2 — there's no public role yet), and
 * `DIRECTUS_READ_TOKEN` is server-only by design (see runtime-config.ts).
 * A plain `<img src="{directusUrl}/assets/...">` in the browser would 403,
 * so this route fetches the asset server-side with the token attached and
 * streams it back — the only bit the browser ever sees is this URL.
 */
export const Route = createFileRoute("/api/assets/$id")({
	server: {
		handlers: {
			GET: async ({ params, request }: { params: { id: string }; request: Request }) => {
				const base = process.env.DIRECTUS_API_URL || "http://localhost:8055";
				const token = process.env.DIRECTUS_READ_TOKEN;
				const search = new URL(request.url).search;

				const upstream = await fetch(`${base}/assets/${params.id}${search}`, {
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				});

				if (!upstream.ok || !upstream.body) {
					return new Response(null, { status: upstream.status });
				}

				return new Response(upstream.body, {
					status: upstream.status,
					headers: {
						"Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
						// Directus file ids are stable; any edit creates a new id,
						// so this is safe to cache for a while.
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
