import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import BillingTable from "./BillingTable";
import { useGetBuillingRecordsQuery } from "@/redux/services/subApiSlice";

const Billings = () => {
  const { data } = useGetBuillingRecordsQuery(null);
  console.log(data?.data?.payment_info);
  return (
    <div className="mt-20">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-4 w-10/12">
        <div className="bg-white w-full p-8 rounded-xl border">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Payment info</h2>
            <div className="flex items-center space-x-2">
              <label htmlFor="airplane-mode">Auto renewal</label>
              <Switch id="airplane-mode" />
            </div>
          </div>
          <div className=" mt-10 space-y-2">
            <p>******</p>
            <div className="flex space-x-6">
              <p>CARD LOGO</p>
              <h2>Master Card</h2>
            </div>
            <p>{data?.data?.payment_info?.bank}</p>
            <p>6774983*******</p>
          </div>
        </div>
        <div className="bg-[--primary] text-white w-full p-8 rounded-xl border">
          <h2 className="font-semibold text-xl">Your current plan</h2>
          <div className=" mt-10 space-y-2">
            <p className="text-xl">{data?.data?.current_plan?.type} Plan</p>
            <p className="text-xl">NGN {data?.data?.current_plan?.amount}</p>
            <div className="mt-10">
              <Button className="bg-white w-full py-6 text-[--primary] text-xl font-semibold ">
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BillingTable />
    </div>
  );
};

export default Billings;
