import React from "react";
import Image from "next/image";
import capitalIcon from "@/public/icons/capital-icon.png";
import profitIcon from "@/public/icons/profit.png";
import expensesIcon from "@/public/icons/expenses.png";
import { GoArrowDownRight } from "react-icons/go";
import { FaArrowTrendUp } from "react-icons/fa6";

const HarvestStats = () => {
  return (
    <section className="w-full mx-auto lg:mt-4 mb-6">
      <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-4 gap-y-6 lg:mt-4 mt-4">
        <div className="card bg-white py-4 px-6 rounded-xl">
          <div className="flex items-center  lg:space-x-4 space-x-2">
            <Image
              src={capitalIcon}
              alt="Greeting Image"
              layout="fixed"
              width="15"
              height="15"
              priority
            />
            <p className="text-gray-400 lg:text-sm text-xs">Total Harvest</p>
          </div>
          <div className="stat mt-2">
            <h2 className="font-semibold text-[--primary] lg:text-lg text-base">
              N 5,842,000{" "}
            </h2>
            <div className="text-right flex items-center justify-end mt-2">
              <span className="text-xs flex items-center text-[#FF7878] bg-[#ff787840] font-semibold px-2 py-1 rounded-full">
                2.5%
                <GoArrowDownRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card bg-white py-4 px-6 rounded-xl">
          <div className="flex items-center  lg:space-x-4 space-x-2">
            <FaArrowTrendUp className="text-[--primary]" />
            <p className="text-gray-400 lg:text-sm text-xs">Total Capital</p>
          </div>
          <div className="stat mt-2">
            <h2 className="font-semibold text-[--primary] lg:text-lg text-base">
              N 5,842,000{" "}
            </h2>
            <div className="text-right flex items-center justify-end mt-2">
              <span className="text-xs flex items-center text-[#FF7878] bg-[#ff787840] font-semibold px-2 py-1 rounded-full">
                2.5%
                <GoArrowDownRight />
              </span>
            </div>
          </div>
        </div>
        <div className="card lg:block hidden bg-white py-4 px-6 rounded-xl">
          <div className="flex items-center  lg:space-x-4 space-x-2">
            <FaArrowTrendUp className="text-[--primary]" />
            <p className="text-gray-400 lg:text-sm text-xs">Total Profit</p>
          </div>
          <div className="stat mt-2">
            <h2 className="font-semibold text-[--primary] lg:text-lg text-base">
              N 5,842,000{" "}
            </h2>
            <div className="text-right flex items-center justify-end mt-2">
              <span className="text-xs flex items-center text-[#FF7878] bg-[#ff787840] font-semibold px-2 py-1 rounded-full">
                2.5%
                <GoArrowDownRight />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card lg:hidden block bg-white py-4 px-6 mt-4 rounded-xl">
        <div className="flex items-center  lg:space-x-4 space-x-2">
          <FaArrowTrendUp className="text-[--primary]" />
          <p className="text-gray-400 lg:text-sm text-xs">Total Profit</p>
        </div>
        <div className="stat mt-2">
          <h2 className="font-semibold text-[--primary] lg:text-lg text-base">
            N 5,842,000{" "}
          </h2>
          <div className="text-right flex items-center justify-end">
            <span className="text-xs flex items-center text-[#FF7878] bg-[#ff787840] font-semibold px-2 py-1 rounded-full">
              2.5%
              <GoArrowDownRight />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HarvestStats;
