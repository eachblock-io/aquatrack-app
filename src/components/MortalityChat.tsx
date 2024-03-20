import Image from "next/image";
import React from "react";
import chartImg from "@/public/charts.png";
import farmImg from "@/public/Figpie.png";
import { GoDotFill } from "react-icons/go";

const MortalityChat = () => {
  return (
    <div className="lg:w-[60%] w-full">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-4 ">
        Mortality Rate
      </h2>
      <div className="bg-white rounded-xl p-6">
        <Image src={chartImg} alt="chart" width="600" height="400" />
      </div>

      <div className="chart mt-8">
        <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6 mt-6">
          Farm Details
        </h2>
        <div className="grid lg:grid-cols-2 grid-cols-2 items-center bg-white p-6 rounded-xl">
          <Image
            src={farmImg}
            alt="chart"
            width="300"
            height="300"
            className="lg:flex hidden"
          />
          <Image
            src={farmImg}
            alt="chart"
            width="150"
            height="150"
            className="lg:hidden flex mx-auto mb-8"
          />
          <div className="flex flex-col space-y-4 mx-auto ">
            <div className="flex items-center">
              <GoDotFill className="text-[--primary] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Total Unit:
                </p>
                <p className="lg:text-sm text-xs">0 units</p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[--primary] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Batch:
                </p>
                <p className="lg:text-sm text-xs">Nill</p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[--primary] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Feed Available:
                </p>
                <p className="lg:text-sm text-xs">0 bags</p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[--primary] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Ponds:
                </p>
                <p className="lg:text-sm text-xs">Nil</p>
              </div>
            </div>
            <div className="flex items-center">
              <GoDotFill className="text-[--primary] lg:h-6 lg:w-6 h-4 w-4" />{" "}
              <div className="flex">
                <p className="font-semibold text-[--primary] lg:text-sm text-xs">
                  Mortality Rate:
                </p>
                <p className="lg:text-sm text-xs">0 units</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortalityChat;
