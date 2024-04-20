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

const InventoryPage = () => {
  const { data } = useGetCurrentUserQuery(null);

  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-11/12 mx-auto mt-8 ">
        <Tabs defaultValue="feeds" className="w-full">
          <TabsList className="grid w-full grid-cols-4 gap-x-6 lg:w-5/12">
            <TabsTrigger
              value="feeds"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2">
              Feed Records
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2">
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="employees"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2">
              Employees
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="bg-transparent font-normal data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[--primary] data-[state=active]:font-bold data-[state=active]:rounded-none data-[state=active]:border-b-4 data-[state=active]:border-[--primary] data-[state=active]:pb-2">
              Customers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feeds" className="pt-8">
            {data?.data?.organizations[0]?.farms[0]?.id ? (
              <FeedRecord farmId={data?.data?.organizations[0]?.farms[0]?.id} />
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
            {data?.data?.organizations[0]?.farms[0]?.id ? (
              <ExpensesRecord
                farmId={data?.data?.organizations[0]?.farms[0]?.id}
              />
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
            {data?.data?.organizations[0]?.farms[0]?.id ? (
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
            {data?.data?.organizations[0]?.farms[0]?.id ? (
              <CustomerRecord
                farmId={data?.data?.organizations[0]?.farms[0]?.id}
              />
            ) : (
              <section className="h-[70vh] flex items-center justify-center">
                <div className="relative lg:w-6/12 w-10/12 mx-auto">
                  <div className="text absolute top-14 w-full text-center">
                    <h2 className="font-bold text-2xl mb-2">No Customer record Added</h2>
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
      </main>
    </>
  );
};

export default InventoryPage;
