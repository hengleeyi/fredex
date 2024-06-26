"use client";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { soChartParamsFormSchema } from "@/schemas/chartParams";
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
import {
  type SOChartStorageParams,
  type SOChartParamsForm,
} from "@/schemas/types";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type SOChartParamsFormProps = {
  chartParams?: SOChartStorageParams;
};

const SOChartParamsForm = ({ chartParams }: SOChartParamsFormProps) => {
  const router = useRouter();
  const [storeCharts, setStoreCharts] = useLocalStorage<SOChartStorageParams[]>(
    "charts",
    []
  );

  const onSubmit = (values: SOChartParamsForm) => {
    if (chartParams) {
      // edirt chart
      const chartIndex = storeCharts.findIndex(
        (storeChart) => storeChart.id === chartParams.id
      );

      storeCharts[chartIndex] = {
        ...chartParams,
        ...values,
        observation_start: format(values.observation_start, "yyyy-MM-dd"),
        observation_end: format(values.observation_end, "yyyy-MM-dd"),
      };
    } else {
      // add new chart
      const newChart: SOChartStorageParams = {
        id: uuidv4(),
        datasource: "seriesObservation",
        ...values,
        observation_start: format(values.observation_start, "yyyy-MM-dd"),
        observation_end: format(values.observation_end, "yyyy-MM-dd"),
      };
      storeCharts.push(newChart);
    }
    router.replace("/");
    setStoreCharts(storeCharts);
  };

  const form = useForm<SOChartParamsForm>({
    resolver: zodResolver(soChartParamsFormSchema),
    defaultValues: {
      title: chartParams?.title ?? "",
      segment: chartParams?.segment ?? 4,
      maxDomain: chartParams?.maxDomain,
      minDomain: chartParams?.minDomain,
      labelYAxis: chartParams?.labelYAxis,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            <FormField
              control={form.control}
              name="series_id"
              defaultValue={chartParams?.series_id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Series Id</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: CPIAUCSL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <FormField
                control={form.control}
                defaultValue={
                  chartParams?.observation_start
                    ? new Date(chartParams?.observation_start)
                    : undefined
                }
                name="observation_start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1999-12-31")
                          }
                          captionLayout="dropdown"
                          fromYear={2000}
                          toYear={2024}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                defaultValue={
                  chartParams?.observation_end
                    ? new Date(chartParams?.observation_end)
                    : undefined
                }
                name="observation_end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1999-12-31")
                          }
                          captionLayout="dropdown"
                          fromYear={2000}
                          toYear={2024}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minDomain"
                defaultValue={chartParams?.minDomain}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min of Y axis (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Min number"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="segment"
                defaultValue={chartParams?.maxDomain}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segments of Y axis</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="segment number"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="labelXAxis"
                defaultValue={chartParams?.labelXAxis}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label of X axis (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Label of X axis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labelYAxis"
                defaultValue={chartParams?.labelYAxis}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label of Y axis (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Label of Y axis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="titleColor"
                defaultValue={chartParams?.titleColor}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title Color (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: #0f172a or brown" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lineColor"
                defaultValue={chartParams?.lineColor}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chart Color (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: #8884d8 or blue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
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

export default SOChartParamsForm;
