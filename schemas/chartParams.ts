import { z } from "zod";

export const dataSourceSchema = z.enum(["seriesTags", "seriesObservation"]);

export const chartParamsFormBaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  titleColor: z.string().optional(),
  chartType: z.enum(["line", "bar"]),
  series_id: z.string().min(1, "Series ID is required").max(255),
  maxDomain: z.coerce.number().min(0).optional(),
  minDomain: z.coerce.number().min(0).optional(),
  segment: z.coerce.number().min(1),
  labelXAxis: z.string().optional(),
  labelYAxis: z.string().optional(),
  lineColor: z.string().optional(),
});

// Series Observations

const soChartParamsFormBaseSchema = chartParamsFormBaseSchema.merge(
  z.object({
    observation_start: z.string().min(1, "Start date is required").max(255),
    observation_end: z.string().min(1, "End date is required").max(255),
  })
);

export const soChartParamsFormSchema = soChartParamsFormBaseSchema
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

export const soChartStorageParamsSchema = soChartParamsFormBaseSchema.merge(
  z.object({
    id: z.string(),
    datasource: z.enum(["seriesObservation"]),
  })
);

// Series Tags

const stChartParamsFormBaseSchema = chartParamsFormBaseSchema.merge(
  z.object({
    realtime_start: z.string().min(1, "Start date is required").max(255),
    realtime_end: z.string().min(1, "End date is required").max(255),
  })
);

export const stChartParamsFormSchema = stChartParamsFormBaseSchema
  .merge(z.object({ realtime_start: z.date(), realtime_end: z.date() }))
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

export const stChartStorageParamsSchema = stChartParamsFormBaseSchema.merge(
  z.object({
    id: z.string(),
    datasource: z.enum(["seriesTags"]),
  })
);
