import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import { getAPIUrl } from "../../lib/useLocalStorage";

const register: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const headerProps = {
    pageTitle: "Hi Bidder : Login page",
    pageDescription: "hi Bidder Category details page",
  };
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
  };
  const handleValidation = (e: any) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
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
                    <form className="mt-8 space-y-6" action="#" method="POST">
                      {loginError && (
                        <>
                          <div className="alert alert-danger pt-2 pb-2">
                            <i className="fa fa-info-circle mr-3"></i>
                            {loginError}
                          </div>
                        </>
                      )}
                      <div className="-space-y-px rounded-md">
                        <div>
                          <label htmlFor="name" className="font-semibold">
                            Name
                          </label>
                          <input
                            onChange={handleValidation}
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="contact" className="font-semibold">
                            Mobile No
                          </label>
                          <div className="relative">
                            <input
                              readOnly={otpSent}
                              onChange={handleValidation}
                              id="contact"
                              name="contact"
                              type="number"
                              autoComplete="contact"
                              required
                              className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Mobile No"
                            />
                            {userLogin.contact != "" &&
                              userLogin.contact.toString().length == 10 &&
                              !otpSent && (
                                <i
                                  className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-[2px] rounded text-white`}
                                  onClick={sendOTPNow}
                                >
                                  SEND OTP
                                </i>
                              )}
                            {otpSent && (
                              <i
                                className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-[2px] rounded text-white`}
                                onClick={editContact}
                              >
                                EDIT
                              </i>
                            )}
                          </div>
                          <small className="font-semibold text-gray-600">
                            Enter perfect mobile no, We will send you OTP for
                            mobile verification.
                          </small>
                        </div>
                        {otpSent && (
                          <div className="mt-1 relative">
                            <label
                              htmlFor="contact_otp"
                              className="font-semibold"
                            >
                              OTP
                            </label>
                            <div className="relative">
                              <input
                                onChange={handleValidation}
                                id="contact_otp"
                                name="contact_otp"
                                type="text"
                                autoComplete="contact_otp"
                                required
                                className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="OTP"
                              />
                              {waitCounter > 0 && (
                                <i
                                  className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-[2px] rounded text-white`}
                                >
                                  Wait {waitCounter < 10 ? "0" : ""}
                                  {waitCounter}
                                </i>
                              )}
                              {waitCounter <= 0 && (
                                <i
                                  className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-[2px] rounded text-white`}
                                  onClick={resendOTP}
                                >
                                  Resend OTP
                                </i>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="mt-3">
                          <label
                            htmlFor="email-address"
                            className="font-semibold"
                          >
                            Email Id
                          </label>
                          <input
                            onChange={handleValidation}
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email address"
                          />
                          <small className="font-semibold text-gray-600">
                            Enter valid Email Id, We will send you Email for
                            verification. Be careful.
                          </small>
                        </div>
                        <div className="mt-3 relative">
                          <label htmlFor="password" className="font-semibold">
                            Password
                          </label>
                          <input
                            onChange={handleValidation}
                            id="password"
                            name="password"
                            type={passwordType}
                            autoComplete="current-password"
                            required
                            className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                          />
                          <i
                            className={`z-10 fa ${faIcon} absolute top-[42%] cursor-pointer right-[15px] text-2xl`}
                            onClick={showPassword}
                          ></i>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={submitForm}
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute opacity-50 inset-y-0 left-0 flex items-center pl-3">
                            <i className="fa fa-2x fa-lock "></i>
                          </span>
                          Submit Now
                        </button>
                      </div>
                    </form>

                    <div className="or-cls-class">
                      <span className="text-gray-600 bg-[#F2F2F2]">
                        OR Continue with
                      </span>
                    </div>
                    <div className="flex">
                      {/* <GoogleLogin
                                                 clientId={process.env.Google_clientId!}
                                                 render={(renderProps) => (
                                                     
                                                 )}
                                                 buttonText="Login"
                                                 cookiePolicy={'single_host_origin'}
                                                 isSignedIn={true}
                                                 onSuccess={responseGoogle}
                                                 onFailure={responseGoogle}
                                             /> */}
                      {/* <Link > */}
                      {/* <Link  href={`/api/auth/signin`} passHref> */}
                      <button
                        onClick={handleGoogle}
                        className="flex-auto text-center shadow border py-2 rounded-md mr-2 bg-red-600 text-white cursor-pointer"
                      >
                        <i className="fa fa-google mr-2"></i> Google
                      </button>
                      {/* </Link> */}
                      {/* </Link> */}
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
                      {/* <AppleLogin
                                                 clientId={process.env.Apple_clientId!}
                                                 redirectURI={process.env.Apple_redirectURI!}
                                                 usePopup={true}
                                                 callback={responseApple} 
                                                 scope="email name"
                                                 responseMode="query"
                                                 render={renderProps => (  
                                                     <a onClick={renderProps.onClick} className='flex-auto text-center shadow border py-2 rounded-md bg-black text-white cursor-pointer'>
                                                         <i className="fa fa-apple mr-2"></i> Apple
                                                     </a>
                                                 )}
                                             /> */}
                      {/* <FacebookLogin
                                                 appId={process.env.Facebook_appId!}
                                                 autoLoad={false}
                                                 fields="name,email,picture"
                                                 scope="public_profile,email,user_friends"
                                                 callback={responseFacebook}
                                                 icon="fa-facebook"
                                                 textButton=" &nbsp;&nbsp;Facebook"
                                                 cssClass="flex-auto text-center shadow border py-2 px-3 rounded-md ml-3 bg-[#4267B2] text-white"
                                             /> */}
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

export default register;
