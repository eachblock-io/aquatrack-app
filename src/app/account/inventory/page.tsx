"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeedRecord from "./@feedsRecord/page";
import ExpensesRecord from "./expenses/@expensesRecord/page";
import EmployeeRecord from "@/components/employee/EmployeeRecord";
import CustomerRecord from "@/components/customer/CustomerRecord";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";

const InventoryPage = () => {
  const { data } = useGetCurrentUserQuery(null);
  // const { isLoading, data: ponds } = useGetAllPondsDataQuery({
  //   farmId: data?.data?.organizations[0]?.farms[0].id,
  // });

  return (
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
          <FeedRecord farmId={data?.data?.organizations[0]?.farms[0].id} />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpensesRecord farmId={data?.data?.organizations[0]?.farms[0].id} />
        </TabsContent>
        <TabsContent value="employees">
          <EmployeeRecord farmId={data?.data?.organizations[0]?.farms[0].id} />
        </TabsContent>
        <TabsContent value="customers">
          <CustomerRecord farmId={data?.data?.organizations[0]?.farms[0].id} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default InventoryPage;
