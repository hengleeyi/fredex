import { z } from "zod";
import { dataSourceSchema, soChartParamsFormSchema, soChartParamsSchema } from "./chartParams";

export type SoChartParams = z.infer<typeof soChartParamsSchema>;
export type SoChartParamsForm = z.infer<typeof soChartParamsFormSchema>;
export type DataSource = z.infer<typeof dataSourceSchema>;
