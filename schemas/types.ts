import { z } from "zod";
import { dataSourceSchema, soChartParamsFormSchema, soChartStorageParamsSchema } from "./chartParams";

export type SoChartStorageParams = z.infer<typeof soChartStorageParamsSchema>;
export type SoChartParamsForm = z.infer<typeof soChartParamsFormSchema>;
export type DataSource = z.infer<typeof dataSourceSchema>;
