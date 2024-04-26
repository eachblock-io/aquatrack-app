"use client";
import { Checkbox } from "@/components/ui/checkbox";
import HarvestTable from "../@harvestTable/page";

const HarvestList = ({ data, harvestId, farmId }: any) => {
  return (
    <div className="border-gray-300 border bg-white rounded-lg">
      <div className="header border-b border-gray-300 lg:grid-cols-3 grid grid-cols-2 p-6 rounded-lg">
        <div className="flex items-center lg:space-x-4 space-x-2 text-[--primary]">
          <Checkbox
            id="terms"
            className="lg:w-5 lg:h-5 w-4 h-4 data-[state=checked]:bg-[--primary]"
          />
          <h2 className="lg:text-base text-sm">Customer</h2>
        </div>
        <h2 className="text--[--primary] lg:text-sm ">Payment status</h2>
      </div>

      {data?.map((customer: any) => (
        <HarvestTable
          key={customer?.id}
          customerId={customer?.id}
          harvestId={harvestId}
          farmId={farmId}
          data={customer?.relationships?.purchases}
          customer={customer}
        />
      ))}
    </div>
  );
};

export default HarvestList;
