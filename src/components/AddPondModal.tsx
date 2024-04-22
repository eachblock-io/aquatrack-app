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
import { useCreatePondMutation } from "@/redux/services/pondsApiSlice";
import toast from "react-hot-toast";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";

const AddPondModal = ({ open, setOpen, farmId }: any) => {
  const cancelButtonRef = useRef(null);
  const [createPond] = useCreatePondMutation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<String>("");
  const [batchID, setBatchID] = useState<String>("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    holding_capacity: "",
    unit: "",
    size: "",
    feed_size: "",
    mortality_rate: "",
    batch_id: "",
    farm_id: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    holding_capacity: "",
    unit: "",
    size: "",
    feed_size: "",
    mortality_rate: "",
    batch_id: "",
    farm_id: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      [
        "holding_capacity",
        "unit",
        "size",
        "feed_size",
        "mortality_rate",
      ].includes(name) && !isNaN(parseFloat(value))
        ? parseFloat(value)
        : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      type: "",
      holding_capacity: "",
      unit: "",
      size: "",
      feed_size: "",
      mortality_rate: "",
      batch_id: "",
      farm_id: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!type) {
      newErrors.type = "Type of pond is required";
    }
    if (!formData.holding_capacity) {
      newErrors.holding_capacity = "Holding capacity is required";
    }
    if (!formData.unit) {
      newErrors.unit = "Unit is required";
    }
    if (!formData.size) {
      newErrors.size = "Size is required";
    }
    if (!formData.feed_size) {
      newErrors.feed_size = "Feed size is required";
    }
    if (!formData.mortality_rate) {
      newErrors.mortality_rate = "Mortality rate is required";
    }
    if (!batchID) {
      newErrors.batch_id = "Batch is required";
    }
    if (!farmId) {
      newErrors.farm_id = "Farm ID is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      type: type,
      holding_capacity: formData?.holding_capacity,
      unit: formData?.unit,
      size: formData?.size,
      feed_size: formData?.feed_size,
      mortality_rate: formData?.mortality_rate,
      batch_id: batchID,
      farm_id: farmId,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createPond({ formdata, farmId }).unwrap();
        toast.success("Pond created ✔️");
        setOpen(false);
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
                <div className="bg-white lg:py-10 p-10">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-[--primary] ">
                        Add Pond
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Pond name
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          value={formData?.name}
                          onChange={handleInputChange}
                          placeholder="Pond name"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs">{errors.name}</p>
                        )}
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Pond type
                        </Label>
                        <Select
                          name="type"
                          onValueChange={(value) => setType(value)}>
                          <SelectTrigger className="w-full h-12 border-gray-400">
                            <SelectValue placeholder="Pond type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              <SelectItem value="Tank pond">
                                Tank (Plastic/Rubber) pond
                              </SelectItem>
                              <SelectItem value="Earthen pond">
                                Earthen pond
                              </SelectItem>
                              <SelectItem value="Concrete pond">
                                Concrete pond
                              </SelectItem>
                              <SelectItem value="Tarpaulin pond">
                                Tarpaulin pond
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.type && (
                          <p className="text-red-500 text-xs">{errors.type}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Fish holding capacity
                        </Label>
                        <Input
                          type="text"
                          name="holding_capacity"
                          value={formData?.holding_capacity}
                          onChange={handleInputChange}
                          placeholder="500"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                        {errors.holding_capacity && (
                          <p className="text-red-500 text-xs">
                            {errors.holding_capacity}
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Unit
                        </Label>
                        <Input
                          type="text"
                          name="unit"
                          value={formData?.unit}
                          onChange={handleInputChange}
                          placeholder="300"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                        {errors.unit && (
                          <p className="text-red-500 text-xs">{errors.unit}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Size
                        </Label>
                        <Input
                          type="text"
                          name="size"
                          value={formData?.size}
                          onChange={handleInputChange}
                          placeholder="0 - 0.5g"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                        {errors.size && (
                          <p className="text-red-500 text-xs">{errors.size}</p>
                        )}
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Feed size
                        </Label>
                        <Input
                          type="text"
                          name="feed_size"
                          value={formData?.feed_size}
                          onChange={handleInputChange}
                          placeholder="6mm"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                        {errors.feed_size && (
                          <p className="text-red-500 text-xs">
                            {errors.feed_size}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
                          Mortality rate
                        </Label>
                        <Input
                          type="text"
                          name="mortality_rate"
                          value={formData?.mortality_rate}
                          onChange={handleInputChange}
                          placeholder="30 units"
                          className="border-gray-400 focus-visible:outline-none py-6 "
                        />
                        {errors.mortality_rate && (
                          <p className="text-red-500 text-xs">
                            {errors.mortality_rate}
                          </p>
                        )}
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-gray-500 font-normal mb-3">
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
                                {data?.data.length === 0
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
                        {errors.batch_id && (
                          <p className="text-red-500 text-xs">
                            {errors.batch_id}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between space-x-6">
                      <Button
                        type="submit"
                        className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Loading..." : " Add Pond"}
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

export default AddPondModal;
