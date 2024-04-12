"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useCreatePurchaseMutation } from "@/redux/services/inventoryApiSlice";

const InsertRowModal = ({
  open,
  setOpen,
  farmId,
  harvestId,
  customerId,
}: any) => {
  const cancelButtonRef = useRef(null);
  const [createPurchase] = useCreatePurchaseMutation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState<any>({
    quantity: "",
    pieces: "",
    price_per_unit: "",
    amount: "",
    size: "",
  });
  const [errors, setErrors] = useState({
    harvest_customer_id: "",
    quantity: "",
    pieces: "",
    price_per_unit: "",
    amount: "",
    status: "",
    size: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      ["quantity", "pieces", "amount", "price_per_unit", "size"].includes(
        name
      ) && !isNaN(parseFloat(value))
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      harvest_customer_id: "",
      quantity: "",
      pieces: "",
      price_per_unit: "",
      amount: "",
      status: "",
      size: "",
    };

    // if (!formData.name) {
    //   newErrors.name = "Name is required";
    // }

    setErrors(newErrors);

    const formdata = {
      harvest_customer_id: customerId,
      quantity: formData?.quantity,
      pieces: formData?.pieces,
      price_per_unit: formData?.price_per_unit,
      amount: formData?.amount,
      status: status,
      size: formData?.size,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createPurchase({ formdata, farmId, harvestId }).unwrap();
        toast.success("Purchase created ✔️");
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
                        Create New Purchase
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Quantity
                        </Label>
                        <Input
                          type="text"
                          name="quantity"
                          value={formData?.quantity}
                          onChange={handleInputChange}
                          placeholder="599"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Pieces
                        </Label>
                        <Input
                          type="text"
                          name="pieces"
                          value={formData?.pieces}
                          onChange={handleInputChange}
                          placeholder="20"
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
                          Amount
                        </Label>
                        <Input
                          type="text"
                          name="amount"
                          value={formData?.amount}
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
                          Size
                        </Label>
                        <Input
                          type="text"
                          name="size"
                          value={formData?.size}
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
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem
                                value="pending"
                                className="bg-red-100 text-red-500">
                                Pending
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                      <Button
                        disabled={loading}
                        className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Creating purchase..." : "Create purchase"}
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

export default InsertRowModal;
