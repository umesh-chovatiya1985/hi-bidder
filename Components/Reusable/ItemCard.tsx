import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function ItemCard({ cardItem }: any) {
  const [src, setSrc] = useState(cardItem.default_image);
  const [waitCounter, setWaitCounter] = useState(null);
  const [isExpired, setIsExpired] = useState(!cardItem.isActive);
  const formatTime = (duration: any) => {
    if(duration < 0){
        setIsExpired(true);
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
      setWaitCounter((waitCounter: any) => moment(cardItem.expiryDate).diff(moment(), 'seconds'));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="single-recent-items mb-50 cursor-pointer text-center border-radius-8 hover:bg-sky-700">
      <div className="recent-img  border-radius-8">
        <img onError={() => setSrc('/img/default.jpg')} src={src} alt={cardItem.title} className='w-100 border-radius-8' />
        <div className="time-box">
          {!isExpired && <span className="time font-semibold">{formatTime(waitCounter)} Left</span>}
          {isExpired && <span className="time font-semibold">Item is expired!</span>}
        </div>
        <span className="heart"><i className="fa fa-gratipay" aria-hidden="true"></i></span>
        <Link href={'/details/' + cardItem.slug}>
          <div className="favorit-items border-radius-8">
            <span className="sh6">{cardItem.title}</span>
            <span className="sp">Current Bid</span>
            <span className="sp1">$250</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
