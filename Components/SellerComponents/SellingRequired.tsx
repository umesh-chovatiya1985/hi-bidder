import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { toast, ToastContainer } from "react-toastify";
import { getAPIUrl } from "../../lib/useLocalStorage";

interface sellingForm {
    company_name: String,
    company_number: String,
    pancard_number: String,
    gstin_number: String
}

export default function SellingRequired({ clickEvent, user }: any){ 
    console.log(user);
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [primaryId, setPrimaryId] = useState(null);
    const [formControls, setFormControls] = useState({
        user_id: user._id,
        seller_type: "Privately",
        date_of_birth: null,
        company_name: "",
        company_number: "",
        pancard_number: "",
        gstin_number: ""
    });
    const formHandler = (e: any) => {
        setFormControls({
            ...formControls,
            [e.target.name]: e.target.value
        })
    }
    const saveSellingRequired = async () => {
        const data = formControls;
        data.date_of_birth = startDate;
        setIsLoading(true);
        let Url = mainApiUrl+"seller";
        let Method = "POST";
        if(primaryId){
            Url = mainApiUrl+"seller/"+primaryId;
            Method = "PUT";
        }
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
                setPrimaryId(null);
                getSellingRequired();
            }
        }
        setIsLoading(false);
    }
    const stepCountHandler = (number: any) => {
        // console.log(formControls);
        clickEvent(number);
    }
    const getSellingRequired = async () => {
        setIsLoading(true);
        const sellerRespo = await fetch(mainApiUrl+"seller/seller-by-user/"+user._id);
        const sellerInfo = await sellerRespo.json();
        if(sellerRespo.ok){
            if(sellerInfo.status == '1'){
                setFormControls(
                    {
                        user_id: user._id,
                        seller_type: sellerInfo.record.seller_type,
                        date_of_birth: sellerInfo.record.date_of_birth,
                        company_name: sellerInfo.record.company_name,
                        company_number: sellerInfo.record.company_number,
                        pancard_number: sellerInfo.record.pancard_number,
                        gstin_number: sellerInfo.record.gstin_number
                    }
                );
                setPrimaryId(sellerInfo.record._id);
                setStartDate(new Date(sellerInfo.record.date_of_birth));
            }
        }
        setIsLoading(false);
    }
    useEffect(() => {
        getSellingRequired();
    }, []);
    return (<>
        {isLoading && <CustomLoader />}
        <ToastContainer />
        <p className="text-[22px] text-[#3A3A3A] font-semibold">Selling Required Details</p>
        <p className="text-[16px] text-[#808089] pb-[20px]">Give us some information about auction items and information</p>
        <form action="#" method="POST">
            <div>
                <div className="bg-white">
                    <div className="max-w-[50%] md:max-w-full">
                        <div className="col-span-6 sm:col-span-3 pt-[20px]">
                            <p className='font-semibold'>How will you be selling on {process.env.COMPANY_NAME}<i className="fa text-[20px] fa-info-circle pl-[10px]"></i></p>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="flex shadow items-center pl-4 rounded border border-gray-200 dark:border-gray-700 py-2">
                                    <div className="flex items-center h-5 mr-2">
                                        <input onChange={formHandler} checked={formControls.seller_type == 'Privately' ? true : false} id="Privately" name="seller_type" aria-describedby="helper-radio-text" type="radio" value="Privately" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-500 focus:ring-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <label htmlFor="Privately" className="ml-2 text-sm">
                                        <p className="font-medium text-gray-900 dark:text-gray-300">Privately</p>
                                        <p id="helper-radio-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">Put your items without GST</p>
                                    </label>
                                </div>
                                <div className="flex shadow items-center pl-4 rounded border border-gray-200 dark:border-gray-700 py-2">
                                    <div className="flex items-center h-5 mr-2">
                                        <input onChange={formHandler} checked={formControls.seller_type == 'Professionally' ? true : false} id="Professionally" name="seller_type" aria-describedby="helper-radio-text" type="radio" value="Professionally" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-500 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <label htmlFor="Professionally" className="ml-2 text-sm">
                                        <p className="font-medium text-gray-900 dark:text-gray-300">Professionally</p>
                                        <p id="helper-radio-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">GST is compalsory for Professionally.</p>
                                    </label>
                                </div>
                            </div>
                        </div>                        
                        <div className='mt-4 relative'>
                            <label htmlFor="company-name" className="font-semibold">
                                Company Name
                            </label>
                            <input value={formControls.company_name} onChange={formHandler} id="company-name" name="company_name" type="text" autoComplete="company_name" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Company Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className='mt-4 relative'>
                                <label htmlFor="country" className="font-semibold">
                                    {formControls.seller_type == 'Professionally' ? <span>Date of corporation</span> : <span>Date of birth</span>}
                                </label>
                                <DatePicker
                                    placeholderText={formControls.seller_type == 'Professionally' ? "Date of corporation" : "Date of birth"}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                    className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                                {/* <div className="grid grid-cols-3 gap-2">
                                    <select id="country" name="country" autoComplete="country-name" className="mt-1 block shadow text-[18px] font-normal text-[#3a3a3acc] w-full rounded-md border border-gray-300 bg-white px-3 py-2">
                                        <option>DD</option>
                                    </select>
                                    <select id="country" name="country" autoComplete="country-name" className="mt-1 block shadow text-[18px] font-normal text-[#3a3a3acc] w-full rounded-md border border-gray-300 bg-white px-3 py-2">
                                        <option>MM</option>
                                    </select>
                                    <select id="country" name="country" autoComplete="country-name" className="mt-1 block shadow text-[18px] font-normal text-[#3a3a3acc] w-full rounded-md border border-gray-300 bg-white px-3 py-2">
                                        <option>YYYY</option>
                                    </select>
                                </div> */}
                            </div>
                            <div className='mt-4 relative'>
                                <label htmlFor="company-number" className="font-semibold">Company Number</label>
                                <input value={formControls.company_number} onChange={formHandler} id="company-number" name="company_number" type="text" autoComplete="company_number" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Company Number" />
                            </div>
                            <div className='mt-2 relative'>
                                <label htmlFor="pancard-number" className="font-semibold">PANCard Number</label>
                                <input value={formControls.pancard_number} onChange={formHandler} id="pancard-number" name="pancard_number" type="text" autoComplete="pancard_number" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="PANCard Number" />
                            </div>
                            <div className='mt-2 relative'>
                                <label htmlFor="gstin-number" className="font-semibold">GSTin Number</label>
                                <input value={formControls.gstin_number} onChange={formHandler} id="gstin-number" name="gstin_number" type="text" autoComplete="gstin_number" required className="shadow relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="GSTin Number" />
                            </div>                        
                        </div>
                        <div className="button-s text-right mt-20">
                            {/* <a onClick={() => stepCountHandler(3)} className="cursor-pointer text-[#1E2A78] pr-[30px] font-semibold">BACK</a> */}
                            <a onClick={saveSellingRequired} className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal mr-3">Submit Now</a>
                            {primaryId && <a onClick={() => stepCountHandler(2)} className="cursor-pointer hover:bg-primary-color hover:text-white rounded-[6px] px-[46px] py-[10px] font-normal">NEXT</a>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>);
}