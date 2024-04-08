"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "@/components/ui/switch";
import { MdAccessTime } from "react-icons/md";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { describe } from "node:test";
import { taskDate } from "@/utils";
import toast from "react-hot-toast";
import { useCreateTaskMutation } from "@/redux/services/taskApiSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTaskModal = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);
  const [createTask] = useCreateTaskMutation();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [des, setDes] = useState("");
  const [reminder, setReminder] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    set_reminder: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const strDate = taskDate(startDate);
    const edDate = taskDate(endDate);
    setLoading(true);
    e.preventDefault();
    let newErrors = {
      title: "",
      description: "",
      set_reminder: "",
      startDate: "",
      endDate: "",
    };

    if (!title) {
      newErrors.title = "Name is required";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }

    setErrors(newErrors);

    const formdata = {
      title: title,
      description: des,
      start_date: strDate,
      due_date: edDate,
      set_reminder: reminder,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      // const farmId = localStorage.getItem("defaultFarmId");
      const farmId = "9bb9d518-db46-49ee-a41e-e6a87e4003b8";
      // console.log(farmId);
      setLoading(true);
      try {
        await createTask({ formdata, farmId }).unwrap();
        toast.success("Task created ✔️");
        setOpen(false);
        setLoading(false);
      } catch (error) {
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
        setLoading(false);
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
                <div className="bg-white lg:py-10 lg:px-14 p-10">
                  <div className="text-center">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-semibold leading-6 text-[--primary] ">
                        Add Task
                      </Dialog.Title>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className="text-[--primary] font-normal mb-2">
                        Title
                      </Label>
                      <Input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className=" focus-visible:outline-none py-6 "
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-[--primary] font-normal mb-2">
                          Start date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full py-6 justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                              )}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? (
                                format(startDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="form-control">
                        <Label
                          htmlFor="message-2"
                          className="text-[--primary] font-normal mb-2">
                          End date
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full py-6 justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                              )}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? (
                                format(endDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className="text-[--primary] font-normal mb-2">
                        Select Reminder
                      </Label>
                      <Select
                        onValueChange={(value) => setReminder(value)}
                        value={reminder}>
                        <SelectTrigger className="w-full py-6">
                          <SelectValue placeholder="Set reminder" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5 minutes">5 minutes</SelectItem>
                          <SelectItem value="10  minutes">
                            10 minutes
                          </SelectItem>
                          <SelectItem value="15 minutes">15 minutes</SelectItem>
                          <SelectItem value="30  minutes">
                            30 minutes
                          </SelectItem>
                          <SelectItem value="1 hour">1 hour</SelectItem>
                          <SelectItem value="2 hours">2 hours</SelectItem>
                          <SelectItem value="1 day">1 day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="form-control">
                      <Label
                        htmlFor="message-2"
                        className="text-[--primary] font-normal mb-2">
                        Describe
                      </Label>
                      <Textarea
                        placeholder="Type your task Description here."
                        rows={4}
                        name="description"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                        className="resize-none"
                        id="message-2"
                      />
                    </div>
                    <div className="form-control">
                      <p className="text-[--primary] mb-2">Repeat</p>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex space-x-2">
                          <MdAccessTime className="text-[--primary]" />
                          <Label
                            htmlFor="airplane-mode"
                            className="text-[--primary] font-normal">
                            Everyday
                          </Label>
                        </div>
                        <Switch
                          id="airplane-mode"
                          className="text-[--primary]"
                        />
                      </div>
                    </div>
                    <Button className=" mt-10 outline-none border-none font-semibold bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
                      {loading ? "Creating..." : "Add Task"}
                    </Button>
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

export default AddTaskModal;
