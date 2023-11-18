import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function ItemShopCardList({ cardItem }: any) {
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
                            <div className="block my-1 text-lg leading-tight font-medium text-black hover:underline line-clamp-2">{cardItem.description}</div>
                            <div className="row my-2">
                                <div className="col-md-6 text-left text-gray-600">
                                    Current Bid
                                </div>
                                <div className="col-md-6 text-right text-pink-600 font-semibold">
                                    $250
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className="col-md-10">
                                    <div className="time-box">
                                        <span className="time inline-block rounded bg-[#FF5555] text-white px-3 py-2">{formatTime(waitCounter)} Left</span>
                                    </div>
                                </div>
                                <div className="col-md-2 text-right">
                                    <span className="heart"><i className="fa fa-gratipay text-3xl cursor-pointer" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}
