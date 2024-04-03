"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const VerifyForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    email: "",
    code: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    code: "",
  });

  useEffect(() => {
    // Check if there's an email in local storage
    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      // If there is, set the email and mark as authenticated
      setFormData({ email: storedEmail });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      email: "",
      code: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.code) {
      newErrors.code = "CODE is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      console.log(formData);
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/email-verification/verify`,
          formData
        );
        if (window != undefined) {
          localStorage.setItem("userEmail", formData?.email);
        }
        toast.success("Verified ✅");
        push("/onboarding");
      } catch (error) {
        toast.error("Invalid Credentials");
      }
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(`/api/auth/email-verification/resend`);
      toast.success("Check your email for new otp");
    } catch (error) {}
  };

  return (
    <>
      {/* <Header /> */}
      <section className="h-screen flex items-center justify-center ">
        <div className="form-container lg:w-4/12 w-10/12 mx-auto">
          <div className="lg:w-8/12 w-10/12 mx-auto text-center">
            <h1 className="font-bold text-xl lg:text-2xl text-center lg:mb-4">
              Verify your email
            </h1>
            <p className="text-gray-500 text-md mt-2 ">
              Verification code sent to this email{" "}
              {`*****${formData?.email.slice(4)}`}
            </p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="form-control mt-8">
              {/* <label htmlFor="code">OTP</label> */}
              <Input
                type="text"
                placeholder="Enter OTP"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
              />
              {errors.code && (
                <p className="text-red-500 text-xs">{errors.code}</p>
              )}
            </div>
            <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
              {loading ? "Loading..." : "Verify email"}
            </Button>
            <p className="text-center mt-8">
              Didn&apos;t get the code yet?{" "}
              <Button
                onClick={handleResend}
                variant="ghost"
                className="text-[--primary] ">
                Resend code
              </Button>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyForm;
