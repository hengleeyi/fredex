"use client";
import React from "react";
import { Badge } from "../ui/badge";

const ChartShell = ({
  title,
  titleColor,
  children,
  fullWidth,
}: {
  title: string;
  titleColor?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}) => {
  const bgStyle = titleColor ? { backgroundColor: titleColor } : undefined;
  const fullStyle = fullWidth ? { gridColumn: "1 / -1" } : undefined;
  return (
    <div className="border border-input p-4 rounded-lg" style={fullStyle}>
      <div className="flex justify-center pb-4">
        <Badge style={bgStyle}>{title}</Badge>
      </div>
      <div className="flex h-80">{children}</div>
    </div>
  );
};

export default ChartShell;
