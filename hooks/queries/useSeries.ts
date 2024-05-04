import { getEndpoint } from "@/lib/utils";
import { seriesObservationSchema } from "@/schemas/seriesObservation";
import { DataSource } from "@/schemas/types";
import { useQuery } from "@tanstack/react-query";

type UseSeriesObservationsParams = {
  series_id: string;
  observation_start: string;
  observation_end: string;
  datasource: DataSource;
};

type UseSeriesParams = {
  series_id: string;
  realtime_start?: string;
  realtime_end?: string;
  datasource: DataSource;
};

export const useSeries = (params: UseSeriesParams) => {
  return useQuery({
    queryKey: ["series", { params }],
    queryFn: async () => {
      const endpoint = getEndpoint<UseSeriesParams>("/series", params);
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("🚀 ~ queryFn: ~ data:", data);
      const validation = seriesObservationSchema.safeParse(data);

      if (validation.success) {
        return validation.data;
      } else {
        throw new Error("Incorrect data format");
      }
    },
    enabled: params.datasource === "series",
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
