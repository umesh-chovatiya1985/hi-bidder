import { NextPage } from 'next';
import AccountLayout from '../../../AccountLayout';
import { useState, useEffect } from 'react';
import CustomLoader from '../../../../../Admin/Components/CustomLoader';
import AuctionCard from '../../../../../Components/SellerComponents/AuctionCard';
import { getAPIUrl } from '../../../../../lib/useLocalStorage';

const FinisedAuction: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   const mainUrl: any = getAPIUrl() || process.env.API_URL;
   const [tabName, setTabName] = useState("All");
   const [productLoad, setProductLoad] = useState(false);

  const changeTab = (tabName: any) => {
    setTabName(tabName);
  };

    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [auctions, setAuctions] = useState(null);

   const getMyAuctions = async () => {
        setProductLoad(true);
        const urlRequest = await fetch(mainUrl+"auction/my-auction/finished?status="+tabName);
        const response = await urlRequest.json();
        if(urlRequest.ok){
            if(response.status == '1'){
                setAuctions(response.record);
            }
        }
        setProductLoad(false);
   }   
   useEffect(() => {
    getMyAuctions();
   },[tabName]);

   const processEvent = (response: any) => {
      setIsLoading(response);
      if(!response){
        getMyAuctions();
      }
   }

   const actionEvent = (response: any) => {
       setIsClicked(response);
   }

   return (
    <AccountLayout headerProps={headerProps}>
        {isLoading && <CustomLoader />}
        {isClicked && <div onClick={() => setIsClicked(false)} className="z-10 fixed rounded-lg grid top-0 bottom-0 left-0 right-0 text-center content-center" style={{backgroundColor: "rgba(240, 248, 255, 0)"}}></div>}
        <div>
            <ul className="flex flex-wrap border-b border-gray-200">
                <li className="mr-2">
                <a
                    onClick={() => changeTab("All")}
                    aria-current="page"
                    className={`inline-block ${
                    tabName == "All"
                        ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                        : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
                    } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
                >
                    Finished Auctions
                </a>
                </li>
                <li className="mr-2">
                <a
                    onClick={() => changeTab("Pay_pending")}
                    className={`inline-block ${
                    tabName == "Pay_pending"
                        ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                        : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
                    } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
                >
                    Pending for payment
                </a>
                </li>
                <li className="mr-2">
                <a
                    onClick={() => changeTab("Pay_rejected")}
                    className={`inline-block ${
                    tabName == "Pay_rejected"
                        ? "border-b-4 border-primary-color text-primary-color active hover:text-primary-color"
                        : "text-gray-600 hover:text-primary-color hover:bg-gray-50"
                    } py-3 px-8 text-sm font-medium text-center cursor-pointer`}
                >
                    Reject for payment
                </a>
                </li>
            </ul>
        </div>
        <div className='px-3'>
            {productLoad && <div className='pt-6 pb-6 mt-6 mb-6'>
                <CustomLoader classData="relative" bgColor="transparent" />
            </div>}
            {!productLoad && auctions && auctions.length > 0 ?
                (
                    <div className='mt-3'>
                        <div className="grid grid-cols-2 gap-3">
                            {auctions.map((auction: any, index: any) => (
                                <AuctionCard key={index} isClicked={isClicked} actionEvent={actionEvent} auction={auction} processEvent={processEvent}></AuctionCard>
                            ))}
                        </div>
                    </div>
                )
                :
                (
                    <div className='text-center mt-[120px]'>
                        <img src='/img/no-auction.jpeg' alt='No auction found!' />
                        <h3 className='py-4 text-xl text-[#990000]'>Opps! No products for auction available.</h3>
                        {/* <div className='text-center'>
                            <Link href={`/account/seller/auction/create`}>
                                <a className='btn btn-primary'><i className="fa fa-plus mr-2"></i> Add first product Now</a>
                            </Link>
                        </div> */}
                    </div>
                )
            }
        </div>
        </AccountLayout>
   );
}

export default FinisedAuction;