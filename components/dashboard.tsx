"use client";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import SoChartContainer from "./charts/so-chart-container";
import { SoChartStorageParams } from "@/schemas/types";

const Dashboard = () => {
  const [storeCharts, setStoreCharts] = useLocalStorage<SoChartStorageParams[]>(
    "charts",
    [],
    { initializeWithValue: false }
  );

  if (storeCharts.length === 0) {
    return <div>No any chart</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-4 xl:grid-cols-3">
      {storeCharts.map((chartParams) => {
        if (chartParams.datasource === "seriesObservation") {
          return <SoChartContainer params={chartParams} key={chartParams.id} />;
        }
      })}
    </div>
  );
};

export default Dashboard;
