"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import {
  useEditBatchMutation,
  useGetAllBatchsDataQuery,
} from "@/redux/services/batchApiSlice";
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

const EditBatchModal = ({ open, setOpen, farmId, batchData }: any) => {
  const cancelButtonRef = useRef(null);
  const [editBatch] = useEditBatchMutation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(batchData?.attributes?.status || "");
  const [type, setType] = useState<String>(
    batchData?.attributes?.fish_type || ""
  );
  const [date, setDate] = useState<Date>();
  const [specie, setSpecie] = useState<String>(
    batchData?.attributes?.fish_specie || ""
  );
  const [formData, setFormData] = useState<any>({
    name: batchData?.attributes?.name || "",
    unit_purchase: batchData?.attributes?.unit_purchase || "",
    price_per_unit: batchData?.attributes?.price_per_unit || "",
    amount_spent: batchData?.attributes?.amount_spent || "",
    vendor: batchData?.attributes?.vendor || "",
    status: batchData?.attributes?.status || "",
    date_purchased: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    unit_purchase: "",
    price_per_unit: "",
    amount_spent: "",
    fish_specie: "",
    fish_type: "",
    vendor: "",
    status: "",
    date_purchased: "",
  });

  console.log(batchData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      ["unit_purchase", "price_per_unit", "amount_spent"].includes(name) &&
      !isNaN(parseFloat(value))
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const date_purchased = formatDate(date);
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      unit_purchase: "",
      price_per_unit: "",
      amount_spent: "",
      fish_specie: "",
      fish_type: "",
      vendor: "",
      status: "",
      date_purchased: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      unit_purchase: formData?.unit_purchase,
      price_per_unit: formData?.price_per_unit,
      amount_spent: formData?.amount_spent,
      fish_specie: specie,
      fish_type: type,
      vendor: formData?.vendor,
      status: status,
      date_purchased: date_purchased,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      // setLoading(true);
      try {
        await editBatch({ formdata, farmId, batchId: batchData?.id }).unwrap();
        toast.success("Batch created ✔️");
        setOpen(false);
        setFormData("");
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                <div className="bg-white lg:py-10 lg:px-14 py-10 px-6">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-[--primary] ">
                        Edit Batch
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Batch Name
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          value={formData?.name}
                          onChange={handleInputChange}
                          placeholder="Batch Name"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Units Purchased
                        </Label>
                        <Input
                          type="text"
                          name="unit_purchase"
                          value={formData?.unit_purchase}
                          onChange={handleInputChange}
                          placeholder="Units Purchased"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Price per Unit
                        </Label>
                        <Input
                          type="text"
                          name="price_per_unit"
                          value={formData?.price_per_unit}
                          onChange={handleInputChange}
                          placeholder="500"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Amount Spent
                        </Label>
                        <Input
                          type="text"
                          name="amount_spent"
                          value={formData?.amount_spent}
                          onChange={handleInputChange}
                          placeholder="300"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Fish Specie
                        </Label>
                        <Select
                          name="fish_specie"
                          onValueChange={(value) => setSpecie(value)}>
                          <SelectTrigger className="w-full h-12 border-gray-400">
                            <SelectValue placeholder="Fish specie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Catfish">Catfish</SelectItem>
                              <SelectItem value="Tilapias">Tilapias</SelectItem>
                              <SelectItem value="Mackerel">Mackerel</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Fish Type
                        </Label>
                        <Select
                          name="fish_type"
                          onValueChange={(value) => setType(value)}>
                          <SelectTrigger className="w-full h-12 border-gray-400">
                            <SelectValue placeholder="Fish Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Fingerlings">
                                Fingerlings
                              </SelectItem>
                              <SelectItem value="Juvenile">Juvenile</SelectItem>
                              <SelectItem value="Adult">Adult</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Vendor
                        </Label>
                        <Input
                          type="text"
                          name="vendor"
                          value={formData?.vendor}
                          onChange={handleInputChange}
                          placeholder="Vendor name"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control flex items-center space-x-2 mt-3">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal">
                          Status
                        </Label>
                        <Select
                          name="status"
                          onValueChange={(value) => setStatus(value)}>
                          <SelectTrigger
                            className={`w-full h-10 ${
                              status === `sold out`
                                ? ` bg-red-100 text-red-400`
                                : `bg-[#A3EED8] `
                            } border-none rounded-full`}>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="in stock">In Stock</SelectItem>
                              <SelectItem
                                value="sold out"
                                className="bg-red-100 text-red-500">
                                Sold out
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="form-control flex flex-col mt-4">
                      <Label
                        htmlFor="date_established"
                        className=" text-gray-500 font-normal mb-2">
                        Date established
                      </Label>
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
                    <div className="flex items-center justify-between space-x-6">
                      {/* <Button
                        onClick={() => setOpen(false)}
                        className=" mt-10 border border-[--secondary] bg-white hover:bg-white w-full h-[53px] text-[--secondary] text-xs font-normal ">
                        Cancle
                      </Button> */}
                      <Button
                        disabled={loading}
                        className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Saving..." : "Save Changes"}
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

export default EditBatchModal;
