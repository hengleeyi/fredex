"use client";
import React from "react";
import { Badge } from "../ui/badge";

const ChartShell = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-input p-4 ">
      <div className="flex justify-center pb-4">
        <Badge>{title}</Badge>
      </div>
      <div className="flex h-80">{children}</div>
    </div>
  );
};

export default ChartShell;
