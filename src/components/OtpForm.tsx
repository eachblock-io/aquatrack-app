"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

const OtpForm = () => {
  const { push } = useRouter();
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({ value: "" });

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    console.log(value);
    // setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: "" });
  };

  const handleVerification = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = { value: "" };

    if (!value) {
      newErrors.value = "Otp is required";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      // Proceed with login
      push("/forgot-password/reset");
      console.log(value);
    }
  };

  const handleResend = () => {};

  return (
    <section className=" lg:h-[86vh] h-[90vh] flex items-center justify-center ">
      <div className="form-container lg:w-3/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center">
          Verification
        </h1>
        <p className="mt-3 text-gray-500 text-sm text-center">
          Kindly enter the verification code sent to{" "}
          <span className="font-bold text">vinfarm@gmail.com</span>{" "}
        </p>
        <form onSubmit={handleVerification}>
          <div className="form-control mt-8">
            <InputOTP
              className="mx-auto flex items-center justify-center"
              maxLength={4}
              value={value}
              name="otp"
              id="otp"
              onChange={(value) => setValue(value)}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              render={({ slots }) => (
                <InputOTPGroup className="space-x-4">
                  {slots.map((slot, index) => (
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className="lg:h-16 lg:w-16 w-12 h-12 bg-gray-200 rounded-lg"
                    />
                  ))}{" "}
                </InputOTPGroup>
              )}
            />
            {errors?.value && (
              <p className="text-red-500 text-xs text-center mt-1">
                {errors?.value}
              </p>
            )}
          </div>
          <Button
            disabled={value?.length <= 3 ? true : false}
            className={`
               mt-10 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white
            ${value?.length <= 3 ? "bg-gray-300 text-gray-800" : ""} `}>
            {loading ? "Verifing..." : "Verify and continue"}
          </Button>
          <div className="text-center mt-8">
            <p
              onClick={handleResend}
              className="text-[--primary] cursor-pointer">
              Resend Code
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OtpForm;
