import { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { getAPIUrl } from "../../lib/useLocalStorage";
import AccountLayout from "./AccountLayout";

const EditAccount: NextPage = () => {
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const headerProps = {
    pageTitle: "Edit user account",
    pageDescription: "hi Bidder Edit user account",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [formControls, setFormControls] = useState({
    name: "",
    email: "",
    contact: "",
    language: "",
    currency: "",
  });

  const changeHandler = (e: any) => {
    setFormControls({ ...formControls, [e.target.name]: e.target.value });
  };

  const getUserInfo = async () => {
    setIsLoading(true);
    const userInfo = await fetch(mainApiUrl + "user/get-user-info");
    const userJson = await userInfo.json();
    if (userInfo.ok) {
      if (userJson.status == "1") {
        if (!userJson.records.contact) {
          userJson.records.contact = "";
        }
        if (!userJson.records.language) {
          userJson.records.language = "";
        }
        if (!userJson.records.currency) {
          userJson.records.currency = "";
        }
        setFormControls({
          name: userJson.records.name,
          email: userJson.records.email,
          contact: userJson.records.contact,
          language: userJson.records.language,
          currency: userJson.records.currency,
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const saveUser = async () => {
    setIsLoading(true);
    const updateUser = await fetch(mainApiUrl + "user/get-user-info", {
      method: "POST",
      body: JSON.stringify(formControls),
      headers: { "Content-Type": "application/json" },
    });
    const updateRespo = await updateUser.json();
    if (updateUser.ok) {
      toast.success(updateRespo.message, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
    }
    setIsLoading(false);
  };

  return (
    <AccountLayout headerProps={headerProps}>
      <ToastContainer />
      <div className="container-fluid border-b border-[#D7D7D7]">
        <div className="row">
          <div className="flex flex-wrap">
            <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
              <p>Account</p>
            </div>
            <div className="w-1/2 h-[70px] text-right text-[#1E2A78] pt-[15px]">
              <button
                disabled={isLoading}
                type="button"
                className="cursor-pointer text-xl text-[#FFFFFF] bg-[#1E2A78] hover:bg-primary-color hover:text-white rounded-[6px] px-[35px] py-[5px] font-normal"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid relative">
        {isLoading && <CustomLoader></CustomLoader>}
        <div className="user-info py-8 max-w-[40%] md:max-w-full">
          <div className="relative">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              value={formControls.name}
              onChange={changeHandler}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div className="relative mt-4">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              value={formControls.email}
              onChange={changeHandler}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email"
            />
            <p className="w-full text-[13px] text-[400] text-gray-600 mt-1">
              We'll contact you via email with updates about your bids and
              transactions. Other users may also require your email address to
              complete their transaction with you.*
            </p>
          </div>
          {/* <div className='relative mt-3'>
                    <label htmlFor="password" className='font-semibold'>Password</label>
                    <input id="password" name="password" type="password" autoComplete="password" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                </div> */}
          <div className="relative mt-4">
            <label htmlFor="mobile_no" className="font-semibold">
              Mobile Number
            </label>
            <input
              value={formControls.contact}
              onChange={changeHandler}
              id="mobile_no"
              name="contact"
              type="number"
              autoComplete="mobile_no"
              required
              className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Mobile Number"
            />
            <p className="w-full text-[13px] text-[400] text-gray-600 mt-1">
              We'll contact you via contact with updates about your bids and
              transactions. Other users may also require your contact no to
              complete their transaction with you.*
            </p>
          </div>
          <div className="relative mt-4">
            <label htmlFor="language" className="font-semibold">
              Language
            </label>
            <input
              value={formControls.language}
              onChange={changeHandler}
              id="language"
              name="language"
              type="text"
              autoComplete="language"
              required
              className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Language"
            />
          </div>
          <div className="relative mt-4">
            <label htmlFor="currency" className="font-semibold">
              Bidding Currency
            </label>
            <input
              value={formControls.currency}
              onChange={changeHandler}
              id="currency"
              name="currency"
              type="text"
              autoComplete="currency"
              required
              className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Bidding Currency"
            />
          </div>
          <div className="mt-4 pt-2 text-right">
            <button
              disabled={isLoading}
              type="button"
              onClick={saveUser}
              className="cursor-pointer text-xl text-[#FFFFFF] bg-[#1E2A78] hover:bg-primary-color hover:text-white rounded-[6px] px-[35px] py-[5px] font-normal"
            >
              Save Account
            </button>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default EditAccount;
