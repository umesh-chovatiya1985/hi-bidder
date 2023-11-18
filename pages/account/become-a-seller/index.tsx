import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SellerRegister from '../../../Components/Layout/AccountSidebar/SellerRegister';
import { Footer } from '../../../Components/Layout/Footer/Footer';
import { Header } from '../../../Components/Layout/Header/Header';
import CategoryMenu from '../../../Components/Reusable/CategoryMenu';
import AddressVerify from '../../../Components/SellerComponents/AddressVerify';
import EmailVerify from '../../../Components/SellerComponents/EmailVerify';
import PhoneVerify from '../../../Components/SellerComponents/PhoneVerify';
import SellingRequired from '../../../Components/SellerComponents/SellingRequired';
import { getAPIUrl } from '../../../lib/useLocalStorage';

const BecomeASeller: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
    const { data: session } = useSession();
    const router = useRouter();
    const [user, setUser] = useState(null);

    const [stepNo, setStepNo] = useState(1);

    const getUserInfo = async () => {
        const userInfo = await fetch(mainApiUrl+"user/get-user-info");
        const userJson = await userInfo.json();
        if(userInfo.ok){
            if(userJson.status == '1'){
                setUser(userJson.records);
            }
        }
    }

    useEffect(() => { 
        getUserInfo();
        if(!session){
            router.push({
                pathname: '/login',
                query: { returnUrl: router.asPath }
            });
        }   
        window.scrollTo(0, 0); 
    }, [session, stepNo]);

    const changeStepNo = (count: any) => {
        setStepNo(count);
    }

    const changeStepBack = (count: any) => {
        if(stepNo > count){
            setStepNo(count);
        }
    }

   return (
        session && (<div>
            <main>
                <Header headerProps={headerProps}></Header>
                <CategoryMenu />
                <section id="seller-details">
                    <div className="container-fluid pt-5 px-5">
                        <div className="row border-1 shadow rounded-[8px]">
                            <div className="flex flex-wrap justify-between p-0">
                                <SellerRegister clickEvent={changeStepBack} currentIndex={stepNo}></SellerRegister>
                                <div className="w-3/4 pl-6">
                                    <div className="p-[40px]">
                                        {stepNo == 1 && user && <SellingRequired user={user} clickEvent={changeStepNo}></SellingRequired>}
                                        {stepNo == 2 && user && <PhoneVerify user={user} clickEvent={changeStepNo}></PhoneVerify>}
                                        {stepNo == 3 && user && <EmailVerify user={user} clickEvent={changeStepNo}></EmailVerify>}
                                        {stepNo == 4 && <AddressVerify user={user} clickEvent={changeStepNo}></AddressVerify>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>)
   );
}

export default BecomeASeller;