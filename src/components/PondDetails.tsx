"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "@/components/ui/progress";
import FarmStaticsModal from "./FarmStaticsModal";
import DeleteModal from "./DeleteModal";

const PondDetails = () => {
  const [progress, setProgress] = useState(13);
  const [open, setOpen] = useState(false);
  return (
    <div className="card bg-white rounded-xl p-6">
      <DeleteModal open={open} setOpen={setOpen} />
      <div className="head flex items-center justify-between mb-2">
        <h2 className="font-bold text-[--primary] text-base ">Green Pond</h2>
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          className="text-xs text-[--secondary] font-normal">
          view details
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className="">
            Units: <span>200 units</span>
          </p>
          <div className="w-full">
            <Progress value={progress} className="bg-red-400 " />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className="">
            Feed: <span>8 mm</span>
          </p>
          <div className="w-full">
            <Progress value={progress} className="bg-red-400 " />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className="">
            Size: <span>2 1kg</span>
          </p>
          <div className="w-full">
            <Progress value={progress} className="bg-red-400 " />
          </div>
        </div>
        <div className="flex items-center whitespace-nowrap space-x-4">
          <p className="">
            Mortality Rate: <span>20 units</span>
          </p>
          <div className="w-full">
            <Progress value={progress} className="bg-red-400 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PondDetails;
