import Dashboard from "@/components/dashboard";
import dynamic from "next/dynamic";

const AddChart = dynamic(() => import("@/components/add-chart"), {
  ssr: false,
});

export default async function Home() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold flex justify-center">FRED economic data. </h1>
      <div className="flex justify-end p-4">
        <AddChart />
      </div>
      <Dashboard />
    </div>
  );
}
