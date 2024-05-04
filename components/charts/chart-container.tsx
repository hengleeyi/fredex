"use client";
import { ChartParams } from "@/shemas/types";
import React from "react";
import BarChartComponent from "./bar-chart-component";
import LineChartComponent from "./line-chart-component";
import ChartShell from "./chart-shell";
import { useSeriesObservations } from "@/hooks/queries/useSeries";

type ChartContainerProps = {
  params: ChartParams;
};

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const ChartContainer = ({ params }: ChartContainerProps) => {
  const { id, title, chartType, ...restParams } = params;
  const { data } = useSeriesObservations({
    series_id: "CPIAUCSL",
    observation_start: "2015-01-01",
    observation_end: "2021-12-31",
  });

  if (!data) return <div>Loading chart ...</div>;

  if (chartType === "bar") {
    return (
      <ChartShell title={title}>
        <BarChartComponent data={data} id={id} {...restParams} />
      </ChartShell>
    );
  }

  return (
    <ChartShell title={title}>
      <LineChartComponent data={data} id={id} {...restParams} />
    </ChartShell>
  );
};

export default ChartContainer;
