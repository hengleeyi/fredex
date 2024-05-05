"use client";
import React, { Suspense, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import SoChartContainer from "./charts/so-chart-container";
import { SoChartStorageParams } from "@/schemas/types";

const Dashboard = () => {
  const [storeCharts] = useLocalStorage<SoChartStorageParams[]>(
    "charts",
    [],
    { initializeWithValue: false }
  );
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Initializing ...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-4 xl:grid-cols-3">
      {mounted && storeCharts.length === 0 && <div>Please add new chart</div>}
      {storeCharts.map((chartParams) => {
        if (chartParams.datasource === "seriesObservation") {
          return <SoChartContainer params={chartParams} key={chartParams.id} />;
        }
      })}
    </div>
  );
};

export default Dashboard;
