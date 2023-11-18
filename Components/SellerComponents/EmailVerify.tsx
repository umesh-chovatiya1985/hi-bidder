import { useState } from "react";

export default function EmailVerify({ clickEvent, user }: any){ 

    const otpWait = parseInt(process.env.OTP_WAIT_TIME);
    const [waitCounter, setWaitCounter] = useState(otpWait);
    const [otpSent, setOtpSent] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [emailId, setEmailId] = useState(user.email);
    const [validEmail, setValidEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        setOtpSent(true);
        setWaitCounter(otpWait);
        startCounter();
    }

    const editContact = () => {
        clearCounterInterval();
        setEmailId("");
        setIsEdit(true);
        setOtpSent(false);
    }

    const sendOtp = async () => {
        setIsLoading(true);        
        setOtpSent(!otpSent);
        startCounter();
        setWaitCounter(otpWait);
        setIsLoading(false);
        setIsEdit(false);
     }
     const sendOTPNow = () => {
        sendOtp();
     }

     const setEmailHandler = (e: any) => {
        setEmailId(e.target.value); 
        emailValidation(e.target.value);
     }

     const emailValidation = (regEmail: any) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!regEmail || regex.test(regEmail) === false){
            setValidEmail(false);
            return;
        }
        setValidEmail(true);
    }

    return (
    <>
        <p className="text-[22px] text-[#3A3A3A] font-semibold">Email Id Verification</p>
        <p className="text-[16px] text-[#808089] pb-[50px]">Your number may be used in the future for shipping and customs purposes.</p>
        <div className="max-w-[50%] md:max-w-full">
            <form name="myForm" method="post">
                <div className="pb-[35px]">
                    <div className='relative'>
                        <label htmlFor="email-address" className='font-semibold'>Email Id</label>
                        <div className='relative'>
                            <input disabled={!isEdit} value={emailId} onChange={setEmailHandler} id="email-address" name="email" type="email" autoComplete="email" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                            {validEmail && isEdit && (emailId != '' &&  !otpSent) && <i onClick={sendOTPNow} className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-primary-color cursor-pointer right-[2px] rounded text-white`}>SEND OTP</i>}
                            {!isEdit && <i className={`z-10 absolute place-items-center inline-flex px-4 top-0 bottom-0 bg-indigo-400 cursor-pointer right-[2px] rounded text-white`} onClick={editContact}>EDIT</i>}
                            {emailId != '' && isEdit && !validEmail && <span className={`z-10 absolute place-items-center inline-flex px-2 top-0 bottom-0 cursor-pointer right-[2px] rounded text-[#990000]`}><i className="fa fa-info-circle mr-2"></i> Invalid Email</span>}
                        </div>
                    </div>
                    {otpSent && <>
                        <div className='mt-3 relative'>
                            <label htmlFor="contact_otp" className='font-semibold'>OTP</label>
                            <input disabled={!otpSent} id="contact_otp" name="contact_otp" type="number" autoComplete="contact_otp" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="OTP" />
                        </div>
                        <div className="timer pt-[15px] text-right">
                            {waitCounter <= 0 && <button type="button" onClick={resendOTP} className="cursor-pointer text-normal text-[#FFFFFF] bg-[#1E2A78]/[70%] rounded-[6px] px-[35px] py-[5px] font-normal">Resend OTP</button>}
                            {waitCounter > 0 && <div>Please, Wait <a href="#" className="text-[18px] text-[#E38100] font-semibold"> <i className="fa fa-clock-o"></i> {waitCounter < 10 ? "0" : ""}{waitCounter}</a> second(s) for new OTP request.</div>}
                        </div>
                    </>}
                </div>
                <div className="button-s text-right mt-12">
                    <a onClick={() => stepCountHandler(2)} className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">BACK</a>
                    <a onClick={() => stepCountHandler(4)} className="cursor-pointer text-[#FFFFFF] bg-[#1E2A78] hover:bg-primary-color hover:text-white rounded-[6px] px-[46px] py-[10px] font-normal">NEXT</a>
                </div>
            </form>
        </div>
    </>);
}