import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CustomLoader from '../../../Admin/Components/CustomLoader';
import { getAPIUrl } from '../../../lib/useLocalStorage';

const ResetAdminPassword: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const router = useRouter();
    const { resetToken } = router.query;

    const checkUserToken = async () => {
      setIsLoading(true);
      const res = await fetch(mainApiUrl+"user/reset-password/validate-token", {
        method: "POST",
        body: JSON.stringify({userToken: resetToken, user: 'Admin'}),
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
        console.log(adminLogin);
        const respo = await fetch(mainApiUrl+"user/reset-password/update-password", {
          method: "POST",
          body: JSON.stringify(adminLogin),
          headers: { "authorization": "Bearer "+resetToken, "Content-Type": "application/json" }
        })
        const response = await respo.json();
        if(respo.ok && response.status == '1'){
          setResetSuccess(true);
        }
        setIsLoading(false);
    }


  
     const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Admin login',pageDescription: process.env.COMPANY_NAME! + ' - Admin access need for login'};
     return (
      <>
        <Head>
          <title>{headerProps.pageTitle}</title>
          <meta name="description" content={headerProps.pageDescription} />
        </Head>
        <div className='login-backgound bg-no-repeat bg-cover bg-blue-200'>
          <div className="container mx-auto px-4 h-screen">
            <div className="flex content-center items-center justify-center h-full">
              <div className="sm:full w-6/12 lg:w-4/12 xl:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
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
                        <Link href={'/e-auction-admin/admin-login'}>
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
                        <Link href={'/e-auction-admin/forgot-password'}>
                            <a className='bg-blue-800 text-white text-sm font-bold uppercase px-6 py-2 rounded shadow mr-1 mb-1 w-full'>Forgot password</a>
                        </Link>
                      </div>
                    </div>
                  </>}
                  {!invalidToken && !resetSuccess &&
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                        <p className='text-xl capitalize'>Reset your new password</p>
                      </div>
                      <form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                            htmlFor="new-password" >
                            New Password
                          </label>
                          <input
                            type="password"
                            name='password'
                            id='new-password'
                            autoComplete='true'
                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Password"
                            onBlur={inputHandler}
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blue-800 text-xs font-bold mb-2"
                            htmlFor="retype-password" >
                            Retype New Password
                          </label>
                          <input
                            type="password"
                            name='retype_password'
                            id='retype-password'
                            autoComplete='true'
                            className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Retype Password"
                            onBlur={inputHandler}
                          />
                        </div>
                        <div className="text-center mt-6">
                          <button
                            disabled={isLoading}
                            onClick={submitEventHandler}
                            className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button" >
                            Reset Password now
                          </button>
                        </div>
                      </form>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
     );
}

export default ResetAdminPassword;