import React from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const AddTask = () => {
  return (
    <div className="lg:w-[40%] w-full mt-20">
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6">
        Task
      </h2>
      <Button className="border-none outline-none text-lg font-semibold text-white bg-[--primary] hover:bg-blue-500 w-full lg:h-[60px] h-[50px] ">
        + Add new task
      </Button>
      <div className="current-task mt-14">
        <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6">
          Current tasks
        </h2>
        <div className="space-y-8">
          <div className="tasks-list flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-red-400 text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">
                  Scheduled changing of pond water was not performed.
                </p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </div>
            <Checkbox id="terms2" className="h-6 w-6 checked:bg-[--primary]" />
          </div>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-green-600 text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </div>
            <Checkbox id="terms2" className="h-6 w-6 checked:bg-[--primary]" />
          </div>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-[--primary] text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </div>
            <Checkbox id="terms2" className="h-6 w-6 checked:bg-[--primary]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
