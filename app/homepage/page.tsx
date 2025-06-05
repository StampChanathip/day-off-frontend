import FormInputSection from "./components/FormInputSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-bold">Plan and manage your day off</h2>
      <div className="mt-8 flex justify-between space-x-8">
        <FormInputSection />
      </div>
    </div>
  );
}
