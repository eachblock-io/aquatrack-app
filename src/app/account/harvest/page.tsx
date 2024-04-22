"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import AddBatchModal from "@/components/AddBatchModal";
import DeleteModal from "@/components/DeleteModal";
import HarvestStats from "@/components/HarvestStats";
import HarvestTable from "@/components/HarvestTable";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import NavHeader from "@/components/NavHeader";
import AddHarvestModal from "@/components/AddHarvestModal";
import { useGetAllHarvestQuery } from "@/redux/services/harvestApiSlice";
import { searchHarvestTableData } from "@/utils";
import DeleteHarvestModal from "@/components/DeleteHarvestModal";
import Image from "next/image";
import emptyImg from "@/public/empty.png";
import { Skeleton } from "@/components/ui/skeleton";
import CreateFarmState from "@/components/CreateFarmState";
import useDefaultFarmId from "@/hooks/useDefaultFarmId";


const HarvestPage = () => {
  const { isLoading: loading, data } = useGetCurrentUserQuery(null);
  const { defaultFarmId } = useDefaultFarmId();
  const { isLoading, data: harvestData } = useGetAllHarvestQuery({
    farmId: defaultFarmId,
  });
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(
      searchHarvestTableData(harvestData?.data?.harvests?.data, query)
    );
  };
  return (
    <>
      <NavHeader userdata={data?.data} />
      <main className="w-11/12 mx-auto mt-8 ">
        {loading ? (
          <div className="mt-10 lg:w-11/12 w-10/12 mx-auto flex items-center gap-x-8">
            <div className="mt-8 lg:w-8/12 w-full">
              <div>
                <Skeleton className="w-full bg-gray-200 h-4" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
              </div>
              <div className="mt-4">
                <Skeleton className="w-full bg-gray-200 h-20" />
              </div>
            </div>
            <div className="mt-8 lg:w-4/12 w-full">
              <div>
                <Skeleton className="w-full bg-gray-200 h-20" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-full bg-gray-200 h-4" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
                <Skeleton className="w-full bg-gray-200 h-4 mt-2" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {defaultFarmId ? (
              <>
                <AddHarvestModal
                  farmId={defaultFarmId}
                  open={open}
                  setOpen={setOpen}
                />
                <DeleteHarvestModal open={openDel} setOpen={setOpenDel} />
                <HarvestStats data={harvestData?.data} isLoading={isLoading} />
                {/* Header section */}
                <section className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-8">
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
                    {/* <div className="flex items-center lg:space-x-6 space-x-6">
              <p className="text-nowrap text-gray-500">Filter by</p>
              <Select>
                <SelectTrigger className=" h-10 border-gray-400 bg-white lg:w-[100px] w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Date</SelectLabel>
                    <SelectLabel>Fish type</SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
                    <div className="btns space-x-6 hidden lg:flex">
                      <Button
                        onClick={() => setOpen(true)}
                        className="px-6 py-5 bg-[--primary] hover:bg-[--primary]">
                        + Add new harvest
                      </Button>
                      <Button
                        onClick={() => setOpenDel(true)}
                        className="px-6 py-5 bg-red-500 hover:bg-red-400">
                        Delete
                      </Button>
                    </div>
                  </div>
                </section>

                <div className="table w-full lg:mt-10 mb-10">
                  <h2 className="text-[--primary] font-bold lg:text-xl text-lg mb-4">
                    Harvest History
                  </h2>

                  {harvestData?.data?.harvests?.data?.length > 0 ? (
                    <HarvestTable
                      data={
                        filteredData?.length > 0
                          ? filteredData
                          : harvestData?.data?.harvests?.data
                      }
                    />
                  ) : (
                    <section className="h-[70vh] flex items-center justify-center">
                      <div className="relative lg:w-6/12 w-10/12 mx-auto">
                        <div className="text absolute top-14 w-full text-center">
                          <h2 className="font-bold text-2xl mb-2">
                            No Batch Added
                          </h2>
                          <p>
                            There are no batch here yet. However, once there are
                            any, they will be displayed here.
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
              </>
            ) : (
              <CreateFarmState vheight="70vh" />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default HarvestPage;
