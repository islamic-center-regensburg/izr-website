import type {
	ItemsCampaigns,
	ItemsCampaignsTranslations,
	ItemsDonations,
	ItemsEvents,
	ItemsEventsTranslations,
	ItemsIqamaTimes,
	ItemsLanguages,
	ItemsNews,
	ItemsNewsTranslations,
	ItemsPrayerTimes,
	ItemsScreenConfig,
	ItemsScreenSections,
} from "../generated/types.gen";

/**
 * Marks a field's type as a Directus date/datetime/time scalar.
 *
 * `@directus/sdk`'s `QueryFilter` only exposes range operators (`_gte`,
 * `_lte`, `_between`, ...) for fields typed with this literal marker — its
 * own schema generator tags date fields this way, but our OpenAPI-derived
 * types just use `string`. We re-tag the handful of fields we actually
 * filter by range so those operators type-check; everything else keeps its
 * generated type unchanged.
 */
type AsDateTime<Item, Field extends keyof Item, Kind extends "date" | "datetime" = "datetime"> = Omit<
	Item,
	Field
> & {
	[K in Field]: null extends Item[Field] ? Kind | null : Kind;
};

/**
 * Collection shape map used ONLY to type-check query objects (filters,
 * sorts) with `@directus/sdk`'s generics (`QueryFilter`, `QuerySort`).
 *
 * This schema never makes a request — requests always go through the
 * OpenAPI-generated, Zod-validated SDK in `src/api/generated` (see each
 * collection's `queries.ts`). We reuse the generated item types here
 * instead of hand-duplicating field definitions, so the two stay in sync
 * automatically on every `npm run api:generate`.
 */
export type DirectusSchema = {
	news: AsDateTime<AsDateTime<ItemsNews, "published_at">, "expires_at">[];
	news_translations: ItemsNewsTranslations[];
	events: AsDateTime<AsDateTime<ItemsEvents, "starts_at">, "ends_at">[];
	events_translations: ItemsEventsTranslations[];
	campaigns: ItemsCampaigns[];
	campaigns_translations: ItemsCampaignsTranslations[];
	donations: ItemsDonations[];
	prayer_times: AsDateTime<ItemsPrayerTimes, "date", "date">[];
	iqama_times: ItemsIqamaTimes[];
	// Singleton — a single object, not an array (see izr-cms-discovery.md §6).
	screen_config: ItemsScreenConfig;
	screen_sections: AsDateTime<AsDateTime<ItemsScreenSections, "visible_from">, "visible_until">[];
	languages: ItemsLanguages[];
};

