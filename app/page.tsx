import AddChart from "@/components/add-chart";
import Dashboard from "@/components/dashboard";

export default async function Home() {
  return (
    <div>
      <h1 className="text-3xl">Fred</h1>
      <div className="flex justify-end p-4">
        <AddChart />
      </div>
      <Dashboard />
    </div>
  );
}
