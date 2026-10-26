import { createDirectus, rest } from "@directus/sdk";
import type { Schema } from "@/api/cms/schema";

const API_GATEWAY_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_GATEWAY_URL) {
	throw new Error("VITE_API_BASE_URL is not defined in environment variables");
}

export const directus = createDirectus<Schema>(
	`${API_GATEWAY_URL}/cms/public`,
).with(rest());
