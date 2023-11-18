import { NextPage } from "next";
import { useState, useEffect } from "react";
import BiddingCard from "../../Components/Reusable/BiddingCard";
import AccountLayout from "./AccountLayout";
import { getAPIUrl } from "../../lib/useLocalStorage";
import LoadingSckeleton from "../../Components/Reusable/LoadingSkeleton";
import { useSession } from "next-auth/react";

const MyBids: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  const mainApiUrl = getAPIUrl() || process.env.API_URL;

  const [myBids, setMyBids] = useState([]);
  const [tabName, setTabName] = useState("active");
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const changeTab = (tabName: any) => {
    setTabName(tabName);
  };

  const getMyBids = async () => {
    if(session){
      setIsLoading(true);
      const bidReq = await fetch(mainApiUrl+"bidder/auction-bid/my-bids/"+tabName);
      if(bidReq.ok){
        const bidRespo = await bidReq.json();
        if(bidRespo.status == 1){
            bidRespo.record.forEach((element: any) => {
                const index = element.user.reverse().indexOf(session.user.id);
                const userAmount = element.user_amount.reverse()[index];
                element.user_amount = userAmount;
                element.user = session.user.id;
                setMyBids(myBids => [...myBids, element]);
            });
        }
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setMyBids([]);
    setIsLoading(true);
    setTimeout(() => {
      getMyBids();
    }, 1000);
  }, [tabName]);

  return (
    <AccountLayout headerProps={headerProps}>
      <div>
        <div>
          <ul className="flex flex-wrap border-b border-gray-200">
            <li className="mr-2">
              <a
                onClick={() => changeTab("active")}
                aria-current="page"
                className={`inline-block ${
                  tabName == "active"
                    ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                    : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
                } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
              >
                Active Bids
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => changeTab("win")}
                className={`inline-block ${
                  tabName == "win"
                    ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                    : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
                } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
              >
                Win Bids
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => changeTab("lost")}
                className={`inline-block ${
                  tabName == "lost"
                    ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                    : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
                } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
              >
                Lost Bids
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="my-order">
            <div className="container-fluid p-3">
              { isLoading &&
                [...Array(3)].map((e: any, i: any) => (
                  <div key={i}>
                    <div className="row m-0 mb-3 shadow-sm rounded">
                      <div className="flex flex-wrap justify-between border-1 bg-[#F2F2F2] rounded border-[#e5e5e5] p-3">
                        <div className="w-1/6">
                            <LoadingSckeleton
                            baseColor="#AAAAAA"
                            highlightColor="#FFFFFF"
                            count={1}
                            height="240px"
                            />
                        </div>
                        <div className="w-4/6">
                          <div className="mx-4">
                            <LoadingSckeleton
                              baseColor="#AAAAAA"
                              highlightColor="#FFFFFF"
                              count={2}
                              height="30px"
                              width="500px"
                              />
                            <LoadingSckeleton
                              baseColor="#AAAAAA"
                              highlightColor="#FFFFFF"
                              count={3}
                              height="30px"
                              width="550px"
                              />
                            <LoadingSckeleton
                              baseColor="#AAAAAA"
                              highlightColor="#FFFFFF"
                              count={2}
                              height="30px"
                              width="700px"
                              />
                          </div>
                        </div>
                        <div className="w-1/6">
                            <LoadingSckeleton
                            baseColor="#AAAAAA"
                            highlightColor="#FFFFFF"
                            count={1}
                            height="50px"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              {myBids.length > 0 && (
                myBids.map((data: any, index: any) => (
                    <BiddingCard key={index} data={data} activeTab={tabName}></BiddingCard>
                )))}
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default MyBids;
