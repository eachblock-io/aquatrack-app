import AddTask from "@/components/AddTask";
import Hero from "@/components/Hero";
import MortalityChat from "@/components/MortalityChat";
import Overview from "@/components/Overview";
import React from "react";
import { cookies } from "next/headers";
import NavHeader from "@/components/NavHeader";

async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const headers = {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers,
    });

    const user = await res.json();
    return user?.data;
  } catch (error) {
    return error;
  }
}

const AccountPage = async () => {
  const userPromise = getCurrentUser();
  const [user] = await Promise.all([userPromise]);

  return (
    <>
      <NavHeader data={user} />
      <main className="w-full  mt-4">
        <Hero username={user?.attributes?.first_name} />
        <Overview />
        <section className="flex lg:flex-row flex-col lg:space-x-8 space-y-10 lg:space-y-0 lg:mt-20 mt-10 w-11/12 mx-auto pb-10">
          <MortalityChat />
          <AddTask />
        </section>
      </main>
    </>
  );
};

export default AccountPage;
