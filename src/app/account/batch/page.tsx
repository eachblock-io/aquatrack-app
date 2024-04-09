"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import BatchTable from "@/components/BatchTable";
import AddBatchModal from "@/components/AddBatchModal";
import DeleteModal from "@/components/DeleteModal";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import NavHeader from "@/components/NavHeader";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { searchTableData } from "@/utils";
import Image from "next/image";
import emptyImg from "@/public/empty.png";

const BatchPage = () => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [filteredValue, setFilteredValue] = useState("");
  const { data } = useGetCurrentUserQuery(null);
  const { isLoading, data: batch } = useGetAllBatchsDataQuery({
    farmId: data?.data?.farms[0]?.id,
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(searchTableData(batch?.data, query));
  };

  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-11/12 mx-auto mt-8 ">
        <AddBatchModal
          farmId={data?.data?.farms[0]?.id}
          open={open}
          setOpen={setOpen}
        />
        <DeleteModal open={openDel} setOpen={setOpenDel} />
        {/* Header section */}
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-white py-2 px-4 rounded-lg w-full">
              <IoMdSearch className="w-6 h-6 text-gray-500" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search"
                className="border-none bg-transparent outline-none shadow-none"
              />
            </div>
            <div className="btns space-x-4 lg:hidden flex">
              <Button
                onClick={() => setOpen(true)}
                className="px-2 py-5 bg-[--primary] hover:bg-[--primary]">
                <FaPlus className="w-6 h-6" />
              </Button>
              <Button
                onClick={() => setOpenDel(true)}
                className="px-2 py-5 bg-red-500 hover:bg-red-400">
                <RiDeleteBinLine className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="flex lg:items-center items-start lg:justify-around">
            {/* <div className="flex items-center space-x-6">
              <p className="text-nowrap text-gray-500">Filter by</p>
              <Select onValueChange={(value) => setFilteredValue(value)}>
                <SelectTrigger className=" h-10 border-gray-400 bg-white lg:w-[110px] w-[150px]">
                  <SelectValue placeholder="Fish type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Catfish">Catfish</SelectItem>
                    <SelectItem value="Tilapias">Tilapias</SelectItem>
                    <SelectItem value="Mackerel">Mackerel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div className="btns space-x-6 hidden lg:flex">
              <Button
                onClick={() => setOpen(true)}
                className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
                + Add new batch
              </Button>
              <Button
                onClick={() => setOpenDel(true)}
                className="px-6 py-5 bg-red-500 hover:bg-red-400">
                Delete
              </Button>
            </div>
          </div>
        </section>

        <div className="table w-full mt-20">
          {batch?.data?.length > 0 ? (
            <BatchTable
              farmId={data?.data?.farms[0]?.id}
              data={filteredData?.length > 0 ? filteredData : batch?.data}
              isLoading={isLoading}
            />
          ) : (
            <section className="h-[70vh] flex items-center justify-center">
              <div className="relative lg:w-6/12 w-10/12 mx-auto">
                <div className="text absolute top-14 w-full text-center">
                  <h2 className="font-bold text-2xl mb-2">No Batch Added</h2>
                  <p>
                    There are no batch here yet. However, once there are any,
                    they will be displayed here.
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
      </main>
    </>
  );
};

export default BatchPage;
