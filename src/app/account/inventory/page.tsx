"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedRecord from "./@feedsRecord/page";
import ExpensesRecord from "./expenses/@expensesRecord/page";
import EmployeeRecord from "@/components/employee/EmployeeRecord";
import CustomerRecord from "@/components/customer/CustomerRecord";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import NavHeader from "@/components/NavHeader";
import CreateFarmState from "@/components/CreateFarmState";
import { Skeleton } from "@/components/ui/skeleton";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";

const InventoryPage = () => {
  const { isLoading, data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();

  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-11/12 mx-auto mt-8 ">
        {isLoading ? (
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
            {defaultFarmId ? (
              <>
                <Tabs defaultValue="feeds" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 lg:gap-x-6 gap-x-10 lg:w-5/12">
                    <TabsTrigger
                      value="feeds"
                      className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
                      Feed <span className="lg:flex hidden">Records</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="expenses"
                      className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
                      Expenses
                    </TabsTrigger>
                    <TabsTrigger
                      value="employees"
                      className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
                      Employees
                    </TabsTrigger>
                    <TabsTrigger
                      value="customers"
                      className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2 lg:text-base text-sm lg:data-[state=active]:text-base data-[state=active]:text-sm">
                      Customers
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="feeds" className="pt-8">
                    {defaultFarmId ? (
                      <FeedRecord farmId={defaultFarmId} />
                    ) : (
                      <section className="h-[70vh] flex items-center justify-center">
                        <div className="relative lg:w-6/12 w-10/12 mx-auto">
                          <div className="text absolute top-14 w-full text-center">
                            <h2 className="font-bold text-2xl mb-2">
                              No Feed Record Added
                            </h2>
                            <p>Create a farm to add feed</p>
                          </div>
                          <Image
                            src={emptyImg}
                            alt="empty"
                            height={300}
                            width={200}
                            layout="fixed"
                            className="mx-auto"
                          />
                        </div>
                      </section>
                    )}
                  </TabsContent>
                  <TabsContent value="expenses">
                    {defaultFarmId ? (
                      <ExpensesRecord farmId={defaultFarmId} />
                    ) : (
                      <section className="h-[70vh] flex items-center justify-center">
                        <div className="relative lg:w-6/12 w-10/12 mx-auto">
                          <div className="text absolute top-14 w-full text-center">
                            <h2 className="font-bold text-2xl mb-2">
                              No Expenses Record Added
                            </h2>
                            <p>
                              <p>Create a farm to add expenses record</p>
                            </p>
                          </div>
                          <Image
                            src={emptyImg}
                            alt="empty"
                            height={300}
                            width={200}
                            layout="fixed"
                            className="mx-auto"
                          />
                        </div>
                      </section>
                    )}
                  </TabsContent>
                  <TabsContent value="employees">
                    {defaultFarmId ? (
                      <EmployeeRecord
                        farmId={data?.data?.organizations[0]?.farms[0].id}
                      />
                    ) : (
                      <section className="h-[70vh] flex items-center justify-center">
                        <div className="relative lg:w-6/12 w-10/12 mx-auto">
                          <div className="text absolute top-14 w-full text-center">
                            <h2 className="font-bold text-2xl mb-2">
                              No Employee record Added
                            </h2>
                            <p>Create a farm to add employee</p>
                          </div>
                          <Image
                            src={emptyImg}
                            alt="empty"
                            height={300}
                            width={200}
                            layout="fixed"
                            className="mx-auto"
                          />
                        </div>
                      </section>
                    )}
                  </TabsContent>
                  <TabsContent value="customers">
                    {defaultFarmId ? (
                      <CustomerRecord farmId={defaultFarmId} />
                    ) : (
                      <section className="h-[70vh] flex items-center justify-center">
                        <div className="relative lg:w-6/12 w-10/12 mx-auto">
                          <div className="text absolute top-14 w-full text-center">
                            <h2 className="font-bold text-2xl mb-2">
                              No Customer record Added
                            </h2>
                            <p>Create a farm to add customer records</p>
                          </div>
                          <Image
                            src={emptyImg}
                            alt="empty"
                            height={300}
                            width={200}
                            layout="fixed"
                            className="mx-auto"
                          />
                        </div>
                      </section>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <CreateFarmState vheight="70vh" />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default InventoryPage;
