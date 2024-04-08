"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { CiCircleAlert } from "react-icons/ci";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/utils";
import {
  useCreateFarmMutation,
  useGetAllFarmsQuery,
} from "@/redux/services/farmApiSlice";
import fetchToken from "@/lib/auth";

const AddFarmModal = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);
  const { refetch } = useGetAllFarmsQuery(null);
  const [createFarm] = useCreateFarmMutation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    no_of_ponds: "",
    date_established: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    location: "",
    no_of_ponds: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === "no_of_ponds" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const newDate = formatDate(date);
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      location: "",
      no_of_ponds: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.no_of_ponds) {
      newErrors.no_of_ponds = "Number of ponds is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      location: formData?.location,
      no_of_ponds: formData?.no_of_ponds,
      date_established: newDate,
    };

    console.log(formdata);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createFarm({ formdata }).unwrap();
        // const token = await fetchToken();
        // const myHeaders = new Headers();
        // // myHeaders.append("Connection", "keep-alive");
        // myHeaders.append("Accept", "application/json");
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", `Bearer ${token?.data?.token}`);
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_API_URL}/farmer/farms`,
        //   {
        //     method: "POST",
        //     headers: myHeaders,
        //     body: JSON.stringify(formdata),
        //     redirect: "follow",
        //   }
        // );
        // const resData = await res.json();
        // refetch();
        toast.success("Farm created ✔️");
        // console.log(resData);
        setOpen(false);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 lg:max-w-lg">
                <IoClose
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 h-6 w-6 text-gray-500 "
                />
                <div className="bg-white lg:py-10 lg:px-14 p-10">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold text-[--primary] ">
                        Create New Farm
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="form-control mt-8">
                      <Label
                        htmlFor="name"
                        className=" text-gray-500 font-normal mb-3">
                        Farm name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleInputChange}
                        placeholder="Enter your farm name"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs">{errors.name}</p>
                      )}
                    </div>
                    <div className="form-control mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label
                          htmlFor="location"
                          className=" text-gray-500 font-normal">
                          Farm location
                        </Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-xs font-normal">
                            Optional
                          </span>{" "}
                          <CiCircleAlert className="text-gray-400" />
                        </div>
                      </div>
                      <Input
                        type="text"
                        name="location"
                        value={formData?.location}
                        onChange={handleInputChange}
                        placeholder="Enter your farm location"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                      {errors.location && (
                        <p className="text-red-500 text-xs">
                          {errors.location}
                        </p>
                      )}
                    </div>
                    <div className="form-control mt-4">
                      <Label
                        htmlFor="no_of_ponds"
                        className=" text-gray-500 font-normal mb-3">
                        Number of ponds
                      </Label>
                      <Input
                        type="text"
                        name="no_of_ponds"
                        value={formData?.no_of_ponds}
                        onChange={handleInputChange}
                        placeholder="Enter number of farm"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                      {errors.no_of_ponds && (
                        <p className="text-red-500 text-xs">
                          {errors.no_of_ponds}
                        </p>
                      )}
                    </div>
                    <div className="form-control flex flex-col mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label
                          htmlFor="date_established"
                          className=" text-gray-500 font-normal ">
                          Date established
                        </Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-xs font-normal">
                            Optional
                          </span>{" "}
                          <CiCircleAlert className="text-gray-400" />
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full py-6 justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="pt-6">
                      <Button className="  outline-none border-none text-base font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Creating farm..." : "Create Farm"}
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddFarmModal;
