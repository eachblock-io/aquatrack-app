"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import AddTaskModal from "./AddTaskModal";
import { useGetAllTaskDataQuery } from "@/redux/services/taskApiSlice";
import { FiEdit } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";

const AddTask = ({ farmID }: any) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editdata, setEditdata] = useState("");
  // const { defaultFarmId } = useDefaultFarmId(data?.data?.farms);
  const { isLoading, data } = useGetAllTaskDataQuery({ farmId: farmID });

  // console.log(data?.data);

  const handleEditTask = (id: any) => {
    if (data && data.data && data.data.data) {
      // Find the task with the matching ID
      const taskToEdit = data.data.data.find((task: any) => task.id === id);

      // If a task with the matching ID is found, you can now use it
      if (taskToEdit) {
        setEditdata(taskToEdit);
        setOpenEdit(true);
        // Now you can perform your edit operation with the task data
      } else {
        console.log("Task not found with ID:", id);
      }
    } else {
      console.log("No task data available");
    }
  };

  return (
    <div className="lg:w-[40%] w-full">
      <AddTaskModal open={open} setOpen={setOpen} />
      <EditTaskModal
        editdata={editdata}
        open={openEdit}
        setOpen={setOpenEdit}
      />
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6">
        Task
      </h2>
      <Button
        onClick={() => setOpen(true)}
        className="border-none outline-none text-lg font-semibold text-white bg-[--primary] hover:bg-blue-500 w-full lg:h-[60px] h-[50px] ">
        + Add new task
      </Button>
      <div className="current-task mt-6 bg-white rounded-xl p-6 flex items-center justify-center">
        {data?.data?.data?.length > 0 ? (
          <div className="w-full">
            <h2 className="text-[--primary] font-bold lg:text-2xl text-lg mb-6">
              Current tasks
            </h2>
            <div className="space-y-8">
              {data?.data?.data?.map((task: any) => (
                <div
                  key={task?.id}
                  className="tasks-list flex items-center justify-between space-x-4 w-full">
                  <div className="flex items-center space-x-6">
                    {task?.attributes?.status == "due" && (
                      <div className="due-date w-14 h-12 bg-red-400 text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          <p className="text-sm font-bold">2d</p>
                          <p className="text-xs">Pending</p>
                        </div>
                      </div>
                    )}
                    {task?.attributes?.status == "pending" && (
                      <div className="due-date w-14 h-12 bg-[#0180EA] text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          <p className="text-sm font-bold">2d</p>
                          <p className="text-xs">Pending</p>
                        </div>
                      </div>
                    )}
                    <div className=" space-y-2">
                      <p className="text-sm">{task?.attributes?.title}</p>
                      <p className="text-xs">
                        You have{" "}
                        <span className="text-red-500">2 days of delay.</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FiEdit
                      onClick={() => handleEditTask(task?.id)}
                      className="h-6 w-6 text-gray-400"
                    />
                    <Checkbox
                      id="terms2"
                      className="h-6 w-6 data-[state=checked]:bg-[--primary]"
                    />
                  </div>
                </div>
              ))}
              {/* <div className="tasks-list flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-6">
              <div className="due-date w-14 h-12 bg-red-400 text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">
                  Scheduled changing of pond water was not performed.
                </p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </div>
            <Checkbox id="terms2" className="h-6 w-6 checked:bg-[--primary]" />
          </div>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-green-600 text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </div>
            <Checkbox id="terms2" className="h-6 w-6 checked:bg-[--primary]" />
          </div>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <label htmlFor="term" className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-[--secondary] text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </label>
            <Checkbox id="term" className="h-6 w-6 checked:bg-[--secondary]" />
          </div>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <label htmlFor="term2" className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-[--secondary] text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </label>
            <Checkbox id="term2" className="h-6 w-6 checked:bg-[--secondary]" />
          </div>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <label htmlFor="term3" className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-[--secondary] text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </label>
            <Checkbox id="term3" className="h-6 w-6 checked:bg-[--secondary]" />
          </div>
          <label
            htmlFor="term4"
            className="tasks-list flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-[--secondary] text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </div>
            <Checkbox id="term4" className="h-6 w-6 checked:bg-[--secondary]" />
          </label>
          <div className="tasks-list flex items-center justify-between space-x-4">
            <label htmlFor="term5" className="flex items-center space-x-6">
              <div className="due-date w-12 h-12 bg-[--secondary] text-center text-white flex items-center justify-center rounded-lg">
                <div>
                  <p className="text-sm font-bold">2d</p>
                  <p className="text-xs">due</p>
                </div>
              </div>
              <div className=" space-y-2">
                <p className="text-sm">Catfish sorting today</p>
                <p className="text-xs">
                  You have{" "}
                  <span className="text-red-500">2 days of delay.</span>
                </p>
              </div>
            </label>
            <Checkbox id="term5" className="h-6 w-6" />
          </div> */}
            </div>{" "}
          </div>
        ) : (
          <p className="text-xl text-gray-400 text-center">No Current Tasks</p>
        )}
      </div>
    </div>
  );
};

export default AddTask;
