"use client";

import { seriesObservationSchema } from "@/shemas/seriesObservation";
import { ChartParams } from "@/shemas/types";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

type SeriesObservationData = z.infer<typeof seriesObservationSchema>;
type Props = {
  data: SeriesObservationData;
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

const LineChartComponent = ({ data }: Props) => {
  const [storeCharts, setStoreCharts] = useLocalStorage<ChartParams[]>(
    "charts",
    []
  );
  return (
    <div className="flex h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <YAxis />
          <Tooltip
            wrapperStyle={{ outline: "none" }}
            cursor={{ strokeDasharray: "3 3" }}
            // @ts-ignore
            content={<CustomTooltip />}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
