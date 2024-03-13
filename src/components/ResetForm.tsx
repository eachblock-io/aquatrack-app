"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";

const ResetForm = () => {
  const { push } = useRouter();
  const [hide, setHide] = useState(true);
  const [hide1, setHide1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password != formData.confirmPassword) {
      newErrors.confirmPassword = "Password did not match";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      setOpen(true);
      // Proceed with login
      console.log(formData);
    }
  };

  return (
    <section className=" h-auto flex items-center justify-center lg:py-20 py-10">
      <SuccessModal
        text="Password Reset successfully"
        link="/"
        btnText="Log In"
        open={open}
        setOpen={setOpen}
      />
      <div className="form-container lg:w-4/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center lg:mb-4">
          Create new password
        </h1>
        <form onSubmit={handleLogin}>
          <div className="form-control mt-6">
            <label htmlFor="password">New Password</label>
            <div className="relative flex items-center">
              <Input
                type={hide ? "password" : "text"}
                placeholder="Enter new password"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <div className="eyes absolute right-6 cursor-pointer">
                {hide ? (
                  <FaEyeSlash
                    onClick={() => setHide(!hide)}
                    className="h-6 w-6 text-gray-400"
                  />
                ) : (
                  <FaEye
                    onClick={() => setHide(!hide)}
                    className="h-6 w-6 text-gray-400"
                  />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative flex items-center">
              <Input
                type={hide1 ? "password" : "text"}
                placeholder="Re-enter password"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <div className="eyes absolute right-6 cursor-pointer">
                {hide1 ? (
                  <FaEyeSlash
                    onClick={() => setHide1(!hide1)}
                    className="h-6 w-6 text-gray-400"
                  />
                ) : (
                  <FaEye
                    onClick={() => setHide1(!hide1)}
                    className="h-6 w-6 text-gray-400"
                  />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Reseting..." : "Reset my password"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetForm;
