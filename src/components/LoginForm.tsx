"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const LoginForm = () => {
  const { push } = useRouter();
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      setLoading(true);
      try {
        const res = await axios.post(`/api/login`, formData);

        // console.log(res);
        if (res?.status == 200) {
          push("/account");
          toast.success(res?.data?.message);
        }
        // setLoading(false);
      } catch (error) {
        toast.error("Invalid Credentials");
        setLoading(false);
      }
    }
  };

  return (
    <section className=" lg:h-[86vh] h-[90vh] flex items-center justify-center ">
      <div className="form-container lg:w-3/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center">
          Welcome Back!
        </h1>
        <form onSubmit={handleLogin}>
          <div className="form-control mt-8">
            <label htmlFor="email">Email address</label>
            <Input
              type="email"
              placeholder="vinfarm@gmail.com"
              className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="form-control mt-6">
            <label htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <Input
                type={hide ? "password" : "text"}
                placeholder="********"
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
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" disabled />
              <label
                htmlFor="terms2"
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-base text-sm ">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-[--primary] lg:text-base text-sm ">
              Forgot your password?
            </Link>
          </div>
          <Button className=" mt-10 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Loading..." : "Log In"}
          </Button>
          <p className="text-center mt-8">
            Don&apos;t have an account?{" "}
            <Link className="text-[--primary] " href="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
