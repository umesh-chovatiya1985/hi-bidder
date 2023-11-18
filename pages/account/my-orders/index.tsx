import { NextPage } from "next";
import OrderCard from "../../../Components/Reusable/OrderCard";
import AccountLayout from "../AccountLayout";
import { useState } from "react";

const MyOrders: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  const [tabName, setTabName] = useState("all");

  const changeTab = (tabName: any) => {
    setTabName(tabName);
  };
  return (
    <AccountLayout headerProps={headerProps}>
      <div>
        <ul className="flex flex-wrap border-b border-gray-200">
          <li className="mr-2">
            <a
              onClick={() => changeTab("all")}
              aria-current="page"
              className={`inline-block ${
                tabName == "all"
                  ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                  : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
              } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
            >
              All Orders
            </a>
          </li>
          <li className="mr-2">
            <a
              onClick={() => changeTab("pending")}
              className={`inline-block ${
                tabName == "pending"
                  ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                  : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
              } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
            >
              Pending Orders
            </a>
          </li>
          <li className="mr-2">
            <a
              onClick={() => changeTab("process")}
              className={`inline-block ${
                tabName == "process"
                  ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                  : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
              } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
            >
              Process Order
            </a>
          </li>
          <li className="mr-2">
            <a
              onClick={() => changeTab("delivered")}
              className={`inline-block ${
                tabName == "delivered"
                  ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                  : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
              } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
            >
              Delivered Orders
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="my-order shadow">
          <div className="container-fluid p-3">
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default MyOrders;
