import type { Actual, ActualTranslation } from "./actuals/types";

export type Language = {
	code: string;
	name: string;
	direction: "ltr" | "rtl";
};

export type Schema = {
	actuals: Actual[];
	actuals_translations: ActualTranslation[];
	languages: Language[];
};
