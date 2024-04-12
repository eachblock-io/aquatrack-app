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
import { useCreateHarvestMutation } from "@/redux/services/harvestApiSlice";
import { useGetAllBatchsDataQuery } from "@/redux/services/batchApiSlice";

const AddHarvestModal = ({ open, setOpen, farmId }: any) => {
  const cancelButtonRef = useRef(null);
  const [createHarvest] = useCreateHarvestMutation();
  const [loading, setLoading] = useState(false);
  const [batchID, setBatchID] = useState<String>("");
  const [formData, setFormData] = useState<any>({
    name: "",
    consultant: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    consultant: "",
  });
  const { data } = useGetAllBatchsDataQuery({ farmId });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      name: "",
      consultant: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.consultant) {
      newErrors.consultant = "Consultant is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      consultant: formData?.consultant,
      batch_id: batchID,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createHarvest({ formdata, farmId }).unwrap();
        toast.success("Created harvest ✔️");
        setOpen(false);
        setFormData("");
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
                        Create New Harvest
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className=" text-gray-500 font-normal mb-3">
                        Harvest Name
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
                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className=" text-gray-500 font-normal mb-3">
                        Consultant
                      </Label>
                      <Input
                        type="text"
                        name="consultant"
                        value={formData?.unit_purchase}
                        onChange={handleInputChange}
                        placeholder="Consultant"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-6">
                      <Button
                        disabled={loading}
                        className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Creating batch..." : "Create Batch"}
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

export default AddHarvestModal;
