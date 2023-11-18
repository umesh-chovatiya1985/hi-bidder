import { NextPage } from 'next';
import { useEffect } from 'react';
import CategoryMenu from '../../../../../Components/Reusable/CategoryMenu';
import { Footer } from '../../../../../Components/Layout/Footer/Footer';
import { Header } from '../../../../../Components/Layout/Header/Header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getAPIUrl, getQueryParams } from '../../../../../lib/useLocalStorage';
import ThumbSlider from '../../../../../Components/LoginSlider/ThumbSlider';
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSckeleton from '../../../../../Components/Reusable/LoadingSkeleton';
import Image from 'next/image';
import { buyeraddress } from '../../../../../utils/models/buyeraddress';
import DynaFormControl from '../../../../../Components/Reusable/Forms/DynaFormControl';
import { useForm } from 'react-hook-form';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../../../Components/Payment/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const BuyerInvitation: NextPage = () => {

    const stripePromise = loadStripe('pk_test_51JXOZ4Dq2Sb60bHPs0blw4Cd9rnNN6a5igUK68ofPlKlLA4rJ7lc4McqFeOVRaWREvX3D91pyVwMOxdf9zWkTz6f00iCuCgaHp');

   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   const { data: session } = useSession();
   const router = useRouter();
   const mainApiUrl = getAPIUrl() || process.env.API_URL;
   const [ stripeOptions, setStripeOptions ] = useState({
    clientSecret: ""
   });

   const { register, setValue, handleSubmit, formState: { errors } } = useForm<buyeraddress>();

    const formCreation: any = [
        {
            type: "text",
            formName: "first_name",
            formLabel: "First Name",
            validation: { required: "First Name is required!" }
        },
        {
            type: "text",
            formName: "last_name",
            formLabel: "Last Name",
            validation: { required: "Last Name is required!" }
        },
        {
            type: "text",
            formName: "mobile_number",
            formLabel: "Mobile Number",
            validation: { required: "Mobile Number is required!", pattern: { value: /^[0-9]{10}$/i, message: "Invalid Contact No, It should have 10 digits."}}
        },
        {
            type: "text",
            formName: "country",
            formLabel: "Country",
            validation: { required: "Country is required!" }
        },
        {
            type: "text",
            formName: "state",
            formLabel: "State",
            validation: { required: "State is required!" }
        },
        {
            type: "text",
            formName: "city",
            formLabel: "City",
            validation: { required: "City is required!" }
        },
        {
            type: "text",
            formName: "address_one",
            formLabel: "Address line 1",
            validation: { required: "Address line 1 is required!" }
        },
        {
            type: "text",
            formName: "address_two",
            formLabel: "Address line 2",
            validation: { required: "Address line 2 is required!" }
        },
        {
            type: "text",
            formName: "building",
            formLabel: "Apt / Suite / Building",
            validation: { required: "Apt / Suite / Building is required!" }
        },
        {
            type: "text",
            formName: "pin_code",
            formLabel: "Postal Code",
            validation: { required: "Postal Code is required!" }
        }
    ]
    const onSubmit = async (data: buyeraddress) => {
        try {
            const addressRespo = await fetch(mainApiUrl+"user/user-address", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
            const addressJson = await addressRespo.json();
            if(addressRespo.ok){
                toast.success(addressJson.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
        }
        catch(errors) {
            toast.error(errors.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
        }
    }

   const { user_id, invitation_id, slug } = router.query;

   const [product, setProduct] = useState(null);
   const [bidInfo, setBidInfo] = useState(null);
   const [photoList, setphotoList] = useState(null);
   const [acceptTC, setacceptTC] = useState(false);
   const [offerReject, setOfferReject] = useState(false);
   const [reason, setReason] = useState("");
   const [offerExist, setOfferExist] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [offerAccept, setOfferAccept] = useState(false);
   const [userAddress, setUserAddress] = useState(null);
   const [isAddress, setIsAddress] = useState(false);
   const [addNewAddress, setAddNewAddress] = useState(false);
   const [selectedAddress, setSelectedAddress] = useState("");
   const [isAddressSelected, setIsAddressSelected] = useState(false);
   const [isPaymentClicked, setIsPaymentClicked] = useState(false);

   useEffect(() => { 
        if(!session){
            const returnParams = getQueryParams();
            router.push({
                pathname: '/login',
                query: { returnUrl: returnParams}
            });
        }    
   }, [session]);

   const getInvitationDetails = async () => {
        setIsLoading(true);
        const productReq = await fetch(mainApiUrl+"buyer-invitation/send-invitation/" + invitation_id);
        const proJson = await productReq.json();
        if(productReq.ok){
            if(proJson.status == 1){
                setBidInfo(proJson.record);
                setProduct(proJson?.productInfo[0]);
                setphotoList(proJson?.productInfo[0].photos_ids);
                setOfferExist(true);
            }
        }
        setIsLoading(false);
   }

   const acceptOffer = () => {
        if(!acceptTC){
            toast.error("Please, accept Terms and Condition before go ahead in offer.", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        setOfferAccept(true);
        addressData();
   }

   const addressData = async () => {
        const dataRecord = await fetch(mainApiUrl + "user/user-address");
        const userJson = await dataRecord.json();
        if (dataRecord.ok) {
        console.log(userJson);
        if (userJson.status === 1) {
            setUserAddress(userJson.records);
            setIsAddress(true);
        } else {
            setIsAddress(false);
        }
        }
        setIsLoading(false);
  };

   const confirmReject = async () => {
        const data = {
            rejectReason: reason,
            status: "Rejected"
        };
        const productReq = await fetch(mainApiUrl+"buyer-invitation/send-invitation/" + invitation_id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        const proJson = await productReq.json();
        if(productReq.ok){
            toast.success("Thank you for your reply, We have noted your response.", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
        }
   }

   useEffect(() => {
        if(session){
            getInvitationDetails();
        }
   },[invitation_id]);

   const handlePayClick = (message: any) => {
        console.log(message);
   }

   const requestPayment = async () => {
        const stripeReq = await fetch(mainApiUrl+"payment-stripe/"+bidInfo._id);
        const stripeJson = await stripeReq.json();
        if(stripeReq.ok){
            setStripeOptions(stripeJson);
            setIsPaymentClicked(true);
        }
   }

   return (
       <div>
            <ToastContainer />
           <main>
               <Header headerProps={headerProps}></Header>
               <CategoryMenu />
               {
                isLoading && (
                    <div className='container mt-4 pt-4'>
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
                )
               }
               {!isLoading && (offerExist ? (<>
               <div className='border-b'>
                    <div className="container px-0">
                        <div className="row text-primary-font">
                            <div className="col-md-12">
                                <h1 className='m-3 text-2xl font-semibold'>
                                    {product && product.title}
                                </h1>
                            </div>
                        </div>
                    </div>
               </div>              
               <div className="container px-0"> 
                        <div className="row m-0">
                            <div className="col-md-7 pt-3 pb-2">
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
                            <div className="col-md-5 pt-3">
                                {bidInfo && <div>
                                    Offer price : <span className='font-semibold'>₹ {bidInfo.bidAmount}</span>
                                </div>}
                                <div className='mt-2'>
                                    Message from seller
                                </div>
                                {!offerAccept && !offerReject &&
                                    <>
                                        <div className='my-3'>
                                            <input type="checkbox" onChange={(e) => setacceptTC(e.target.checked)} className='mr-2' name='accept' value={'1'} />
                                            I read  <Link href={"/policy/terms-of-use"}>
                                                    <a
                                                    target="_blank"
                                                    className="text-primary-color font-semibold underline"
                                                    >
                                                        Terms and Condition
                                                    </a>
                                                </Link>{" "} for seller offers, I am agree and accept it.
                                            
                                        </div>
                                        <div>
                                            <button onClick={acceptOffer} className='btn btn-success mr-2 px-4 py-1'>Accept</button> <button onClick={() => setOfferReject(true)} className='btn btn-danger px-4 py-1'>Reject</button>
                                        </div>
                                    </>
                                }
                                {offerReject &&
                                    <>
                                        <div className='my-3'>
                                            <label htmlFor="reason" className='font-semibold text-gray-500'>* May we know the reason behand the reject?</label>
                                            <textarea id='reason' onChange={(e) => setReason(e.target.value)} className='form-control' placeholder='Reason of reject'></textarea>
                                        </div>
                                        <div>
                                            <button onClick={confirmReject} className='btn btn-danger mr-2 px-4 py-1'>Reject confirm</button> <button onClick={() => setOfferReject(false)} className='btn btn-primary px-4 py-1'>Go back to accept/reject</button>
                                        </div>
                                    </>
                                }
                                {offerAccept &&
                                    <>
                                       <div className="user-info">
                                        {isLoading &&
                                        [1, 2, 3, 4, 5].map((value: any) => (
                                            <div className="px-3 py-3" key={value}>
                                            <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="30px"
                                                width="250px"
                                            />
                                            <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="20px"
                                                width="350px"
                                            />
                                            <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="20px"
                                                width="300px"
                                            />
                                            <LoadingSckeleton
                                                baseColor="#AAAAAA"
                                                highlightColor="#FFFFFF"
                                                count={1}
                                                height="20px"
                                                width="350px"
                                            />
                                            </div>
                                        ))}
                                        <div className='my-3 font-semibold text-gray-500 text-lg border-b'>Delivery address</div>
                                        {!isLoading && (!isAddress ? (
                                            <div className="relative">
                                                <div className="flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="my-2">
                                                            <p className='font-semibold'>Please Add Your Address</p>
                                                            <p>
                                                            Our courier will get adjust to your Customers schedule. As a result everyone is pleased!
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="container-fluid px-2 pb-3">
                                                <div className="row">
                                                    {userAddress.map((record: any) => (
                                                        !isAddressSelected ? <div className={`px-2 mb-2 cursor-pointer`} key={record._id} onClick={() => {setAddNewAddress(false); setSelectedAddress(record._id)}}>
                                                            <div className={`${selectedAddress == record._id ? 'bg-gray-200 relative' : 'bg-white'} border rounded-[6px] text-sm`}>
                                                                <div className="add px-3 py-[10px]">
                                                                    <p className="text-left text-[18px] font-semibold text-gray-600">
                                                                        {record.first_name} {record.last_name}
                                                                    </p>
                                                                    <div className="pt-[3px]">
                                                                        <span className="text-[#808089] text-[16px]">
                                                                        {record.address_one}
                                                                        {record.address_two}
                                                                        </span>
                                                                        <br />
                                                                        <span className="text-[#808089] text-[16px]">
                                                                        {record.city} -{record.pin_code},{record.state},
                                                                        {record.country}
                                                                        </span>
                                                                    </div>
                                                                    <div className="pt-[3px]">
                                                                        <span className="text-[#808089] text-[16px]">
                                                                        {record.mobile_number}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {selectedAddress == record._id && <div className='absolute top-[5px] right-[10px]'>
                                                                    <i className="fa fa-check-circle text-[30px] text-green-600"></i>
                                                                </div>}
                                                            </div>
                                                        </div> 
                                                        :
                                                        (record._id==selectedAddress && <div className={`px-2 mb-2 cursor-pointer`} key={record._id}>
                                                            <div className={`${selectedAddress == record._id ? 'bg-gray-200 relative' : 'bg-white'} border rounded-[6px] text-sm`}>
                                                                <div className="add px-3 py-[10px]">
                                                                    <p className="text-left text-[18px] font-semibold text-gray-600">
                                                                        {record.first_name} {record.last_name}
                                                                    </p>
                                                                    <div className="pt-[3px]">
                                                                        <span className="text-[#808089] text-[16px]">
                                                                        {record.address_one}
                                                                        {record.address_two}
                                                                        </span>
                                                                        <br />
                                                                        <span className="text-[#808089] text-[16px]">
                                                                        {record.city} -{record.pin_code},{record.state},
                                                                        {record.country}
                                                                        </span>
                                                                    </div>
                                                                    <div className="pt-[3px]">
                                                                        <span className="text-[#808089] text-[16px]">
                                                                        {record.mobile_number}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {selectedAddress == record._id && <div className='absolute top-[5px] right-[10px]'>
                                                                    <i className="fa fa-check-circle text-[30px] text-green-600"></i>
                                                                </div>}
                                                            </div>
                                                        </div>)
                                                    ))}
                                                </div>
                                                {!addNewAddress && !isAddressSelected ?
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mt-2">
                                                            <a onClick={() => { setAddNewAddress(true); setSelectedAddress("") }} className="btn btn-dark">+ Add Address</a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 text-right">
                                                        <div className="mt-2">
                                                            {selectedAddress && <a onClick={() => setIsAddressSelected(true)} className="btn btn-primary">Continue to Payment</a>}
                                                        </div>
                                                    </div>
                                                </div> : 
                                                <div className="row">
                                                    <div className="col-md-6">
                                                    </div>
                                                    <div className="col-md-6 text-right">
                                                        <div className="mt-2">
                                                            {!isPaymentClicked && selectedAddress && <a onClick={() => setIsAddressSelected(false)} className="btn bg-gray-300">Change address</a>}
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        ))}
                                        {isAddressSelected && (
                                            <>
                                                <div className='my-2 font-semibold text-gray-500 text-lg border-b'>Confirm Order & Pay now</div>
                                                <div className="grid px-2 py-1 grid-cols-2 gap-1">
                                                    <div>
                                                        Offer Amount :    
                                                    </div> 
                                                    <div>
                                                        <span className='font-semibold'>₹ {bidInfo.bidAmount}</span>
                                                    </div>
                                                </div>
                                                <div className="grid px-2 py-1 grid-cols-2 gap-1">
                                                    <div>
                                                        Shipping Changes : 
                                                    </div>
                                                    <div>
                                                        <span className='font-semibold'>₹ 20</span>
                                                    </div>
                                                </div>
                                                <div className="grid px-2 py-1 grid-cols-2 gap-1">
                                                    <div>
                                                        Admin Charges : 
                                                    </div>
                                                    <div>
                                                        <span className='font-semibold'>₹ 300</span>
                                                    </div>
                                                </div>
                                                <div className='py-2 px-3 mt-1 bg-gray-200 rounded grid grid-cols-2 gap-1'>
                                                    <div>
                                                        Payable Amount : 
                                                    </div>
                                                    <div>
                                                        <span className='font-semibold'>₹ {parseFloat(bidInfo.bidAmount) + 20 + 300}</span>
                                                    </div>
                                                </div>
                                                {!isPaymentClicked && <div className='py-2 pl-2 text-right'>
                                                    <button type='button' onClick={requestPayment} className='btn bg-primary-color text-white'>
                                                        Order & Pay Now
                                                    </button>
                                                </div>}
                                            </>
                                        )}
                                    </div>
                                    {isPaymentClicked && stripeOptions.clientSecret != "" && <div className='mt-4 strip-payment'>
                                        <div className='my-2 font-semibold text-gray-500 text-lg border-b'>Secure & Safe payment</div>
                                        <Elements stripe={ stripePromise } options={ stripeOptions }>
                                            <CheckoutForm handlePayClick={ handlePayClick } />
                                        </Elements>
                                    </div>}
                                </>
                            }
                            {addNewAddress &&
                                <>
                                    <div className="mb-2 border-b-2 border-[#D7D7D7]">
                                        <div className="text-gray-600 font-semibold text-lg py-2">
                                            <p>Add Address</p>
                                        </div>
                                    </div>
                                    <div className="user-info">
                                        <div>
                                            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="overflow-hidden sm:rounded-md">
                                                    <div className="bg-white">
                                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                                            {formCreation.map((formData: any) => (
                                                                <div key={formData.formName}>
                                                                    <DynaFormControl register={register} errors={errors} type={formData.type} formName={formData.formName} formLabel={formData.formLabel} validation={formData.validation}></DynaFormControl>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className='mt-3 pt-3 text-center'>
                                                            <button type="submit" className="mr-4 cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal">
                                                                <>Submit Now</>
                                                            </button>
                                                            <a onClick={() => setAddNewAddress(false)} className="cursor-pointer btn btn-danger rounded-[6px] px-[46px] py-[10px] font-normal">
                                                                <>Cancel</>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            }
                            </div>
                        </div>    
                    </div>
                </>) : (
                    <div className="flex-auto mt-4 px-4 lg:px-10 py-4">
                        <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                            <p className='text-xl text-red-500 capitalize'>Offer expired or responsed!</p>
                        </div>
                        <div className="relative text-center w-full">
                            <i className="fa text-red-500 fa-5x fa-exclamation-triangle"></i>
                            <div className='mt-2 font-semibold'>Sorry! We found that this offer may expired or responsed by you.</div>
                            <p className='my-2'>We are sorry to know that you are till intrested to buy the product. But unfortunately, the offer is expired or responsed by you.</p>
                            <p className='mb-4'>Till we noted your intrest for the product and forward it to seller, They may be contact you soon. Thanks</p>
                            <Link href={'/'}>
                                <a className='bg-blue-800 text-white text-sm font-bold uppercase px-6 py-2 rounded shadow mr-1 mb-1 w-full'>Back to home</a>
                            </Link>
                        </div>
                    </div>
                ))}
           </main>
           <Footer></Footer>
       </div>
   );
}

export default BuyerInvitation;