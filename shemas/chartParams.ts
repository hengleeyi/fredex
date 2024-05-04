import { z } from "zod";

const chartParamsFormBaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  chartType: z.enum(["line", "bar"]),
  maxDomain: z.coerce.number().min(0).optional(),
  minDomain: z.coerce.number().min(0).optional(),
});

export const chartParamsFormSchema = chartParamsFormBaseSchema.superRefine(
  (obj, ctx) => {
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
  }
);

export const chartParamsSchema = chartParamsFormBaseSchema.extend({
  id: z.string(),
});
