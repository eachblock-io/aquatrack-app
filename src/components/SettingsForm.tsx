"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoCameraOutline } from "react-icons/io5";
import { FaCamera } from "react-icons/fa6";

const SettingsForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState("");

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setPreviewSrc("");
    }
  };

  return (
    <div className="w-6/12">
      <div className="flex items-center justify-center mt-10 mb-20 ">
        <div className="lg:w-40 lg:h-40 w-20 h-20 relative">
          <Avatar className="p-0 m-0 lg:w-40 lg:h-40 w-20 h-20 border border-gray-600">
            <AvatarImage
              src={previewSrc ? previewSrc : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 left-0 h-full rounded-full w-full flex items-center justify-center bg-gray-600/50">
            <label
              htmlFor="fileInput"
              className="flex justify-center items-center h-20 w-20 rounded-full p-2 cursor-pointer">
              <FaCamera className="lg:w-14 lg:h-14 text-white" />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
      <form className="space-y-4 my-8">
        <div className="grid lg:grid-cols-2 lg:gap-x-6 gap-y-4">
          <div className="form-control">
            <Label
              htmlFor="firstname"
              className=" text-gray-500 font-normal mb-3">
              First name
            </Label>
            <Input
              type="text"
              placeholder="John"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="lastname"
              className=" text-gray-500 font-normal mb-3">
              Last name
            </Label>
            <Input
              type="text"
              placeholder="Deo"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-1 lg:gap-x-4 gap-y-4">
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Email Address
            </Label>
            <Input
              type="text"
              placeholder="johndeo@gmail.com"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Organization name
            </Label>
            <Input
              type="text"
              placeholder="Vinfarms"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-1 lg:gap-x-4 gap-y-4">
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Location
            </Label>
            <Input
              type="text"
              placeholder="Port Harcourt, Rivers State. Nigeria"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
          <div className="form-control">
            <Label
              htmlFor="message-2"
              className=" text-gray-500 font-normal mb-3">
              Phone number
            </Label>
            <Input
              type="text"
              placeholder="+234 xxx xxx xxxx"
              className="border-gray-400 focus-visible:outline-none py-6 "
            />
          </div>
        </div>
        <div className="flex items-center justify-between space-x-6">
          {/* <Button
                        onClick={() => setOpen(false)}
                        className=" mt-10 border border-[--secondary] bg-white hover:bg-white w-full h-[53px] text-[--secondary] text-xs font-normal ">
                        Cancle
                      </Button> */}
          <Button className=" mt-10 outline-none border-none font-normal text-base bg-[--primary] hover:bg-[--secondary] w-full h-[53px] text-white">
            Add Purchase
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
