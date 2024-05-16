import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { GiCheckMark } from "react-icons/gi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

const SubscriptionModal = ({ open, setOpen }: any) => {
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
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 lg:w-8/12">
                <div className="flex items-center justify-center border border-gray-600 rounded-full absolute top-8 right-8 h-8 w-8 cursor-pointer">
                  <IoClose
                    onClick={() => setOpen(false)}
                    className=" h-5 w-5 text-gray-600"
                  />
                </div>
                <div className="">
                  <div className="left-side lg:w-5/12 bg-gray-200 rounded-lg px-10 pt-14 pb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Try Aquatrack Pro for free
                    </h2>
                    <div className="mt-8">
                      <div className="flex items-center space-x-4">
                        <GiCheckMark className="text-green-600" />
                        <p className="text-sm">
                          Free 30 days trial, cancle any time
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <GiCheckMark className="text-green-600" />
                        <p className="text-sm">
                          We`ll remind you before your trial ends
                        </p>
                      </div>
                    </div>
                    <form className="form mt-6">
                      <RadioGroup
                        defaultValue="comfortable"
                        className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="default"
                            id="r1"
                            className="h-6 w-6 focus:text-green-600 "
                          />
                          <label htmlFor="r1" className="mt-8">
                            <p className="flex items-center font-semibold text-lg">
                              Yearly{" "}
                              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                                Best value - Save N9,700
                              </span>{" "}
                            </p>
                            <p className="text-sm mt-2">
                              N23,900 (N1,991.66/month)
                            </p>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="monthly"
                            id="r1"
                            className="h-6 w-6 focus:text-green-600 "
                          />
                          <label htmlFor="r1" className="mt-6">
                            <p className="flex items-center font-semibold text-lg">
                              Monthly
                            </p>

                            <p className="text-sm">N2,800</p>
                          </label>
                        </div>
                      </RadioGroup>
                      <Button className="w-full bg-[--primary] hover:bg-[--primary] py-6 font-semibold mt-8">
                        Next
                      </Button>
                    </form>
                    <div className="mt-10">
                      <p className="text-xs text-gray-400">
                        By continuing, you agree to the{" "}
                        <Link href="/" className="underline">
                          Terms of Use{" "}
                        </Link>
                        applicable to the Aquatrack Pro and confirm you have
                        read our{" "}
                        <Link href="/" className="underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                    {/* <Menubar className="bg-none mt-4">
                      <MenubarMenu>
                        <MenubarTrigger>
                          <button className="w-full bg-white">
                            Choose custom
                          </button>
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                          </MenubarItem>
                          <MenubarItem>New Window</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Share</MenubarItem>
                          <MenubarSeparator />
                          <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar> */}
                  </div>
                  <div className="right-side lg:w-full"></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubscriptionModal;
