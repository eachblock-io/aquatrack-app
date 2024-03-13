import React from "react";
import Image from "next/image";
import heroImg from "@/public/icons/greet.png";
import heroWorkImg from "@/public/heroImg.png";

const Hero = () => {
  return (
    <section className="lg:w-10/12 w-10/12 mx-auto">
      <div className="flex items-center justify-between lg:mt-0 mt-4">
        <div className="left-side flex lg:space-x-6 space-x-4">
          <div>
            <Image
              src={heroImg}
              alt="Greeting Image"
              layout="fixed"
              width="70"
              height="70"
              className="lg:flex hidden"
            />
            <Image
              src={heroImg}
              alt="Greeting Image"
              layout="fixed"
              width="50"
              height="50"
              className="lg:hidden flex"
            />
          </div>
          <div className="content">
            <h2 className="text-[--primary] font-bold lg:text-2xl text-lg ">
              Good Afternoon, Jane
            </h2>
            <p className="text-gray-500 lg:text-base text-xs lg:mt-2 mt-1">
              Welcome to your AquaTrack dashboard.{" "}
            </p>
          </div>
        </div>
        <Image
          src={heroWorkImg}
          alt="Greeting Image"
          layout="fixed"
          width="250"
          height="250"
          className="lg:flex hidden"
        />
      </div>
    </section>
  );
};

export default Hero;
