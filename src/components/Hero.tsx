import React from "react";
import Image from "next/image";
import heroImg from "@/public/icons/greet.png";
import heroWorkImg from "@/public/heroImg.png";
import { Button } from "./ui/button";
import Link from "next/link";
import { greetUser } from "@/utils";

const Hero = ({ data }: any) => {
  // Greeting user function
  const greeting = greetUser();
  return (
    <section className="lg:w-11/12 w-11/12 mx-auto  ">
      <div className="flex items-center justify-between lg:mt-0 mt-4">
        <div className="left-side flex lg:space-x-6 space-x-4 bg-white rounded-xl px-8 py-8 lg:w-9/12 w-full">
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
          <div className="content w-full">
            <h2 className="text-[--primary] font-bold lg:text-xl text-lg ">
              {greeting}, {data?.attributes?.first_name}
            </h2>
            <p className="text-gray-500 lg:text-base text-xs lg:mt-2 mt-1">
              Welcome to your AquaTrack dashboard.{" "}
            </p>
            {data?.attributes?.fully_onboarded == false && (
              <>
                <p className="text-gray-500 lg:text-base text-xs lg:mt-2 mt-1">
                  Complete your profile to get started{" "}
                </p>
                <div className="text-right">
                  <Link href="/">
                    <Button className="bg-[--primary] hover:bg-[--secondary] lg:px-8 lg:py-5 lg:text-sm text-xs mt-3 text-white ">
                      Complete profile
                    </Button>
                  </Link>
                </div>
              </>
            )}
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
