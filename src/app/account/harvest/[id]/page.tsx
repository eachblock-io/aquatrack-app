"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import HarvestStats from "@/components/HarvestStats";
import HarvestList from "./@harvestList/page";
import NavHeader from "@/components/NavHeader";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import {
  useDeleteAllHarvestMutation,
  useGetHarvestQuery,
} from "@/redux/services/harvestApiSlice";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import AddCustomerModal from "@/components/AddCustomerModal";
import { useGetCustomersQuery } from "@/redux/services/customerApiSlice";
import { searchTableData } from "@/utils";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";

const HarvestSinglePage = ({ params }: any) => {
  const { data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const { data: harvestData } = useGetHarvestQuery({
    farmId: defaultFarmId,
    harvestId: params?.id,
  });
  const { data: customerData } = useGetCustomersQuery({
    farmId: defaultFarmId,
    harvestId: params?.id,
  });
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchTableData(customerData?.data?.data, query));
  };

  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-11/12 mx-auto mt-8 ">
        <AddCustomerModal
          farmId={defaultFarmId}
          harvestId={params?.id}
          open={open}
          setOpen={setOpen}
        />
        <HarvestStats data={harvestData?.data?.card_data} />
        {/* Header section */}
        <section className="grid grid-cols-1 lg:flex lg:items-center justify-between gap-8 mt-8">
          <div className="flex items-center space-x-6 w-7/12">
            <div className="flex items-center bg-white py-2 px-4 rounded-lg w-full">
              <IoMdSearch className="w-6 h-6 text-gray-500" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search"
                className="border-none bg-transparent outline-none shadow-none"
              />
            </div>
          </div>
          <div className="flex lg:items-center items-start lg:justify-around space-x-6">
            {/* <div className="flex items-center space-x-2">
              <p className="text-nowrap text-gray-500 text-xs">Filter by</p>
              <Select>
                <SelectTrigger className=" h-10 border-gray-400 bg-white lg:w-[100px] w-[100px]">
                  <SelectValue className="text-xs" placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Date</SelectLabel>
                    <SelectLabel>Fish type</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div className="btns space-x-6 hidden lg:flex">
              <Button
                onClick={() => setOpen(true)}
                className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
                + Add new customer
              </Button>
            </div>
          </div>
        </section>
      </main>
      {customerData?.data?.data?.length > 0 ? (
        <div className="table lg:w-11/12 w-12/12 mx-auto mt-20 mb-10">
          <HarvestList
            data={
              filteredData?.length > 0 ? filteredData : customerData?.data?.data
            }
            harvestId={params?.id}
            farmId={defaultFarmId}
          />
        </div>
      ) : (
        <section className="h-[40vh] w-full flex items-center justify-center">
          <div className="relative lg:w-6/12 w-10/12 mx-auto">
            <div className="text absolute top-14 w-full text-center">
              <h2 className="font-bold text-2xl mb-2">No Customer Added</h2>
              <p>
                There are no customer here yet. However, once there are any,
                they will be displayed here.
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
    </>
  );
};

export default HarvestSinglePage;
