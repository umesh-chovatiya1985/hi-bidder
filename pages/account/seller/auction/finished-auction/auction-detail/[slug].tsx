import { NextPage } from 'next';
import AccountLayout from '../../../../AccountLayout';
import { getAPIUrl } from '../../../../../../lib/useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import dateFormat from 'dateformat';
import ThumbSlider from '../../../../../../Components/LoginSlider/ThumbSlider';
import Link from 'next/link';
import LoadingSckeleton from '../../../../../../Components/Reusable/LoadingSkeleton';
import { ToastContainer, toast } from 'react-toastify';

const BidAuctionDetails: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const router = useRouter();
    const { slug } = router.query;

    const [product, setProduct] = useState(null);
    const [photoList, setphotoList] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [bidLoading, setBidLoading] = useState(false);
    const [maxBid, setMaxBid] = useState("0");
    const [totalBid, setTotalBid] = useState(0);
    const [bidList, setBidList] = useState([]);
    const [bidUList, setBidUList] = useState([]);

   const getProductInfo = async () => {
        const productReq = await fetch(mainApiUrl+"auction/slug/" + slug);
        const proJson = await productReq.json();
        if(productReq.ok){
            console.log(proJson.record);
            setProduct(proJson.record);
            setphotoList(proJson?.record.photos_ids);
            setIsExpired(proJson.isActive);
            getLatestBids();
            getUniqueLatestBids(proJson.record._id);
        }
    }

    const getLatestBids = async () => {
        setBidLoading(true);
        const bidReq = await fetch(mainApiUrl+"auction-bid/"+slug+"?per_page=5");
        if(bidReq.ok){
            const bidRespo = await bidReq.json();
            if(bidRespo.status == 1){
                setTotalBid(parseInt(bidRespo.total));
                setMaxBid(bidRespo.max_bid);
                if(bidRespo.record.length > 0){
                    setBidList([]);
                    bidRespo.record.forEach((element: any) => {
                        const bidData = {
                            _id: element._id,
                            product: element.product.slug,
                            createdAt: element.createdAt,
                            name: element.user.name,
                            bid_amount: element.bid_amount,
                            max_bid: element.max_bid,
                            total_bids: element.total_bids,
                            user_id: element.user._id
                        };
                        // bidList.push(bidData);
                        setBidList(bidList => [...bidList, bidData]);      
                    });                  
                    // setBidList(bidList);              
                }
            }
        }
        setBidLoading(false);
    }

    const getUniqueLatestBids = async (product_id: any) => {
        setBidLoading(true);
        const bidReq = await fetch(mainApiUrl+"auction/my-auction/unique-bids/"+product_id);
        if(bidReq.ok){
            const bidURespo = await bidReq.json();
            if(bidURespo.status == 1){
                if(bidURespo.record.length > 0){
                    setBidUList(bidURespo.record);
                }
            }
        }
        setBidLoading(false);
    }

    const inviteUser = async (user: any, amount: any) => {
        setBidLoading(true);
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 3);
        const data = {
            "product": product._id,
            "buyer": user,
            "bidAmount": amount,
            "status": "Pending",
            "validTill": currentDate
        }
        const bidReq = await fetch(mainApiUrl+"buyer-invitation/send-invitation", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        if(bidReq.ok){
            const bidURespo = await bidReq.json();
            if(bidURespo.status == 1){
                toast.success(bidURespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
        }
        setBidLoading(false);
    }

    useEffect((): any => {
        if(slug){
            getProductInfo();
        }
    },[slug]);

    return (
            <AccountLayout headerProps={headerProps}>
                <ToastContainer />
                <div className="container-fluid px-0">
                    <div className="row m-0">
                        <div className="col-md-6 pt-3 pb-2">
                            {photoList && <ThumbSlider photoList={photoList}></ThumbSlider>}
                            <div className='border-bottom mt-3 mb-3'></div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Category</div>
                                    {product && <div>
                                        <ul>
                                            <li className='inline text-[#909090] mr-2'>
                                                <Link href={'/category/'+product.category_id.slug}>
                                                    {product.category_id.title}
                                                </Link>
                                            </li>
                                            {product.categories_ids.map((category: any) => (
                                                <li  className='inline mr-2 text-[#909090]' key={category.title}>
                                                     <i className="fa fa-arrow-right mr-2"></i> 
                                                     <Link href={'/category/'+category.slug}>
                                                        {category.title}
                                                     </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Brand</div>
                                    {product && <div>{product.brand}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Condition</div>
                                    {product && <div>{product.condition}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Model No</div>
                                    {product && <div>{product.model_no}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>SKU</div>
                                    {product && <div>{product.sku}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Weight</div>
                                    {product && <div>{product.auctionshipping_id.package_weight_kg}kg {product.auctionshipping_id.package_weight_gm}gm</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Package Dimension</div>
                                    {product && <div>{product.auctionpricing_id.package_weight_height} Height X {product.auctionshipping_id.package_weight_length} Length X {product.auctionshipping_id.package_weight_width} Width</div>}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className='text-gray-500'>Description</div>
                                    {product &&
                                        <div className='text-sm' dangerouslySetInnerHTML={{ __html: product.long_description }}> 
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pt-3">
                            <div className="main-part">
                                <div className='mt-2'>
                                    <h1 className='text-xl font-bold text-gray-600'>
                                        {product && product.title}
                                    </h1>
                                </div>
                            <div className='border-bottom mt-3 mb-2'></div>
                            <div className="mb-3 text-[#009688] bg-[#00968836] px-3 py-3 rounded">
                                    <div className='text-gray-700 leading-3 font-semibold'>Reserved Amount :
                                        {product && <span className='ml-2'>₹ {product.auctionpricing_id.reserved_price}</span>}
                                    </div>
                                </div>
                                <div className='delivery-options max-w'>
                                    <p className='text-gray-600 font-semibold'>Latest 10 Bid Amount</p>
                                        {bidLoading &&
                                            [...Array(10)].map((e: any, i: any) => (
                                            <div key={i}>
                                                <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="25px"
                                                />
                                            </div>
                                            ))
                                        }
                                        {!bidLoading && 
                                            <>
                                                {bidList.length == 0 && <div>No bid exist. Become first bidder!</div>}
                                                {bidList.length > 0 && 
                                                <div className="grid grid-cols-7 gap-4">
                                                    <div className='col-span-2'>
                                                        <small className='font-semibold text-gray-500'>Buyer</small>
                                                    </div>
                                                    <div className='col-span-2'>
                                                        <small className='font-semibold text-gray-500'>Time Stamp</small>
                                                    </div>
                                                    <div>
                                                        <small className='font-semibold text-gray-500'>Bid Amount</small>
                                                    </div>
                                                    <div className='col-span-2'>
                                                        <small className='font-semibold text-gray-500'>Winner</small>
                                                    </div>
                                                </div>}
                                                {bidList.length > 0 && bidList.map((bid: any, index: any) => (
                                                    <div className={`grid grid-cols-7 gap-4 ${index == 0 ? 'text-[#009688] bg-[#00968836] rounded p-2 drop-shadow-lg' : ''}`} key={index}>
                                                        <div className='col-span-2'>
                                                            <small>{bid.name}</small>
                                                        </div>
                                                        <div className='col-span-2'>
                                                            <small>{dateFormat(bid.createdAt, "dd-mm-yyyy hh:MM TT")}</small>
                                                        </div>
                                                        <div>
                                                            <small>₹ {bid.bid_amount}</small>
                                                        </div>
                                                        <div className='col-span-2'>
                                                            {/* {product && parseFloat(product.auctionpricing_id.reserved_price)<=bid.bid_amount ? (<small className='cursor-pointer font-bold text-[#009688]'>Invite</small>) : <small className='cursor-pointer font-bold text-[#ff0000]'>Less to reserved</small>} */}
                                                            {index === 0 ? (<small className='ml-2'>( Winner )</small>) : ""}
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className='delivery-options max-w mt-4'>
                                    <p className='text-gray-600 font-semibold'>Unique bidder with Max Bid</p>
                                        {bidLoading &&
                                            [...Array(10)].map((e: any, i: any) => (
                                            <div key={i}>
                                                <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="25px"
                                                />
                                            </div>
                                            ))
                                        }
                                        {!bidLoading && 
                                            <>
                                                {bidUList.length == 0 && <div>No bid exist. Become first bidder!</div>}
                                                {bidUList.length > 0 && 
                                                <div className="grid grid-cols-5 gap-4">
                                                    <div className='col-span-2'>
                                                        <small className='font-semibold text-gray-500'>Buyer</small>
                                                    </div>
                                                    <div>
                                                        <small className='font-semibold text-gray-500'>Max Bid Amount</small>
                                                    </div>
                                                    <div>
                                                        <small className='font-semibold text-gray-500'>Other Bids</small>
                                                    </div>
                                                    <div>
                                                        <small className='font-semibold text-gray-500'>Invite</small>
                                                    </div>
                                                </div>}
                                                {bidUList.length > 0 && bidUList.map((bid: any, index: any) => (
                                                    <div className={`grid grid-cols-5 gap-4 ${index == 0 ? 'text-[#009688] bg-[#00968836] rounded p-2 drop-shadow-lg' : ''}`} key={index}>
                                                        <div className='col-span-2'>
                                                            <small>{bid.user[0].name}</small>
                                                        </div>
                                                        <div>
                                                            <small>₹ {bid.bid_amount}</small>
                                                        </div>
                                                        <div>
                                                            {bid.bid_others && bid.bid_others.map((bidAmt: any, index: any) => (<p key={index}>₹ {bidAmt}</p>))}
                                                        </div>
                                                        <div>
                                                            {product && parseFloat(product.auctionpricing_id.reserved_price)<=bid.bid_amount ? (<a onClick={() => inviteUser(bid._id, bid.bid_amount)} className='cursor-pointer font-bold text-[#009688]'>Invite</a>) : <small className='cursor-pointer font-bold text-[#ff0000]'>Less to reserved</small>}
                                                            {index === 0 ? (<small className='ml-2'>( Winner )</small>) : ""}
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        }
                                </div>
                        </div>
                    </div>
                </div>
            </AccountLayout>
    );
}

export default BidAuctionDetails;