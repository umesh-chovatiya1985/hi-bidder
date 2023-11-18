export default function SellerRegister({ clickEvent, currentIndex }: any) {

    const stepCountHandler = (number: any) => {
        clickEvent(number);
    }

    return (
        <div className="w-1/4 bg-[#F1F3FF] rounded-l-lg p-[30px] border-r-2">
            <div className="sticky top-4">
                <h2 className="text-[28px] text-gray-700 font-semibold">Become a seller</h2>
                <p className="text-[18px] text-gray-400 font-normal">We provide you platform to put bulk of products for auction.</p>
                <div className="pt-[20px]">                    
                    <div className="pt-[20px]" onClick={() => stepCountHandler(1)}>
                        <span className={`px-[11px] py-[2px] border-2 ${currentIndex >= 1 ? 'bg-aeliya-blue border-anchor-blue text-white':'bg-white border-[#1E2A78] text-black'} rounded-full  text-[22px]`}>1</span>
                        <a className={`cursor-pointer text-[20px] ${currentIndex >= 1 ? 'text-primary-color':'text-[#3A3A3A]'} font-normal pl-[20px]`}>Selling Required Details</a>
                        <p className={`w-[7px] h-[7px] ml-[14px] mt-[20px] ${currentIndex >= 2 ? 'bg-aeliya-blue':'bg-[#3A3A3A]'} rounded-full`}></p>
                    </div>
                    <div className="pt-[15px]" onClick={() => stepCountHandler(2)}>
                        <span className={`px-[11px] py-[2px] border-2 ${currentIndex >= 2 ? 'bg-aeliya-blue border-primary-color text-white':'bg-white border-[#1E2A78] text-black'} rounded-full  text-[22px]`}>2</span>
                        <a className={`cursor-pointer text-[20px] ${currentIndex >= 2 ? 'text-primary-color':'text-[#3A3A3A]'} font-normal pl-[20px]`}>Phone Verification</a>
                        <p className={`w-[7px] h-[7px] ml-[14px] mt-[20px] ${currentIndex >= 3 ? 'bg-aeliya-blue':'bg-[#3A3A3A]'} rounded-full`}></p>
                    </div>
                    <div className="pt-[15px]" onClick={() => stepCountHandler(3)}>
                        <span className={`px-[11px] py-[2px] border-2 ${currentIndex >= 3 ? 'bg-aeliya-blue border-anchor-blue text-white':'bg-white border-[#1E2A78] text-black'} rounded-full  text-[22px]`}>3</span>
                        <a className={`cursor-pointer text-[20px] ${currentIndex >= 3 ? 'text-primary-color':'text-[#3A3A3A]'} font-normal pl-[20px]`}>Email
                            Verification</a>
                        <p className={`w-[7px] h-[7px] ml-[14px] mt-[20px] ${currentIndex >= 4 ? 'bg-aeliya-blue':'bg-[#3A3A3A]'} rounded-full`}></p>
                    </div>
                    <div className="pt-[15px]" onClick={() => stepCountHandler(4)}>
                        <span className={`px-[11px] py-[2px] border-2 ${currentIndex >= 4 ? 'bg-aeliya-blue border-anchor-blue text-white':'bg-white border-[#1E2A78] text-black'} rounded-full  text-[22px]`}>4</span>
                        <a className={`cursor-pointer text-[20px] ${currentIndex >= 4 ? 'text-primary-color':'text-[#3A3A3A]'} font-normal pl-[20px]`}>Address Information</a>
                    </div>
                </div>
            </div>
        </div>
    )
}