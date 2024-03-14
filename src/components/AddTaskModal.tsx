"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "@/components/ui/switch";
import { MdAccessTime } from "react-icons/md";

const AddTaskModal = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 lg:max-w-lg">
                <IoClose
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 h-6 w-6 text-gray-500 "
                />
                <div className="bg-white lg:py-10 lg:px-14 p-10">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-[--primary] ">
                        Add Task
                      </Dialog.Title>
                    </div>
                  </div>
                  <form className="space-y-6 mt-8">
                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className="text-[--primary] font-normal mb-2">
                        Title
                      </Label>
                      <Input
                        type="text"
                        placeholder="Task title"
                        className=" focus-visible:outline-none py-6 "
                      />
                    </div>
                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className="text-[--primary] font-normal mb-2">
                        Describe
                      </Label>
                      <Textarea
                        placeholder="Type your task Description here."
                        rows={4}
                        className="resize-none"
                        id="message-2"
                      />
                    </div>
                    <div className="form-control">
                      <p className="text-[--primary] mb-2">Repeat</p>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex space-x-2">
                          <MdAccessTime className="text-[--primary]" />
                          <Label
                            htmlFor="airplane-mode"
                            className="text-[--primary] font-normal">
                            Everyday
                          </Label>
                        </div>
                        <Switch
                          id="airplane-mode"
                          className="text-[--primary]"
                        />
                      </div>
                    </div>
                    <Button className=" mt-10 outline-none border-none font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                      Add Task
                    </Button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddTaskModal;
