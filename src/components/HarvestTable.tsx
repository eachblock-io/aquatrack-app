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
import { Skeleton } from "./ui/skeleton";

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

const HarvestTable: React.FC<TableProps> = ({ data }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  console.log(data);

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
    <div className="bg-gray-50 border-collapse border border-gray-300 lg:pt-6 pt-2 pb-4 rounded-xl">
      <Table className="lg:w-full w-full overflow-scroll">
        <TableHeader className="">
          <TableRow>
            <TableHead className="py-4 lg:pl-8 pl-4 text-black lg:flex hidden">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="mr-1 w-4 h-4"
              />
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-base text-xs">
              Date
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-base text-xs">
              Name
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-base text-xs">
              Batch
            </TableHead>
            <TableHead className="py-4 text-black lg:text-left text-center font-semibold lg:text-base text-xs">
              Total Sales
            </TableHead>
          </TableRow>
        </TableHeader>
        {data ? (
          <TableBody className="bg-white lg:pl-8 p-0 w-full lg:text-left text-center ">
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="py-4 lg:pl-8 pl-4 lg:flex hidden">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mr-1 w-4 h-4"
                  />
                </TableCell>
                <TableCell className="py-4 lg:text-base text-xs">
                  {item?.date}
                </TableCell>
                <TableCell className="py-4 lg:text-base text-xs">
                  {item?.name}
                </TableCell>
                <TableCell className="py-4 lg:text-base text-xs">
                  {item?.batch?.name}
                </TableCell>
                <TableCell className="py-4 lg:text-base text-xs">
                  {item?.total_sales}
                </TableCell>
                <TableCell className="py-4 lg:hidden flex">
                  <Link
                    href={`/account/harvest/${item.id}`}
                    className="text-[--primary] text-xs ">
                    view
                  </Link>
                </TableCell>
                <TableCell className="py-4 lg:flex hidden">
                  <Link
                    href={`/account/harvest/${item.id}`}
                    className="border border-[--primary] text-[--primary] lg:py-2 py-1 lg:px-4 px-2 lg:text-sm text-xs rounded-lg ">
                    view details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody className="bg-white pl-8">
            <TableRow>
              <TableCell>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default HarvestTable;
