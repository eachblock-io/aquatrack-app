import AddTask from "@/components/AddTask";
import Hero from "@/components/Hero";
import MortalityChat from "@/components/MortalityChat";
import Overview from "@/components/Overview";
import React from "react";

const AccountPage = () => {
  return (
    <main className="w-full  mt-4">
      <Hero />
      <Overview />
      <section className="flex lg:flex-row flex-col lg:space-x-8 space-y-10 lg:space-y-0 lg:mt-20 mt-10 w-11/12 mx-auto pb-10">
        <MortalityChat />
        <AddTask />
      </section>
    </main>
  );
};

export default AccountPage;
