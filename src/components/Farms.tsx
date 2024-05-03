import React, { useState } from "react";
import { useGetAllFarmsQuery } from "@/redux/services/farmApiSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoIosArrowDown } from "react-icons/io";
import { GiCirclingFish } from "react-icons/gi";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";
import EditFarmModal from "./EditFarmModal";

const Farms = () => {
  const { data } = useGetAllFarmsQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const [openEdit, setOpenEdit] = useState(false);
  const [farmData, setFarmData] = useState();

  const handleEdit = (value: any) => {
    if (value?.name) {
      setFarmData(value);
      setOpenEdit(true);
    }
  };

  console.log(data?.data?.organizations);
  
  return (
    <section className="mt-10">
      {farmData && (
        <EditFarmModal data={farmData} open={openEdit} setOpen={setOpenEdit} />
      )}
      <Accordion
        type="single"
        collapsible
        className="w-full border-none underline-none bg-white border rounded-lg p-4 pb-0">
        {data?.data?.organizations?.map((org: any, index: any) => (
          <AccordionItem key={org?.id} value={org?.id}>
            <AccordionTrigger className="rounded-lg py-4 px-2 border-none w-full hover:bg-gray-100">
              <label
                className={`text-sm flex items-center cursor-pointer w-full `}>
                <GiCirclingFish className="text-gray-500 h-6 w-6 mr-2 " />
                <span className="text-sm font-bold">
                  {org?.attributes?.organization_name}
                </span>
              </label>
              <IoIosArrowDown />
            </AccordionTrigger>
            {org?.farms?.map((farm: any) => (
              <AccordionContent
                key={farm?.id}
                className="flex items-center justify-between p-0 px-4 space-0">
                <div
                  className={` hover:bg-blue-100 rounded-lg w-10/12 py-4 px-4 flex items-center  border-none font-medium cursor-pointer`}>
                  <FaArrowAltCircleUp className="text-gray-400 h-4 w-4 mr-2 " />
                  <p className="text-base font-bold">{farm?.name}</p>
                </div>
                <MdOutlineEdit
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => handleEdit(farm)}
                />
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Farms;
