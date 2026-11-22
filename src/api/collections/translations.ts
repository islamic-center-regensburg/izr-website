/**
 * Shared helper for the "translations" (M2M) pattern used by news, events,
 * and campaigns (see izr-cms-discovery.md §4).
 *
 * Not every language is guaranteed to exist for a given item — the schema
 * does not enforce "exactly one row per language" — so callers must handle
 * a missing translation rather than assume all three (`de`/`en`/`ar`) are
 * present. `pickTranslation` picks the requested language, falling back to
 * a configured fallback language, then to whatever translation exists.
 */

type TranslationLike = {
	languages_code: string | { code: string };
};

function languageCodeOf(translation: TranslationLike): string {
	const { languages_code } = translation;
	return typeof languages_code === "string" ? languages_code : languages_code.code;
}

export function pickTranslation<T extends TranslationLike>(
	translations: Array<number | T> | null | undefined,
	lang: string,
	fallbackLang = "de",
): T | undefined {
	// Parent items are usually fetched with `fields: ["*", "translations.*"]`,
	// which expands every entry to a full object. A bare number would only
	// show up if a caller fetched `translations` without expanding it.
	const expanded = (translations ?? []).filter((t): t is T => typeof t !== "number");

	// App locales are region-qualified (e.g. "de-DE" from i18next), but
	// Directus's `languages_code` values are bare ("de"/"en"/"ar").
	const normalizedLang = lang.split("-")[0];

	return (
		expanded.find((t) => languageCodeOf(t) === normalizedLang) ??
		expanded.find((t) => languageCodeOf(t) === fallbackLang) ??
		expanded[0]
	);
}
