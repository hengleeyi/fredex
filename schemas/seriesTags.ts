import { group } from "console";
import { z } from "zod";

export const tagsSchema = z.object({
  created: z.string(),
  group_id: z.string(),
  name: z.string(),
  notes: z.string().nullish(),
  popularity: z.number(),
  series_count: z.number(),
});

export const seriesTagsSchema = z.object({
  realtime_start: z.string(),
  realtime_end: z.string(),
  order_by: z.string(),
  sort_order: z.string(),
  count: z.number(),
  offset: z.number(),
  limit: z.number(),
  tags: z.array(tagsSchema),
});
