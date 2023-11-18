import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function AccountSideBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUrl = router.asPath.split("/");
  const path = currentUrl[currentUrl.length - 1];
  const subPath = currentUrl[currentUrl.length - 2];

  const logOut = () => {
    signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="sticky top-6">
      <ul className="border-slid shadow border-1 border-[#D7D7D7] rounded-[6px] text-[20px] font-[500] text-[#3A3A3A]">
        <li className="p-[10px]">
          <div className="text-center rounded-[6px] py-[28px] bg-gradient-to-r from-[#1E2A78] to-[#008EBB]">
            <img
              className="w-12 h-12 rounded-full border-3 border-white mb-3"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://flowbite.com/docs/images/people/profile-picture-3.jpg";
              }}
              src={session.user.image}
              alt={session.user.name}
            />
            <p className="text-[24px] text-[600] text-[#FFFFFF]">
              {session.user.name}
            </p>
            <p className="text-[18px] text-[400] text-[#FFFFFF]">
              Last Login March 12th, 2021
            </p>
          </div>
        </li>
        <li className="m-[2px]">
          <div
            className={`hover:border-r-4 hover:border-anchor-blue p-[8px] ${
              ["my-account", "edit-account"].includes(path)
                ? "border-r-4 bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/my-account"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["my-account", "edit-account"].includes(path)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-1.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Account
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px]">
          <div
            className={`hover:border-r-4 hover:border-anchor-blue p-[8px] ${
              ["my-address", "add-address"].includes(path)
                ? "border-r-4 bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/my-address"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["my-address", "add-address"].includes(path)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-2.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Addresses
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px]">
          <div
            className={`hover:border-r-4 hover:border-anchor-blue p-[8px] ${
              ["payment", "add-payment"].includes(path)
                ? "border-r-4 bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/payment"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["payment", "add-payment"].includes(path)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-3.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Payment
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px]">
          <div
            className={`hover:border-r-4 hover:border-anchor-blue p-[8px] ${
              ["notifications"].includes(path)
                ? "border-r-4 bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/notifications"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["notifications"].includes(path) ? "text-anchor-blue" : ""
                }`}
              >
                <img
                  src="/img/icon-4.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Email & Notifications
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px]">
          <div
            className={`hover:border-r-4 hover:border-anchor-blue p-[8px] ${
              ["verification"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/verification"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["verification"].includes(path) ? "text-anchor-blue" : ""
                }`}
              >
                <img
                  src="/img/icon-5.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Verification
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px] hover:text-[#1E2A78]">
          <div
            className={`hover:border-r-4 hover:border-[#1E2A78] p-[8px] ${
              ["my-bids"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/my-bids"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["my-bids"].includes(path) ? "text-anchor-blue" : ""
                }`}
              >
                <img
                  src="/img/icon-6.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />
                My Bid
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px] hover:text-[#1E2A78] pb-2">
          <div
            className={`hover:border-r-4 hover:border-[#1E2A78] p-[8px] ${
              ["my-orders"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/my-orders"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["my-orders"].includes(path) ||
                  ["my-orders"].includes(subPath)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-7.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                My Order
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px] hover:text-[#1E2A78] pb-2">
          <div
            className={`hover:border-r-4 hover:border-[#1E2A78] p-[8px] ${
              ["my-offers"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/my-offers"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["my-offers"].includes(path) ||
                  ["my-offers"].includes(subPath)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-7.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                My Offers
              </a>
            </Link>
          </div>
        </li>
        <li className="border-1 border-gray-400 rounded bg-gray-200">
          <h2 className="px-4 py-2">Seller Menu</h2>
        </li>
        <li className="m-[2px] hover:text-[#1E2A78]">
          <div
            className={`hover:border-r-4 hover:border-[#1E2A78] p-[8px] ${
              ["become-a-seller"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/become-a-seller"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["become-a-seller"].includes(path) ||
                  ["become-a-seller"].includes(subPath)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-7.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Manage Seller Profile
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px] hover:text-[#1E2A78]">
          <div
            className={`hover:border-r-4 hover:border-[#1E2A78] p-[8px] ${
              ["manage-auction"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/seller/manage-auction"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["manage-auction"].includes(path) ||
                  ["manage-auction"].includes(subPath)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-7.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                My Auctions
              </a>
            </Link>
          </div>
        </li>
        <li className="m-[2px] hover:text-[#1E2A78]">
          <div
            className={`hover:border-r-4 hover:border-[#1E2A78] p-[8px] ${
              ["finished-auction"].includes(path)
                ? "border-r-4  bg-blue-100 border-anchor-blue"
                : ""
            }`}
          >
            <Link href={"/account/seller/auction/finished-auction"}>
              <a
                className={`block hover:text-anchor-blue ${
                  ["finished-auction"].includes(path) ||
                  ["finished-auction"].includes(subPath)
                    ? "text-anchor-blue"
                    : ""
                }`}
              >
                <img
                  src="/img/icon-7.svg"
                  className="text-center w-[60px] h-[30px] text-[15px] px-[15px] float-left"
                  alt="Account"
                />{" "}
                Finished Auction
              </a>
            </Link>
          </div>
        </li>
      </ul>
      <Link href={"/account/delete"}>
        <a className="pl-2 block font-semibold text-[18px] text-[400] text-[#FF5555] pt-[20px] pb-[10px] text-[#808089] hover:text-[#FF5555]">
          <i className="fa fa-trash mr-1"></i> Delete Account
        </a>
      </Link>
      {/* <Link href={'/account/logout'}> */}
      <button
        onClick={logOut}
        className="pl-2 font-semibold text-[#808089] hover:text-primary"
      >
        <i className="fa fa-sign-out mr-2"></i>
        LOGOUT
      </button>
      {/* </Link> */}
    </div>
  );
}
