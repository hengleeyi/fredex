import MyChart from "@/components/my-chart";
import { getEndpoint } from "@/lib/util";
import { seriesObservationSchema } from "@/shemas/seriesObservation";

async function getSeriesObservations() {
  const endpoint = getEndpoint("/series/observations", {
    series_id: "CPIAUCSL",
    observation_start: "2015-01-01",
    observation_end: "2021-12-31",
  });

  const res = await fetch(endpoint);
  const data = await res.json();
  const validation = seriesObservationSchema.safeParse(data);
  if (validation.success) {
    return validation.data;
  } else {
    throw new Error("Incorrect data format");
  }
}

export default async function Home() {
  const seriesOberservationData = await getSeriesObservations();
  return (
    <div>
      <h1 className="text-3xl">Fred</h1>
    </div>
  );
}
