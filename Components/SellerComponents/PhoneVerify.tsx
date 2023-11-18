import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { getAPIUrl } from "../../lib/useLocalStorage";

interface formData {
    seller_contact: String,
    contact_otp: String
}

export default function PhoneVerify({ clickEvent, user }: any) {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const otpWait = parseInt(process.env.OTP_WAIT_TIME);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<formData>();
    const { data: session } = useSession();
    const [waitCounter, setWaitCounter] = useState(otpWait);
    const [otpSent, setOtpSent] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [contact, setContact] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [primaryId, setPrimaryId] = useState(null);

    const stepCountHandler = (number: any) => {
        clickEvent(number);
    }
    let intervalTimer: any;
    const startCounter = () => {
        let counter = otpWait;
        intervalTimer = setInterval(() => {
            counter = counter - 1;
            if(counter < 0){
                clearInterval(intervalTimer);
                return;
            }
            setWaitCounter(waitCounter => waitCounter - 1);
        }, 1000);
    }
    const clearCounterInterval = () => {
        if(intervalTimer){
            setWaitCounter(otpWait);
            clearInterval(intervalTimer);
        }
     }
    const resendOTP = () => {
        // setOtpSent(true);
        // setWaitCounter(otpWait);
        // startCounter();
        sendOtp("Yes");
    }

    const editContact = () => {
        clearCounterInterval();
        setContact("");
        setIsEdit(true);
        setOtpSent(false);
    }

    const sendOtp = async (resend: string) => {
        setIsLoading(true);    
        const respo = await fetch(mainApiUrl+"seller/send-otp", {
            method: "POST",
            body: JSON.stringify({contact: contact, user_id: user._id, resend: resend }),
            headers: { "Content-Type": "application/json" }
        });
        const response = await respo.json();
        if(respo.ok){
            if(response.status == '1'){
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                setOtpSent(true);
                startCounter();
                setWaitCounter(otpWait);
                setIsEdit(false);
            }
            else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
        }
        setIsLoading(false);
     }
     const sendOTPNow = () => {
        sendOtp("No");
     }

     useEffect(() => {        
        getSellingRequired();
     }, []);

     const getSellingRequired = async () => {
        setIsLoading(true);
        const sellerRespo = await fetch(mainApiUrl+"seller/seller-by-user/"+user._id);
        const sellerInfo = await sellerRespo.json();
        if(sellerRespo.ok){
            if(sellerInfo.status == '1'){
                if(sellerInfo.record.seller_contact){
                    setContact(sellerInfo.record.seller_contact);
                    setValue("seller_contact", sellerInfo.record.seller_contact);
                }
                setPrimaryId(sellerInfo.record._id);
            }
            else {
                if(!user.contact){
                    setIsEdit(true);
                    setContact("");
                    setValue("seller_contact", "");
                }
                else {
                    setContact(user.contact);
                    setValue("seller_contact", user.contact);
                }
            }
        }
        setIsLoading(false);
    }

     const onSubmit = async (data: formData) => {
        setIsLoading(true);
        let Url = mainApiUrl+"seller/otp-check/"+primaryId;
        let Method = "PUT";
        const respo = await fetch(Url, {
            method: Method,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        const jsonRespo = await respo.json();
        if(respo.ok){
            if(jsonRespo.status == '1'){
                toast.success(jsonRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                setValue("contact_otp", "");
                setPrimaryId(null);
                getSellingRequired();
                setOtpSent(false);
                setIsEdit(false);
            } else {
                toast.error(jsonRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
        }
        setIsLoading(false);
    }

    return (
    <>
        <ToastContainer />
        {isLoading && <CustomLoader />}
        <p className="text-[22px] text-[#3A3A3A] font-semibold">Phone Number Verification</p>
        <p className="text-[16px] text-[#808089] pb-[50px]">Your number may be used in the future for shipping and customs purposes.</p>
        <div className="max-w-[50%] md:max-w-full">
            <form onSubmit={handleSubmit(onSubmit)} method="post" >
                <div className="pb-[35px]">
                    <div className="grid grid-cols-3 gap-4">
                        <div className='relative col-span-2'>
                            <label htmlFor="contact-no" className={`${errors.seller_contact ? 'text-[#990000]' : ''} font-semibold`}>Phone Number</label>
                            <div className='relative'>
                                <input disabled={!isEdit} onKeyUp={(e: any) => setContact(e.target.value.replace(/\D/g, ""))} readOnly={otpSent} {...register('seller_contact', { required: "Contact No is required", pattern: { value: /^[0-9]{10}$/i, message: "Invalid Contact No, It should have 10 digits."}})} id="contact" type="number" autoComplete="contact"  className={`${errors.seller_contact ? 'border-[#990000] shadow-[#9900005c]' : 'border-gray-300'} border-1 shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm disabled:bg-gray-200`} placeholder="Phone Number" />
                                {/* <input disabled={!isEdit} value={contact} onChange={(e: any) => setContact(e.target.value.replace(/\D/g, ""))} id="contact-no" name="contact" type="text" autoComplete="contact" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Contact No" /> */}
                                {isEdit && (contact != '' && contact.toString().length == 10 && !otpSent) && <i onClick={sendOTPNow} className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-primary-color cursor-pointer right-0 rounded text-white`}>SEND OTP</i>}
                                {!isEdit && <i className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-0 rounded text-white`} onClick={editContact}>EDIT</i>}
                                <span className='absolute top-1 right-2 text-2xl' id="contact-error-title">
                                    {errors.seller_contact && <p className='text-[#990000]' role="alert"><i className="fa fa-info-circle"></i></p>}
                                </span>
                            </div>
                            {errors.seller_contact && <ReactTooltip
                                anchorId="contact-error-title"
                                place="bottom"
                                variant="error"
                                content={errors.seller_contact?.message}
                            />}
                            {/* <small className='font-semibold text-gray-600'>Phone Number is required to become a seller with {process.env.COMPANY_NAME}, We also verify your phone number.</small> */}
                        </div>
                        {/* */}
                        <div>
                            <label htmlFor="contact_otp" className={`${errors.contact_otp ? 'text-[#990000]' : ''} font-semibold`}>OTP</label>
                            <div className='relative'>                                
                                <input disabled={!otpSent} {...register('contact_otp', { required: "OTP is required", pattern: { value: /^[0-9]{6}$/i, message: "Invalid OTP, It should have 6 digits."}})} id="contact_otp" name="contact_otp" autoComplete="contact_otp" className={`${errors.contact_otp ? 'border-[#990000] shadow-[#9900005c]' : 'border-gray-300'} border-1 shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm disabled:bg-gray-200`} placeholder="OTP" />
                                <span className='absolute top-1 right-2 text-2xl' id="contact_otp-error-title">
                                    {errors.contact_otp && <p className='text-[#990000]' role="alert"><i className="fa fa-info-circle"></i></p>}
                                </span>
                            </div>
                            {errors.contact_otp && <ReactTooltip
                                anchorId="contact_otp-error-title"
                                place="bottom"
                                variant="error"
                                content={errors.contact_otp?.message}
                            />}
                        </div>
                        {otpSent && <>
                        <div className="col-span-3"> 
                            <div className="timer text-right">
                                {waitCounter <= 0 && <button type="button" onClick={resendOTP} className="cursor-pointer text-normal text-primary-color border-2 border-primary-color rounded-[6px] px-[35px] py-[5px] font-normal">Resend OTP</button>}
                                {waitCounter > 0 && <div>Please, Wait <a href="#" className="text-[18px] text-[#E38100] font-semibold"> <i className="fa fa-clock-o"></i> {waitCounter < 10 ? "0" : ""}{waitCounter}</a> second(s) for new OTP request.</div>}
                            </div>
                        </div>
                        </>}
                        {/*  ⏰ </>} */}
                    </div>
                    {/* <div className='mt-4 flex flex-row-reverse'>
                        <button type="submit" className="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-6 pl-12 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute opacity-50 inset-y-0 left-0 flex items-center pl-3">
                                <i className="fa fa-2x fa-lock "></i>
                            </span>
                            Submit Now
                        </button>
                    </div> */}
                </div>
                <div className="button-s text-right pt-[20px]">                   
                    <button type="submit" className="cursor-pointer text-normal text-[#FFFFFF] bg-[#1E2A78] hover:bg-primary-color hover:text-white rounded-[6px] px-[46px] py-[10px] font-normal">Submit Now</button>
                </div>
                <div className="button-s text-right mt-20">
                    <a onClick={() => stepCountHandler(1)} className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">BACK</a>
                    {primaryId && <a onClick={() => stepCountHandler(3)} className="cursor-pointer bg-primary-color text-white rounded-[6px] px-[46px] py-[10px] font-normal">NEXT</a>}
                </div>
            </form>
        </div>
    </>);
}