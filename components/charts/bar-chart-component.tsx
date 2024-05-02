"use client";

import { chartParamsSchema } from "@/shemas/chartParams";
import { seriesObservationSchema } from "@/shemas/seriesObservation";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend, ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useLocalStorage } from "usehooks-ts";
import { z } from "zod";

type SeriesObservationData = z.infer<typeof seriesObservationSchema>;
type Props = {
  data: SeriesObservationData;
};
type ChartParams = z.infer<typeof chartParamsSchema>;

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

const BarChartComponent = ({ data }: Props) => {
  const [storeCharts, setStoreCharts] = useLocalStorage<ChartParams[]>(
    "charts",
    []
  );
  console.log("🚀 ~ MyChart ~ storeCharts:", storeCharts);

  const dataset = data.observations.map((observation) => {
    return {
      ...observation,
      value: parseInt(observation.value, 10),
    };
  });

  return (
    <div className="flex h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={dataset}
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
