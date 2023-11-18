import Link from 'next/link';
import React, { useEffect } from 'react'
import styles from '../../styles/Drawer.module.css'

export default function PopupModel({drawerStatus, closeDrawerBar}: any) {


    const responseApple = (response: any) => {
        console.log(response);
    };
    const responseFacebook = (response: any) => {
        console.log(response);
    }
    const responseGoogle = (response: any) => {
        console.log(response);
    }
    const getDrawerStatus = () => {
        if (drawerStatus) return styles["sidebarmenuopen"];
        else return styles["sidebarmenuclose"];
    };
    const getDrawerOverlay = () => {
        if (drawerStatus) return styles["sidebaroverlayclose"];
        else return styles["sidebaroverlayopen"];
    };

  return (
    <div className={`${styles.sidebarmenu} ${getDrawerStatus()}`}>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className={`${styles.sidebaroverlay} ${getDrawerOverlay()}`} onClick={closeDrawerBar}></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-6 bg-white p-4 rounded-xl relative">
                        <div>
                            <span className='bg-red-200 text-red-900 cursor-pointer absolute right-0 top-0 px-3 py-1 rounded-full m-2' onClick={closeDrawerBar}>X</span>
                            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                </div>

                                <div className="text-sm">
                                    <Link href={`/account/forgot-password`}>
                                        <a className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className='text-left font-semibold text-gray-700'>Don't have an account ?? 
                            <Link href={'/account/register'}>
                                <a className='cursor-pointer text-blue-900'>Create an account</a>
                            </Link>
                        </div>
                        <div className='or-cls-class'>
                            <span className='text-gray-600'>OR Continue with</span>
                        </div>
                        <div className='flex'>
                            {/* <GoogleLogin
                                clientId={process.env.Google_clientId!}
                                render={(renderProps) => (
                                    
                                )}
                                buttonText="Login"
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            /> */}
                            <Link href="/api/authenticate/google" passHref>
                                <a className='flex-auto text-center shadow border py-2 rounded-md mr-3 bg-red-600 text-white cursor-pointer'>
                                    <i className="fa fa-google mr-2"></i> Google
                                </a>
                            </Link>
                            {/* <AppleLogin
                                clientId={process.env.Apple_clientId!}
                                redirectURI={process.env.Apple_redirectURI!}
                                usePopup={true}
                                callback={responseApple} // Catch the response
                                scope="email name"
                                responseMode="query"
                                render={renderProps => (  
                                    <a onClick={renderProps.onClick} className='flex-auto text-center shadow border py-2 rounded-md bg-black text-white cursor-pointer'>
                                        <i className="fa fa-apple mr-2"></i> Apple
                                    </a>
                                )}
                            /> */}
                            {/* <FacebookLogin
                                appId={process.env.Facebook_appId!}
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="public_profile,email,user_friends"
                                callback={responseFacebook}
                                icon="fa-facebook"
                                textButton=" &nbsp;&nbsp;Facebook"
                                cssClass="flex-auto text-center shadow border py-2 px-3 rounded-md ml-3 bg-[#4267B2] text-white"
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
