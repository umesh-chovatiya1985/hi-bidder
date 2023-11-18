import { NextPage } from "next";
import AdminLayout from "../../../Admin/Layout/AdminLayout";

const SiteSettings: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  return <AdminLayout></AdminLayout>;
};

export default SiteSettings;
