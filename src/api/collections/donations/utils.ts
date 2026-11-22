/**
 * Donation amounts are returned as JSON strings (e.g. "250.00"), not
 * numbers — see izr-cms-discovery.md §6. Currency on a donation must match
 * its linked campaign's currency, but that's not enforced by the schema
 * (§5), so we group by the currency actually present in the response
 * instead of assuming a single one, and callers must treat a result with
 * more than one currency key as a data problem to investigate, not silently
 * add them together.
 */

export type DonationAmount = {
	amount: string;
	currency?: string;
};

export function sumConfirmedDonationsByCurrency(
	donations: ReadonlyArray<DonationAmount>,
): Record<string, number> {
	const totals: Record<string, number> = {};

	for (const { amount, currency = "EUR" } of donations) {
		totals[currency] = (totals[currency] ?? 0) + Number.parseFloat(amount);
	}

	return totals;
}
