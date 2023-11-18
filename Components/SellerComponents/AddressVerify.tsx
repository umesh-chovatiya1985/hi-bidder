import mongoose from "mongoose";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { getAPIUrl } from "../../lib/useLocalStorage";
import FormControl from "../Reusable/FormControl";

interface selleraddress {
    seller_id?: mongoose.Schema.Types.ObjectId,
    country?: String,
    state?: String,
    city?: String,
    address_one?: String,
    address_two?: String,
    building?: String,
    pin_code?: String,
}

export default function AddressVerify({ clickEvent, user }: any){ 
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<selleraddress>();
    const [isLoading, setIsLoading] = useState(false);
    const [primaryId, setPrimaryId] = useState(null);
    const stepCountHandler = (number: any) => {
        clickEvent(number);
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
                setValue("seller_id", sellerInfo.record._id);
                if(sellerInfo.address){
                    setPrimaryId(sellerInfo.address._id);
                    Object.entries(sellerInfo.address).forEach(([name, value]) => setValue(name as keyof selleraddress, value));
                }
            }
        }
        setIsLoading(false);
    }

    const onSubmit = async (data: selleraddress) => {
        setIsLoading(true);
        let Url = "seller/seller-address";
        let Method = "POST";
        if(primaryId){
            Url = "seller/seller-address?_id="+primaryId;
            Method = "PUT";
        }
       const saveAddress = await fetch(mainApiUrl+Url, {
            method: Method,
            body: JSON.stringify(data),
            headers: { "Content-Type" : "application/json" }
       });
       const addressJson = await saveAddress.json();
       if(saveAddress.ok){
            if(addressJson.status == 1){
                toast.success(addressJson.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
       }
       if(addressJson.error){
            toast.error(addressJson.error.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
       }
       setIsLoading(false);
    }

    return (
        <>
            <ToastContainer />
            {isLoading && <CustomLoader />}
            <p className="text-[22px] pb-[50px] text-[#3A3A3A] font-semibold">Address Information</p>
            <div className="max-w-[50%] md:max-w-full">
                <form onSubmit={handleSubmit(onSubmit)} method="POST">
                    <div className="overflow-hidden sm:rounded-md">
                        <div className="bg-white">
                            <div className="pb-[15px]">
                                <div>
                                    <label htmlFor="email-address" className='font-semibold'>Country *</label>
                                    <select name="country" id="country" {...register("country", {required: "Country is required field!"})} defaultValue="" className="mt-1 block shadow text-[18px] font-normal text-[#3a3a3acc] w-full rounded-md border border-gray-300 bg-white px-3 py-2">
                                        <option>Select Country</option>
                                        <option value='India'>India</option>
                                        <option value='Canada'>Canada</option>
                                        <option value='United Kingdom'>United Kingdom</option>
                                    </select>
                                </div>
                                <div className='mt-4 relative'>
                                    <FormControl register={register} errors={errors} type="text" formName="city" formLabel="Town/City *" validation={{required: "Town/City is required field!"}} />
                                    {/* <label htmlFor="town-city" className='font-semibold'>Town/City</label>
                                    <input id="town-city" name="city" type="text" autoComplete="city" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Town/City" /> */}
                                </div>
                                <div className='mt-4 relative'>
                                    <FormControl register={register} errors={errors} type="text" formName="address_one" formLabel="Address line 1 *" validation={{required: "Address is required field!"}} />
                                    {/* <label htmlFor="address-1" className='font-semibold'>Address line 1</label>
                                    <input id="address-1" name="address_one" type="text" autoComplete="address-one" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Address line 1" /> */}
                                </div>
                                <div className='mt-4 relative'>
                                    <FormControl register={register} errors={errors} type="text" formName="address_two" formLabel="Address line 2" validation={{}} />
                                    {/* <label htmlFor="address-2" className='font-semibold'>Address line 2</label>
                                    <input id="address-2" name="address_two" type="text" autoComplete="address-two" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Address line 2" /> */}
                                </div>
                                <div className='mt-4 relative'>
                                    <FormControl register={register} errors={errors} type="text" formName="building" formLabel="Apt / Suite / Building *" validation={{required: "Apt / Suite / Building is required field!"}} />
                                    {/* <label htmlFor="apt-building" className='font-semibold'>Apt / Suite / Building</label>
                                    <input id="apt-building" name="apt_building" type="apt-building" autoComplete="apt_building" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Apt / Suite / Building" /> */}
                                </div>
                                <div className='mt-4 relative'>
                                    <FormControl register={register} errors={errors} type="text" formName="state" formLabel="State / Province / Region *" validation={{required: "State / Province / Region is required field!"}} />
                                    {/* <label htmlFor="state" className='font-semibold'>State / Province / Region</label>
                                    <input id="state" name="state" type="text" autoComplete="state" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="State / Province / Region" /> */}
                                </div>
                                <div className='mt-4 relative'>
                                    <FormControl register={register} errors={errors} type="text" formName="pin_code" formLabel="Postal Code *" validation={{required: "Postal Code is required field!"}} />
                                    {/* <label htmlFor="pin-code" className='font-semibold'>Postal Code</label>
                                    <input id="pin-code" name="pin_code" type="text" autoComplete="pin_code" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Postal Code" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-s text-right mt-20">
                        <a onClick={() => stepCountHandler(3)} className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">BACK</a>
                        <button type="submit" className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal">
                            {!primaryId && <>Submit Now</>}
                            {primaryId && <>Update Now</>}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}