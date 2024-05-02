import { ChartParams } from "@/shemas/types";
import React from "react";
import BarChartComponent from "./charts/bar-chart-component";
import LineChartComponent from "./charts/line-chart-component";
import ChartShell from "./charts/chart-shell";
import { useSeriesObservations } from "@/hooks/queries/useSeries";

type ChartContainerProps = {
  params: ChartParams;
};

const ChartContainer = ({ params }: ChartContainerProps) => {
  const { data } = useSeriesObservations({
    series_id: "CPIAUCSL",
    observation_start: "2015-01-01",
    observation_end: "2021-12-31",
  });

  if (!data) return <div>Loading chart ...</div>;

  if (params.chartType === "bar") {
    return (
      <ChartShell>
        <BarChartComponent data={data} />
      </ChartShell>
    );
  }

  return (
    <ChartShell>
      <LineChartComponent data={data} />
    </ChartShell>
  );
};

export default ChartContainer;
