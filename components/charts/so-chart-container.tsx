"use client";
import { SOChartStorageParams, SeriesObservation } from "@/schemas/types";
import BarChartComponent from "./bar-chart-component";
import LineChartComponent from "./line-chart-component";
import ChartShell from "./chart-shell";
import {
  useSeriesObservations
} from "@/hooks/queries/useSeries";
import { format } from "date-fns";
import ChartToolbar from "./chart-toolbar";
import { useState } from "react";

type SOChartContainerProps = {
  params: SOChartStorageParams;
};

const SOChartContainer = ({ params }: SOChartContainerProps) => {
  const { id, title, titleColor, chartType, datasource, ...restParams } =
    params;

  const [fullWidth, setFullWidth] = useState(false)

  const formatedStartDate = format(restParams.observation_start, "yyyy-MM-dd");
  const formatedEndDate = format(restParams.observation_end, "yyyy-MM-dd");

  const { data: seriesObservationData, error } = useSeriesObservations({
    series_id: params.series_id,
    observation_start: formatedStartDate,
    observation_end: formatedEndDate,
    datasource,
  });

  const data = seriesObservationData;
  if (error) {
    return (
      <ChartShell title={title} titleColor={titleColor} fullWidth={fullWidth}>
        <ChartToolbar datasource={datasource} id={id} fullWidth={fullWidth} setFullWidth={setFullWidth}/>
        <div className="ml-6">
          <div>{error.message}</div>
          <div>Please change the chart configuration</div>
        </div>
      </ChartShell>
    );
  }

  if (!data) {
    return (
      <ChartShell title={title} titleColor={titleColor}>
        <div className="ml-6">
          <div>Loading ...</div>
        </div>
      </ChartShell>
    );
  }

  if (chartType === "bar") {
    return (
      <ChartShell title={title} titleColor={titleColor} fullWidth={fullWidth}>
        <ChartToolbar datasource={datasource} id={id} fullWidth={fullWidth} setFullWidth={setFullWidth}/>
        <BarChartComponent<SeriesObservation[]>
          data={data.observations}
          xKey={"date"}
          yKey={"value"}
          {...restParams}
        />
      </ChartShell>
    );
  }

  return (
    <ChartShell title={title} titleColor={titleColor} fullWidth={fullWidth}>
      <ChartToolbar datasource={datasource} id={id} fullWidth={fullWidth} setFullWidth={setFullWidth}/>
      <LineChartComponent<SeriesObservation[]>
        data={data.observations}
        xKey={"date"}
        yKey={"value"}
        {...restParams}
      />
    </ChartShell>
  );
};

export default SOChartContainer;
