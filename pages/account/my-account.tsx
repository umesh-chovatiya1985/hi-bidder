import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSckeleton from "../../Components/Reusable/LoadingSkeleton";
import { getAPIUrl } from "../../lib/useLocalStorage";
import AccountLayout from "./AccountLayout";

const myAccount: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : My account",
    pageDescription: "Hi Bidder : My account",
  };
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const [user, setUser] = useState(null);
  const userData = async () => {
    const dataRecord = await fetch(mainApiUrl + "user/get-user-info");
    const userJson = await dataRecord.json();
    setUser(userJson.records);
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <AccountLayout headerProps={headerProps}>
      <div className="container-fluid px-8 border-b-2 border-[#D7D7D7]">
        <div className="row">
          <div className="flex flex-wrap">
            <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
              <p>Account</p>
            </div>
            <div className="w-1/2 h-[70px] text-right text-[20px] text-[500] text-[#1E2A78] pt-[18px]">
              <Link href={"/account/edit-account"}>Edit Account</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="user-info">
        <div className="px-8 pt-8">
          <p className="text-[#808089] text-[18px] text-[400]">Name</p>
          <p className="text-[22px] text-[#3A3A3A] text-[500]">
            {user ? (
              <span>{user.name}</span>
            ) : (
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="30px"
                width="250px"
              />
            )}
          </p>
        </div>
        <div className="px-8 pt-8">
          <p className="text-[#808089] text-[18px] text-[400]">User Name</p>
          <p className="text-[22px] text-[#3A3A3A] text-[500]">
            user-057bad6384dc
          </p>
        </div>
        <div className="px-8 pt-8">
          <p className="text-[#808089] text-[18px] text-[400]">Email</p>
          <p className="text-[22px] text-[#3A3A3A] text-[500]">
            {user ? (
              <span>{user.email}</span>
            ) : (
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="30px"
                width="250px"
              />
            )}
          </p>
        </div>
        <div className="px-8 pt-8">
          <p className="text-[#808089] text-[18px] text-[400]">Mobile Number</p>
          <p className="text-[22px] text-[#3A3A3A] text-[500]">
            {user ? (
              typeof user.contact != "undefined" ? (
                <span>{`+91` + user.contact}</span>
              ) : (
                <span>Not provided</span>
              )
            ) : (
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="30px"
                width="250px"
              />
            )}
          </p>
        </div>
        <div className="px-8 pt-8">
          <p className="text-[#808089] text-[18px] text-[400]">Language</p>
          <p className="text-[22px] text-[#3A3A3A] text-[500]">
            {user ? (
              typeof user.language != "undefined" ? (
                <span>{user.language}</span>
              ) : (
                <span> English (en)</span>
              )
            ) : (
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="30px"
                width="250px"
              />
            )}
          </p>
        </div>
        <div className="p-8">
          <p className="text-[#808089] text-[18px] text-[400]">
            Bidding Currency
          </p>
          <p className="text-[22px] text-[#3A3A3A] text-[500]">
            {user ? (
              typeof user.currency != "undefined" ? (
                <span>{user.currency}</span>
              ) : (
                <span> INR ( ₹ ) </span>
              )
            ) : (
              <LoadingSckeleton
                baseColor="#AAAAAA"
                highlightColor="#FFFFFF"
                count={1}
                height="30px"
                width="250px"
              />
            )}
          </p>
        </div>
      </div>
    </AccountLayout>
  );
};

export default myAccount;
