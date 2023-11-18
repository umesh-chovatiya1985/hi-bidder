import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import CustomLoader from '../../Admin/Components/CustomLoader';

const loginPage: NextPage = () => {

  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adminLogin, setAdminLogin] = useState({
    "email":"", 
    "password":""
  });

  const inputHandler = (e: any) => {
    setAdminLogin({...adminLogin, [e.target.name]: e.target.value});
  }

  const submitEventHandler = async(e: any) => {
      e.preventDefault();
      setIsLoading(true);
      console.log(adminLogin);
      const res = await signIn('credentials',{ loginFor: "Admin", email: adminLogin.email, password: adminLogin.password, callbackUrl: process.env.NEXTAUTH_URL, redirect: false});
      setLoginError(res.error);
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
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="py-3 text-blue-800 text-center mb-3 font-bold">
                    <p className='text-xl capitalize'>Sign in with credentials</p>
                  </div>
                  {loginError && <>
                      <div className="alert alert-danger pt-2 pb-2">
                          <i className="fa fa-info-circle mr-3"></i>
                          {loginError}
                      </div>
                  </>}
                  <form>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blue-800 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Email
                      </label>
                      <input
                        type="email"
                        name='email'
                        className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email" 
                        onBlur={inputHandler}
                        />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blue-800 text-xs font-bold mb-2"
                        htmlFor="grid-password" >
                        Password
                      </label>
                      <input
                        type="password"
                        name='password'
                        autoComplete='true'
                        className="border-1 px-3 py-3 placeholder-blue-300 text-blue-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        onBlur={inputHandler}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        disabled={isLoading}
                        onClick={submitEventHandler}
                        className="bg-blue-800 text-white active:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none disabled:bg-gray-400 mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button" >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-6 relative">
                <div className='text-center'>
                  Don't access an account ?
                  <Link href={'/e-auction-admin/forgot-password'}>
                    <a className="ml-2 text-blue-900 font-semibold">
                      Forgot password?
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

export default loginPage;