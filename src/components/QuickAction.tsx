"use client";
import { useState } from "react";
import Image from "next/image";
import addpondIcon from "@/public/icons/add-pond.png";
import viewIcon from "@/public/icons/view-stat.png";
import AddPondModal from "./AddPondModal";
import FarmStaticsModal from "./FarmStaticsModal";

const QuickAction = ({ farmId }: any) => {
  const [open, setOpen] = useState(false);
  const [openStats, setOpenStats] = useState(false);
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto mt-6">
      <AddPondModal farmId={farmId} open={open} setOpen={setOpen} />
      <FarmStaticsModal
        farmId={farmId}
        open={openStats}
        setOpen={setOpenStats}
      />
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg">
        Quick Actions
      </h2>
      <div className="lg:w-8/12 grid grid-cols-2 lg:gap-8 gap-6 lg:mt-10 mt-4">
        <div
          onClick={() => setOpen(true)}
          className="card bg-white rounded-xl lg:p-6 p-4 cursor-pointer flex lg:items-center items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={addpondIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={addpondIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-base text-sm">Add New Pond</p>
          </div>
        </div>
        <div
          onClick={() => setOpenStats(true)}
          className="card bg-white rounded-xl p-6 cursor-pointer flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={viewIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={viewIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-base text-sm">
              View Farm Stats
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAction;
