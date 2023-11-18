import React from 'react'

export default function PartnerCard({partnerItem} : any) {
  return (
    <div className="single-items mb-50 text-center">
        <div className="items-for-you-img">
            <div className="partner-items-img">
                <img src={partnerItem.image} alt="" className='rounded object-fit-cover' />
            </div>
        </div>
    </div>
  )
}
