"use client";
import AddTask from "@/components/AddTask";
import Hero from "@/components/Hero";
import Chats from "@/components/Chats";
import Overview from "@/components/Overview";
import React from "react";
import NavHeader from "@/components/NavHeader";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useGetFarmDataQuery } from "@/redux/services/farmApiSlice";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";

const AccountPage = () => {
  const { data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId(data?.data);
  const { data: dashboard } = useGetFarmDataQuery({
    farmId: defaultFarmId,
  });

  

  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-full  mt-4">
        <Hero username={data?.data?.attributes?.first_name} />
        <Overview data={dashboard?.data} />
        <section className="flex lg:flex-row flex-col lg:space-x-8 space-y-10 lg:space-y-0 lg:mt-20 mt-10 w-11/12 mx-auto pb-10">
          <Chats data={dashboard?.data} />
          <AddTask />
        </section>
      </main>
    </>
  );
};

export default AccountPage;
