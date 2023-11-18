import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CardSlider from '../../Components/LoginSlider/CardSlider';
import ThumbSlider from '../../Components/LoginSlider/ThumbSlider';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';
import SocketIOClient from "socket.io-client";
import Image from 'next/image';
import { getAPIUrl } from '../../lib/useLocalStorage';
import Link from 'next/link';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import CustomLoader from '../../Admin/Components/CustomLoader';
import LoadingSckeleton from '../../Components/Reusable/LoadingSkeleton';
import dateFormat from 'dateformat';

interface iBidDetails {
    _id: string,
    product: string,
    createdAt: string,
    name: string,
    bid_amount: string,
    max_bid: string,
    total_bids: string,
    user_id: string
}

let pageSlug: any;

const ProductDetails: NextPage = () => {

    const router = useRouter();
    const { product_slug } = router.query;
    pageSlug = product_slug;
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const [product, setProduct] = useState(null);
    const [photoList, setphotoList] = useState(null);
    const { data: session } = useSession();
    // connected flag
    const [bidAmount, setBidAmount] = useState("");
    const [bidList, setBidList] = useState([]);
    const [allBidList, setAllBidList] = useState([]);
    const [bidAmountList, setBidAmountList] = useState([]);
    const [postalCode, setPostalCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [bidLoading, setBidLoading] = useState(false);
    const [lastBid, setLastBid] = useState("0");
    const [maxBid, setMaxBid] = useState("0");
    const [totalBid, setTotalBid] = useState(0);
    const [bidDrawer, setBidDrawer] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    const getProductInfo = async () => {
        const productReq = await fetch(mainApiUrl+"auction/slug/" + product_slug);
        const proJson = await productReq.json();
        if(productReq.ok){
            console.log(proJson.record);
            setProduct(proJson.record);
            setphotoList(proJson?.record.photos_ids);
            setIsExpired(proJson.isActive);
        }
    }
    useEffect((): any => {
        if(product_slug){
            getProductInfo();
        }
    },[product_slug]);

    const setBidValues = (bid_amount: any,) => {
        const bidArr = [];
        const lastBidAmt = bid_amount;
        setLastBid(lastBidAmt);
        for(let i=1; i<=5;i++){
            const selBidAmt = ((Math.round(lastBidAmt/100))*100) + (i*100);
            bidArr.push(selBidAmt);
        }
        setBidAmountList(bidArr);
    }

    const getLatestBids = async () => {
        setBidLoading(true);
        const bidReq = await fetch(mainApiUrl+"auction-bid/"+pageSlug+"?per_page=10");
        if(bidReq.ok){
            const bidRespo = await bidReq.json();
            if(bidRespo.status == 1){
                setTotalBid(parseInt(bidRespo.total));
                setBidValues(bidRespo.bid_amount);
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

    useEffect((): any => {
        socketInitializer();
    }, []);

    const socketInitializer = async () => {
        // connect to socket server
        const socket = SocketIOClient(process.env.BASE_URL, {
            path: "/api/socketio",
        });
  
        // log socket connection
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
        });

        // update chat on new message dispatched
        socket.on("newbid", (bid: iBidDetails) => {
            console.log(bid);
            if(bid.product == pageSlug){
                setBidValues(bid.bid_amount);
                setMaxBid(bid.max_bid);
                setTotalBid(parseInt(bid.total_bids));
                setBidList([]);
                setTimeout(() => {
                    let index = bidList.findIndex((b: any) => b._id == bid._id);
                    if(index == -1){
                        setTimeout(() => {
                            getLatestBids();
                        }, 1000);
                    }
                },1000);
            }
        });

        // Checking expired status
        socket.on("expiredfire", (auctionData: any) => {
            if(auctionData.length){
                auctionData.forEach((bid: any) => {
                    if(bid.slug == pageSlug){
                        setProduct(bid);
                    }
                });
            }
        });
    }
    
    const [waitCounter, setWaitCounter] = useState(null);
    const formatTime = (duration: any) => {
        if(duration < 0){
            setIsExpired(true);
            return;
        }
        let days: any = Math.floor(duration / 86400);
        let hours: any = Math.floor((duration % 86400) / 3600);
        let minutes: any = Math.floor((duration % 3600) / 60);
        let seconds: any = duration % 60;
        let response = "";
        if (days < 10) {
            days = '0' + days;
        }
        // if (parseInt(days) > 0) {
        response = days + ' Days ';
        // }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return '<span>'+response+'</span><span>'+ hours +'</span>:<span>'+ minutes +'</span>:<span>'+ seconds +'</span>';
    };
    useEffect(() => {
        if(product){         
            setBidList([]);   
            setTimeout(() => {
                getLatestBids();
            }, 1000);
            const timer = setInterval(() => {
                setWaitCounter((waitCounter: any) => moment(product.expiryDate).diff(moment(), 'seconds'));
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [product]);
    
    const itemSliderProps = {
        spaceBetween: 20,
        slidesPerView: 5,
        autoplay: false,
        navigation: true
    }

    const checkAvailability = () => {
        console.log(postalCode);
    }

    const setBidOnAuction = async () => {
        if (!session) {
            toast.error("Opps! Login required to place Bid on auction. Please, Login Now", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            router.push({
                pathname: "/login",
                query: { returnUrl: router.asPath },
            });
            return;
        }
        if(bidAmount == ""){
            toast.error("Bid amount should not blank, Please, Enter bid value", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        if(session.user.id === product.seller_id.user_id){
            toast.error("Self bidding not allowed! We are notice that you are trying to self bid. Please, dont try again. We are watching you. That may block your account permants.", {
                position: "top-right",
                autoClose: 10000,
                closeOnClick: true,
                theme: "colored",
            });
            return;
        }
        if((parseFloat(bidAmount) - 100) < parseFloat(lastBid)){
            toast.error("Bid amount must have equal or more then " + (parseFloat(lastBid) + 100), {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        if((parseFloat(bidAmount) % 100) != 0){
            toast.error("Bid amount should have multiply of 100", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        setBidLoading(true);
        const data = {
            product_id: product._id,
            seller_id: product.seller_id._id,
            bid_amount: bidAmount,
            max_bid: 0
        };
        const bidReq = await fetch(mainApiUrl+"auction-bid/set-new-bid", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        if(bidReq.ok){
            const bidRespo = await bidReq.json();
            if(bidRespo.status == 1){
                toast.success(bidRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                setBidAmount("");
            }
        }
    }

    const setMaxBidOnAuction = async () => {
        if (!session) {
            toast.error("Opps! Login required to place Bid on auction. Please, Login Now", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            router.push({
                pathname: "/login",
                query: { returnUrl: router.asPath },
            });
            return;
        }
        if(bidAmount == ""){
            toast.error("Bid amount should not blank, Please, Enter bid value", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        if(session.user.id === product.seller_id.user_id){
            toast.error("Self bidding not allowed! We are notice that you are trying to self bid. Please, dont try again. We are watching you. That may block your account permants.", {
                position: "top-right",
                autoClose: 10000,
                closeOnClick: true,
                theme: "colored",
            });
            return;
        }
        if((parseFloat(bidAmount) - 100) < parseFloat(lastBid)){
            toast.error("Max bid amount must have equal or more then " + (parseFloat(lastBid) + 100), {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        if((parseFloat(bidAmount) - 100) < parseFloat(maxBid)){
            toast.error("Max bid amount must have equal or more then " + (parseFloat(maxBid) + 100), {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        if((parseFloat(bidAmount) % 100) != 0){
            toast.error("Bid amount should have multiply of 100", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        setBidLoading(true);
        const data = {
            product_id: product._id,
            seller_id: product.seller_id._id,
            bid_amount: parseFloat(lastBid) + 100,
            max_bid: bidAmount
        };
        const bidReq = await fetch(mainApiUrl+"auction-bid/set-new-bid", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        if(bidReq.ok){
            const bidRespo = await bidReq.json();
            if(bidRespo.status == 1){
                toast.success(bidRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                setBidAmount("");
            }
        }
    }

    const headerProps = {pageTitle: 'Hi Bidder : Product details page',pageDescription: 'hi Bidder Product details page'};
    const categories: any = [
        {_id: 0,title: "Art", slug: "art", image: "https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138__340.jpg", alt: "slider image 1",color: "#c4d7e0"},
        {_id: 1,title: "Books", slug: "books",image: "https://cdn.pixabay.com/photo/2022/07/26/03/35/jogger-7344979__340.jpg", alt: "slider image 3",color: "#ffd9c0"},
        {_id: 2,title: "Fashion", slug: "fashion", image: "https://cdn.pixabay.com/photo/2022/07/24/17/55/wind-energy-7342177__340.jpg", alt: "slider image 2",color: "#b7e5dd"},
        {_id: 3,title: "Clothing", slug: "clothing", image: "https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138__340.jpg", alt: "slider image 1",color: "#ffbcd1"},
        {_id: 4,title: "Electronics", slug: "electronics",image: "https://cdn.pixabay.com/photo/2022/07/24/17/55/wind-energy-7342177__340.jpg", alt: "slider image 2",color: "#b5eaea"},
        {_id: 5,title: "Health & Beauty", slug: "health-and-beauty",image: "https://cdn.pixabay.com/photo/2022/07/26/03/35/jogger-7344979__340.jpg", alt: "slider image 3",color: "#f09dff"},
        {_id: 6,title: "Home Utilities", slug: "home-utilities", image: "https://cdn.pixabay.com/photo/2022/07/24/17/55/wind-energy-7342177__340.jpg", alt: "slider image 2",color: "#dfd3c3"},
        {_id: 7,title: "Sports", slug: "sports", image: "../img/img3.jpg", alt: "slider image 1",color: "#e4e9be"}
      ];

    const getAllBidRecords = async () => {
        setBidLoading(true);
        const bidReq = await fetch(mainApiUrl+"auction-bid/"+pageSlug);
        if(bidReq.ok){
            const bidRespo = await bidReq.json();
            if(bidRespo.status == 1){
                if(bidRespo.record.length > 0){
                    setAllBidList(bidRespo.record);  
                }
            }
        }
        setBidLoading(false);
    };

    useEffect(() => {
        if(bidDrawer){
            getAllBidRecords();
        }
    }, [bidDrawer]);

    return (
        <div>
            {bidDrawer && <div onClick={() => setBidDrawer(!bidDrawer)} className='fixed left-0 right-0 top-0 bottom-0 z-50'></div>}
            <div className={`transition ease-in-out delay-1500 shadow-[0_35px_60px_0px_rgba(0,0,0,0.3)] fixed top-0 right-0 bottom-0 max-w-[450px] w-[450px] bg-white z-[100] ${
                bidDrawer ? "translate-x-0 " : "translate-x-full"
            }`}>
                    <div className='font-semibold flex items-center px-3 border-[5px] bg-gray-200 py-3'>
                        <div
                            className="text-3xl mr-3 -mt-[6px] text-black items-center cursor-pointer"
                            onClick={() => setBidDrawer(!bidDrawer)}>
                            x
                        </div>
                        <div>
                            Bid History
                        </div>
                    </div>
                    <div className='delivery-options w-full p-3'>
                        {bidLoading &&
                            [...Array(50)].map((e: any, i: any) => (
                            <div key={i}>
                                <LoadingSckeleton
                                baseColor="#AAAAAA"
                                highlightColor="#FFFFFF"
                                count={1}
                                height="30px"
                                />
                            </div>
                            ))
                        }
                        {!bidLoading && 
                            <>
                                {allBidList.length > 0 && 
                                <div className="grid grid-cols-5 gap-4 bg-gray-200 p-2">
                                    <div className='col-span-2'>
                                        <small className='font-semibold'>Buyer</small>
                                    </div>
                                    <div className='col-span-2'>
                                        <small className='font-semibold'>Time Stamp</small>
                                    </div>
                                    <div>
                                        <small className='font-semibold'>Bid</small>
                                    </div>
                                </div>}
                                {allBidList.length > 0 && allBidList.map((bid: any, index) => (
                                    <div className="grid grid-cols-5 gap-4" key={index}>
                                        <div className='col-span-2'>
                                            {session.user.id === bid.user._id && <small className='font-semibold'>{bid.user.name}</small>}
                                            {session.user.id != bid.user._id && <small>{bid.user.name}</small>}
                                        </div>
                                        <div className='col-span-2'>
                                            <small>{dateFormat(bid.createdAt, "dd-mm-yyyy hh:MM TT")}</small>
                                        </div>
                                        <div>
                                            {session.user.id === bid.user_id && <small>₹ {bid.bid_amount}</small>}
                                            {session.user.id != bid.user_id && <small className='font-semibold '>₹ {bid.bid_amount}</small>}
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
            </div>
            <ToastContainer />
            {isLoading && <CustomLoader />}
            <main>
                <Header headerProps={headerProps} headerTitle="Testing titles" anotherTitle="Another Titles"></Header>
                <CategoryMenu />
                <div className="container-fluid px-xl-5 mt-2">
                    <div className="row m-0">
                        <div className="col-md-8 pt-3 pb-2">
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
                                                <li className='inline mr-2 text-[#909090]' key={category.title}>
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
                                    {product && <div>{product.auctionshipping_id.package_weight_height} Height X {product.auctionshipping_id.package_weight_length} Length X {product.auctionshipping_id.package_weight_width} Width</div>}
                                </div>
                                {/* <div className="col-md-12 mb-3">
                                    <div className='text-gray-500'>Conditions</div>
                                    <div className='ml-4 pl-2 text-sm'>
                                        <ul className="list-disc">
                                            <li>Timekeeping accuracy not guaranteed.</li>
                                            <li>This item has been evaluated and verified by a Certified Master Electronic Watchmaker.</li>
                                            <li>While we represent items accurately on our site to the best of our ability, the color calibration of computer monitors can vary, causing colors to appear slightly different from one monitor to another. Due to this, please note that precise color representation of metal and gemstones is not always possible.</li>
                                        </ul>
                                    </div>
                                </div> */}
                                <div className="col-md-12 mb-3">
                                    <div className='text-gray-500'>Description</div>
                                    {product &&
                                        <div className='text-sm' dangerouslySetInnerHTML={{ __html: product.long_description }}> 
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 pt-3">
                            <div className="main-part">
                                {product && !isExpired && 
                                    <div className='text-base text-red-700 flex justify-items-center items-center'>
                                        <div className=' leading-3 font-semibold mr-2'>
                                            Closes in : 
                                        </div>
                                        <div className='closes-in flex-initial text-2xl'>
                                            <div dangerouslySetInnerHTML={{__html: formatTime(waitCounter)}}></div>
                                        </div>
                                    </div>
                                }
                                {product && isExpired && 
                                    <div className='text-base text-red-700 flex justify-items-center items-center'>
                                        <div className=' leading-3 font-semibold mr-2'>
                                            Expired on  
                                        </div>
                                        <div className='closes-in flex-initial'>
                                            {dateFormat(product.expiryDate, "dd-mm-yyyy hh:MM TT")}
                                        </div>
                                    </div>
                                }
                                <div className='mt-2'>
                                    <h1 className='text-xl font-bold text-gray-600'>
                                        {product && product.title}
                                    </h1>
                                </div>
                                <div className='mt-2'>
                                    <small className='text-gray-500'>
                                    {product && (!isExpired ? "Current" : (totalBid > 0 ? "Winning" : "Current"))} Bid
                                    </small>
                                    <p>
                                        {totalBid > 0 && <><span className='text-lg mr-3'>₹ {lastBid}</span> <small onClick={() => setBidDrawer(!bidDrawer)} className='underline cursor-pointer'>{totalBid} Bids</small></>}
                                        {totalBid == 0 && <><span className='text-gray-500 font-bold'>No bid!</span><br/><span className='text-gray-600'>Become a first bidder!</span></>}
                                    </p>
                                </div>
                                {/* <div className='mt-2'>
                                    <small className='text-gray-500'>
                                        Max Bid
                                    </small>
                                    <p>
                                        <span className='text-lg mr-3'>₹ {maxBid}</span>
                                    </p>
                                </div> */}
                                {product && !isExpired && <>
                                    <div className='mt-2'>
                                        <small className='text-gray-500'>Bid above that</small>                                    
                                        <div className='mt-1'>
                                            {bidAmountList && 
                                            bidAmountList.map((bidValue: any) => (
                                                <div onClickCapture={() => setBidAmount(bidValue)} key={bidValue} className="cursor-pointer hover:bg-gray-400 hover:text-white inline-block bg-gray-200 rounded px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                    ₹ {bidValue}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='mb-2 mt-2'>
                                        <div className='row'>
                                            <div className="col-4 pr-0">
                                                <div className="relative rounded-md">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <span className="text-gray font-bold sm:text-sm">₹</span>
                                                    </div>
                                                    <input type="text" onChange={(e: any) => setBidAmount(e.target.value)} value={bidAmount} className="shadow-sm block w-100 rounded-md border border-gray-300 pl-7 pt-1 pb-1" placeholder="Enter amount" />
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <button onClick={setBidOnAuction} className="hover:bg-blue-500 text-xs text-blue-700 font-bold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-1">
                                                    PLACE BID
                                                </button>
                                                <button onClick={setMaxBidOnAuction} className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                                    SET MAX BID
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>}
                            </div>
                            {product && !!isExpired && 
                                <>
                                    <div className='border-bottom mt-3 mb-2'></div>
                                    <div className='delivery-options mt-2'>
                                        <p className='text-gray-600 font-semibold'>Delivery Options</p>
                                        <div className="relative rounded-md max-w-md">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <i className="fa fa-map-marker"></i>
                                            </div>
                                            <input type="text" onChange={(e: any) => setPostalCode(e.target.value)} defaultValue={postalCode} className="shadow-sm block w-100 rounded-md border border-gray-300 pl-7 pt-1 pb-1 pr-40" placeholder="PIN Code" />
                                            <button type='button' onClickCapture={checkAvailability} className="pointer-cursor bg-gray-100 absolute inset-y-0 right-0 flex items-center pr-4 pl-4 border-2 rounded">
                                                Check Availability
                                            </button>
                                        </div>
                                        <div className='text-right mt-2'>
                                            <a href="/policy/terms-of-use" target="_blank" className='text-sm'>
                                                <i className="fa fa-info-circle mr-2"></i>
                                                Terms and Conditions
                                            </a>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className='border-bottom mt-3 mb-2'></div>
                            <div className='delivery-options max-w-md'>
                                <p className='text-gray-600 font-semibold'>Bid History</p>
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
                                        <div className="grid grid-cols-5 gap-4">
                                            <div className='col-span-2'>
                                                <small className='font-semibold text-gray-500'>Buyer</small>
                                            </div>
                                            <div className='col-span-2'>
                                                <small className='font-semibold text-gray-500'>Time Stamp</small>
                                            </div>
                                            <div>
                                                <small className='font-semibold text-gray-500'>Bid Amount</small>
                                            </div>
                                        </div>}
                                        {bidList.length > 0 && bidList.map((bid: iBidDetails, index) => (
                                            <div className="grid grid-cols-5 gap-4" key={index}>
                                                {session && <><div className='col-span-2'>
                                                    {session.user.id === bid.user_id && <small className='font-semibold text-gray-500'>{bid.name}</small>}
                                                    {session.user.id != bid.user_id && <small>{bid.name}</small>}
                                                </div>
                                                <div className='col-span-2'>
                                                    <small>{dateFormat(bid.createdAt, "dd-mm-yyyy hh:MM TT")}</small>
                                                </div>
                                                <div>
                                                    {session.user.id === bid.user_id && <small className='text-gray-500'>₹ {bid.bid_amount}</small>}
                                                    {session.user.id != bid.user_id && <small className='font-semibold '>₹ {bid.bid_amount}</small>}
                                                </div></>}
                                                {!session && <><div className='col-span-2'>
                                                    <small>{bid.name}</small>
                                                </div>
                                                <div className='col-span-2'>
                                                    <small>{dateFormat(bid.createdAt, "dd-mm-yyyy hh:MM TT")}</small>
                                                </div>
                                                <div>
                                                    <small className='font-semibold '>₹ {bid.bid_amount}</small>
                                                </div></>}
                                            </div>
                                        ))}
                                        {bidList.length > 0 && <div className='text-right cursor-pointer' onClick={() => setBidDrawer(!bidDrawer)}>
                                            <small>View All</small>
                                                {/* <i className="fa fa-arrow-right ml-2"></i> */}
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            <div className='border-bottom mt-2 mb-2'></div>
                            <div className='delivery-options'>
                                <p className='text-gray-600 font-semibold'>Seller Information</p>
                                <div className="flex items-center mt-2 mb-3">
                                    <div className='relative image-seller'>
                                        <Image layout='fill' className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                                    </div>
                                    <div className="text-sm w-100">
                                        <div className="flex">
                                            <div className="text-gray-900 leading-none font-semibold flex-auto">
                                                {product && product.seller_id?.company_name}
                                            </div>
                                            <div className='flex-none'>
                                                <div className="flex">
                                                    <i className="fa fa-star text-orange-500 mr-1"></i>
                                                    <i className="fa fa-star text-orange-500 mr-1"></i>
                                                    <i className="fa fa-star-half text-orange-500 mr-1"></i>
                                                    <i className="fa fa-star-o text-orange-500 mr-1"></i>
                                                    <i className="fa fa-star-o text-orange-500 mr-1"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="text-gray-600  flex-auto">
                                                {product && product.seller_id?.address_id?.city}, 
                                                {product && product.seller_id?.address_id?.state}, 
                                                {product && product.seller_id?.address_id?.country}</div>
                                            <div className='flex-none'>
                                                Reviews : <strong>50</strong>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <p className='bg-gray-200 text-sm rounded px-3 py-2 text-gray-500 font-semibold'>Experts estimate ₹4000 - ₹5000</p>
                            </div>
                            <div className='border-bottom mt-3 mb-2'></div>
                            <div className='delivery-options max-w-md'>
                                <p className='text-gray-600 font-semibold mb-3'>Shipping Information</p>
                                {product && (
                                    <>
                                        <span className='text-gray-500 leading-3 font-semibold mb-2 pr-2'>Offer free Shipping : </span>
                                        <span>
                                            {product?.auctionshipping_id.offer_free_shipping == "true" ? "Free Shipping" : "Shipping on buyer"}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='border-bottom mt-0 mb-3'></div>
                    <div>
                        <h3 className='mb-3 font-semibold text-xl text-gray-500'>Other Similars</h3>
                        <CardSlider sliderProps={itemSliderProps} myClassName="endingSoon" sliderImages={categories} sliderFor="ItemShopCard" />
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default ProductDetails