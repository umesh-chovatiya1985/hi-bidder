import { NextPage } from 'next';
import Link from 'next/link';
import { getAPIUrl } from '../../../lib/useLocalStorage';
import AccountLayout from '../AccountLayout';
import { useEffect, useState } from 'react';
import AuctionCard from '../../../Components/SellerComponents/AuctionCard';
import CustomLoader from '../../../Admin/Components/CustomLoader';

const ManageAuction: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   const mainUrl: any = getAPIUrl() || process.env.API_URL;
   const [auctions, setAuctions] = useState(null);
   const [tabCounter, setTabCounter] = useState({
     'All': 0,
     'Draft': 0,
     'Publish': 0,
     'Scheduled': 0,
     'Unpublish': 0,
     'Block': 0
   })
   const [isLoading, setIsLoading] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [tabName, setTabName] = useState("All");
   const [productLoad, setProductLoad] = useState(false);

   const getMyAuctions = async () => {
        setProductLoad(true);
        const urlRequest = await fetch(mainUrl+"auction/my-auction/view?status="+tabName);
        const response = await urlRequest.json();
        if(urlRequest.ok){
            if(response.status == '1'){
                setAuctions(response.record);
                if(response.status_counter){
                    setTabCounter(response.status_counter);
                }
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
        <AccountLayout>
            {isLoading && <CustomLoader />}
            {isClicked && <div onClick={() => setIsClicked(false)} className="z-10 fixed rounded-lg grid top-0 bottom-0 left-0 right-0 text-center content-center" style={{backgroundColor: "rgba(240, 248, 255, 0)"}}></div>}
            <div className='p-3'>    
                <div className="flex bg-gray-100 rounded border border-gray-600">
                    <ul className="flex flex-1 flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="mr-2">
                            <a onClick={() => setTabName('All')} className={`cursor-pointer inline-flex p-3 border-b-2 rounded-t-lg group ${tabName == 'All' ? " text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : " border-transparent hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-500"}`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${tabName == 'All' ? " text-blue-600 dark:text-blue-500 " : " text-gray-600 dark:text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                All ( {tabCounter.All} )
                            </a>
                        </li>
                        <li className="mr-2">
                        <a onClick={() => setTabName('Draft')} className={`cursor-pointer inline-flex p-3 border-b-2 rounded-t-lg group ${tabName == 'Draft' ? " text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : " border-transparent hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-500"}`}>
                                Draft ( {tabCounter.Draft} )
                            </a>
                        </li>
                        <li className="mr-2">
                            <a onClick={() => setTabName('Publish')} className={`cursor-pointer inline-flex p-3 border-b-2 rounded-t-lg group ${tabName == 'Publish' ? " text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : " border-transparent hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-500"}`}>
                                Publish ( {tabCounter.Publish} )
                            </a>
                        </li>
                        <li className="mr-2">
                            <a onClick={() => setTabName('Scheduled')} className={`cursor-pointer inline-flex p-3 border-b-2 rounded-t-lg group ${tabName == 'Scheduled' ? " text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : " border-transparent hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-500"}`}>
                                Scheduled ( {tabCounter.Scheduled} )
                            </a>
                        </li>
                        <li className="mr-2">
                        <a onClick={() => setTabName('Unpublish')} className={`cursor-pointer inline-flex p-3 border-b-2 rounded-t-lg group ${tabName == 'Unpublish' ? " text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : " border-transparent hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-500"}`}>
                                Unpublish ( {tabCounter.Unpublish} )
                            </a>
                        </li>
                        <li className="mr-2">
                            <a onClick={() => setTabName('Block')} className={`cursor-pointer inline-flex p-3 border-b-2 rounded-t-lg group ${tabName == 'Block' ? " text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : " border-transparent hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-500"}`}>
                                Block ( {tabCounter.Block} )
                            </a>
                        </li>
                    </ul>
                    <Link href={`/account/seller/auction/create`}>
                        <a className='btn btn-primary m-2'>
                            <i className="fa fa-plus mr-2"></i>
                            Add New Product
                        </a>
                    </Link>
                </div>
                {productLoad && <div className='pt-6 pb-6 mt-6 mb-6'>
                    <CustomLoader classData="relative" bgColor="transparent" />
                </div>}
                {!productLoad && auctions && auctions.length > 0 ?
                    (<div className='mt-3'>
                        <div className="grid grid-cols-2 gap-3">
                            {auctions.map((auction: any, index: any) => (
                                <AuctionCard key={index} isClicked={isClicked} actionEvent={actionEvent} auction={auction} processEvent={processEvent}></AuctionCard>
                            ))}
                        </div>
                    </div>)
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

export default ManageAuction;