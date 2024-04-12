"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import fetchToken from "@/lib/auth";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";

const OnboardingForm = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);
  const [formData, setFormData] = useState({
    organization_name: "",
    no_of_farms_owned: "",
    capital: "",
  });
  const [errors, setErrors] = useState({
    organization_name: "",
    no_of_farms_owned: "",
    capital: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "no_of_farms_owned" || name === "capital"
        ? parseInt(value)
        : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let newErrors = {
      organization_name: "",
      no_of_farms_owned: "",
      capital: "",
    };

    if (!formData.organization_name) {
      newErrors.organization_name = "Organization is required";
    }
    if (!formData.no_of_farms_owned) {
      newErrors.no_of_farms_owned = "Farms is required";
    }
    if (!formData.capital) {
      newErrors.capital = "Capital is required";
    }

    setErrors(newErrors);

    const reqData = {
      organization_name: formData.organization_name,
      no_of_farms_owned: formData.no_of_farms_owned,
      capital: formData.capital,
      team_members: emails,
    };

    if (Object.values(newErrors).every((error) => !error)) {
      setLoading(true);
      try {
        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/onboarding/farm-owner`,
          {
            method: "POST",
            headers,
            body: JSON.stringify(reqData),
          }
        );

        const resdata = await res.json();
        if (resdata?.status == true || resdata?.status == 200) {
          if (resdata?.data?.attributes?.fully_onboarded) {
            push("/account");
            toast.success("Account Verified");
          } else {
            push("/onboarding");
          }
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          "Something went wrong please try again or check your network connection"
        );
      }
    }
  };

  return (
    <section className=" h-screen flex items-center justify-center lg:py-20 py-10">
      <div className="form-container lg:w-4/12 w-10/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl text-center lg:mb-4">
          Complete your profile
        </h1>
        <form onSubmit={handleSignup} className="mt-10">
          <div className="grid lg:grid-cols-1 grid-cols-1 lg:gap-x-6">
            <div className="form-control mt-4">
              <label htmlFor="fullname" className="text-sm">
                Organization name
              </label>
              <Input
                type="text"
                placeholder="Enter your first name"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="organization_name"
                value={formData.organization_name}
                onChange={handleInputChange}
              />
              {errors.organization_name && (
                <p className="text-red-500 text-xs">
                  {errors.organization_name}
                </p>
              )}
            </div>
            <div className="form-control mt-4">
              <label htmlFor="lastname" className="text-sm">
                How many farms do you own?
              </label>
              <Input
                type="text"
                placeholder="Enter your last name"
                className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
                name="no_of_farms_owned"
                value={formData.no_of_farms_owned}
                onChange={handleInputChange}
              />
              {errors.no_of_farms_owned && (
                <p className="text-red-500 text-xs">
                  {errors.no_of_farms_owned}
                </p>
              )}
            </div>
          </div>
          <div className="form-control mt-4">
            <label htmlFor="email" className="text-sm">
              Enter starting capital
            </label>
            <Input
              type="text"
              placeholder="Enter farm value"
              className="h-[60px] mt-1 px-6 bg-transparent outline-none border-gray-500"
              name="capital"
              value={formData.capital}
              onChange={handleInputChange}
            />
            {errors.capital && (
              <p className="text-red-500 text-xs">{errors.capital}</p>
            )}
          </div>
          <div className="form-control mt-4">
            <label htmlFor="email" className="text-sm">
              Invite team members
            </label>
            <ReactMultiEmail
              style={{
                border: "1px solid #333",
                height: "auto",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
              placeholder="Input your email"
              emails={emails}
              onChange={(_emails: string[]) => {
                setEmails(_emails);
              }}
              autoFocus={true}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              getLabel={(email, index, removeEmail) => {
                return (
                  <div
                    data-tag
                    key={index}
                    style={{ background: "#fafafa", fontWeight: "200" }}>
                    <div data-tag-item>{email}</div>
                    <span data-tag-handle onClick={() => removeEmail(index)}>
                      ×
                    </span>
                  </div>
                );
              }}
            />
          </div>
          <Button className=" mt-8 font-semibold bg-[--primary] hover:bg-blue-500 w-full h-[53px] text-white">
            {loading ? "Loading..." : "Complete my profile"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default OnboardingForm;