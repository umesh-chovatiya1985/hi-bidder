import { NextPage } from "next";
import { useRouter } from "next/router";
import { Footer } from "../../Components/Layout/Footer/Footer";
import { Header } from "../../Components/Layout/Header/Header";
import CategoryMenu from "../../Components/Reusable/CategoryMenu";
import { useState, useEffect } from 'react';
import Link from "next/link";
import CustomLoader from "../../Admin/Components/CustomLoader";
import { getAPIUrl } from "../../lib/useLocalStorage";

const forgotPassword: NextPage = () => {
    const mainApiUrl = getAPIUrl() || process.env.API_URL;
   const [requestError, setRequestError] = useState(null);
   const [requestSuccess, setRequestSuccess] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [adminEmail, setAdminEmail] = useState(
        {
            "email":""
        }
    );
    const handleValidation = (e: any) => {
        setRequestError(null);
        setRequestSuccess(null);
        setAdminEmail({...adminEmail, 
            [e.target.name]: e.target.value
        });
    }
    const submitForm =  async (e: any) => {
        e.preventDefault();
        setRequestError(null);
        setRequestSuccess(null);
        setIsLoading(true);
        if(adminEmail.email == ''){
            setRequestError("Opps! Email Id is required to request.");
        }
        else {
          const data = {user_role: 'User', email: adminEmail.email};
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
    };

    const headerProps = {pageTitle: 'Hi Bidder : Category details page',pageDescription: 'hi Bidder Category details page'};
    return (
        <div>
            <main>
                <Header headerProps={headerProps} headerTitle="Testing titles" anotherTitle="Another Titles"></Header>
                <CategoryMenu />
                <div>
                    <div className="relative z-10">
                        <div className="inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                <div className="w-full border-1 max-w-md space-y-6 bg-white p-4 rounded-xl relative">
                                    {isLoading && <CustomLoader />}
                                    <div className='flex'>
                                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                                        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">Request to reset password</h2>
                                    </div>
                                    {requestError && <>
                                            <div className="alert alert-danger pt-2 pb-2">
                                                <i className="fa fa-info-circle mr-3"></i>
                                                {requestError}
                                            </div>
                                        </>
                                    }
                                    {requestSuccess && <>
                                            <div className="alert alert-success pt-2 pb-2">
                                                <i className="fa fa-envelope mr-3"></i>
                                                <span dangerouslySetInnerHTML={{__html: requestSuccess}}></span>
                                            </div>
                                        </>
                                    }
                                    <form className="mt-8 space-y-6" action="#" method="POST">
                                        <input type="hidden" name="remember" value="true" />
                                        <div className="-space-y-px rounded-md shadow-sm">
                                            <div>
                                                <label htmlFor="email-address" className="sr-only">Email</label>
                                                <input value={adminEmail.email} onChange={handleValidation} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={submitForm} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                Request Now
                                            </button>
                                        </div>
                                    </form>
                                    <div className='text-left font-semibold text-gray-700'>Remembet account password ::
                                        <Link href={'/login'}>
                                            <a className='cursor-pointer ml-2 text-blue-900'>Back to Login</a>
                                        </Link>
                                    </div>
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

export default forgotPassword;