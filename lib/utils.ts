import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

