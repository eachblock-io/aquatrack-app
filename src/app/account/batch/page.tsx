import React from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import BatchTable from "@/components/BatchTable";

const dummyData = [
  {
    id: 1,
    date: "2024-03-18",
    name: "John Doe",
    unitPurchased: 5,
    fishType: "Salmon",
    status: "Delivered",
  },
  {
    id: 2,
    date: "2024-03-19",
    name: "Jane Smith",
    unitPurchased: 3,
    fishType: "Tuna",
    status: "Pending",
  },
  {
    id: 3,
    date: "2024-03-20",
    name: "Alice Johnson",
    unitPurchased: 2,
    fishType: "Trout",
    status: "Delivered",
  },
  // Add more dummy data as needed
];

const BatchPage = () => {
  return (
    <main className="w-11/12 mx-auto mt-8 ">
      {/* Header section */}
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-white py-2 px-4 rounded-lg w-full">
            <IoMdSearch className="w-6 h-6 text-gray-500" />
            <Input
              type="search"
              placeholder="Search"
              className="border-none bg-transparent outline-none shadow-none"
            />
          </div>
          <div className="btns space-x-4 lg:hidden flex">
            <Button className="px-2 py-5 bg-[--primary] hover:bg-[--primary]">
              <FaPlus className="w-6 h-6" />
            </Button>
            <Button className="px-2 py-5 bg-red-500 hover:bg-red-400">
              <RiDeleteBinLine className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="flex lg:items-center items-start lg:justify-around">
          <div className="flex items-center space-x-6">
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
          </div>
          <div className="btns space-x-6 hidden lg:flex">
            <Button className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
              + Add new batch
            </Button>
            <Button className="px-6 py-5 bg-red-500 hover:bg-red-400">
              Delete
            </Button>
          </div>
        </div>
      </section>

      <div className="table w-full mt-20">
        <BatchTable data={dummyData} />
      </div>
    </main>
  );
};

export default BatchPage;
