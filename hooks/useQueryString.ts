import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    ({
      query,
      append,
    }: {
      query: Record<string, string>;
      append?: boolean;
    }) => {
      const params = append
        ? new URLSearchParams(searchParams.toString())
        : new URLSearchParams();

      Object.entries(query).forEach(([name, value]) => {
        params.set(name, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  return { searchParams, createQueryString };
};

export default useQueryString;
