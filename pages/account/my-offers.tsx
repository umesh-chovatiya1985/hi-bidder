import { NextPage } from "next";
import AccountLayout from "./AccountLayout";
import { useEffect, useState } from "react";
import { getAPIUrl } from "../../lib/useLocalStorage";
import { useSession } from "next-auth/react";
import ProductCard from "../../Components/LoginSlider/ProductCard";
import LoadingSckeleton from "../../Components/Reusable/LoadingSkeleton";

const MyOffers: NextPage = () => {
  const headerProps = {
    pageTitle: "Hi Bidder : Category details page",
    pageDescription: "hi Bidder Category details page",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [myOffers, setMyOffers] = useState<any>([]);
  const mainApiUrl = getAPIUrl() || process.env.API_URL;
  const { data: session } = useSession();

  const getOffers = async () => {
    if(session){
      setIsLoading(true);
      const bidReq = await fetch(mainApiUrl+"/buyer-invitation/send-invitation");
      if(bidReq.ok){
        const bidRespo = await bidReq.json();
        if(bidRespo.status == 1){
            console.log(bidRespo.record);
            setMyOffers(bidRespo.record);
        }
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
        getOffers();
    }, 1000);
  }, []);

  return (
    <AccountLayout headerProps={headerProps}>
      <div className="p-3">
          { isLoading &&
            [...Array(5)].map((e: any, i: any) => (
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
        {myOffers && (
          myOffers.map((offer: any, index: any) => (
            <div key={index} className="mb-3">
                <ProductCard auction={offer.product} biddetail={offer} />
            </div>
          ))
        )}
      </div>
    </AccountLayout>
  );
};

export default MyOffers;
