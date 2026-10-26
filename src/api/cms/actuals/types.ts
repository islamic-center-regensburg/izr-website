import type { SortField } from "@/api/cms/types";

export type ActualTranslation = {
	id: number;
	actuals_id: string;
	languages_code: string;
	title: string;
	content: string;
};

export type Actual = {
	id: string;
	status: "published" | "draft" | "archived";
	date_created: string;
	date_updated: string;
	translations: ActualTranslation[];
};

export type ActualSortField = SortField<"date_updated" | "date_created" | "id">;
