"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

import React from "react";
import { Button } from "./ui/button";
import ChartParamsForm from "./chart-params-form";
import { useRouter } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import { useLocalStorage } from "usehooks-ts";
import { ChartParams } from "@/shemas/types";

const AddChart = () => {
  const router = useRouter();
  const { createQueryString, searchParams } = useQueryString();
  const modelName = searchParams.get("model");
  const chartId = searchParams.get("chartId");
  const [storeCharts, setStoreCharts] = useLocalStorage<ChartParams[]>(
    "charts",
    []
  );

  let editChat = undefined;

  if (chartId) {
    editChat = storeCharts.find((storeChart) => storeChart.id === chartId);

    
  }

  return (
    <Dialog
      open={!!modelName}
      onOpenChange={(val) => {
        if (!val) {
          router.replace("/");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            router.replace(
              `/` +
                "?" +
                createQueryString({
                  query: { model: "config" },
                })
            );
          }}
        >
          Add chart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chart configuration</DialogTitle>
          <DialogDescription>Make changes to custom chart.</DialogDescription>
        </DialogHeader>
        <ChartParamsForm chartParams={editChat} />
      </DialogContent>
    </Dialog>
  );
};

export default AddChart;
