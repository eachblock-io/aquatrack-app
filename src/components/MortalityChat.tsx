import Image from "next/image";
import React from "react";
import chartImg from "@/public/charts.png";

const MortalityChat = () => {
  return (
    <div className="lg:w-[60%] w-full">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg">
        Mortality Rate
      </h2>
      <Image src={chartImg} alt="chart" width="600" height="400" />
    </div>
  );
};

export default MortalityChat;
