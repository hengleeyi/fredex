"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

import React, { useState } from "react";
import { Button } from "./ui/button";
import SoChartParamsForm from "./so-chart-params-form";
import { useRouter } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import { useLocalStorage } from "usehooks-ts";
import { DataSource, SoChartStorageParams } from "@/schemas/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const AddChart = () => {
  const router = useRouter();
  const { createQueryString, searchParams } = useQueryString();
  const [dataSource, setDatasource] = useState<DataSource>("seriesObservation");
  const modelName = searchParams.get("model");
  const chartId = searchParams.get("chartId");
  const [storeCharts, setStoreCharts] = useLocalStorage<SoChartStorageParams[]>(
    "charts",
    []
  );

  let editChat = undefined;
  if (chartId) {
    editChat = storeCharts.find((storeChart) => storeChart.id === chartId);
  }

  return (
    <>
      <Dialog
        open={modelName === "datasource"}
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
                    query: { model: "datasource" },
                  })
              );
            }}
          >
            Add chart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select data source</DialogTitle>
            <DialogDescription>Data source from Fred API</DialogDescription>
          </DialogHeader>
          <Select
            onValueChange={(val: DataSource) => {
              setDatasource(val);
            }}
            defaultValue={dataSource}
          >
            <SelectTrigger>
              <SelectValue placeholder="Please choose datasource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="series">Series</SelectItem>
              <SelectItem value="seriesObservation">
                Series Observations
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              router.replace(
                `/` +
                  "?" +
                  createQueryString({
                    query: { model: dataSource as string },
                  })
              );
            }}
          >
            {"Next"}
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modelName === "seriesObservation"}
        onOpenChange={(val) => {
          if (!val) {
            router.replace("/");
          }
        }}
      >
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Chart configuration</DialogTitle>
            <DialogDescription>Make changes to custom chart.</DialogDescription>
          </DialogHeader>
          <SoChartParamsForm chartParams={editChat} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddChart;
