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
import DeleteModal from "../@deleteModal/page";
import { dateFormaterAndTime } from "@/utils";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import EditFeedModal from "@/components/EditFeedModal";

interface TableData {
  id: number;
  // date: string;
  name: string;
  quantity: number;
  size: string;
  status: string;
}

interface TableProps {
  data: any[];
  farmId: string;
  selectedItems: any;
  toggleSelectAll: any;
  handleCheckboxChange: any;
  selectAll: any;
}

const FeedsTable: React.FC<TableProps> = ({
  data,
  farmId,
  selectedItems,
  toggleSelectAll,
  handleCheckboxChange,
  selectAll,
}) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editData, setEditData] = useState({});
  const [feedID, setFeedID] = useState(false);

  const handleEdit = (value: any) => {
    setEditData(value);
    setOpen(true);
  };

  const handleDelete = (id: any) => {
    if (id) {
      setFeedID(id);
      setOpenDel(true);
    }
  };

  return (
    <div className="bg-gray-50 border-collapse border border-gray-300 pt-6 pb-4 rounded-xl">
      {editData && (
        <EditFeedModal editdata={editData} open={open} setOpen={setOpen} />
      )}
      <DeleteModal
        open={openDel}
        setOpen={setOpenDel}
        farmId={farmId}
        feedId={feedID}
      />
      {data?.length > 0 ? (
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
          {data ? (
            <TableBody className="bg-white pl-8">
              {data?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="py-4 pl-8 w-6">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="mr-1 w-4 h-4"
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    {dateFormaterAndTime(item?.attributes?.created_at)}
                  </TableCell>
                  <TableCell className="py-4">
                    {item?.attributes?.name}
                  </TableCell>
                  <TableCell className="py-4">
                    {item?.attributes?.size}mm
                  </TableCell>
                  <TableCell className="py-4">
                    {item?.attributes?.quantity} Bags
                  </TableCell>
                  <TableCell className="py-4 flex items-center space-x-4">
                    <span
                      className={`${
                        item?.attributes?.status === "in stock"
                          ? `bg-blue-100 text-blue-400`
                          : `bg-red-100 text-red-400`
                      } rounded-full py-2 px-3 text-xs font-semibold`}>
                      {item?.attributes?.status}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-xl">
                        <BiDotsVerticalRounded />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(item)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(item?.id)}
                          className="text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
      ) : (
        <section className="h-[70vh] flex items-center justify-center">
          <div className="relative lg:w-6/12 w-10/12 mx-auto">
            <div className="text absolute top-14 w-full text-center">
              <h2 className="font-bold text-2xl mb-2">No Feed Added</h2>
              <p>
                There are no feed data yet. However, once there are any, they
                will be displayed here.
              </p>
            </div>
            <Image
              src={emptyImg}
              alt="empty"
              height={300}
              width={200}
              layout="fixed"
              className="mx-auto"
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default FeedsTable;
