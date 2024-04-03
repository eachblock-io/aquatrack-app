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
import Link from "next/link";

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

const HarvestTable: React.FC<TableProps> = ({ data }) => {
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
      <Table className="lg:w-full w-10/12 overflow-scroll">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 lg:pl-8 pl-4 text-black ">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-1 w-4 h-4"
              />
            </TableHead>
            <TableHead className="py-4 text-black font-bold lg:text-base text-xs">
              Date
            </TableHead>
            <TableHead className="py-4 text-black font-bold lg:text-base text-xs">
              Name
            </TableHead>
            <TableHead className="py-4 text-black font-bold lg:text-base text-xs">
              Batch
            </TableHead>
            <TableHead className="py-4 text-black font-bold lg:text-base text-xs">
              Total Sales
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white pl-8">
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="py-4 lg:pl-8 pl-4">
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
              <TableCell className="py-4 lg:hidden flex">
                <Link
                  href={`/account/harvest/${item.id}`}
                  className="border border-[--primary] text-[--primary] lg:py-2 py-1 lg:px-6 px-2 lg:text-base text-xs rounded-lg ">
                  view
                </Link>
              </TableCell>
              <TableCell className="py-4 lg:flex hidden">
                <Link
                  href={`/account/harvest/${item.id}`}
                  className="border border-[--primary] text-[--primary] lg:py-2 py-1 lg:px-6 px-2 lg:text-base text-xs rounded-lg ">
                  view details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HarvestTable;
