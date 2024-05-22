import fetchToken from "@/lib/auth";
import React, { useState, useEffect } from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormaterAndTime } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Link from "next/link";

const BillingTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: any) => {
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `https://api.aquatrackinc.com/admin/dashboard?page=${page}`,
        { headers }
      );
      const result = await response.json();
      console.log(result?.data?.users);
      setData(result.data?.users?.data);
      setTotalPages(result?.data?.users?.meta?.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   const renderPaginationItems = () => {
  //     const items = [];

  //     // Previous Button
  //     items.push(
  //       <PaginationItem key="prev">
  //         <PaginationPrevious
  //           className="lg:text-base text-sm"
  //           href="#"
  //           onClick={() => handlePrevPage()}
  //           // disabled={currentPage === 1}
  //         />
  //       </PaginationItem>
  //     );

  //     // Page Numbers
  //     for (let page = 1; page <= totalPages; page++) {
  //       items.push(
  //         <PaginationItem key={page}>
  //           <PaginationLink
  //             href="#"
  //             isActive={currentPage === page}
  //             onClick={() => handlePageChange(page)}>
  //             {page}
  //           </PaginationLink>
  //         </PaginationItem>
  //       );
  //     }

  //     // Next Button
  //     items.push(
  //       <PaginationItem key="next">
  //         <PaginationNext
  //           href="#"
  //           onClick={() => handleNextPage()}
  //           // disabled={currentPage === totalPages}
  //         />
  //       </PaginationItem>
  //     );

  //     return items;
  //   };

  return (
    <div className="mt-20 bg-white">
      <div className="overflow-hidden border rounded-lg bg-white">
        <Table className="w-full overflow-hidden">
          <TableHeader className="bg-gray-200 px-4">
            <TableRow>
              <TableHead className="py-4 pl-6 text-black text-xs font-semibold">
                S/N
              </TableHead>
              <TableHead className="py-4 lg:flex hidden text-black text-xs font-semibold">
                Date
              </TableHead>
              <TableHead className="py-4 text-black text-xs font-semibold">
                Plan
              </TableHead>
              <TableHead className="py-4 lg:flex hidden text-black text-xs font-semibold">
                Amount
              </TableHead>
              <TableHead className="py-4 text-black text-xs font-semibold">
                Payment method
              </TableHead>
              <TableHead className="py-4 text-black text-xs font-semibold">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white pl-8">
            {data?.map((item: any) => (
              <TableRow key={item?.id}>
                <TableCell className="text-xs ">{item?.name}</TableCell>
                <TableCell className="text-xs lg:flex hidden ">
                  {item?.email}
                </TableCell>
                <TableCell className="lg:w-[200px]">
                  <span className="bg-gray-200 lg:px-6 lg:py-1 px-3 text-xs rounded-xl">
                    {item?.subscription_plan}
                  </span>
                </TableCell>
                <TableCell className="text-xs lg:flex hidden ">
                  {dateFormaterAndTime(item?.created_at)}
                </TableCell>
                <TableCell className="text-xs ">
                  {!item?.last_seen ? "none" : item?.last_seen}
                </TableCell>
                <TableCell className="text-xs ">
                  <Link href={`/account/users/${item?.tenant_id}`}>View</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex justify-end mt-10">
        <div className="">
          <Pagination className="border w-auto">
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      </div> */}
    </div>
  );
};

export default BillingTable;
