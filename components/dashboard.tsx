"use client";
import React from "react";
import { useLocalStorage } from "usehooks-ts";
import ChartContainer from "./chart-container";
import { ChartParams } from "@/shemas/types";

const Dashboard = () => {
  const [storeCharts, setStoreCharts] = useLocalStorage<ChartParams[]>(
    "charts",
    [],
    { initializeWithValue: false }
  );

  if (storeCharts.length === 0) {
    return <div>No any chart</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 p-4">
      {storeCharts.map((chartParams) => (
        <ChartContainer params={chartParams} key={chartParams.id} />
      ))}
    </div>
  );
};

export default Dashboard;
