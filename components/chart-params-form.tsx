"use client";
import React, { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { zodResolver } from "@hookform/resolvers/zod";
import { chartParamsFormSchema, chartParamsSchema } from "@/shemas/chartParams";
import { z } from "zod";
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
import { randomUUID } from "crypto";
type ChartParamsForm = z.infer<typeof chartParamsFormSchema>;
type ChartParams = z.infer<typeof chartParamsSchema>;
type ChartParamsFormProps = {
  chartParams?: ChartParams;
};

const ChartParamsForm = ({ chartParams }: ChartParamsFormProps) => {
  const [storeCharts, setStoreCharts] = useLocalStorage<ChartParams[]>(
    "charts",
    []
  );

  console.log("🚀 ~ ChartParamsForm ~ local storage storeCharts:", storeCharts);

  const onSubmit = (values: ChartParamsForm) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    console.log("🚀 ~ ChartParamsForm ~ storeCharts:", storeCharts);

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
    setStoreCharts(storeCharts);
  };

  const form = useForm<ChartParamsForm>({
    resolver: zodResolver(chartParamsFormSchema),
    defaultValues: {
      title: "",
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

        <div className="flex mt-6 justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default ChartParamsForm;
