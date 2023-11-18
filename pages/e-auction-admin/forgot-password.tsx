import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import CustomLoader from '../../Admin/Components/CustomLoader';
import { useState } from 'react';
import { getAPIUrl } from '../../lib/useLocalStorage';

const ForgotPassword: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
    const [requestError, setRequestError] = useState(null);
    const [requestSuccess, setRequestSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [adminEmail, setAdminEmail] = useState({
      "email":""
    });
  
    const inputHandler = (e: any) => {
        setRequestError(null);
        setRequestSuccess(null);
        setAdminEmail({...adminEmail, [e.target.name]: e.target.value});
    }
  
    const submitEventHandler = async(e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if(adminEmail.email == ''){
            setRequestError("Opps! Email Id is required to request.");
        }
        else {
          const data = {user_role: 'Admin', email: adminEmail.email};
          const resp = await fetch(mainApiUrl+"user/forgot-password", {
              method: 'POST',
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" }
          });
          const response = await resp.json();
          if(resp.ok){
            if(response.status == 1){
              setRequestSuccess(response.message);
            }
            else {
              setRequestError(response.message);
            }
            setAdminEmail({...adminEmail, email: ''});
          }
        }
        setIsLoading(false);
    }
  
     const headerProps = {pageTitle: process.env.COMPANY_NAME! + ' | Admin forgot password',pageDescription: process.env.COMPANY_NAME! + ' - Admin forgot password'};
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
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                      <p className='text-xl capitalize'>Request for reset password</p>
                    </div>
                    {requestError && <>
                        <div className="alert alert-danger pt-2 pb-2">
                            <i className="fa fa-info-circle mr-3"></i>
                            {requestError}
                        </div>
                    </>}
                    {requestSuccess && <>
                        <div className="alert alert-success pt-2 pb-2">
                            <i className="fa fa-envelope mr-3"></i>
                            <span dangerouslySetInnerHTML={{__html: requestSuccess}}></span>
                        </div>
                      </>
                    }
                    <form>
                      <div className="relative w-full mb-3">
                        <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                          htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          name='email'
                          id='email'
                          className={`border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                          placeholder="Email" 
                          onChange={inputHandler}
                          value={adminEmail.email}
                        />
                      </div>
                      <div className="text-center mt-6">
                        <button
                          disabled={isLoading}
                          onClick={submitEventHandler}
                          className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button" >
                          Request for reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-6 relative">
                  <div className='text-center'>
                    Remember my account password ?
                    <Link href={'/e-auction-admin/admin-login'}>
                      <a className="ml-2 text-blue-900 font-semibold">
                        Back to Login
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
     );
}

export default ForgotPassword;