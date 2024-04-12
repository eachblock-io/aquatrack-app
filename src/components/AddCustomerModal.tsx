"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useCreateCustomerMutation } from "@/redux/services/customerApiSlice";

const AddCustomerModal = ({ open, setOpen, farmId, harvestId }: any) => {
  const cancelButtonRef = useRef(null);
  const [createCustomer] = useCreateCustomerMutation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      name: "",
      phone: "",
    };

    if (!formData?.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);

    const formdata = {
      name: formData?.name,
      phone: formData?.phone,
      email: formData?.email,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        await createCustomer({ formdata, farmId, harvestId }).unwrap();
        toast.success("Customer added ✔️");
        setOpen(false);
        setFormData("");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  //  const { data } = useGetAllBatchsDataQuery({ farmId });

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
                        Create new customer
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-8">
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
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleInputChange}
                        placeholder="Customer phone number"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                    </div>
                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className=" text-gray-500 font-normal mb-3">
                        Email address
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        placeholder="Customer email address"
                        className="border-gray-400 focus-visible:outline-none py-6 "
                      />
                    </div>

                    <div className="flex items-center justify-between space-x-6">
                      <Button
                        disabled={loading}
                        className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                        {loading ? "Adding..." : "Add customer"}
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

export default AddCustomerModal;
