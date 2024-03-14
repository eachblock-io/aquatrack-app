import PondDetails from "@/components/PondDetails";
import QuickAction from "@/components/QuickAction";
import React from "react";

const PoundsPage = () => {
  return (
    <main className="h-screen w-full">
      <QuickAction />
      <section className="lg:w-11/12 w-11/12 mx-auto lg:mt-20 lg:pb-20 mt-10 grid lg:grid-cols-3 gap-x-6 gap-y-8">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <PondDetails key={index} />
        ))}
      </section>
    </main>
  );
};

export default PoundsPage;
