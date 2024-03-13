"use client";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface LinkItem {
  id: number;
  title: string;
  link: string;
  icon: any;
}

export function Sidenav() {
  const pathname = usePathname();

  const links: LinkItem[] = [
    {
      id: 1,
      title: "Dashboard",
      icon: (
        <MdSpaceDashboard
          className={`text-2xl text-[--primary] hover:text-zinc-800 ${
            pathname === "/dashboard" && ` text-orange-400`
          }`}
        />
      ),
      link: "/account",
    },
    {
      id: 2,
      title: "Ponds",
      icon: (
        <IoWallet
          className={`text-2xl text-[--primary] hover:text-zinc-800 ${
            pathname === "/dashboard/account" && ` text-orange-400`
          }`}
        />
      ),
      link: "/account/ponds",
    },
    {
      id: 3,
      title: "Batch",
      icon: (
        <SiBookstack
          className={`text-2xl text-[--primary] hover:text-zinc-800 ${
            pathname === "/account/batch" && ` text-orange-400`
          }`}
        />
      ),
      link: "/account/batch",
    },
    {
      id: 4,
      title: "Harvest",
      icon: (
        <SiGooglemessages
          className={`text-2xl text-[--primary] hover:text-zinc-800 ${
            pathname === "/account/harvest" && ` text-orange-400`
          }`}
        />
      ),
      link: "/account/harvest",
    },
    {
      id: 5,
      title: "Inventory",
      icon: (
        <FaUserCircle
          className={`text-2xl text-[--primary] hover:text-zinc-800 ${
            pathname === "/account/inventory" && ` text-orange-400`
          }`}
        />
      ),
      link: "/account/inventory",
    },
    {
      id: 5,
      title: "Settings",
      icon: (
        <FaUserCircle
          className={`text-2xl text-[--primary] hover:text-zinc-800 ${
            pathname === "/account/settings" && ` text-orange-400`
          }`}
        />
      ),
      link: "/account/settings",
    },
  ];

  return (
    <div
      className={`lg:h-screen lg:w-[18rem] bg-white border-r border-gray-300 shadow-sm transform translate-x-[-100%] lg:translate-x-0 lg:relative absolute left-0 transition ease-in-out duration-100`}>
      <div className="p-6">
        <Image src={Logo} width="180" alt="Logo" className="" />
      </div>

      <nav className="mt-8 space-y-2">
        {links?.map((data) => (
          <Link
            key={data?.id}
            href={data?.link}
            className={`flex items-center hover:font-semibold space-x-2 text-[--primary] hover:bg-[#0181ea15] py-3 pl-4 transition-all ${
              pathname === data?.link
                ? `bg-[#0181ea15] font-semibold border-[--primary] border-l-8`
                : ``
            }`}>
            <div className="text-orange-500">{data?.icon}</div>
            <p>{data?.title}</p>
          </Link>
        ))}
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start hover:font-semibold space-x-2 text-red-500 hover:bg-gray-100 pt-8 pl-4  rounded-xl transition-all">
          <TbLogout className="text-2xl text-red-500 " />
          <p>Logout</p>
        </Button>
      </nav>
    </div>
  );
}
