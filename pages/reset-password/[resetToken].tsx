import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CustomLoader from '../../Admin/Components/CustomLoader';
import { Footer } from '../../Components/Layout/Footer/Footer';
import { Header } from '../../Components/Layout/Header/Header';
import CategoryMenu from '../../Components/Reusable/CategoryMenu';
import { getAPIUrl } from '../../lib/useLocalStorage';

const ResetPassword: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const router = useRouter();
    const { resetToken } = router.query;

    const checkUserToken = async () => {
      setIsLoading(true);
      const res = await fetch(mainApiUrl+"user/reset-password/validate-token", {
        method: "POST",
        body: JSON.stringify({userToken: resetToken, user: "User"}),
        headers: { "Content-Type": "application/json" }
      })    
      const data = await res.json();
      setIsLoading(false);
      return data;
    }
    
    useEffect(() => {
      if(resetToken){
        checkUserToken().then((response: any) => {
          if(response.status == 0){
            setInvalidToken(true);
          }
        });
      }
    }, [resetToken]);

    const [invalidToken, setInvalidToken] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [adminLogin, setAdminLogin] = useState({
      "password": "",
      "retype_password": ""
    });
  
    const inputHandler = (e: any) => {
      setAdminLogin({...adminLogin, [e.target.name]: e.target.value});
    }
  
    const submitEventHandler = async(e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if(adminLogin.password == ""){
            setLoginError("Opps! New Password is required field.");
        }
        else if(adminLogin.retype_password == ""){
            setLoginError("Opps! Retype New Password is required field.");
        }
        else if(adminLogin.password !== adminLogin.retype_password){
            setLoginError("Opps! New Password and Retype New Password must have same.");
        }
        else {
            const respo = await fetch(mainApiUrl+"user/reset-password/update-password", {
            method: "POST",
            body: JSON.stringify(adminLogin),
            headers: { "authorization": "Bearer "+resetToken, "Content-Type": "application/json" }
            })
            const response = await respo.json();
            if(respo.ok && response.status == '1'){
               setResetSuccess(true);
            }
        }
        setIsLoading(false);
    }

     const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Admin login',pageDescription: process.env.COMPANY_NAME! + ' - Admin access need for login'};
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
                                            <p className='text-xl text-green-500 capitalize'>Request successfully!</p>
                                        </div>
                                        <div className="relative text-center w-full">
                                            <i className="fa text-green-500 fa-5x fa-check-square-o"></i>
                                            <div className='mt-2 font-semibold'>Password reset successfully</div>
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
                                    {!invalidToken && !resetSuccess &&
                                    <>
                                        <div className='flex'>
                                            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                                            <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">Reset your new password</h2>
                                        </div>
                                        {loginError && <>
                                            <div className="alert alert-danger pt-2 pb-2">
                                                <i className="fa fa-info-circle mr-3"></i>
                                                {loginError}
                                            </div>
                                        </>}
                                        <form className="mt-8 space-y-6" action="#" method="POST">
                                            <input type="hidden" name="remember" value="true" />
                                            <div className="-space-y-px rounded-md shadow-sm">
                                                <div>
                                                    <label htmlFor="password" className="sr-only">New Password</label>
                                                    <input value={adminLogin.password} onChange={inputHandler} id="password" name="password" type="password" autoComplete="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="New Password" />
                                                </div>
                                            </div>
                                            <div className="-space-y-px rounded-md shadow-sm">
                                                <div>
                                                    <label htmlFor="retype-password" className="sr-only">Retype New Password</label>
                                                    <input value={adminLogin.retype_password} onChange={inputHandler} id="retype-password" name="retype_password" type="password" autoComplete="retype_password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Retype New Password" />
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={submitEventHandler} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                    Reset Password now
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                    }
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

export default ResetPassword;