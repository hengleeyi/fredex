import useQueryString from "@/hooks/useQueryString";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { PencilLine } from "lucide-react";

type ChartToolbarProps = {
  datasource: string;
  id: string;
};

const ChartToolbar = ({ datasource, id }: ChartToolbarProps) => {
  const router = useRouter();
  const { createQueryString } = useQueryString();
  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.replace(
            `/` +
              "?" +
              createQueryString({
                query: { model: datasource, chartId: id },
              })
          );
        }}
      >
        <PencilLine />
      </Button>
    </div>
  );
};

export default ChartToolbar;
