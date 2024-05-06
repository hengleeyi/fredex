import { getEndpoint } from "@/lib/utils";
import { seriesObservationSchema } from "@/schemas/seriesObservation";
import { seriesTagsSchema } from "@/schemas/seriesTags";
import { DataSource } from "@/schemas/types";
import { useQuery } from "@tanstack/react-query";

type UseSeriesObservationsParams = {
  series_id: string;
  observation_start: string;
  observation_end: string;
  datasource: DataSource;
};

type UseSeriesTagsParams = {
  series_id?: string;
  realtime_start?: string;
  realtime_end?: string;
  datasource: DataSource;
};

export const useSeriesTags = (params: UseSeriesTagsParams) => {
  return useQuery({
    queryKey: ["series", { params }],
    queryFn: async () => {
      const endpoint = getEndpoint<UseSeriesTagsParams>("/series/tags", params);
      const response = await fetch(endpoint);
      const data = await response.json();
      if (!response.ok) {
        if (data.error_message) {
          throw new Error(data.error_message);
        }
        throw new Error(response.statusText);
      }
      
      const validation = seriesTagsSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error("Incorrect data format");
      }
    },
    // enabled: params.datasource === "series",
  });
};

export const useSeriesObservations = (params: UseSeriesObservationsParams) => {
  return useQuery({
    queryKey: ["seriesObservations", { params }],
    queryFn: async () => {
      const endpoint = getEndpoint<UseSeriesObservationsParams>(
        "/series/observations",
        params
      );
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        if (data.error_message) {
          throw new Error(data.error_message);
        }
        throw new Error(response.statusText);
      }

      const validation = seriesObservationSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error("Incorrect data format");
      }
    },
    enabled: params.datasource === "seriesObservation",
  });
};
