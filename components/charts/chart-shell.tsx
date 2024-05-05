"use client";
import React from "react";
import { Badge } from "../ui/badge";

const ChartShell = ({
  title,
  titleColor,
  children,
}: {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
}) => {
  const bgStyle = titleColor ? { backgroundColor: titleColor } : undefined;
  return (
    <div className="border border-input p-4 ">
      <div className="flex justify-center pb-4">
        <Badge style={bgStyle}>{title}</Badge>
      </div>
      <div className="flex h-80">{children}</div>
    </div>
  );
};

export default ChartShell;
