import { NextPage } from 'next';
import AccountLayout from './AccountLayout';
const AddPayment: NextPage = () => {

   const headerProps = {pageTitle: 'Add Payment page',pageDescription: 'Hi Bidder! Add payment page'};
   return (
    <AccountLayout headerProps={headerProps}>
        <div className="container-fluid px-8 border-b-2 border-[#D7D7D7]">
            <div className="row">
                <div className="flex flex-wrap">
                    <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
                        <p>Add Credit/Debit Card</p>
                    </div>
                    <div
                        className="w-1/2 h-[70px] text-right text-[20px] text-[500] text-[#1E2A78] pt-[18px]">
                        <a href="#">Save Card</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="user-info py-[10px]">
            <div className="p-8 w-1/2">
                <form action="#" method="POST">
                    <div className="overflow-hidden sm:rounded-md">
                        <div className="bg-white">
                            <div className="pb-[20px]">
                                <label htmlFor="first-name" className="block text-[18px] text-[400] text-[#3a3a3acc
                                            ] opacity-80">Name on Card</label>
                                <input type="text" name="first-name" id="first-name"
                                    autoComplete="family-name" value="e.g John Doe"
                                    className="text-[#C4C4C4] mt-1 block text-[18px] text-[400] text-[#3a3a3acc
                                            ] w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-[18px] text-[#3A3A3A] text-[400]" />
                            </div>
                            <div className="pb-[20px]">
                                <label htmlFor="last-name" className="block text-[18px] text-[400] text-[#3a3a3acc
                                            ] opacity-80">Card Number</label>
                                <input type="text" name="first-name" id="first-name"
                                    autoComplete="family-name" value="XXXX - XXXX - XXXX - XXXX"
                                    className="text-[#C4C4C4] mt-1 block text-[18px] text-[400] text-[#3a3a3acc
                                            ] w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-[18px] text-[#3A3A3A] text-[400]" />
                            </div>
                            <div className="part pb-[20px]">
                                <div className="row p-0">
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-1/2 pb-[10px]">
                                            <div className='pr-2'>
                                                <label htmlFor="last-name" className="block text-[18px] text-[400] text-[#3a3a3acc
                                                ] opacity-80">Expiry Date</label>
                                                <input type="text" name="first-name" id="first-name"
                                                    autoComplete="family-name" value="MM / YY"
                                                    className="text-[#C4C4C4] mt-1 block text-[18px] text-[400] text-[#3a3a3acc
                                                    ] w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-[18px] text-[#3A3A3A] text-[400]" />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pb-[10px]">
                                            <div className='pl-2'>
                                                <label htmlFor="last-name" className="block text-[18px] text-[400] text-[#3a3a3acc
                                                ] opacity-80">CVV</label>
                                                <input type="text" name="first-name" id="first-name"
                                                    autoComplete="family-name" value=""
                                                    className="text-[#C4C4C4] mt-1 block text-[18px] text-[400] text-[#3a3a3acc
                                                ] w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 text-[18px] text-[#3A3A3A] text-[400]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex h-5 items-center">
                                    <input id="comments" name="comments" type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> 
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="comments" className="text-[18px] text-[400] text-[#3a3a3acc
                                ] opacity-80">Set as a primay card</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-1/2"></div>
        </div>
    </AccountLayout>
   );
}

export default AddPayment;