"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import CustomerTable from "./CustomerTable";
import AddCustomerModal from "./AddCustomerModal";
// import ExpensesTable from "../@expensesTable/page";
// import AddExpensesModal from "../@addExpensesModal/page";
// import DeleteModal from "../@deleteModal/page";

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

const CustomerRecord = () => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  return (
    <div>
      <AddCustomerModal open={open} setOpen={setOpen} />
      {/* <DeleteModal open={openDel} setOpen={setOpenDel} /> */}
      {/* Header section */}
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-20">
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
        <div className="flex lg:items-center items-start lg:justify-end">
          <div className="btns space-x-6 hidden lg:flex">
            <Button
              onClick={() => setOpen(true)}
              className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
              + Add new customer
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
        <CustomerTable data={dummyData} />
      </div>
    </div>
  );
};

export default CustomerRecord;
