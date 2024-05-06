"use client";
import { STChartStorageParams, SeriesTags } from "@/schemas/types";
import BarChartComponent from "./bar-chart-component";
import LineChartComponent from "./line-chart-component";
import ChartShell from "./chart-shell";
import { useSeriesTags } from "@/hooks/queries/useSeries";
import { format } from "date-fns";
import ChartToolbar from "./chart-toolbar";
import { useState } from "react";

type STChartContainerProps = {
  params: STChartStorageParams;
};

const STChartContainer = ({ params }: STChartContainerProps) => {
  const { id, title, titleColor, chartType, datasource, ...restParams } =
    params;
  const [fullWidth, setFullWidth] = useState(false);

  const formatedStartDate = format(restParams.realtime_start, "yyyy-MM-dd");
  const formatedEndDate = format(restParams.realtime_end, "yyyy-MM-dd");
  const { data: seriesData, error } = useSeriesTags({
    series_id: params.series_id,
    realtime_start: formatedStartDate,
    realtime_end: formatedEndDate,
    datasource,
  });

  const data = seriesData;
  if (error) {
    return (
      <ChartShell title={title} titleColor={titleColor} fullWidth={fullWidth}>
        <ChartToolbar
          datasource={datasource}
          id={id}
          fullWidth={fullWidth}
          setFullWidth={setFullWidth}
        />
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
        <ChartToolbar
          datasource={datasource}
          id={id}
          fullWidth={fullWidth}
          setFullWidth={setFullWidth}
        />
        <BarChartComponent<SeriesTags[]>
          data={data.tags}
          xKey={"name"}
          yKey={"series_count"}
          {...restParams}
        />
      </ChartShell>
    );
  }

  return (
    <ChartShell title={title} titleColor={titleColor} fullWidth={fullWidth}>
      <ChartToolbar
        datasource={datasource}
        id={id}
        fullWidth={fullWidth}
        setFullWidth={setFullWidth}
      />
      <LineChartComponent<SeriesTags[]>
        data={data.tags}
        xKey={"name"}
        yKey={"series_count"}
        {...restParams}
      />
    </ChartShell>
  );
};

export default STChartContainer;
