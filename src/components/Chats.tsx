import Image from "next/image";
import React from "react";
import chartImg from "@/public/charts.png";
import farmImg from "@/public/Figpie.png";
import { GoDotFill } from "react-icons/go";
import MortalityChart from "./MortalityChart";
import FarmChart from "./FarmChart";

const MortalityChat = ({ data }: any) => {
  // console.log(data?.farm_details);
  return (
    <div className="lg:w-[60%] w-full">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-4 ">
        Mortality Rate
      </h2>
      <div className="bg-white rounded-xl p-4 h-[30rem]">
        {/* <Image src={chartImg} alt="chart" width="600" height="400" /> */}
        <MortalityChart data={data?.graph_data} />
      </div>

      {/* <div className="chart mt-8">
        <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6 mt-6">
          Farm Details
        </h2>
        <div className="grid lg:grid-cols-2 grid-cols-2 items-center bg-white p-6 rounded-xl">
          <div className="chat">
            <FarmChart data={data?.farm_details} />
          </div>
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
      </div> */}
    </div>
  );
};

export default MortalityChat;
