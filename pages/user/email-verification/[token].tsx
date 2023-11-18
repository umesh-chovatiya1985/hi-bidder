import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomLoader from '../../../Admin/Components/CustomLoader';
import { Footer } from '../../../Components/Layout/Footer/Footer';
import { Header } from '../../../Components/Layout/Header/Header';
import CategoryMenu from '../../../Components/Reusable/CategoryMenu';
import { getAPIUrl } from '../../../lib/useLocalStorage';
const emailVerification: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const router = useRouter();
    const { token } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [invalidToken, setInvalidToken] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const checkUserToken = async () => {
        setIsLoading(true);
        const res = await fetch(mainApiUrl+"user/email-verification/validate-token", {
          method: "POST",
          body: JSON.stringify({userToken: token, user: "User"}),
          headers: { "Content-Type": "application/json" }
        })    
        const data = await res.json();
        setIsLoading(false);
        if(res.ok){
            if(data.status == '1'){
                setResetSuccess(true);
            }
            if(data.status == 0){
                setInvalidToken(true);
            }
        }
    }

    useEffect(() => {
        if(token){
            checkUserToken();
        }
    }, [token]);

   const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
   return (
    <div>
        <main>
            <Header headerProps={headerProps} headerTitle='Testing titles' anotherTitle='Another Titles'></Header>
            <CategoryMenu />
            <div>
                <div className="relative z-10">
                    <div className="inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                            <div className="w-full border-1 max-w-md space-y-6 bg-white p-4 rounded-xl relative">
                                {isLoading && <CustomLoader />}
                                {resetSuccess && <>
                                    <div className="flex-auto px-4 lg:px-10 py-4">
                                    <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                                        <p className='text-xl text-green-500 capitalize'>Email verified successfully!</p>
                                    </div>
                                    <div className="relative text-center w-full">
                                        <i className="fa text-green-500 fa-5x fa-check-square-o"></i>
                                        <div className='mt-2 font-semibold'>Email verified successfully</div>
                                        <p className='mb-4'>Your password has been reset successfully. If you did not take this action, kindly inform us on immediately or block you account.</p>
                                        <Link href={'/login'}>
                                            <a className='bg-blue-800 text-white text-sm font-bold uppercase px-6 py-2 rounded shadow mr-1 mb-1 w-full'>Login Now</a>
                                        </Link>
                                    </div>
                                    </div>
                                </>}
                                {invalidToken && <>
                                    <div className="flex-auto px-4 lg:px-10 py-4">
                                    <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                                        <p className='text-xl text-red-500 capitalize'>Request failed!</p>
                                    </div>
                                    <div className="relative text-center w-full">
                                        <i className="fa text-red-500 fa-5x fa-exclamation-triangle"></i>
                                        <div className='mt-2 font-semibold'>Sorry! Token is not valid or expired</div>
                                        <p className='mb-4'>We are sorry to inform that provided token is expired or not valid. Please, Try again for reset password. We have already inform that reset link is valid only for 48 hours.</p>
                                        <Link href={'/account/forgot-password'}>
                                            <a className='bg-blue-800 text-white text-sm font-bold uppercase px-6 py-2 rounded shadow mr-1 mb-1 w-full'>Forgot password</a>
                                        </Link>
                                    </div>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer></Footer>
    </div>
   );
}

export default emailVerification;