import { z } from "zod";
import {
  dataSourceSchema,
  soChartParamsFormSchema,
  soChartStorageParamsSchema,
  stChartParamsFormSchema,
  stChartStorageParamsSchema,
} from "./chartParams";
import { observationsSchema } from "./seriesObservation";
import { tagsSchema } from "./seriesTags";

export type SOChartStorageParams = z.infer<typeof soChartStorageParamsSchema>;
export type SOChartParamsForm = z.infer<typeof soChartParamsFormSchema>;

export type STChartStorageParams = z.infer<typeof stChartStorageParamsSchema>;
export type STChartParamsForm = z.infer<typeof stChartParamsFormSchema>;
export type DataSource = z.infer<typeof dataSourceSchema>;


export type SeriesObservation = z.infer<typeof observationsSchema>;
export type SeriesTags = z.infer<typeof tagsSchema>;