"use client";

import { seriesObservationSchema } from "@/schemas/seriesObservation";
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
import { z } from "zod";
import { AxisDomain } from "recharts/types/util/types";
import { getDomain } from "@/lib/utils";
import { DataSource } from "@/schemas/types";

type SeriesObservationData = z.infer<typeof seriesObservationSchema>;
type Props = {
  data: SeriesObservationData;
  segment: number;
  maxDomain?: number;
  minDomain?: number;
  labelXAxis?: string;
  labelYAxis?: string;
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

const BarChartComponent = ({
  data,
  maxDomain,
  minDomain,
  segment,
  labelXAxis,
  labelYAxis,
}: Props) => {
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

  return (
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
        <XAxis dataKey="date" label={customLabelXAxis} />
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
          content={<CustomTooltip />}
        />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
