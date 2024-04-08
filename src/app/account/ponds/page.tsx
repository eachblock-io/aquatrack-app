"use client";
import PondDetails from "@/components/PondDetails";
import QuickAction from "@/components/QuickAction";
import { useGetAllFarmsQuery } from "@/redux/services/farmApiSlice";

const PoundsPage = () => {
  const { isFetching, data, error, refetch } = useGetAllFarmsQuery(null);

  console.log(data);
  return (
    <main className="w-full">
      <QuickAction />
      <section className="lg:w-11/12 w-11/12 mx-auto lg:pb-20 mt-10 pb-20 grid lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <PondDetails key={index} />
        ))}
      </section>
    </main>
  );
};

export default PoundsPage;
