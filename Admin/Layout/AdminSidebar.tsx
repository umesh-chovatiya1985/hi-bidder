import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function AdminSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <div
        id="sideBar"
        className="h-screen-81 relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster"
      >
        <div className="flex flex-col">
          <div className="text-right hidden md:block mb-2">
            <button id="sideBarHideBtn">
              <i className="fa fa-chart-pie text-xs mr-2"></i>
            </button>
          </div>
          <p className="uppercase text-gray-600 font-semibold mb-2 tracking-wider">
            Admin
          </p>
          <Link href={"/e-auction-admin"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-th mr-2"></i>
              Dashboard
            </a>
          </Link>
          <Link href={"/e-auction-admin/users"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-users mr-2"></i>
              Users
            </a>
          </Link>
          <p className="uppercase text-gray-600 font-semibold mb-2 tracking-wider">
            Users
          </p>
          <Link href={"/e-auction-admin/users/view/sellers"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-paw mr-2"></i>
              Sellers
            </a>
          </Link>
          <Link href={"/e-auction-admin/users/view/bidders"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-users mr-2"></i>
              Bidders
            </a>
          </Link>
          <p className="uppercase text-gray-600 font-semibold mb-2 tracking-wider">
            Pages
          </p>
          <Link href={"/e-auction-admin/categories"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-tasks mr-2"></i>
              Categories
            </a>
          </Link>
          <Link href={"/e-auction-admin/auctions"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-tasks mr-2"></i>
              Auctions
            </a>
          </Link>
          <Link href={"/e-auction-admin/departments"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-users mr-2"></i>
              Departments
            </a>
          </Link>
          <Link href={"/e-auction-admin/roles"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-user mr-2"></i>
              Roles
            </a>
          </Link>
          <Link href={"/e-auction-admin/content-pages"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-file mr-2"></i>
              Content Pages
            </a>
          </Link>
          {/* <Link href={"/e-auction-admin/locations"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-map mr-2"></i>
              Locations
            </a>
          </Link>
          <Link href={"/e-auction-admin/subscriptions"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-money mr-2"></i>
              Subscriptions
            </a>
          </Link> */}
          {/* <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">UI Elements</p> */}
          {/* <Link href={"/e-auction-admin/shipping"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-truck mr-2"></i>
              Shipping
            </a>
          </Link>
          <Link href={"/e-auction-admin/reports"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-folder-open mr-2"></i>
              Report
            </a>
          </Link> */}
          <p className="uppercase text-gray-600 font-semibold mb-2 tracking-wider">
            Helps
          </p>
          <Link href={"/e-auction-admin/help-topics"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-th mr-2"></i>
              Help Topic
            </a>
          </Link>
          <Link href={"/e-auction-admin/help-category"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-th mr-2"></i>
              Help Category
            </a>
          </Link>
          <Link href={"/e-auction-admin/help-lists"}>
            <a className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
              <i className="fa fa-list mr-2"></i>
              Help Listing
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
