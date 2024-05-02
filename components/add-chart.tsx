"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

import React from "react";
import { Button } from "./ui/button";
import ChartParamsForm from "./chart-params-form";

const AddChart = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add chart</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chart configuration</DialogTitle>
          <DialogDescription>Make changes to custom chart.</DialogDescription>
        </DialogHeader>
        <ChartParamsForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddChart;
