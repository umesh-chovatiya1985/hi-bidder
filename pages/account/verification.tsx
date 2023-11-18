import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../../Admin/Components/CustomLoader";
import DynaFormControl from "../../Components/Reusable/Forms/DynaFormControl";
import { getAPIUrl } from "../../lib/useLocalStorage";
import AccountLayout from "./AccountLayout";

const Verification: NextPage = () => {
  const headerProps = {
    pageTitle: "Account verification",
    pageDescription: "Hi, this is a account verification of bidder user",
  };
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const otpWait = parseInt(process.env.OTP_WAIT_TIME);
  const { data: session } = useSession();
  const [otpSent, setOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [waitCounter, setWaitCounter] = useState(otpWait);
  const [waitEmailCounter, setWaitEmailCounter] = useState(otpWait);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    getValues: getValues2,
    formState: { errors: errors2 },
  } = useForm<any>();
  const handleOnKeyUp = (e: any) => {
    // setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const verifyOtp = async (requestedType: any, requestData: any) => {
    setIsLoading(true);
    const url = "user/verify-otp";
    const body = JSON.stringify({
      type: requestedType,
      data: JSON.stringify(requestData),
    });
    const respo = await fetch(mainApiUrl + url, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });
    const response = await respo.json();
    if (respo.ok) {
      if (response.status == "1") {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
        if (requestedType == "contact") {
          setOtpSent(false);
          setIsMobileVerified(true);
        }
        if (requestedType == "email") {
          setEmailOtpSent(false);
          setIsEmailVerified(true);
        }
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
    setIsLoading(false);
  };
  const sendOtp = async (requestedType: any, requestData: any) => {
    setIsLoading(true);
    const url =
      requestedType == "email"
        ? "user/send-otp-email"
        : "user/send-otp-contact";
    const body =
      requestedType == "email"
        ? JSON.stringify({ type: requestedType, email: requestData })
        : JSON.stringify({ type: requestedType, contact: requestData });
    const respo = await fetch(mainApiUrl + url, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });
    const response = await respo.json();
    if (respo.ok) {
      if (response.status == "1") {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
        if (requestedType == "contact") {
          setOtpSent(true);
          startCounter();
          setWaitCounter(otpWait);
        }
        if (requestedType == "email") {
          setEmailOtpSent(true);
          startEmailCounter();
          setWaitEmailCounter(otpWait);
        }
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      }
    }
    setIsLoading(false);
  };
  const sendOTPNow = () => {
    const values = getValues2;
    sendOtp("contact", values("contact_no"));
  };
  const resendOTP = () => {
    clearCounterInterval();
    const values = getValues2;
    sendOtp("contact", values("contact_no"));
    // startCounter();
    // setWaitCounter(otpWait);
  };
  const sendEmailOTPNow = () => {
    const values = getValues;
    sendOtp("email", values("email"));
  };
  const resendEmailOTP = () => {
    const values = getValues;
    clearEmailCounterInterval();
    sendOtp("email", values("email"));
    // startEmailCounter();
    // setWaitEmailCounter(otpWait);
  };
  /** OTP interval counter */
  let intervalTimer: any;
  const startCounter = () => {
    let counter = otpWait;
    intervalTimer = setInterval(() => {
      counter = counter - 1;
      if (counter < 0) {
        clearInterval(intervalTimer);
        return;
      }
      setWaitCounter((waitCounter) => waitCounter - 1);
    }, 1000);
  };
  const clearCounterInterval = () => {
    if (intervalTimer) {
      setWaitCounter(otpWait);
      clearInterval(intervalTimer);
    }
  };
  /** End of OTP interval counter */

  /** OTP interval counter */
  let intervalEmailTimer: any;
  const startEmailCounter = () => {
    let counter = otpWait;
    intervalEmailTimer = setInterval(() => {
      counter = counter - 1;
      if (counter < 0) {
        clearInterval(intervalEmailTimer);
        return;
      }
      setWaitEmailCounter((waitEmailCounter) => waitEmailCounter - 1);
    }, 1000);
  };
  const clearEmailCounterInterval = () => {
    if (intervalEmailTimer) {
      setWaitEmailCounter(otpWait);
      clearInterval(intervalEmailTimer);
    }
  };
  /** End of OTP interval counter */

  const onSubmit = (data: any) => {
    if (data.email_otp) {
      verifyEmail(data);
    } else {
      sendEmailOTPNow();
    }
  };

  const onSubmit2 = (data: any) => {
    if (data.contact_otp) {
      verifyContactNo(data);
    } else {
      sendOTPNow();
    }
  };

  const verifyEmail = (data: any) => {
    verifyOtp("email", data);
  };

  const verifyContactNo = (data: any) => {
    verifyOtp("contact", data);
  };

  const getUserInfo = async () => {
    setIsLoading(true);
    const userData = await fetch(mainApiUrl + "user/get-user-info");
    const userJson = await userData.json();
    if (userData.ok) {
      if (userJson.status == 1) {
        setValue("email", userJson.records.email);
        setIsEmailVerified(userJson.records.emailVerified);
        setValue2("contact_no", userJson.records.contact);
        setIsMobileVerified(userJson.records.is_contact_verified);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <AccountLayout headerProps={headerProps}>
      <ToastContainer />
      <div className="user-info relative h-full">
        {isLoading && (
          <CustomLoader classData="absolute z-10 justify-content-center items-center flex left-0 top-0 right-0 bottom-0" />
        )}
        <div className="container-fluid p-8">
          <div className="row">
            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                  <div className="pb-[20px] mb-[20px] border-b">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div>
                          <DynaFormControl
                            onKeyUp={handleOnKeyUp}
                            readOnly={emailOtpSent}
                            register={register}
                            errors={errors}
                            formName="email"
                            formLabel="Email"
                            isDisabled={isEmailVerified}
                            type="text"
                            validation={{
                              required: "Email is required!",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message:
                                  "Invalid Email format, Please, Enter valid Email Id",
                              },
                            }}
                          ></DynaFormControl>
                        </div>
                        <div className="mt-3">
                          {emailOtpSent && !isEmailVerified && (
                            <div className="mt-1 mb-3 relative">
                              <label
                                htmlFor="email_otp"
                                className={`${
                                  errors.email_otp ? "text-[#990000]" : ""
                                } font-semibold`}
                              >
                                OTP *
                              </label>
                              <div className="relative">
                                <input
                                  {...register("email_otp", {
                                    required: "OTP for contact is required",
                                  })}
                                  id="email_otp"
                                  name="email_otp"
                                  type="text"
                                  autoComplete="email_otp"
                                  className={`${
                                    errors.email_otp
                                      ? "border-[#990000]  shadow-[#9900005c]"
                                      : "border-gray-300"
                                  } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
                                  placeholder="OTP"
                                />
                                {waitEmailCounter > 0 && (
                                  <i
                                    className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-0 border-1 border-primary-color rounded text-white`}
                                  >
                                    Wait {waitEmailCounter < 10 ? "0" : ""}
                                    {waitEmailCounter}
                                  </i>
                                )}
                                {waitEmailCounter <= 0 && (
                                  <i
                                    className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-0 border-1 border-primary-color rounded text-white`}
                                    onClick={resendEmailOTP}
                                  >
                                    Resend OTP
                                  </i>
                                )}
                                <span
                                  id="email_otp-error-title"
                                  className="absolute z-10 top-1 right-2 text-2xl"
                                >
                                  {errors.email_otp && (
                                    <p className="text-[#990000]" role="alert">
                                      <i className="fa fa-info-circle"></i>
                                    </p>
                                  )}
                                </span>
                              </div>
                              <div className="mt-4 text-right">
                                <button
                                  type="submit"
                                  className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[35px] py-[10px] font-normal"
                                >
                                  <i className="fa fa-check-circle pr-[5px]"></i>
                                  Verify Now
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="pt-4">
                        {!emailOtpSent && !isEmailVerified && (
                          <button
                            type="submit"
                            className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[35px] py-[10px] font-normal"
                          >
                            <i className="fa fa-check-circle pr-[5px]"></i>
                            Verify Now
                          </button>
                        )}
                        {isEmailVerified && (
                          <button
                            onClick={() => setIsEmailVerified(false)}
                            type="button"
                            className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[35px] py-[10px] font-normal"
                          >
                            <i className="fa fa-pencil pr-[5px]"></i>
                            Edit Email
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      {!isEmailVerified && (
                        <div
                          className="mage-error pt-[5px] text-[400] text-[#FF0A0A] items-center flex"
                          id="email-error"
                        >
                          <i className="fa fa-times-circle pr-[5px] text-[22px]"></i>
                          Your Email has not been Verifed.
                        </div>
                      )}
                      {isEmailVerified && (
                        <div
                          className="mage-error pt-[5px] text-[400] text-[#007B39]  items-center flex"
                          id="email-error"
                        >
                          <i className="fa fa-check-circle pr-[5px] text-[22px]"></i>
                          Your email address has been successfully verified.
                        </div>
                      )}
                      <div
                        className="text-[18px] text-[400] text-[#808089] mt-2"
                        id="emails"
                      >
                        To activate your account, your email address needs to be
                        verified.
                      </div>
                    </div>
                  </div>
                </form>
                <form onSubmit={handleSubmit2(onSubmit2)} method="post">
                  <div className="pb-[35px]">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div>
                          <DynaFormControl
                            register={register2}
                            errors={errors2}
                            formName="contact_no"
                            formLabel="Mobile No"
                            type="text"
                            isDisabled={isMobileVerified}
                            validation={{
                              required: "Mobile No is required!",
                              pattern: {
                                value: /^[0-9]{10}$/i,
                                message:
                                  "Invalid Mobile No, It should have 10 digits.",
                              },
                            }}
                          ></DynaFormControl>
                        </div>
                        <div className="mt-3">
                          {otpSent && !isMobileVerified && (
                            <div className="mt-1 mb-3 relative">
                              <label
                                htmlFor="contact_otp"
                                className={`${
                                  errors.contact_otp ? "text-[#990000]" : ""
                                } font-semibold`}
                              >
                                OTP *
                              </label>
                              <div className="relative">
                                <input
                                  {...register2("contact_otp", {
                                    required: "OTP for contact is required",
                                  })}
                                  id="contact_otp"
                                  name="contact_otp"
                                  type="text"
                                  autoComplete="contact_otp"
                                  className={`${
                                    errors2.contact_otp
                                      ? "border-[#990000]  shadow-[#9900005c]"
                                      : "border-gray-300"
                                  } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
                                  placeholder="OTP"
                                />
                                {waitCounter > 0 && (
                                  <i
                                    className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-0 border-1 border-primary-color rounded text-white`}
                                  >
                                    Wait {waitCounter < 10 ? "0" : ""}
                                    {waitCounter}
                                  </i>
                                )}
                                {waitCounter <= 0 && (
                                  <i
                                    className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-0 border-1 border-primary-color rounded text-white`}
                                    onClick={resendOTP}
                                  >
                                    Resend OTP
                                  </i>
                                )}
                                <span
                                  id="contact_otp-error-title"
                                  className="absolute z-10 top-1 right-2 text-2xl"
                                >
                                  {errors2.contact_otp && (
                                    <p className="text-[#990000]" role="alert">
                                      <i className="fa fa-info-circle"></i>
                                    </p>
                                  )}
                                </span>
                              </div>
                              <div className="mt-4 text-right">
                                <button
                                  type="submit"
                                  className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[35px] py-[10px] font-normal"
                                >
                                  <i className="fa fa-check-circle pr-[5px]"></i>
                                  Verify Now
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="pt-4">
                        {!otpSent && !isMobileVerified && (
                          <button
                            type="submit"
                            className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[35px] py-[10px] font-normal"
                          >
                            <i className="fa fa-check-circle pr-[5px]"></i>
                            Verify Now
                          </button>
                        )}
                        {isMobileVerified && (
                          <button
                            onClick={() => setIsMobileVerified(false)}
                            type="button"
                            className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[35px] py-[10px] font-normal"
                          >
                            <i className="fa fa-pencil pr-[5px]"></i>
                            Edit Contact
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      {!isMobileVerified && (
                        <div
                          className="mage-error pt-[5px] text-[400] text-[#FF0A0A] items-center flex"
                          id="mobileno-error"
                        >
                          <i className="fa fa-times-circle pr-[5px] text-[22px]"></i>
                          Your Phone Number has not been Verifed.
                        </div>
                      )}
                      {isMobileVerified && (
                        <div
                          className="mage-error pt-[5px] text-[400] text-[#007B39] items-center flex"
                          id="email-error"
                        >
                          <i className="fa fa-check-circle pr-[5px] text-[22px]"></i>
                          Your Phone Number has been successfully verified.
                        </div>
                      )}
                      <div
                        className="text-[18px] text-[400] text-[#808089] mt-2"
                        id="emails"
                      >
                        To activate your account, your Phone No. needs to be
                        verified.
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Verification;
