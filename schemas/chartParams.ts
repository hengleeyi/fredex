import { z } from "zod";

const chartParamsFormBaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  chartType: z.enum(["line", "bar"]),
  observation_start: z.string(),
  observation_end: z.string(),
  maxDomain: z.coerce.number().min(0).optional(),
  minDomain: z.coerce.number().min(0).optional(),
  segment: z.coerce.number().min(1),
  labelXAxis: z.string().optional(),
  labelYAxis: z.string().optional(),
});

export const soChartParamsFormSchema = chartParamsFormBaseSchema
  .merge(z.object({ observation_start: z.date(), observation_end: z.date() }))
  .superRefine((obj, ctx) => {
    if (obj.maxDomain === 0 && obj.minDomain === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Min value must be less than Max value`,
        path: ["minDomain"],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Min value must be less than Max value`,
        path: ["maxDomain"],
      });
    }

    if (obj.maxDomain !== undefined && obj.minDomain !== undefined) {
      if (obj.minDomain > obj.maxDomain) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Min value must be less than Max value`,
          path: ["minDomain"],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Min value must be less than Max value`,
          path: ["maxDomain"],
        });
      }
    }
  });

export const dataSourceSchema = z.enum(["series", "seriesObservation"]);

export const soChartStorageParamsSchema = chartParamsFormBaseSchema.extend({
  id: z.string(),
  datasource: dataSourceSchema,
});
