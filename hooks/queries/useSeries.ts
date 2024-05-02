import { getEndpoint } from "@/lib/utils";
import { seriesObservationSchema } from "@/shemas/seriesObservation";
import { useQuery } from "@tanstack/react-query";

type UseSeriesObservationsParams = {
  series_id: string;
  observation_start: string;
  observation_end: string;
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
  });
};
