"use client";

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
import { AxisDomain } from "recharts/types/util/types";
import { getDomain } from "@/lib/utils";

type Props<T extends Record<string, string | null | number | undefined>[]> = {
  data: T;
  xKey: keyof T[number];
  yKey: keyof T[number];
  segment: number;
  maxDomain?: number;
  minDomain?: number;
  labelXAxis?: string;
  labelYAxis?: string;
  lineColor?: string;
};

export const CustomTooltip = ({
  active,
  payload,
  valueLabel,
  xKey,
  yKey,
}: {
  active: boolean;
  payload: { payload: any }[];
  valueLabel: string;
  xKey: string;
  yKey: string;
}) => {
  const capitalXKey = xKey.charAt(0).toUpperCase() + xKey.slice(1);
  const capitalYKey = yKey.charAt(0).toUpperCase() + yKey.slice(1);
  if (active && payload && payload.length) {
    const record = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded-lg text-black">
        <p>{`${capitalXKey}: ${record[xKey]}`}</p>
        <p>{`${capitalYKey}: ${record[yKey]}`}</p>
      </div>
    );
  }
};

const BarChartComponent = <
  T extends Record<string, string | null | undefined | number>[]
>({
  data,
  xKey,
  yKey,
  maxDomain,
  minDomain,
  segment,
  labelXAxis,
  labelYAxis,
  lineColor,
}: Props<T>) => {
  const domainY: AxisDomain = getDomain(minDomain, maxDomain);

  const customLabelYAxis = labelYAxis
    ? {
        value: labelYAxis,
        angle: -90,
        position: "insideLeft",
        offset: 0,
        fontWeight: "bold",
        fill: "#0f172a",
      }
    : undefined;

  const customLabelXAxis = labelXAxis
    ? {
        value: labelXAxis,
        position: "insideBottomRight",
        fontWeight: "bold",
        fill: "#0f172a",
        offset: -10,
      }
    : undefined;

  let datasource = [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#F4F4F4" vertical={false} />
        <XAxis dataKey={xKey as string} label={customLabelXAxis} />
        <YAxis
          domain={domainY}
          allowDataOverflow
          tickCount={segment + 1}
          interval={0}
          label={customLabelYAxis}
        />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          cursor={{ strokeDasharray: "3 3" }}
          // @ts-ignore
          content={<CustomTooltip xKey={xKey} yKey={yKey}/>}
        />
        <Legend />
        <Bar dataKey={yKey as string} fill={lineColor || "#8884d8"} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
