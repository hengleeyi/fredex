"use client";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import ChartContainer from "./charts/chart-container";
import { SoChartParams } from "@/schemas/types";

const Dashboard = () => {
  const [storeCharts, setStoreCharts] = useLocalStorage<SoChartParams[]>(
    "charts",
    [],
    { initializeWithValue: false }
  );

  if (storeCharts.length === 0) {
    return <div>No any chart</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-4 xl:grid-cols-3">
      {storeCharts.map((chartParams) => (
        <ChartContainer params={chartParams} key={chartParams.id} />
      ))}
    </div>
  );
};

export default Dashboard;
