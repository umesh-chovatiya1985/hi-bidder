import Link from 'next/link'
import React from 'react'
import dateFormat from 'dateformat';

export default function ProductCard({auction, biddetail}: any) {
  return (
    <div>
        <div className="max-w-full flex border-1 rounded shadow">
            <div className="h-48 h-auto w-48 flex-none bg-contain bg-no-repeat bg-center rounded text-center overflow-hidden" style={{ backgroundImage: "url('"+auction.default_image+"')"}} title="Woman holding a mug">
            </div>
            <div className="bg-gray-100 rounded-b p-3 flex flex-col justify-between leading-normal relative">
                <div className="mb-2">
                    <div className="text-gray-900 font-semibold text-xl mb-2">{auction.title}</div>
                    <p className="text-gray-600 text-sm">{auction.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                    <div>
                        <div className="grid grid-cols-1 gap-1 mb-3">
                            <div><strong>Categories : </strong></div>
                            <div>
                                <ul>
                                {auction.categories_ids.map((category: any, index: any) => (
                                    <li key={index} className='inline mr-2 text-[#909090]'>
                                        <Link href={'/category/' + category.slug}>
                                            <a target='_blank' className='text-[#909090]'>
                                                {category.title}
                                            </a>
                                        </Link>
                                            <i className="ml-2 fa fa-arrow-right"></i>
                                    </li>
                                ))}
                                    <li className='inline'>
                                        <Link href={'/category/' + auction.category_id.slug}>
                                            <a target='_blank'>
                                                {auction.category_id.title}
                                            </a>
                                        </Link>
                                    </li>
                                </ul>   
                            </div>
                        </div> 
                        <div className="grid grid-cols-2 gap-1">
                            <div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div><strong>Condition</strong></div>
                                    <div className="col-span-2">: {auction.condition}</div>
                                </div>     
                            </div>
                            <div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div><strong>SKU</strong></div>
                                    <div className="col-span-2">: {auction.sku}</div>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div><strong>Brand</strong></div>
                                    <div className="col-span-2">: {auction.brand}</div>
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-3 gap-1">
                                    <div>
                                        <strong>Modal No</strong>
                                    </div>
                                    <div className="col-span-2"> : {auction.model_no}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-5 gap-1">
                            <div className="col-span-3">
                                <div className='bg-green-200 text-center px-3 py-2 rounded-full shadow mb-3'>
                                    <strong>Offer Price : </strong><span className='font-semibold'>₹ {biddetail.bidAmount}</span>
                                </div>
                                <div className='bg-red-200 px-3 py-2 rounded-full shadow text-center'>
                                    <strong>Offer Till : </strong><span className='font-semibold'>{dateFormat(biddetail.validTill, "dd-mm-yyyy")}</span>
                                </div>
                            </div>
                            <div className='text-right flex flex-col-reverse pl-4 ml-3 col-span-2'>
                                <Link href={'/invitation/'+biddetail.buyer+'/'+biddetail._id+'/'+auction.slug}>
                                    <a className='btn btn-primary ml-4' target='_blank'>Click to check offer</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
