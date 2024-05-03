"use client";
import React from "react";

const ChartShell = ({ children }: { children: React.ReactNode }) => {
  return <div className="border border-input p-4">{children}</div>;
};

export default ChartShell;
