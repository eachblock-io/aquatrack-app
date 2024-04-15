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
import { reverseArray } from "@/utils";
import { Skeleton } from "./ui/skeleton";
import DeleteModal from "./DeleteModal";
import DeleteBatchModal from "./DeleteBatchModal";
import EditBatchModal from "./EditBatchModal";

interface TableData {
  id: number;
  attributes: {
    date_purchased: string;
    name: string;
    unit_purchase: number;
    fish_type: string;
    status: string;
  };
}

interface TableProps {
  data: TableData[];
  isLoading: boolean;
  farmId: string;
}

const BatchTable: React.FC<TableProps> = ({ data, isLoading, farmId }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEd, setOpenEd] = useState(false);
  const [batchID, setBatchID] = useState("");
  const [batchData, setBatchData] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const reversedArray = reverseArray(data);

  console.log(data);

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : data?.map((item: any) => item?.id));
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
    setSelectAll(newSelectedItems.length === data?.length);
  };

  const handleDelete = (batchId: any) => {
    if (batchId) {
      setOpenDel(true);
      setBatchID(batchId);
    }
  };

  const handleEdit = (batchData: any) => {
    if (batchData?.id) {
      setOpenEd(true);
      setBatchData(batchData);
    }
  };

  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 pt-6 pb-4 mb-20 rounded-xl">
      <DeleteBatchModal
        open={openDel}
        setOpen={setOpenDel}
        batchID={batchID}
        farmId={farmId}
      />
      {batchData && (
        <EditBatchModal
          open={openEd}
          setOpen={setOpenEd}
          batchData={batchData}
          farmId={farmId}
        />
      )}
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
            <TableHead className="py-4 text-black font-bold text-sm">
              Date
            </TableHead>
            <TableHead className="py-4 text-black font-bold text-sm">
              Name
            </TableHead>
            <TableHead className="py-4 text-black font-bold text-sm">
              Unit Purchased
            </TableHead>
            <TableHead className="py-4 text-black font-bold text-sm">
              Fish Type
            </TableHead>
            <TableHead className="py-4 text-black font-bold text-sm">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
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
        ) : (
          <TableBody className="bg-white pl-8">
            {reversedArray?.map((item: any) => (
              <TableRow key={item?.id}>
                <TableCell className="py-4 pl-8">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item?.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="mr-1 w-4 h-4"
                  />
                </TableCell>
                <TableCell className="py-4">
                  {item?.attributes?.date_purchased}
                </TableCell>
                <TableCell className="py-4">{item?.attributes?.name}</TableCell>
                <TableCell className="py-4">
                  {item?.attributes?.unit_purchase}
                </TableCell>
                <TableCell className="py-4">
                  {item?.attributes?.fish_type}
                </TableCell>
                <TableCell className="py-4">
                  <p
                    className={`w-full h-10 ${
                      item?.attributes?.status === `sold out`
                        ? ` bg-red-100 text-red-400`
                        : `bg-[#A3EED8] text-green-700 `
                    } border-none rounded-full flex items-center justify-center`}>
                    {item?.attributes?.status}
                  </p>
                </TableCell>
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiOutlineDotsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleEdit(item)}
                        className="space-x-4 text-blue-600 font-bold">
                        <MdEdit className="text-blue-600 text-xl" />{" "}
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(item?.id)}
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
        )}
      </Table>
    </div>
  );
};

export default BatchTable;
