import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AccountLayout from './AccountLayout';
const Payment: NextPage = () => {
   const headerProps = {pageTitle: 'Hi Bidder : Payment Page',pageDescription: 'Hi, this is a payment page of bidder user'};
   return (
        <AccountLayout headerProps={headerProps}>
            <div className="container-fluid px-8 border-b-2 border-[#D7D7D7]">
                <div className="row">
                    <div className="flex flex-wrap">
                        <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
                            <p>Payment</p>
                        </div>
                        <div
                            className="w-1/2 h-[70px] text-right text-[20px] text-[500] text-[#1E2A78] pt-[18px]">
                            <Link href={'/account/add-payment'}>
                                <a>+ Add Card </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div  className='h-[700px] flex items-center justify-center'>
                <div className="user-info text-center">
                    <div className="relative py-16">
                        <div className='relative w-[150px] h-[120px] m-auto'>
                            <Image layout='fill' src="/img/3.png" alt="Avatar of Jonathan Reinink" />
                        </div>
                        <div className='mt-6'>
                            <p>Save Your Credit/Debit Cards</p>
                            <p>It's convenient to pay with saved cards. Your card information will be secure</p>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>    
   );
}

export default Payment;