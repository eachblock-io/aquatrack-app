"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import AddPurchaseModal from "../@addPurchaseModal/page";
import FeedsTable from "../@feedsTable/page";
import DeleteModal from "../@deleteModal/page";
import { useGetFeedsQuery } from "@/redux/services/feedRecordApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { searchTableData } from "@/utils";

const FeedRecord = ({ farmId }: any) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { data, isLoading } = useGetFeedsQuery({ farmId });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchTableData(data?.data?.data, query));
  };

  return (
    <div>
      <AddPurchaseModal farmId={farmId} open={open} setOpen={setOpen} />
      <DeleteModal open={openDel} setOpen={setOpenDel} />
      {/* Header section */}
      {/* <Select>
        <SelectTrigger className=" h-10 border-gray-400 bg-white lg:w-[100px] w-[150px]">
          <SelectValue placeholder="Batch" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Batch 1</SelectLabel>
            <SelectLabel>Batch 2</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <section className="flex items-center justify-between gap-8 mt-8">
        <div className="flex items-center justify-between space-x-6 w-8/12">
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
          <div className="btns space-x-4 lg:hidden flex">
            <Button
              onClick={() => setOpen(true)}
              className="px-2 py-5 bg-[--primary] hover:bg-[--primary]">
              <FaPlus className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => setOpenDel(true)}
              className="px-2 py-5 bg-red-500 hover:bg-red-400">
              <RiDeleteBinLine className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="flex lg:items-center items-start lg:justify-around">
          {/* <div className="flex items-center space-x-6">
            <p className="text-nowrap text-gray-500">Filter by</p>
            <Select>
              <SelectTrigger className=" h-10 border-gray-400 bg-white lg:w-[100px] w-[150px]">
                <SelectValue placeholder="Date" />
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
              + Add new purchase
            </Button>
            <Button
              onClick={() => setOpenDel(true)}
              className="px-6 py-5 bg-red-500 hover:bg-red-400">
              Delete
            </Button>
          </div>
        </div>
      </section>

      <div className="table w-full mt-20">
        {isLoading ? (
          <section className="mt-20 w-full mx-auto">
            <div className="space-y-2 bg-white p-6 rounded-xl">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
            </div>
          </section>
        ) : (
          <FeedsTable
            data={filteredData?.length > 0 ? filteredData : data?.data?.data}
            farmId={farmId}
          />
        )}
      </div>
    </div>
  );
};

export default FeedRecord;
