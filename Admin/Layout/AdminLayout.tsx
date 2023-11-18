import Head from "next/head";
import React from "react";
import { RouteGuard } from "../RouteGuard/RouteGuard";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: any) {
  return (
    <>
      <Head>
        <title>Hi bidder: Admin panel</title>
        <meta name="description" content="Hi bidder: Admin panel" />
      </Head>
      {/* <RouteGuard> */}
      <div className="bg-gray-100">
        <AdminHeader />
        <div className="mt-20 flex flex-row flex-wrap">
          <AdminSidebar />
          <div className="h-screen-81 bg-gray-100 flex-1 md:mt-16">
            {children}
          </div>
        </div>
      </div>
      {/* </RouteGuard> */}
    </>
  );
}
