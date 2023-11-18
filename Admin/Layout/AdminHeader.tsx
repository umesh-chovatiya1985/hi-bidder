import Link from "next/link";
import React, { useState } from "react";

export default function AdminHeader() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const openProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const processLogout = () => {
    console.log("Logout in progress");
  };

  return (
    <>
      <div className="fixed w-full top-0 z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300">
        <div className="flex-none w-56 flex flex-row items-center">
          <img src="/img/logo.png" className="w-10 flex-none" alt="cleopatra" />
          <strong className="capitalize ml-1 flex-1">cleopatra</strong>
          <button
            id="sliderBtn"
            className="flex-none text-right text-gray-900 hidden md:block"
          >
            <i className="fa fa-list"></i>
          </button>
        </div>
        {/* <button id="navbarToggle" className="hidden md:block md:fixed right-0 mr-6">
          <i className="fa fa-chevron-double-down"></i>
        </button> */}
        <div
          id="navbar"
          className="animated md:hidden md:fixed md:top-0 md:w-full md:left-0 md:border-t md:border-b md:border-gray-200 md:p-10 md:bg-white flex-1 pl-3 flex flex-row flex-wrap justify-between items-center md:flex-col md:items-center"
        >
          <div className="text-gray-600 md:w-full md:flex md:flex-row md:justify-evenly md:pb-10 md:mb-10 md:border-b md:border-gray-200"></div>
          <div className="flex flex-row-reverse items-center">
            <div className="dropdown relative md:static">
              <button
                className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center"
                onClickCapture={openProfileDropdown}
              >
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src="/img/user.svg"
                    alt=""
                  />
                </div>
                <div className="ml-2 capitalize flex ">
                  <h1 className="text-sm text-gray-800 font-semibold m-0 p-0 leading-none">
                    Aeliya Marine Tech
                  </h1>
                  <i className="fa fa-chevron-down ml-2 text-xs leading-none"></i>
                </div>
              </button>

              <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>
              <div
                className={`${
                  profileDropdown ? "" : "hidden"
                } fixed bg-[#00000014] z-10 top-0 left-0 bottom-0 right-0`}
                onClickCapture={() => setProfileDropdown(false)}
              ></div>
              <div
                className={`${
                  profileDropdown ? "" : "hidden"
                } text-gray-500 menu md:mt-10 md:w-full rounded bg-white shadow-md absolute z-20 right-0 w-40 mt-4 border-1 pt-2 animated faster`}
              >
                <Link href={`/e-auction-admin/my-profile`}>
                  <a className="px-2 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    <i className="fa fa-user-edit text-xs mr-1"></i>
                    My Profile
                  </a>
                </Link>
                <Link href={`/e-auction-admin/my-messages`}>
                  <a className="px-2 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    <i className="fa fa-inbox-in text-xs mr-1"></i>
                    Message Box
                  </a>
                </Link>
                <Link href={`/e-auction-admin/change-password`}>
                  <a className="px-2 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    <i className="fa fa-badge-check text-xs mr-1"></i>
                    Change Password
                  </a>
                </Link>
                <Link href={`/e-auction-admin/settings`}>
                  <a className="px-2 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out">
                    <i className="fa fa-comment-alt-dots text-xs mr-1"></i>
                    Settings
                  </a>
                </Link>
                <hr className="mt-2" />
                <button
                  onClick={processLogout}
                  className="w-full px-4 py-2 rounded block bg-[#ffc8c8] capitalize font-medium text-sm tracking-wide hover:bg-gray-200 hover:text-gray-900 text-gray-600 transition-all duration-300 ease-in-out"
                >
                  <i className="fa fa-user-times text-xs mr-1"></i>
                  log out
                </button>
              </div>
            </div>

            <div className="dropdown relative mr-7 md:static">
              <Link href="/e-auction-admin/notification">
                <button className="relative text-gray-600 menu-btn p-0 m-0 hover:text-gray-900 focus:text-gray-900 focus:outline-none transition-all ease-in-out duration-300">
                  <i className="fa fa-bell text-2xl"></i>
                  <strong
                    style={{ right: "-6px", top: "-6px" }}
                    className="absolute text-white text-xs bg-[#b92828b3] rounded-full h-5 w-5 border-1"
                  >
                    5
                  </strong>
                </button>
              </Link>
              <Link href="/e-auction-admin/notification">
                <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
