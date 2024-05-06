"use client";
import AddTask from "@/components/AddTask";
import Hero from "@/components/Hero";
import Chats from "@/components/Chats";
import Overview from "@/components/Overview";
import NavHeader from "@/components/NavHeader";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useGetFarmDataQuery } from "@/redux/services/farmApiSlice";
import CreateFarmState from "@/components/CreateFarmState";
import { Skeleton } from "@/components/ui/skeleton";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";

const AccountPage = () => {
  const { isLoading: loading, data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const { isLoading, data: dashboard } = useGetFarmDataQuery({
    farmId: defaultFarmId,
  });

  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-full">
        <Hero data={data?.data} />
        <Overview data={dashboard?.data} isLoading={isLoading} />
        {loading ? (
          <div className="mt-10 lg:w-11/12 w-10/12 mx-auto flex items-center gap-x-8">
            <div className="mt-8 lg:w-8/12 w-full">
              <div>
                <Skeleton className="w-full bg-gray-200 h-4" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
              </div>
              <div className="mt-4">
                <Skeleton className="w-full bg-gray-200 h-20" />
              </div>
            </div>
            <div className="mt-8 lg:w-4/12 w-full">
              <div>
                <Skeleton className="w-full bg-gray-200 h-20" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-full bg-gray-200 h-4" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {data?.data?.organizations[0]?.farms[0]?.id ? (
              <section className="flex lg:flex-row flex-col lg:space-x-8 space-y-10 lg:space-y-0 lg:mt-20 mt-10 w-11/12 mx-auto pb-10">
                <Chats data={dashboard?.data} />
                <AddTask farmID={data?.data?.organizations[0]?.farms[0]?.id} />
              </section>
            ) : (
              <CreateFarmState />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default AccountPage;
