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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import toast from "react-hot-toast";
import { useCreateFeedMutation } from "@/redux/services/feedRecordApiSlice";

const AddPurchaseModal = ({ open, setOpen, farmId }: any) => {
  const cancelButtonRef = useRef(null);
  const [createFeed] = useCreateFeedMutation();
  const [loading, setLoading] = useState(false);
  const [batchID, setBatchID] = useState<String>("");
  const [formData, setFormData] = useState<any>({
    name: "",
    quantity: "",
    price: "",
    amount: "",
    vendor: "",
    size: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    price: "",
    amount: "",
    vendor: "",
    size: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let parsedValue = value;

    // Check if the input is numeric for unit_purchase and price_per_unit fields
    if (["quantity", "price", "amount", "size"].includes(name)) {
      parsedValue = /^\d*\.?\d*$/.test(value) ? value : formData[name];
    }

    let newFormData = { ...formData, [name]: parsedValue };

    if (["quantity", "price"].includes(name)) {
      const quantity = parseFloat(newFormData.quantity);
      const pricePerBag = parseFloat(newFormData.price);

      if (!isNaN(quantity) && !isNaN(pricePerBag)) {
        // Calculate the amount spent and update the formData
        newFormData = {
          ...newFormData,
          amount: (quantity * pricePerBag)
            .toFixed()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
      }
    }

    setFormData(newFormData);
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // const date_purchased = formatDate(date);
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      quantity: "",
      price: "",
      amount: "",
      vendor: "",
      size: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    // Convert unit_purchase, price_per_unit, and amount_spent to numbers
    const quantity = parseFloat(formData.quantity.replace(/,/g, ""));
    const price = parseFloat(formData.price.replace(/,/g, ""));
    const amount = parseFloat(formData.amount.replace(/,/g, ""));
    const size = parseFloat(formData?.size?.replace(/,/g, ""));

    const formdata = {
      name: formData?.name,
      quantity: isNaN(quantity) ? null : quantity,
      price: isNaN(price) ? null : price,
      amount: isNaN(amount) ? null : amount,
      size: isNaN(size) ? null : size,
      vendor: formData?.vendor,
      batch_id: batchID,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createFeed({ formdata, farmId }).unwrap();
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

  const { data } = useGetAllBatchsDataQuery({ farmId });

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
                        Add new purchase
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Brand name
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          value={formData?.name}
                          onChange={handleInputChange}
                          placeholder="Aler Aqua"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
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
                          placeholder="20 bags"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Price per bag
                        </Label>
                        <Input
                          type="text"
                          name="price"
                          value={formData?.price}
                          onChange={handleInputChange}
                          placeholder="500"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Amount spent
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
                          placeholder="9mm"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className=" text-gray-500 font-normal mb-3">
                          Batch
                        </Label>
                        <Select
                          name="batch_id"
                          onValueChange={(value) => setBatchID(value)}>
                          <SelectTrigger className="w-full h-12 border-gray-400">
                            <SelectValue placeholder="Batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>
                                {data?.data?.length === 0
                                  ? "Create Batch before creating ponds"
                                  : "Batch"}
                              </SelectLabel>
                              {data?.data?.map((task: any) => (
                                <SelectItem value={task?.id} key={task?.id}>
                                  {task?.attributes?.name}
                                </SelectItem>
                              ))}
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
                          placeholder="FishFeeds.inc"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                      <Button className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Loading..." : "Add Purchase"}
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

export default AddPurchaseModal;
