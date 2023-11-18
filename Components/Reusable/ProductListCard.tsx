import moment from 'moment';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'

export default function ProductListCard({ cardItem }: any) {
    const [src, setSrc] = useState(cardItem.default_image);
    const [waitCounter, setWaitCounter] = useState(null);
    const formatTime = (duration: any) => {
        let days: any = Math.floor(duration / 86400);
        let hours: any = Math.floor((duration % 86400) / 3600);
        let minutes: any = Math.floor((duration % 3600) / 60);
        let seconds: any = duration % 60;
        let response = "";
        if (days < 10) {
            days = '0' + days;
        }
        // if (parseInt(days) > 0) {
        response = days + ' Days ';
        // }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return response + hours + ' : ' + minutes + ' : ' + seconds;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const startDate = cardItem.auctionpricing_id?.auction_start_date ? cardItem.auctionpricing_id.auction_start_date : cardItem.createdAt;
            setWaitCounter((waitCounter: any) => moment(startDate).diff(moment(), 'seconds'));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Link href={`/details/${encodeURIComponent(cardItem.slug)}`}>
            <a className='cursor-pointer'>
                <div className="max-w border-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="flex">
                        <div className="shrink-0">
                            <img onError={() => setSrc('/img/default.jpg')} src={src} alt={cardItem.title} className='h-52 object-cover w-48' />
                        </div>
                        <div className="px-4 py-6">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{cardItem.title}</div>
                            <div className="block my-1 leading-tight text-sm text-gray-500 hover:underline line-clamp-2">{cardItem.description}</div>
                            <div className="row my-2">
                                <div className="col-md-8 text-left text-gray-600">
                                    Winnering Bid Amount
                                </div>
                                <div className="col-md-4 text-right text-pink-600 font-semibold">
                                    $250
                                </div>
                            </div>
                            <div className="row text-sm mt-3">
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Seller</div>
                                    {cardItem && <div>{cardItem.seller_id?.company_name}</div>}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className='text-gray-500 leading-3 font-semibold mb-2'>Shipping Information</div>
                                    {cardItem && <div>{cardItem.auctionshipping_id.offer_free_shipping == "true" ? "Free Shipping" : "Shipping on buyer"}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-4">
                        <div className="row text-sm mt-3">
                            <div className="col-md-4 mb-3">
                                <div className='text-gray-500 leading-3 font-semibold mb-2'>Brand</div>
                                {cardItem && <div>{cardItem.brand}</div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='text-gray-500 leading-3 font-semibold mb-2'>Condition</div>
                                {cardItem && <div>{cardItem.condition}</div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='text-gray-500 leading-3 font-semibold mb-2'>Model No</div>
                                {cardItem && <div>{cardItem.model_no}</div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='text-gray-500 leading-3 font-semibold mb-2'>SKU</div>
                                {cardItem && <div>{cardItem.sku}</div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='text-gray-500 leading-3 font-semibold mb-2'>Weight</div>
                                {cardItem && <div>{cardItem.auctionshipping_id.package_weight_kg}kg {cardItem.auctionshipping_id.package_weight_gm}gm</div>}
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className='text-gray-500 leading-3 font-semibold mb-2'>Package Dimension</div>
                                {cardItem && <div>{cardItem.auctionshipping_id.package_weight_height} Height X {cardItem.auctionshipping_id.package_weight_length} Length X {cardItem.auctionshipping_id.package_weight_width} Width</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}
