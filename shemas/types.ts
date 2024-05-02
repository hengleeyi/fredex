import { z } from "zod";
import { chartParamsFormSchema, chartParamsSchema } from "./chartParams";

export type ChartParams = z.infer<typeof chartParamsSchema>;
export type ChartParamsForm = z.infer<typeof chartParamsFormSchema>;
