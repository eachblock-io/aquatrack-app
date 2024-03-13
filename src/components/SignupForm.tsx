"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Button } from "./ui/button";

const SignupForm = () => {
  const [hide, setHide] = useState(true);
  const [hide1, setHide1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
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
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password != formData.confirmPassword) {
      newErrors.confirmPassword = "Password did not match";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      // Proceed with login

      console.log(formData);
    }
  };

  return (
    <section className=" h-auto flex items-center justify-center lg:py-20 py-10">
      <div className="form-container lg:w-4/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center lg:mb-4">
          Create an account
        </h1>
        <form onSubmit={handleLogin}>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-6">
            <div className="form-control mt-8">
              <label htmlFor="fullname">First name</label>
              <Input
                type="text"
                placeholder="Enter your first name"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs">{errors.firstname}</p>
              )}
            </div>
            <div className="form-control mt-8">
              <label htmlFor="lastname">Last name</label>
              <Input
                type="text"
                placeholder="Enter your last name"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div className="form-control mt-8">
            <label htmlFor="email">Email address</label>
            <Input
              type="email"
              placeholder="Enter your email address"
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
                placeholder="Enter password"
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

          <div className=" mt-6">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-base text-sm ">
                I agree with the{" "}
                <Link
                  href="/terms"
                  className="text-[--primary] lg:text-base text-sm ">
                  Terms and conditions
                </Link>
              </label>
            </div>
          </div>
          <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Loading..." : "Create my account"}
          </Button>
          <p className="text-center mt-8">
            Already have an account?{" "}
            <Link className="text-[--primary] " href="/">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignupForm;
