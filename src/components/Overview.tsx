import React from "react";
import Image from "next/image";
import capitalIcon from "@/public/icons/capital-icon.png";
import profitIcon from "@/public/icons/profit.png";
import expensesIcon from "@/public/icons/expenses.png";

const Overview = () => {
  return (
    <section className="lg:w-11/12 w-10/12 mx-auto lg:mt-4 mt-10">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg">
        Overview
      </h2>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:mt-8 mt-4">
        <div className="card flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={capitalIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={capitalIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-sm text-xs">Capital</p>
            <h2 className="font-bold text-[--primary] lg:text-lg text-base">
              N 5,842,000{" "}
            </h2>
            <p className="text-xs text-green-400">2.5%</p>
          </div>
        </div>
        <div className="card flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={profitIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={profitIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-sm text-xs">Net Profit</p>
            <h2 className="font-bold text-[--primary] lg:text-lg text-base">
              N 1,842,000{" "}
            </h2>
            <p className="text-xs text-green-400">2.5%</p>
          </div>
        </div>
        <div className="card flex lg:items-center lg:space-x-4 space-x-2">
          <div>
            <Image
              src={expensesIcon}
              alt="Greeting Image"
              layout="fixed"
              width="60"
              height="50"
              priority
              className="lg:flex hidden"
            />
            <Image
              src={expensesIcon}
              alt="Greeting Image"
              layout="fixed"
              width="40"
              height="40"
              priority
              className="flex lg:hidden"
            />
          </div>
          <div className="stat">
            <p className="text-gray-400 lg:text-sm text-xs">Total Expenses</p>
            <h2 className="font-bold text-[--primary] lg:text-lg text-base">
              N 842,000{" "}
            </h2>
            <p className="text-xs text-green-400">2.5%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
