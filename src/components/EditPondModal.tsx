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
import { useEditPondMutation } from "@/redux/services/pondsApiSlice";
import toast from "react-hot-toast";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";
import { Modal } from "./Modal";

const EditPondModal = ({ open, setOpen, farmId, pondData }: any) => {
  const cancelButtonRef = useRef(null);
  const [editPond] = useEditPondMutation();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<String>(pondData?.attributes?.name || "");
  const [batchID, setBatchID] = useState<String>("");
  const [formData, setFormData] = useState({
    name: pondData?.attributes?.name,
    type: "",
    holding_capacity: pondData?.attributes?.holding_capacity || "",
    unit: pondData?.attributes?.unit || "",
    size: pondData?.attributes?.size || "",
    feed_size: pondData?.attributes?.feed_size || "",
    mortality_rate: pondData?.attributes?.mortality_rate || "",
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

//   console.log(pondData);

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
    setLoading(true);
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
      newErrors.type = "Type of ponds is required";
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
      try {
        setLoading(true);
        await editPond({ formdata, farmId, pondId: pondData?.id }).unwrap();
        toast.success("Edit Pond successful ✔️");
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
    <Modal open={open} setOpen={setOpen}>
      <div className="bg-white lg:py-10 p-10">
        <div className="text-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0">
            <h3 className="text-xl font-semibold leading-6 text-[--primary] ">
              Edit {pondData?.attributes?.name}
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
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
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
                Pond type
              </Label>
              <Select name="type" onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-full h-12 border-gray-400">
                  <SelectValue placeholder="Pond type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="tank">Tank</SelectItem>
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
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
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
                placeholder="0 - 0.5g"
                className="border-gray-400 focus-visible:outline-none py-6 "
              />
            </div>
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
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
            </div>
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <div className="form-control">
              <Label
                htmlFor="message-2"
                className=" text-gray-500 font-normal mb-3">
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
            </div>
          </div>
          <div className="flex items-center justify-between space-x-6">
            <Button
              type="submit"
              className=" mt-10 outline-none border-none font-normal text-xs bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
              {loading ? "Loading..." : " Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPondModal;
