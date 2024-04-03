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
import EditModal from "../@editModal/page";
import DeleteModal from "../@deleteModal/page";

interface TableData {
  id: number;
  date: string;
  name: string;
  unitPurchased: number;
  fishType: string;
  status: string;
}

interface TableProps {
  data: TableData[];
}

const FeedsTable: React.FC<TableProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data.map((item) => item.id));
  };

  const handleCheckboxChange = (id: number) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: number[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, id];
    } else {
      newSelectedItems = [
        ...selectedItems.slice(0, selectedIndex),
        ...selectedItems.slice(selectedIndex + 1),
      ];
    }

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === data.length);
  };

  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 pt-6 pb-4 rounded-xl">
      <EditModal open={open} setOpen={setOpen} />
      <DeleteModal open={openDel} setOpen={setOpenDel} />
      <Table className="w-full">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 pl-8 text-black ">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-1 w-4 h-4"
              />
            </TableHead>
            <TableHead className="py-4 text-black font-bold">Date</TableHead>
            <TableHead className="py-4 text-black font-bold">Brand</TableHead>
            <TableHead className="py-4 text-black font-bold">
              Size (mm)
            </TableHead>
            <TableHead className="py-4 text-black font-bold">
              Quantity
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white pl-8">
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-4 pl-8">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-1 w-4 h-4"
                />
              </TableCell>
              <TableCell className="py-4">{item.date}</TableCell>
              <TableCell className="py-4">{item.name}</TableCell>
              <TableCell className="py-4">{item.unitPurchased}</TableCell>
              <TableCell className="py-4">{item.fishType}</TableCell>
              <TableCell className="py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <HiOutlineDotsVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setOpen(true)}
                      className="space-x-4 text-blue-600 font-bold">
                      <MdEdit className="text-blue-600 text-xl" />{" "}
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setOpenDel(true)}
                      className="space-x-4 text-red-600 font-bold">
                      <MdDelete className="text-red-600 text-xl" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeedsTable;
