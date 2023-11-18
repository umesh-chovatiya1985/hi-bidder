import { NextPage } from "next";
import AdminLayout from "../../../Admin/Layout/AdminLayout";

const MyMessages: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  return (
    <AdminLayout>
      <main>My Profile is working</main>
    </AdminLayout>
  );
};

export default MyMessages;
