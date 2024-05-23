"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import AddTaskModal from "./AddTaskModal";
import {
  useEditTaskMutation,
  useGetAllTaskDataQuery,
} from "@/redux/services/taskApiSlice";
import { FiEdit } from "react-icons/fi";
import EditTaskModal from "./EditTaskModal";
import toast from "react-hot-toast";
import { formatDate } from "@/utils";

const AddTask = ({ farmID }: any) => {
  const [editTask] = useEditTaskMutation();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [status, setStatus] = useState(true);
  const [editdata, setEditdata] = useState("");
  // const { defaultFarmId } = useDefaultFarmId(data?.data?.farms);
  const { data } = useGetAllTaskDataQuery({ farmId: farmID });

  const handleEditTask = (taskData: any) => {
    if (taskData) {
      setEditdata(taskData);
      setOpenEdit(true);
    } else {
      console.log("No task data available");
    }
  };

  const handleUpdateTaskStatus = async (taskData: any) => {
    setStatus(!status);
    const formdata = {
      status: status ? "complete" : "incomplete",
    };
    // console.log(formdata);
    try {
      await editTask({
        formdata,
        farmId: farmID,
        taskId: taskData?.id,
      }).unwrap();
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong please try again or check your network connection"
      );
    }
  };

  // console.log(data?.data?.data[0]?.attributes);

  return (
    <div className="lg:w-[40%] w-full">
      <AddTaskModal farmId={farmID} open={open} setOpen={setOpen} />
      {editdata && (
        <EditTaskModal
          farmId={farmID}
          editdata={editdata}
          open={openEdit}
          setOpen={setOpenEdit}
        />
      )}
      <h2 className="text-[--primary] font-bold lg:text-2xl text-lg lg:mb-6 mb-4">
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
            <h2 className="text-[--primary] font-bold lg:text-xl text-lg mb-6">
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
                    {task?.attributes?.status == "pending" ||
                      (task?.attributes?.status == "incomplete" && (
                        <div className="due-date w-14 h-12 bg-[#0180EA] text-center text-white flex items-center justify-center rounded-lg">
                          <div>
                            <p className="text-sm font-bold uppercase">
                              {task?.attributes?.time_left.slice(0, 3)}
                            </p>
                            {task?.attributes?.status == "pending" && (
                              <p className="text-xs">PND</p>
                            )}
                          </div>
                        </div>
                      ))}
                    {/* Completed task */}
                    {task?.attributes?.status == "complete" && (
                      <div className="due-date w-14 h-12 bg-green-500 text-center text-white flex items-center justify-center rounded-lg">
                        <div>
                          {task?.attributes?.status == "complete" && (
                            <p className="text-xs font-bold">DONE</p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className=" space-y-2">
                      <p className="text-sm">{task?.attributes?.title}</p>
                      {task?.attributes?.status == "pending" ||
                        (task?.attributes?.status == "incomplete" && (
                          <p className="text-xs">
                            You have{" "}
                            <span className="text-[--primary] ">
                              {task?.attributes?.time_left}
                            </span>
                          </p>
                        ))}
                      {task?.attributes?.status == "due" && (
                        <p className="text-xs">
                          You have{" "}
                          <span className="text-[--primary] ">
                            {task?.attributes?.time_left}
                          </span>
                        </p>
                      )}
                      {task?.attributes?.status == "complete" && (
                        <p className="text-xs">
                          <span className="text-[--primary] ">
                            Task completed on the{" "}
                            {formatDate(task?.attributes?.end_date)}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <FiEdit
                      onClick={() => handleEditTask(task)}
                      className="h-6 w-6 text-gray-400"
                    />
                    <Checkbox
                      id="terms2"
                      checked={
                        task?.attributes?.status == "complete" ? true : false
                      }
                      onClick={() => handleUpdateTaskStatus(task)}
                      className="h-6 w-6 data-[state=checked]:bg-[--primary]"
                    />
                  </div>
                </div>
              ))}
            </div>{" "}
          </div>
        ) : (
          <div className="flex items-center justify-center lg:h-[40vh] h-[20vh]">
            <p className="lg:text-xl text-base text-gray-400 text-center">
              No Current Tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTask;
