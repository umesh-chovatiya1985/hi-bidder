import { NextPage } from 'next';
import { Header } from '../../../Components/Layout/Header/Header';
import CategoryMenu from '../../../Components/Reusable/CategoryMenu';
import { Footer } from '../../../Components/Layout/Footer/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { getAPIUrl } from '../../../lib/useLocalStorage';
import LoadingSckeleton from '../../../Components/Reusable/LoadingSkeleton';
import ProductListCard from '../../../Components/Reusable/ProductListCard';

const CartModule: NextPage = () => {
    const headerProps = {pageTitle: 'Hi Bidder : My Order cart',pageDescription: 'My Order cart'};
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [product, setProduct] = useState([]);
    const mainApiUrl = getAPIUrl() || process.env.API_URL;

    const getAuctionItem = async () => {
        if(session){
            setIsLoading(true);
            const bidReq = await fetch(mainApiUrl+"bidder/bid-winner");
            if(bidReq.ok){
              const bidRespo = await bidReq.json();
              if(bidRespo.status == 1){
                  setProduct(bidRespo.record);
              }
            }
            setIsLoading(false);
        }
    }

    useEffect(() => { 
        if(!session) {
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
            return;
        }    
        getAuctionItem();
    }, [session]);

   return (
       <div>
           <main>
               <Header headerProps={headerProps}></Header>
               <CategoryMenu />
               <ToastContainer />
                <div className="container px-8">
                    <div className="row">
                        <div className="flex flex-wrap">
                            <div className="w-1/2 text-[20px] text-[600] pt-[10px]">
                                <p>Auction Order Cart</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="flex flex-wrap">
                            <div className="w-1/2 text-[20px] text-[600] pt-[10px] pr-[30px]">
                                <p>Product Information</p>
                                { isLoading &&
                                    [...Array(3)].map((e: any, i: any) => (
                                    <div key={i} className='mt-[10px]'>
                                        <div className="row m-0 mb-3 shadow-sm rounded">
                                        <div className="flex flex-wrap justify-between border-1 bg-[#F2F2F2] rounded border-[#e5e5e5] p-3">
                                            <div className="w-1/6">
                                                <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="110px"
                                                />
                                            </div>
                                            <div className="w-4/6">
                                            <div className="mx-4">
                                                <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="20px"
                                                width="200px"
                                                />
                                                <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="20px"
                                                width="220px"
                                                />
                                                <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={2}
                                                height="20px"
                                                width="300px"
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
                                {product.length > 0 ? (
                                    product.map((data: any, index: any) => (
                                        <ProductListCard key={index} cardItem={data}></ProductListCard>
                                    ))) : (
                                        <div>
                                            No Product found!
                                        </div>
                                    )}
                            </div>
                            <div className="w-1/2 text-[20px] text-[600] pt-[10px]">
                                <p>Shipping Information</p>
                            </div>
                        </div>
                    </div>
                </div>
           </main>
           <Footer></Footer>
       </div>
   );
}

export default CartModule;