import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import AccountSideBar from '../../Components/Layout/AccountSidebar/sidebar';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { getQueryParams } from '../../lib/useLocalStorage';

export default function AccountLayout({ children, headerProps }: any) {
    const headInfo = headerProps ?? {pageTitle: "Hi bidder pages", pageDescription: "Hi Bidder descriptions"};
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => { 
        if(!session){
            const returnParams = getQueryParams();
            router.push({
                pathname: '/login',
                query: { returnUrl: returnParams}
            });
        }    
    }, [session]);

    return (
        // <UserRouterGuard>
        session && (<div>            
            <ToastContainer />
            <main>
                <Header headerProps={headInfo}></Header>
                    <CategoryMenu />
                    <section id="account-details" className="py-[25px]">
                        <div className="container-fluid px-14">
                            <div className="row">
                                <div className="flex flex-wrap justify-between">
                                    <div className="w-1/5 pr-6">
                                        <AccountSideBar />
                                    </div>
                                    <div className="w-4/5 border-solid border-1 border-[#D7D7D7] rounded-[6px] font-[500] text-[#3A3A3A]">
                                        {children}
                                    </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>)
        // </UserRouterGuard>
    );  
}
