import OptimizedCalendarResult from "./components/OptimizedCalendarResult";

export default function OptimizedResult() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold">Your day off optimized result</h2>
      <div className="mt-8 flex justify-between space-x-8">
        <OptimizedCalendarResult />
      </div>
    </div>
  );
}
