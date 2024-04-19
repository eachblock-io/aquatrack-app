"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { dateFormaterAndTime } from "@/utils";
// import EditModal from "../@editModal/page";
// import DeleteModal from "../@deleteModal/page";

interface TableData {
  id: number;
  date: string;
  name: string;
  unitPurchased: number;
  fishType: string;
  status: string;
}

interface TableProps {
  data: any[];
}

const CustomerTable: React.FC<TableProps> = ({ data }) => {


  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 pt-6 pb-4 rounded-xl">
      <Table className="w-full">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 pl-8 text-black font-bold">
              Date Added
            </TableHead>
            <TableHead className="py-4 text-black font-bold">Name</TableHead>
            <TableHead className="py-4 text-black font-bold">
              Phone Number
            </TableHead>
            <TableHead className="py-4 text-black font-bold">
              Purchases Made
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white pl-8">
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-4 pl-8">
                {dateFormaterAndTime(item?.attributes?.created_at)}
              </TableCell>
              <TableCell className="py-4">{item?.attributes?.name}</TableCell>
              <TableCell className="py-4">{item?.attributes?.email}</TableCell>
              <TableCell className="py-4">
                {item?.attributes?.phone_number}
              </TableCell>
              <TableCell className="py-4">
                {item?.attributes?.purchases_made}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
