"use client";
import { SoChartStorageParams } from "@/schemas/types";
import BarChartComponent from "./bar-chart-component";
import LineChartComponent from "./line-chart-component";
import ChartShell from "./chart-shell";
import { useSeriesObservations } from "@/hooks/queries/useSeries";
import { format } from "date-fns";
import ChartToolbar from "./chart-toolbar";

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

  const { data: seriesObservationData, error } = useSeriesObservations({
    series_id: params.series_id,
    observation_start: formatedStartDate,
    observation_end: formatedEndDate,
    datasource,
  });

  const data = seriesObservationData;
  if (error) {
    return (
      <ChartShell title={title}>
        <ChartToolbar datasource={datasource} id={id} />
        <div className="ml-6">
          <div>{error.message}</div>
          <div>Please change the chart configuration</div>
        </div>
      </ChartShell>
    );
  }

  if (!data) {
    return (
      <ChartShell title={title}>
        <div className="ml-6">
          <div>Loading ...</div>
        </div>
      </ChartShell>
    );
  }

  if (chartType === "bar") {
    return (
      <ChartShell title={title}>
        <ChartToolbar datasource={datasource} id={id} />
        <BarChartComponent
          data={data}
          {...restParams}
        />
      </ChartShell>
    );
  }

  return (
    <ChartShell title={title}>
      <ChartToolbar datasource={datasource} id={id} />
      <LineChartComponent
        data={data}
        {...restParams}
      />
    </ChartShell>
  );
};

export default SoChartContainer;
