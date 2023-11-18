import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import { useForm } from "react-hook-form";
import { Tooltip as ReactTooltip } from "react-tooltip";
import FormControl from "../../Components/Reusable/FormControl";
import { getAPIUrl } from "../../lib/useLocalStorage";

interface formData {
  name: String;
  contact: String;
  contact_otp: String;
  email: String;
  password: String;
}

const RegisterPage: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const headerProps = {
    pageTitle: "Hi Bidder : Login page",
    pageDescription: "hi Bidder Category details page",
  };
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  const otpWait = parseInt(process.env.OTP_WAIT_TIME);
  const { data: session } = useSession();
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const [faIcon, setFaIcon] = useState("fa-eye-slash");
  const [otpSent, setOtpSent] = useState(false);
  const [waitCounter, setWaitCounter] = useState(otpWait);
  const [isLoading, setIsLoading] = useState(false);
  const [userLogin, setUserLogin] = useState({
    name: "",
    contact: "",
    contact_otp: "",
    email: "",
    password: "",
  });
  const handleApple = () => {
    signIn("apple", { callbackUrl: process.env.NEXTAUTH_URL, redirect: false });
  };
  const handleFacebook = () => {
    signIn("facebook", { redirect: false });
    // signIn();
  };
  const handleGoogle = () => {
    signIn("google", { redirect: false });
    // signIn();
  };
  const showPassword = () => {
    const newPasswordType = passwordType == "password" ? "text" : "password";
    const newIcon = passwordType == "password" ? "fa-eye" : "fa-eye-slash";
    setFaIcon(newIcon);
    setPasswordType(newPasswordType);
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const respo = await fetch(mainApiUrl + "user/basic-register", {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: { "Content-Type": "application/json" },
    });
    const response = await respo.json();
    console.log(response);
    if (respo.ok) {
      if (response.status == "1") {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
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
  const sendOtp = async () => {
    setIsLoading(true);
    const respo = await fetch(mainApiUrl + "user/send-otp", {
      method: "POST",
      body: JSON.stringify({ contact: userLogin.contact }),
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
        setOtpSent(!otpSent);
        startCounter();
        setWaitCounter(otpWait);
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
    sendOtp();
  };
  const resendOTP = () => {
    sendOtp();
    startCounter();
    setWaitCounter(otpWait);
  };
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
  const editContact = () => {
    clearCounterInterval();
    setOtpSent(false);
    setUserLogin({ ...userLogin, ["contact"]: "" });
    setUserLogin({ ...userLogin, ["contact_otp"]: "" });
    setValue("contact", "");
    setValue("contact_otp", "");
  };
  const handleOnKeyUp = (e: any) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  useEffect(() => {
    if (session) {
      const { returnUrl } = router.query;
      if (returnUrl) {
        router.push(returnUrl.toString());
      } else {
        router.push("/");
      }
    }
  }, [session]);

  const onSubmit = async (data: formData) => {
    setIsLoading(true);
    const respo = await fetch(mainApiUrl + "user/basic-register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const response = await respo.json();
    console.log(response);
    if (respo.ok) {
      if (response.status == "1") {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
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

  return (
    <div>
      <ToastContainer />
      <main>
        <Header
          headerProps={headerProps}
          headerTitle="Testing titles"
          anotherTitle="Another Titles"
        ></Header>
        <CategoryMenu />
        <div>
          <div className="relative z-10">
            {isLoading && <CustomLoader />}
            <div className="inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center pt-12 px-12 sm:px-6 lg:px-8">
                <div className="border-1 rounded grid grid-flow-col bg-[#F2F2F2]">
                  <div className="space-y-6 bg-white relative">
                    <img
                      src="/img/login-background.png"
                      className="w-full h-full"
                      alt="Login now"
                    />
                  </div>
                  <div className="space-y-6 py-8 px-12 rounded-xl relative">
                    <h1 className="text-2xl text-gray-700 font-semibold">
                      Create an account
                    </h1>
                    <div className="text-left mt-2 font-semibold text-gray-700 mr-12">
                      Do you have an account ??
                      <Link href={"/login"}>
                        <a className="cursor-pointer ml-2 mr-2 text-blue-900">
                          Login Now
                        </a>
                      </Link>
                    </div>
                    <form
                      className="mt-8 space-y-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {loginError && (
                        <>
                          <div className="alert alert-danger pt-2 pb-2">
                            <i className="fa fa-info-circle mr-3"></i>
                            {loginError}
                          </div>
                        </>
                      )}
                      <div className="rounded-md">
                        <div className="mt-3">
                          <FormControl
                            register={register}
                            errors={errors}
                            formName="name"
                            type="text"
                            formLabel="Name *"
                            validation={{ required: "Name is required field." }}
                          ></FormControl>
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="contact"
                            className={`${
                              errors.contact ? "text-[#990000]" : ""
                            } font-semibold`}
                          >
                            Mobile No *
                          </label>
                          <div className="relative">
                            <input
                              onKeyUp={handleOnKeyUp}
                              readOnly={otpSent}
                              {...register("contact", {
                                required: "Contact No is required",
                                pattern: {
                                  value: /^[0-9]{10}$/i,
                                  message:
                                    "Invalid Contact No, It should have 10 digits.",
                                },
                              })}
                              id="contact"
                              type="number"
                              autoComplete="contact"
                              className={`${
                                errors.contact
                                  ? "border-[#990000] shadow-[#9900005c]"
                                  : "border-gray-300"
                              } shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`}
                              placeholder="Mobile No"
                            />
                            {userLogin.contact != "" &&
                              userLogin.contact.toString().length == 10 &&
                              !otpSent && (
                                <i
                                  className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400  border-1 border-primary-color cursor-pointer right-0 rounded text-white`}
                                  onClick={sendOTPNow}
                                >
                                  SEND OTP
                                </i>
                              )}
                            {otpSent && (
                              <i
                                className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer border-1 border-primary-color right-0 rounded text-white`}
                                onClick={editContact}
                              >
                                EDIT
                              </i>
                            )}
                            <span
                              className="absolute top-1 right-2 text-2xl"
                              id="contact-error-title"
                            >
                              {errors.contact && (
                                <p className="text-[#990000]" role="alert">
                                  <i className="fa fa-info-circle"></i>
                                </p>
                              )}
                            </span>
                          </div>
                          {errors.contact && (
                            <ReactTooltip
                              anchorId="contact-error-title"
                              place="right"
                              variant="error"
                              content={errors.contact?.message}
                            />
                          )}
                          <small className="font-semibold text-gray-600">
                            Enter perfect mobile no, We will send you OTP for
                            mobile verification.
                          </small>
                        </div>
                        {otpSent && (
                          <div className="mt-1 relative">
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
                                {...register("contact_otp", {
                                  required: "OTP for contact is required",
                                })}
                                id="contact_otp"
                                name="contact_otp"
                                type="text"
                                autoComplete="contact_otp"
                                className={`${
                                  errors.contact_otp
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
                                {errors.contact_otp && (
                                  <p className="text-[#990000]" role="alert">
                                    <i className="fa fa-info-circle"></i>
                                  </p>
                                )}
                              </span>
                            </div>
                            {errors.contact_otp && (
                              <ReactTooltip
                                anchorId="contact_otp-error-title"
                                place="right"
                                variant="error"
                                content={errors.contact_otp?.message}
                              />
                            )}
                          </div>
                        )}
                        <div className="mt-3">
                          <FormControl
                            register={register}
                            errors={errors}
                            formName="email"
                            type="email"
                            formLabel="Email Id *"
                            validation={{
                              required: "Email Id is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message:
                                  "Invalid Email format, Please, Enter valid Email Id",
                              },
                            }}
                          ></FormControl>
                          <small className="font-semibold text-gray-600">
                            Enter valid email, We will send you mail for Email
                            Id verification.
                          </small>
                        </div>
                        <div className="mt-3">
                          <FormControl
                            register={register}
                            errors={errors}
                            formName="password"
                            type="password"
                            formLabel="Password *"
                            validation={{
                              required: "Password is required",
                              pattern: {
                                value:
                                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                                message:
                                  "Minimum eight characters, at least one letter, one number and one special character",
                              },
                            }}
                            isPassword={true}
                          ></FormControl>
                        </div>
                        <div className="mt-4 max-w-[400px] bg-white px-3 py-2 text-sm rounded shadow-[inset_1px_1px_6px_0_rgba(0,0,0,0.3)]">
                          By creating an account, you agree to our{" "}
                          <Link href={"/policy/terms-of-use"}>
                            <a
                              target="_blank"
                              className="text-primary-color font-semibold underline"
                            >
                              Terms of Use
                            </a>
                          </Link>{" "}
                          and acknowledge our{" "}
                          <Link href={"/policy/privacy-policy"}>
                            <a
                              target="_blank"
                              className="text-primary-color font-semibold underline"
                            >
                              Privacy Policy
                            </a>
                          </Link>
                          . Depending on how you use{" "}
                          <a
                            className="text-primary-color font-semibold underline"
                            href={process.env.COMPANY_URL}
                            target="_blank"
                          >
                            {process.env.COMPANY_NAME}
                          </a>
                          , we may send you promotional emails.
                          <br />
                          See our{" "}
                          <Link href={"/policy/privacy-policy"}>
                            <a
                              target="_blank"
                              className="text-primary-color font-semibold underline"
                            >
                              Privacy Policy
                            </a>
                          </Link>{" "}
                          for more info or to opt-out.
                        </div>
                        <div className="mt-4">
                          <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="absolute opacity-50 inset-y-0 left-0 flex items-center pl-3">
                              <i className="fa fa-2x fa-lock "></i>
                            </span>
                            Submit Now
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="or-cls-class">
                      <span className="text-gray-600 bg-[#F2F2F2]">
                        OR Continue with
                      </span>
                    </div>
                    <div className="flex">
                      <button
                        onClick={handleGoogle}
                        className="flex-auto text-center shadow border py-2 rounded-md mr-2 bg-red-600 text-white cursor-pointer"
                      >
                        <i className="fa fa-google mr-2"></i> Google
                      </button>
                      <button
                        onClick={handleApple}
                        className="flex-auto text-center shadow border py-2 rounded-md bg-black text-white cursor-pointer"
                      >
                        <i className="fa fa-apple mr-2"></i> Apple
                      </button>
                      <button
                        onClick={handleFacebook}
                        className="flex-auto text-center shadow border py-2 rounded-md ml-2 bg-[#4267B2] text-white"
                      >
                        <i className="fa fa-facebook mr-2"></i> Facebook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RegisterPage;
