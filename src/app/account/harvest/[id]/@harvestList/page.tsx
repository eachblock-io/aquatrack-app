"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaPlus, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoIosArrowUp } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiStar } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HarvestTable from "../@harvestTable/page";

const dummyData = [
  {
    id: 15,
    price: "1200",
    size: "50 kg",
    pieces: "50 pcs",
    amount: "60,000",
    action: ["paid", "pending"],
  },
  {
    id: 42,
    price: "1200",
    size: "50 kg",
    pieces: "50 pcs",
    amount: "60,000",
    action: ["paid", "pending"],
  },
  {
    id: 34,
    price: "1200",
    size: "50 kg",
    pieces: "50 pcs",
    amount: "60,000",
    action: ["paid", "pending"],
  },
  // Add more dummy data as needed
];

const HarvestList = () => {
  const [rotate, setRotate] = useState(false);
  return (
    <div className="border-gray-300 border bg-white rounded-lg">
      <div className="header border-b border-gray-300 grid lg:grid-cols-3 grid grid-cols-2 p-6 rounded-lg">
        <div className="flex items-center lg:space-x-4 space-x-2 text-[--primary]">
          <Checkbox
            id="terms"
            className="lg:w-5 lg:h-5 w-4 h-4 data-[state=checked]:bg-[--primary]"
          />
          <h2 className="lg:text-base text-sm">Customer</h2>
        </div>
        <h2 className="text--[--primary] lg:text-sm ">Payment status</h2>
      </div>

      <Accordion type="single" collapsible className="w-full mx-auto ">
        <AccordionItem value="item-1" className="w-full">
          <AccordionTrigger className="w-full mx-auto transition-all [&[data-state=open]>svg]:rotate-180">
            <div className="sec-header grid grid-cols-3 px-6 w-full ">
              <div className="flex items-center lg:space-x-4 space-x-1">
                <Checkbox
                  onClick={() => "hey"}
                  id="terms"
                  className="w-4 h-4 data-[state=checked]:bg-[--primary]"
                />
                <h2 className="lg:text-sm text-xs">John Deo</h2>
              </div>
              <div className="flex items-center justify-start">
                <p className="text-xs flex items-center bg-[#18F4B4] rounded-lg text-[#05805C] lg:px-4 lg:py-2 py-1 px-2">
                  <span className="lg:flex hidden">Payment</span> Pending
                </p>
              </div>
              <div className="flex items-center lg:space-x-6 space-x-4">
                <div>
                  <FaStar className="text-[#F3C531] lg:h-6 lg:w-6 h-5 w-5" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="flex items-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                      <AiOutlinePlus className="w-5 h-5 text-gray-400" />
                      <span className="lg:flex hidden">Insert new row</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="flex items-center font-normal cursor-pointer ">
                      <AiOutlinePlus className="text-gray-500 h-4 w-4 mr-2 " />
                      Add new customer
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="flex items-center font-normal cursor-pointer ">
                      <CiStar className="text-gray-500 h-6 w-6 mr-2 " />
                      Choose beneficiary
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>

                <IoIosArrowUp
                  onClick={() => setRotate(!rotate)}
                  className={`h-6 w-6 shrink-0 text-gray-800 cursor-pointer transition-transform duration-200 ${
                    rotate && `transition-all rotate-180`
                  }`}
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="">
            <HarvestTable data={dummyData} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HarvestList;
