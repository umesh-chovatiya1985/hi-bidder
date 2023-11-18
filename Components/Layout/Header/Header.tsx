import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import AutoSearch from "../../Reusable/AutoSearch";
import { useTranslation } from "react-i18next";

export const Header = ({ headerProps }: any) => {
  const { t } = useTranslation();

  const [isLoginOpen, SetisLoginOpen] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const openDrawer = () => {
    if (!isLoginOpen) {
      SetisLoginOpen(true);
    }
  };

  const closeDrawerBar = () => {
    SetisLoginOpen(false);
  };

  const logOut = () => {
    signOut({ redirect: false });
    setIsPopup(false);
    router.push("/");
  };

  const User = (session: any) => {
    return (
      <>
        {/* <h2>User already Login</h2>
                <p>{session.user.name}</p>
                <button onClick={logOut} className="cursor-pointer">Logout</button> */}
        <div className="login hide flex flex-row-reverse h-[100%]">
          <div className="relative self-center pt-[10px] mr-8">
            {/* <Link href={'/account/my-account'}> */}
            <a
              onClick={() => setIsPopup(!isPopup)}
              className="z-50 text-decoration-none block padding cursor-pointer"
            >
              <img
                className="w-8 h-8 rounded-full mr-3"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://flowbite.com/docs/images/people/profile-picture-3.jpg";
                }}
                src={session.user.image}
                alt={session.user.name}
              />
              {session.user.name}
            </a>
            {/* </Link> */}
            <div
              className={`z-50 ${
                isPopup ? "shown" : "hidden"
              } absolute bg-white rounded top-17 right-0 min-w-full divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="py-3 px-4 text-sm text-white bg-gradient-to-r from-[#1E2A78] to-[#008EBB]">
                <div>{session.user.name}</div>
                <div className="font-medium truncate">{session.user.email}</div>
              </div>
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <Link href={"/account/dashboard"}>
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/account/my-account"}>
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      My Account
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/account/change-password"}>
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Change Password
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/account/my-orders"}>
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      My Orders
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/account/my-bids"}>
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      My Bids
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/account/my-account"}>
                    <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Settings
                    </a>
                  </Link>
                </li>
              </ul>
              <div>
                <button
                  onClick={logOut}
                  className="block w-full text-white bg-gradient-to-r from-[#1E2A78] to-[#008EBB] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-5 py-2.5 text-center"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          <Link href={"/become-a-seller"}>
            <a className="text-decoration-none self-center mr-4 mt-[10px]">
              Become a Seller
            </a>
          </Link>
        </div>
      </>
    );
  };

  const Guest = () => {
    return (
      <>
        <div className="login hide flex flex-row-reverse h-[100%] pt-[13px] mr-8">
          <Link href={"/register"}>
            <a className="self-center text-decoration-none padding">Sign Up</a>
          </Link>
          <Link href={"/login"}>
            <a className="self-center text-decoration-none padding cursor-pointer">
              Sign In
            </a>
          </Link>
          <Link href={"/become-a-seller"}>
            <a className="self-center text-decoration-none mr-3">
              Become a Seller
            </a>
          </Link>
        </div>
        <div className="m-login hide">
          <a href="#" className="text-decoration-none">
            Become a Seller
          </a>
          <a href="#" className="text-decoration-none padding1">
            <i className="fa fa-search"></i>
          </a>
          <a href="#" className="text-decoration-none padding1">
            <i className="fa fa-user-circle-o"></i>
          </a>
        </div>
      </>
    );
  };

  const headInfo = headerProps ?? {
    pageTitle: "Hi bidder pages",
    pageDescription: "Hi Bidder descriptions",
  };

  return (
    <>
      <Head>
        <title>{headInfo.pageTitle}</title>
        <meta name="description" content={headInfo.pageDescription} />
      </Head>
      {/* <LoginSlider drawerStatus={isLoginOpen} closeDrawerBar={closeDrawerBar}></LoginSlider> */}
      {/* <PopupModel drawerStatus={isLoginOpen} closeDrawerBar={closeDrawerBar}></PopupModel> */}
      <div
        onClick={() => setIsPopup(!isPopup)}
        className={`${
          isPopup ? "shown" : "hidden"
        } bg-[#00000022] fixed top-0 left-0 h-screen w-full z-30`}
      ></div>
      <section id="header">
        <div className="top-bar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-sm-6 hide">
                <div className="social-icons pl-4 py-2">
                  <span className="inline mr-1 font-semibold">Follow Us :</span>
                  <ul className="inline space-y-4">
                    <li className="inline mr-1">
                      <a
                        href=""
                        className="shadow-1 bg-[#4267B2] px-[7px] py-[6px] rounded-full hover:bg-primary-color"
                      >
                        <i className="fa text-white fa-facebook"></i>
                      </a>
                    </li>
                    <li className="inline mr-1">
                      <a
                        href=""
                        className="bg-[#833AB4] text-white px-[5px] py-[6px] rounded-full hover:bg-primary-color"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="inline mr-1">
                      <a
                        href=""
                        className="bg-[#0A66C2] px-[5px] py-[6px] rounded-full hover:bg-primary-color"
                      >
                        <i className="fa text-white fa-linkedin"></i>
                      </a>
                    </li>
                    <li className="inline mr-1">
                      <a
                        href=""
                        className="bg-[#FF0000] px-[4px] py-[6px] rounded-full hover:bg-primary-color"
                      >
                        <i className="fa text-white fa-youtube-play"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="d-flex justify-content-end align-items-center language-select-root h-full mr-4">
                  <div className="ml-2 mr-3">
                    <Link href={`/about-us`}>
                      <a className="text-gray-600">{t("About")}</a>
                    </Link>
                  </div>
                  <div className="ml-2 mr-3">
                    <Link href={`/account/my-account`}>
                      <a className="text-gray-600">My Account</a>
                    </Link>
                  </div>
                  <div className="ml-2 mr-3">
                    <Link href={`/help/help-and-support`}>
                      <a className="text-gray-600">Help & Supports</a>
                    </Link>
                  </div>
                  <div className="ml-2 mr-3">
                    <Link href={`/contact-us`}>
                      <a className="text-gray-600">Contact Us</a>
                    </Link>
                  </div>
                  <div className="ml-3 mr-4 relative">
                    {/* <LanguageSelect></LanguageSelect> */}
                    <Link href={`/language-change`}>
                      <a>
                        English <i className="fa fa-chevron-down"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lsl">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 col-sm-3">
                <div className="logo">
                  <Link href={"/"}>
                    <a className="text-decoration-none">
                      <span>Hi! Bider:)</span>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 hide">
                <AutoSearch />
              </div>
              <div className="col-md-5 col-sm-5">
                {session ? User(session) : Guest()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
