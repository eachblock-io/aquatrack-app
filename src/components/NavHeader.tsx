"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import notification from "@/public/icons/Notification.png";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import logoutIcon from "@/public/icons/logout.png";
import { Button } from "./ui/button";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { links } from "@/contants";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { Dialog } from "@headlessui/react";
import logoImg from "@/public/logo.png";
import Link from "next/link";

const NavHeader = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white w-full lg:h-[10vh] h-[8vh] flex items-center justify-center">
      <div className="flex items-center justify-between w-11/12 mx-auto">
        <IoIosMenu
          className="text-[--primary] h-8 w-8 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-hidden="true"
        />
        <div className=" lg:flex hidden">
          {links?.map((data) => {
            if (pathname === data?.link) {
              return (
                <h1
                  key={data?.id}
                  className="font-bold text-xl text-[--primary] ">
                  {data?.title}
                </h1>
              );
            }
          })}
        </div>
        <div className="flex items-center lg:space-x-6 space-x-4">
          <Image
            src={notification}
            alt="notification"
            layout="notification"
            width="30"
            height="30"
            className="cursor-pointer"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2 outline-none border-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-[--primary]">
                  John Deo
                </p>
              </div>
              <IoIosArrowDown className="text-[--primary] " />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-6 pt-4">
              <DropdownMenuLabel className="flex items-center font-medium cursor-pointer ">
                <FaArrowAltCircleUp className="text-gray-500 h-4 w-4 mr-2 " />
                Farm 1
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center font-medium cursor-pointer ">
                <FaArrowAltCircleUp className="text-gray-500 h-4 w-4 mr-2 " />
                Add new farm
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center font-medium cursor-pointer ">
                <FaArrowAltCircleUp className="text-gray-500 h-4 w-4 mr-2 " />
                Community
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start font-bold space-x-2 text-red-500 hover:bg-[#ea1c0115] hover:text-red-500 py-8 pl-4  rounded-xl transition-all">
                  <Image
                    src={logoutIcon}
                    alt="Logout"
                    layout="fixed"
                    width="25"
                    height="25"
                  />
                  <p>Log Out</p>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile view */}

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between w-11/12 py-6 h-[60px] rounded-2xl mx-auto">
            <Image
              src={logoImg}
              alt="Aquatrack logo"
              width="150"
              height="150"
              layout="fixed"
            />
            <button
              type="button"
              className="-m-2.5 rounded-md border border-[--primary] p-2.5 text-[--primary]"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <IoMdClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <nav className="mt-8 space-y-2">
                {links?.map((data) => (
                  <Link
                    key={data?.id}
                    href={data?.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center hover:font-semibold space-x-2 text-[--primary] hover:bg-[#0181ea15] py-3 pl-4 transition-all ${
                      pathname === data?.link
                        ? `bg-[#0181ea15] font-semibold border-[--primary] border-l-8`
                        : ``
                    }`}>
                    <Image
                      src={data?.icon}
                      alt={data?.title}
                      layout="fixed"
                      width="25"
                      height="25"
                    />
                    <p>{data?.title}</p>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  className="flex w-full items-center justify-start font-bold space-x-2 text-red-500 hover:bg-[#ea1c0115] hover:text-red-500 py-8 pl-4  rounded-xl transition-all">
                  <Image
                    src={logoutIcon}
                    alt="Logout"
                    layout="fixed"
                    width="25"
                    height="25"
                  />
                  <p>Log Out</p>
                </Button>
              </nav>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
};

export default NavHeader;
