"use client";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import SOChartContainer from "./charts/so-chart-container";
import { SOChartStorageParams, STChartStorageParams } from "@/schemas/types";
import STChartContainer from "./charts/st-chart-container";

// Override console.error
// This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
// @link https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const Dashboard = () => {
  const [storeCharts] = useLocalStorage<
    SOChartStorageParams[] | STChartStorageParams[]
  >("charts", [], {
    initializeWithValue: false,
  });
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Initializing ...</div>;
  }

  if (mounted && storeCharts.length === 0) {
    return (
      <div className="flex justify-center text-md p-4 ">
        Please add new chart 🚀 🚀 🚀
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-4 xl:grid-cols-3">
      {storeCharts.map((chartParams) => {
        if (chartParams.datasource === "seriesObservation") {
          return <SOChartContainer params={chartParams} key={chartParams.id} />;
        }

        if (chartParams.datasource === "seriesTags") {
          return <STChartContainer params={chartParams} key={chartParams.id} />;
        }
      })}
    </div>
  );
};

export default Dashboard;
