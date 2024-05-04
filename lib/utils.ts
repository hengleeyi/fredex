import { type ClassValue, clsx } from "clsx";
import { AxisDomain } from "recharts/types/util/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEndpoint = <T extends Record<string, string>>(
  url: string,
  params: T
) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  const searchparams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchparams.set(key, value);
  });

  searchparams.set("api_key", apiKey);
  searchparams.set("file_type", "json");
  return `${url}?${searchparams.toString()}`;
};

export const getDomain = (minDomain?: number, maxDomain?: number) => {
  let domain: AxisDomain = ["dataMin", "auto"];

  if (minDomain === 0 && maxDomain === 0) {
    domain = ["dataMin", "auto"];
  } else {
    domain = [
      minDomain === undefined ? "dataMin" : minDomain,
      maxDomain === undefined ? "auto" : maxDomain,
    ];
  }

  return domain;
};
