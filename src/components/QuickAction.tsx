"use client";
import { useState } from "react";
import Image from "next/image";
import addpondIcon from "@/public/icons/add-pond.png";
import viewIcon from "@/public/icons/view-stat.png";
import AddPondModal from "./AddPondModal";

const QuickAction = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto lg:mt-4 mt-10">
      <AddPondModal open={open} setOpen={setOpen} />
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 lg:gap-4 gap-y-6 lg:mt-10 mt-4">
        <div
          onClick={() => setOpen(true)}
          className="card cursor-pointer flex lg:items-center lg:space-x-4 space-x-2">
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
        <div className="card cursor-pointer flex lg:items-center lg:space-x-4 space-x-2">
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
