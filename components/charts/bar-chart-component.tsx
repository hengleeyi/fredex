"use client";

import { seriesObservationSchema } from "@/shemas/seriesObservation";
import { ChartParams } from "@/shemas/types";
import { PencilLine } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useQueryString from "@/hooks/useQueryString";
import { AxisDomain } from "recharts/types/util/types";
import { getDomain } from "@/lib/utils";

type SeriesObservationData = z.infer<typeof seriesObservationSchema>;
type Props = {
  data: SeriesObservationData;
  id: string;
  maxDomain?: number;
  minDomain?: number;
};

export const CustomTooltip = ({
  active,
  payload,
  valueLabel,
}: {
  active: boolean;
  payload: { payload: any }[];
  valueLabel: string;
}) => {
  if (active && payload && payload.length) {
    const { date, value } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded-lg text-black">
        <p>{`Date: ${date}`}</p>
        <p>{`Value: ${value}`}</p>
      </div>
    );
  }
};

const BarChartComponent = ({ data, id, maxDomain, minDomain }: Props) => {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  const domainY: AxisDomain = getDomain(minDomain, maxDomain);

  return (
    <div className="flex h-96">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.replace(
            `/` +
              "?" +
              createQueryString({
                query: { model: "config", chartId: id },
              })
          );
        }}
      >
        <PencilLine />
      </Button>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data.observations}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#F4F4F4" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis domain={domainY} allowDataOverflow />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            cursor={{ strokeDasharray: "3 3" }}
            // @ts-ignore
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar
            dataKey="value"
            fill="#8884d8"
            // activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
