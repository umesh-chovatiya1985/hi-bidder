import React from 'react'

export default function SimpleLoader() {
  return (
    <div className='z-10 absolute bg-[#f0f8ffc7] rounded-lg grid top-0 bottom-0 left-0 right-0 text-center content-center'>
        <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    </div>
  )
}
