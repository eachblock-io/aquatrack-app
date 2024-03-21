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
            <TableHead className="py-4 text-black font-bold">Name</TableHead>
            <TableHead className="py-4 text-black font-bold">Batch</TableHead>
            <TableHead className="py-4 text-black font-bold">
              Total Sales
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
                <Link
                  href={`/account/harvest/${item.id}`}
                  className="border border-[--primary] text-[--primary] py-2 px-6 rounded-lg ">
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
