import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { GiCheckMark } from "react-icons/gi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useGetSubsQuery } from "@/redux/services/subApiSlice";
import { formatCurrency } from "@/utils";
import fetchToken from "@/lib/auth";
import { paystackPay } from "@/app/actions/action";

const SubscriptionModal = ({ open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);
  const [months, setMonths] = useState("");
  const { data } = useGetSubsQuery(null);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handlePayment = async (e: any): Promise<void> => {
    e.preventDefault();
    // Your code logic goes here
    const token = await fetchToken();
    setSubmitting(true);
    try {
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          no_of_months: months,
        }),
      };
      const paystackResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/farmer/upgrade-plan`,
        options
      );
      const data = await paystackResponse.json();

      const paystackRes = await paystackPay({
        amount: data?.data?.paystack_data?.amount,
        email: data?.data?.paystack_data?.email,
        reference: data?.data?.paystack_data?.reference,
        currency: "NGN",
        callback_url: `${process.env.NEXT_PUBLIC_NEXT_API}/account/confirmpayment`,
      });
      // setSubmitting(false);

      if (paystackRes.status === true) {
        window.location.href = paystackRes.data.authorization_url; //extract the redirection and user it for redirecting the donor to the unique page generated for them to make payment
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
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
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-11/12 lg:w-8/12">
                <div className="flex items-center justify-center border border-gray-600 rounded-full absolute top-8 right-8 h-8 w-8 cursor-pointer">
                  <IoClose
                    onClick={() => setOpen(false)}
                    className=" h-5 w-5 text-gray-600"
                  />
                </div>
                <div className="">
                  <div className="left-side lg:w-5/12 bg-gray-200 rounded-lg px-10 pt-14 pb-6">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Try Aquatrack Pro for free
                    </h2>
                    <div className="mt-8">
                      <div className="flex items-center space-x-4">
                        <GiCheckMark className="text-green-600" />
                        <p className="text-sm">
                          Free 30 days trial, cancle any time
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <GiCheckMark className="text-green-600" />
                        <p className="text-sm">
                          We`ll remind you before your trial ends
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handlePayment} className="form mt-6">
                      <RadioGroup
                        defaultValue="yearly"
                        className="space-y-2"
                        onValueChange={(value) => setMonths(value)}>
                        {data?.data?.map((plan: any) => (
                          <div
                            key={plan?.id}
                            className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={plan?.attributes?.duration}
                              id="r1"
                              className="h-6 w-6"
                            />
                            <label htmlFor="r1" className="mt-8">
                              <p className="flex items-center font-semibold text-lg">
                                {plan?.attributes?.title}

                                {plan?.attributes?.duration === 12 && (
                                  <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded-full ml-2">
                                    Best value - Save N
                                    {plan?.attributes?.best_value}
                                  </span>
                                )}
                              </p>
                              <p className="text-sm mt-2">
                                N
                                {formatCurrency(
                                  plan?.attributes?.monthly_price
                                )}{" "}
                                {plan?.attributes?.description}
                              </p>
                            </label>
                          </div>
                        ))}

                        {/* <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="3"
                            id="r2"
                            className="h-6 w-6 focus:text-green-600 "
                          />
                          <label htmlFor="r2" className="mt-6">
                            <p className="flex items-center font-semibold text-lg">
                              Monthly
                            </p>

                            <p className="text-sm">N2,800</p>
                          </label>
                        </div> */}
                      </RadioGroup>
                      <Button className="w-full bg-[--primary] hover:bg-[--primary] py-6 font-semibold mt-8">
                        {submitting ? "Submitting..." : "Next"}
                      </Button>
                    </form>
                    <div className="mt-10">
                      <p className="text-xs text-gray-400">
                        By continuing, you agree to the{" "}
                        <Link href="/" className="underline">
                          Terms of Use{" "}
                        </Link>
                        applicable to the Aquatrack Pro and confirm you have
                        read our{" "}
                        <Link href="/" className="underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="right-side lg:w-full"></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SubscriptionModal;
