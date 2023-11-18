import React from 'react'

export default function DownloadApp() {
  return (
    <div className='container-fluid bg-white download-app py-5'>
      <div className="container">
        <div className="row px-xl-5 m-0 justify-content-center">
            <div className="col-md-4 col-sm-4 col-12 pt-4">
                <h2 className='text-2xl text-semibold'>Download Our App</h2>
                <p className='mt-4 text-sm'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </p>
                <div className='flex mt-4'>
                    <button className="bg-blue-500 items-center text-xs font-bold text-white py-2 px-2 border border-blue-500 rounded-xl mr-3 flex">
                        <p className='mr-3'>
                            <img src="../img/google-playstore.png" alt="Google Playstore" className='w-7' />
                        </p>
                        <p className='text-left mr-2'>
                            <small className='block leading-tight uppercase'>Download on the</small>
                            <span className='text-lg'>Google Play</span>
                        </p>
                    </button>
                    <button className="bg-gray-500 items-center text-xs font-bold text-white py-2 px-2 border border-gray-500 rounded-xl mr-1 flex">
                        <p className="mr-3">
                            <i className="fa fa-apple text-3xl font-size-[2rem]"></i>
                        </p>
                        <p className='text-left mr-2'>
                            <small className='block leading-tight uppercase'>Download on the</small>
                            <span className='text-lg'>App Store</span>
                        </p>
                    </button>
                </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12 text-center download-phone">
                <img src='../img/iphone-x.png' alt='' className='download-app-phone'/>
            </div>
        </div>
      </div>
    </div>
  )
}
