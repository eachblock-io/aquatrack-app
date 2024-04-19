"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoIosArrowUp } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HarvestTable from "../@harvestTable/page";
import InsertRowModal from "../@insertRowModal/page";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const HarvestList = ({ data, harvestId, farmId }: any) => {
  const [rotate, setRotate] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");

  // console.log(data[0]?.relationships?.purchases);

  const handleOpenModal = (customerId: any) => {
    if (customerId) {
      setOpen(true);
      setCustomerId(customerId);
    }
  };

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

      <InsertRowModal
        open={open}
        setOpen={setOpen}
        harvestId={harvestId}
        customerId={customerId}
        farmId={farmId}
      />

      {data?.map((customer: any) => (
        <Accordion
          key={customer?.id}
          type="single"
          collapsible
          className="w-full mx-auto ">
          <AccordionItem value={customer?.id} className="w-full">
            <div className="flex items-center pr-4 relative">
              <div className="sec-header flex items-center justify-between px-6 w-full relative">
                <div className="flex items-center lg:space-x-4 space-x-1">
                  {/* <Checkbox
                  id="terms"
                  className="w-4 h-4 data-[state=checked]:bg-[--primary]"
                /> */}
                  <h2 className="lg:text-sm text-xs">
                    {customer?.attributes?.name}
                  </h2>
                </div>
                {/* <div className="flex items-center justify-start">
                  <p className="text-xs flex items-center bg-[#18F4B4] rounded-lg text-[#05805C] lg:px-4 lg:py-2 py-1 px-2">
                    <span className="lg:flex hidden">Payment</span> Pending
                  </p>
                </div> */}
                {/* <div className="flex items-center lg:space-x-6 space-x-4">
                  <div>
                    <FaStar className="text-[#F3C531] lg:h-6 lg:w-6 h-5 w-5" />
                  </div>

                  <Menubar className="border-none">
                    <MenubarMenu>
                      <MenubarTrigger>
                        <Button className="flex items-center space-x-3 text-[--primary] font-normal border border-[--primary] ">
                          <AiOutlinePlus className="w-5 h-5 text-gray-400" />
                          <span className="lg:flex hidden">Insert new row</span>
                        </Button>
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem
                          onClick={() => handleOpenModal(customer?.id)}
                          className="flex items-center font-normal cursor-pointer ">
                          <AiOutlinePlus className="text-gray-500 h-4 w-4 mr-2 " />
                          Add new purchase
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem className="flex items-center font-normal cursor-pointer ">
                          <CiStar className="text-gray-500 h-6 w-6 mr-2 " />
                          Choose beneficiary
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div> */}
              </div>
              <AccordionTrigger className="w-full mx-auto transition-all [&[data-state=open]>svg]:rotate-180">
                <IoIosArrowUp
                  // onClick={() => rotateIcon(customer?.id)}
                  className={`h-6 w-6 shrink-0 text-gray-800 cursor-pointer transition-transform duration-200 ${
                    rotate && `transition-all rotate-180`
                  }`}
                />
              </AccordionTrigger>
            </div>
            <AccordionContent className="">
              <HarvestTable
                customerId={customer?.id}
                harvestId={harvestId}
                farmId={farmId}
                data={customer?.relationships?.purchases}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default HarvestList;
