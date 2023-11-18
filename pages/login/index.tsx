import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Login: NextPage = () => {
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
  const [useEmail, setUseEmail] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [waitCounter, setWaitCounter] = useState(otpWait);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
    contact: "",
    contact_otp: "",
  });
  const { error } = router.query;
  const handleValidation = (e: any) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };
  const handleApple = () => {
    signIn("apple", { callbackUrl: process.env.NEXTAUTH_URL, redirect: false });
  };
  const handleFacebook = () => {
    signIn("facebook", { redirect: false });
    // signIn();
  };
  const handleGoogle = async () => {
    const res = await signIn("google", { redirect: false });
    // console.log(res);
    // signIn();
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: userLogin.email,
      password: userLogin.password,
      redirect: false,
    });
    // console.log(res.error);
    // await signIn('credentials',{ email: userLogin.email, password: userLogin.password, callbackUrl: process.env.NEXTAUTH_URL});
    setLoginError(res.error);
  };
  const showPassword = () => {
    const newPasswordType = passwordType == "password" ? "text" : "password";
    const newIcon = passwordType == "password" ? "fa-eye" : "fa-eye-slash";
    setFaIcon(newIcon);
    setPasswordType(newPasswordType);
  };
  const useMobile = () => {
    setUseEmail(!useEmail);
  };
  const sendOTPNow = () => {
    setOtpSent(!otpSent);
    startCounter();
  };
  const resendOTP = () => {
    startCounter();
    setWaitCounter(otpWait);
  };
  const startCounter = () => {
    let counter = otpWait;
    const intervalTimer = setInterval(() => {
      counter = counter - 1;
      if (counter < 0) {
        clearInterval(intervalTimer);
        return;
      }
      setWaitCounter((waitCounter) => waitCounter - 1);
    }, 1000);
  };
  useEffect(() => {
    try {
      if (session) {
        const { returnUrl } = router.query;
        if (returnUrl) {
          const realReturnUrl = returnUrl.toString().split("/[");
          router.push(realReturnUrl[0].toString());
        } else {
          router.push("/");
        }
      }
      if (error) {
        setLoginError("Opps! Account not linked with Gmail.");
      }
    } catch (error) {
      console.log(error);
    }
  }, [session, error]);

  return (
    <div>
      <main>
        <Header
          headerProps={headerProps}
          headerTitle="Testing titles"
          anotherTitle="Another Titles"
        ></Header>
        <CategoryMenu />
        <div>
          <div className="relative z-10">
            <div className="inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center pt-12 px-12 sm:px-6 lg:px-8">
                <div className="border-1 rounded grid grid-flow-col bg-[#F2F2F2]">
                  <div className="space-y-6 bg-white relative">
                    <img
                      src="/img/login-background.png"
                      className="w-100 h-100"
                      alt="Login now"
                    />
                  </div>
                  <div className="space-y-6 py-6 px-12 rounded-xl relative">
                    {/* <div className='flex'>
                                            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                                            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                                        </div> */}
                    <h1 className="text-2xl text-gray-700 font-semibold">
                      Welcome Back
                    </h1>
                    <div className="text-left mt-2 font-semibold text-gray-700">
                      Don't have an account ??
                      <Link href={"/register"}>
                        <a className="cursor-pointer ml-2 mr-2 text-blue-900">
                          Create an account
                        </a>
                      </Link>
                      Free
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
                      {useEmail && (
                        <>
                          <div className="-space-y-px rounded-md">
                            <div>
                              <label
                                htmlFor="email-address"
                                className="font-semibold"
                              >
                                Email Id
                              </label>
                              <label
                                onClick={useMobile}
                                className="float-right text-sm cursor-pointer"
                              >
                                Use Mobile
                              </label>
                              <input
                                onBlur={handleValidation}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                              />
                            </div>
                            <div className="mt-3 relative">
                              <label
                                htmlFor="password"
                                className="font-semibold"
                              >
                                Password
                              </label>
                              <input
                                onBlur={handleValidation}
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
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                value={"1"}
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Remember me
                              </label>
                            </div>
                            <div className="text-sm">
                              <Link href={`/account/forgot-password`}>
                                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                  Forgot your password?
                                </a>
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                      {!useEmail && (
                        <>
                          <div className="-space-y-px rounded-md">
                            <div className="relative">
                              <label
                                htmlFor="contact-no"
                                className="font-semibold"
                              >
                                Contact No
                              </label>
                              <label
                                onClick={useMobile}
                                className="float-right text-sm cursor-pointer"
                              >
                                Use Email
                              </label>
                              <input
                                onBlur={handleValidation}
                                id="contact-no"
                                name="contact"
                                type="contact"
                                autoComplete="contact"
                                required
                                className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Contact No"
                              />
                              <i
                                className={`z-10 absolute py-2 px-4 top-[38%] bg-indigo-400 cursor-pointer right-[2px] rounded text-white`}
                                onClick={startCounter}
                              >
                                SEND OTP
                              </i>
                            </div>
                            <div className="mt-3 relative">
                              <label
                                htmlFor="contact_otp"
                                className="font-semibold"
                              >
                                OTP
                              </label>
                              <input
                                disabled={true}
                                onBlur={handleValidation}
                                id="contact_otp"
                                name="contact_otp"
                                type="number"
                                autoComplete="contact_otp"
                                required
                                className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="OTP"
                              />
                              <i
                                className={`z-10 absolute py-2 px-4 top-[38%] bg-indigo-400 cursor-pointer right-[2px] rounded text-white`}
                                onClick={showPassword}
                              >
                                Wait {waitCounter}
                              </i>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                value={"1"}
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                              >
                                Remember me
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                      <div>
                        <button
                          onClick={submitForm}
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-100"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          Sign in
                        </button>
                      </div>
                    </form>

                    <div className="or-cls-class">
                      <span className="text-gray-600 bg-[#F2F2F2]">
                        OR Continue with
                      </span>
                    </div>
                    <div className="mt-3 max-w-[370px] bg-white px-3 py-2 text-sm rounded shadow-[inset_1px_1px_6px_0_rgba(0,0,0,0.3)]">
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
                    <div className="flex mt-2">
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

export default Login;
