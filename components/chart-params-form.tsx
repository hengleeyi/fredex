"use client";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { chartParamsFormSchema } from "@/shemas/chartParams";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { DialogClose } from "./ui/dialog";
import { useLocalStorage } from "usehooks-ts";
import { ChartParams, type ChartParamsForm } from "@/shemas/types";
import { useRouter } from "next/navigation";

type ChartParamsFormProps = {
  chartParams?: ChartParams;
};

const ChartParamsForm = ({ chartParams }: ChartParamsFormProps) => {
  const router = useRouter();
  const [storeCharts, setStoreCharts] = useLocalStorage<ChartParams[]>(
    "charts",
    []
  );

  const onSubmit = (values: ChartParamsForm) => {
    if (chartParams) {
      // edirt chart
      const chartIndex = storeCharts.findIndex(
        (storeChart) => storeChart.id === chartParams.id
      );

      storeCharts[chartIndex] = {
        id: storeCharts[chartIndex].id,
        ...values,
      };
    } else {
      // add new chart
      const newChart = {
        id: uuidv4(),
        ...values,
      };
      storeCharts.push(newChart);
    }
    router.replace("/");
    setStoreCharts(storeCharts);
  };

  const form = useForm<ChartParamsForm>({
    resolver: zodResolver(chartParamsFormSchema),
    defaultValues: {
      title: chartParams?.title ?? "",
      maxDomain: chartParams?.maxDomain,
      minDomain: chartParams?.minDomain,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          defaultValue={chartParams?.title}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chartType"
          defaultValue={chartParams?.chartType}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chart type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please choose chart type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="minDomain"
            defaultValue={chartParams?.minDomain}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min of Y axis (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Min number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxDomain"
            defaultValue={chartParams?.maxDomain}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max of Y axis (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Max number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex mt-6 justify-end gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">{chartParams ? "Save" : "Create"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default ChartParamsForm;
