"use client";
import { SoChartStorageParams } from "@/schemas/types";
import React from "react";
import BarChartComponent from "./bar-chart-component";
import LineChartComponent from "./line-chart-component";
import ChartShell from "./chart-shell";
import { useSeries, useSeriesObservations } from "@/hooks/queries/useSeries";
import { format } from "date-fns";

type SoChartContainerProps = {
  params: SoChartStorageParams;
};

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const SoChartContainer = ({ params }: SoChartContainerProps) => {
  const { id, title, chartType, datasource, ...restParams } = params;
  // const { data: seriesData } = useSeries({
  //   series_id: "GNPCA",
  //   realtime_start: "2015-01-01",
  //   realtime_end: "2021-12-31",
  //   datasource,
  // });

  const formatedStartDate = format(restParams.observation_start, "yyyy-MM-dd");
  const formatedEndDate = format(restParams.observation_end, "yyyy-MM-dd");

  const { data: seriesObservationData } = useSeriesObservations({
    series_id: "CPIAUCSL",
    observation_start: formatedStartDate,
    observation_end: formatedEndDate,
    datasource,
  });

  const data = seriesObservationData;

  if (!data) return <div>Loading chart ...</div>;

  if (chartType === "bar") {
    return (
      <ChartShell title={title}>
        <BarChartComponent
          data={data}
          id={id}
          datasource={datasource}
          {...restParams}
        />
      </ChartShell>
    );
  }

  return (
    <ChartShell title={title}>
      <LineChartComponent
        data={data}
        id={id}
        datasource={datasource}
        {...restParams}
      />
    </ChartShell>
  );
};

export default SoChartContainer;
