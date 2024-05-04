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
      <div className="flex justify-center py-2">
        <Badge>{title}</Badge>
      </div>

      {children}
    </div>
  );
};

export default ChartShell;
