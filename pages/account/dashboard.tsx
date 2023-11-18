import { NextPage } from "next";
import AccountLayout from "./AccountLayout";

const Dashboard: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  return (
    <AccountLayout headerProps={headerProps}>
      <div className="p-4">
        <h1>Dashboard</h1>
      </div>
    </AccountLayout>
  );
};

export default Dashboard;
