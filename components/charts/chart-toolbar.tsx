"use client";
import useQueryString from "@/hooks/useQueryString";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  PencilLine, SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
  Trash
} from "lucide-react";
import { SOChartStorageParams, STChartStorageParams } from "@/schemas/types";
import { useLocalStorage } from "usehooks-ts";

type ChartToolbarProps = {
  datasource: string;
  id: string;
  fullWidth: boolean;
  setFullWidth: (full: boolean) => void;
};

const ChartToolbar = ({
  datasource,
  id,
  fullWidth,
  setFullWidth,
}: ChartToolbarProps) => {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const [storeCharts, setStoreCharts] = useLocalStorage<
    SOChartStorageParams[] | STChartStorageParams[]
  >("charts", [], {
    initializeWithValue: false,
  });
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.replace(
            `/` +
              "?" +
              createQueryString({
                query: { model: datasource, chartId: id },
              })
          );
        }}
      >
        <PencilLine />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setFullWidth(!fullWidth);
        }}
      >
        {fullWidth ? <SquareArrowOutDownLeft /> : <SquareArrowOutUpRight />}
      </Button>

      <Button
        size="icon"
        onClick={() => {
          const deleteIndex = storeCharts.findIndex((chart) => chart.id === id);
          storeCharts.splice(deleteIndex, 1);
          setStoreCharts(storeCharts);
        }}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default ChartToolbar;
