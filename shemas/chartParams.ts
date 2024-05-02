import { z } from "zod";

export const chartParamsFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  chartType: z.enum(["line", "bar"]),
});

export const chartParamsSchema = chartParamsFormSchema.extend({
  id: z.string(),
});