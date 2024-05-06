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
import SOChartParamsForm from "./so-chart-params-form";
import { useRouter } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import { useLocalStorage } from "usehooks-ts";
import {
  DataSource,
  SOChartStorageParams,
  STChartStorageParams,
} from "@/schemas/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import STChartParamsForm from "./st-chart-params-form";

const AddChart = () => {
  const router = useRouter();
  const { createQueryString, searchParams } = useQueryString();
  const [dataSource, setDatasource] = useState<DataSource>("seriesObservation");
  const modelName = searchParams.get("model");
  const chartId = searchParams.get("chartId");
  const [storeCharts, setStoreCharts] = useLocalStorage<
    SOChartStorageParams[] | STChartStorageParams[]
  >("charts", []);

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
              <SelectItem value="seriesObservation">
                Series Observations
              </SelectItem>
              <SelectItem value="seriesTags">Series Tags</SelectItem>
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
        <DialogContent className="sm:max-w-[780px]">
          <DialogHeader>
            <DialogTitle>Chart configuration</DialogTitle>
            <DialogDescription>Series Observations</DialogDescription>
          </DialogHeader>
          <SOChartParamsForm chartParams={editChat as SOChartStorageParams} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modelName === "seriesTags"}
        onOpenChange={(val) => {
          if (!val) {
            router.replace("/");
          }
        }}
      >
        <DialogContent className="sm:max-w-[780px]">
          <DialogHeader>
            <DialogTitle>Chart configuration</DialogTitle>
            <DialogDescription>Series Tags</DialogDescription>
          </DialogHeader>
          <STChartParamsForm chartParams={editChat as STChartStorageParams} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddChart;
