import moment from 'moment';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ItemShopCard({ cardItem }: any) {
    const [src, setSrc] = useState(cardItem.default_image);
    const [waitCounter, setWaitCounter] = useState(null);
    const [itemExpired, setItemExpired] = useState(!cardItem.isActive);

    const formatTime = (duration: any) => {
        if(duration < 0){
            setItemExpired(true);
            return;
        }
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
            const startDate = cardItem.expiryDate;
            setWaitCounter((waitCounter: any) => moment(startDate).diff(moment(), 'seconds'));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Link href={`/details/${encodeURIComponent(cardItem.slug)}`}>
            {/* <div className="flex flex-col justify-center bg-slate-100">
                <div className="group h-96 w-96 [perspective: 1000px]">
                    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <div className="absolute inset-0">
                            <div className="items-for-you-img">
                                <div className="items-img">
                                    <img onError={() => setSrc('/img/default.jpg')} src={src} alt={cardItem.title} className='h-full w-full rounded-xl shodow-xl shadow-black/40 object-fit-cover' />
                                </div>
                                <div className="fav-items-for-you">
                                    <div className="row m-0">
                                        <div className="col-12 text-left font-semibold">
                                            {cardItem.title}
                                        </div>
                                        <div className="col-md-6 text-left text-gray-600">
                                            Current Bid
                                        </div>
                                        <div className="col-md-6 text-right text-pink-600 font-semibold">
                                            $250
                                        </div>
                                    </div>
                                </div>
                                <div className="time-box">
                                    <span className="time font-semibold">{formatTime(waitCounter)} Left</span>
                                </div>
                                <span className="heart"><i className="fa fa-gratipay" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div className="absolute inset-0 h-full w-full rounded-xl bg-black px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="row m-0">
                                <div className="col-12 text-left font-semibold">
                                    {cardItem.title}
                                </div>
                                <div className="col-md-6 text-left text-gray-600">
                                    Current Bid
                                </div>
                                <div className="col-md-6 text-right text-pink-600 font-semibold">
                                    $250
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <a className='cursor-pointer'>
                <div className="single-items mb-50 text-center hover:drop-shadow-xl">
                    <div className="items-for-you-img pb-2">
                        <div className="items-img">
                            <img onError={() => setSrc('/img/default.jpg')} src={src} alt={cardItem.title} className='rounded object-fit-cover' />
                        </div>
                        <div className="fav-items-for-you">
                            <div className="row m-0">
                                <div className="col-12 text-left font-semibold">
                                    {cardItem.title}
                                </div>
                                <div className="col-md-6 text-left text-gray-600">
                                    Current Bid
                                </div>
                                <div className="col-md-6 text-right text-pink-600 font-semibold">
                                    $250
                                </div>
                            </div>
                        </div>
                        <div className="time-box">
                            {!itemExpired && <span className="time font-semibold">{formatTime(waitCounter)} Left</span>}
                            {itemExpired && <span className="time font-semibold">Item is expired!</span>}
                        </div>
                        <span className="heart"><i className="fa fa-gratipay" aria-hidden="true"></i></span>
                    </div>
                </div>
            </a>
        </Link>
    )
}
