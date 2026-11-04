import type { Actual, ActualTranslation } from "./actuals/types";
import type { Donation } from "./donors/queries";

export type Language = {
	code: string;
	name: string;
	direction: "ltr" | "rtl";
};

export type Schema = {
	donors: (Omit<Donation, "amount"> & {
		amount: number | null;
		status: "paid" | "outstanding" | null;
	})[];
	actuals: Actual[];
	actuals_translations: ActualTranslation[];
	languages: Language[];
};
