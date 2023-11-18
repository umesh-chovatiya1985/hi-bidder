import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddPhoto from "../../../../../Admin/Components/Auctions/AddPhoto";
import SelCategory from "../../../../../Admin/Components/Auctions/SelCategory";
import AuctionSidebar from "../../../../../Admin/Components/Auctions/Sidebar";
import { Footer } from "../../../../../Components/Layout/Footer/Footer";
import { Header } from "../../../../../Components/Layout/Header/Header";
import CategoryMenu from "../../../../../Components/Reusable/CategoryMenu";
import { getAPIUrl } from "../../../../../lib/useLocalStorage";
import { useForm } from "react-hook-form";
import AuctionBasicInfo from "../../../../../Admin/Components/Auctions/AuctionBasicInfo";
import EstimatedValue from "../../../../../Admin/Components/Auctions/EstimatedValue";
import ShippingInfo from "../../../../../Admin/Components/Auctions/ShippingInfo";

interface basicInfo {
  title: string;
  shortDescription: string;
}

const CreateAuction: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<basicInfo>();

  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSelCategory, setIsSelCategory] = useState(false);

  const [stepNo, setStepNo] = useState(1);

  const getUserInfo = async () => {
    const userInfo = await fetch(mainApiUrl + "user/get-user-info");
    const userJson = await userInfo.json();
    if (userInfo.ok) {
      if (userJson.status == "1") {
        setUser(userJson.records);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    if (!session) {
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
    window.scrollTo(0, 0);
  }, [session, stepNo]);

  const changeStepNo = (count: any) => {
    console.log(count);
    setStepNo(count);
  };

  const changeStepBack = (count: any) => {
    console.log(count);
    // if (stepNo > count) {
    setStepNo(count);
    // }
  };

  const clickSelCategory = () => {
    setIsSelCategory(!isSelCategory);
  };

  return (
    session && (
      <div>
        <main>
          <Header headerProps={headerProps}></Header>
          <CategoryMenu />
          <section id="seller-details">
            <div className="container-fluid pt-5 px-5">
              <div className="row border-1 shadow rounded-[8px]">
                <div className="flex flex-wrap justify-between p-0">
                  <AuctionSidebar
                    clickEvent={changeStepBack}
                    currentIndex={stepNo}
                  ></AuctionSidebar>
                  <div className="w-3/4 pl-6">
                    <div className="p-[20px]">
                      {stepNo == 1 && user && (
                        <>
                          <div className="border-1 p-3 rounded">
                            <SelCategory
                              clickEvent={changeStepNo}
                            ></SelCategory>
                          </div>
                          <div className="button-s text-right mt-20">
                            <a className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">
                              Cancel
                            </a>
                            <button
                              onClick={() => changeStepNo(2)}
                              // type="submit"
                              className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal"
                            >
                              Save Daft & Continue
                            </button>
                          </div>
                        </>
                      )}
                      {stepNo == 2 && user && (
                        <AuctionBasicInfo
                          clickEvent={changeStepNo}
                        ></AuctionBasicInfo>
                      )}
                      {stepNo == 3 && user && (
                        <AddPhoto clickEvent={changeStepNo}></AddPhoto>
                      )}
                      {stepNo == 4 && (
                        <EstimatedValue
                          clickEvent={changeStepNo}
                        ></EstimatedValue>
                      )}
                      {stepNo == 5 && (
                        <ShippingInfo clickEvent={changeStepNo}></ShippingInfo>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer></Footer>
      </div>
    )
  );
};

export default CreateAuction;
