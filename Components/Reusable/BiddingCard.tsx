import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import dateFormat from 'dateformat';

export default function BiddingCard({ data, activeTab }: any) {

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
        return '<span>'+response+'</span><span>'+ hours +'</span>:<span>'+ minutes +'</span>:<span>'+ seconds +'</span>';
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setWaitCounter((waitCounter: any) => moment(data.products.createdAt).diff(moment(), 'seconds'));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

  return (
    <div className="row m-0 mb-3 shadow-sm rounded">
      <div className="flex flex-wrap justify-between border-1 bg-[#F2F2F2] rounded border-[#e5e5e5] p-3">
        <div className="w-1/6">
          <div className="flex h-full text-center mr-4 bg-white">
            <img src={data.products.default_image} className="my-bid-image" alt="bid-image" />
          </div>
        </div>
        <div className="w-4/6">
          <Link href={'/details/'+data.products.slug}>
            <a className="text-[20px] text-[600] text-[#3A3A3A] hover:text-primary-color mr-4"
            >
              {data.products.title}
            </a>
          </Link>
          {data.categories.length > 0 &&
              (data.categories.map((category: any, index: any) => (
                <Link key={index} href={'/category/'+category.slug}>
                  <a className="underline text-[16px] text-[#0D5D8A] pt-[10px] hover:text-primary-color mr-1"
                  >
                    {category.title}
                  </a>
                </Link>
              )))
          }
          <p className="text-[16px] text-[#808089] py-[16px]">
            Seller : {data.seller_name}
          </p>
          {activeTab == "active" && (
            <p className="text-[16px] text-[#00909E] pb-[14px]">
              <i className="fa fa-clock text-[11px] pr-[10px]"></i> <span dangerouslySetInnerHTML={{__html: formatTime(waitCounter)}}></span> Left
            </p>
          )}
          {activeTab == "win" && (
            <p className="text-[16px] text-[#007B39] pb-[14px]">
              <i className="fa fa-circle text-[11px] pr-[10px]"></i>You Win
            </p>
          )}
          {activeTab == "lost" && (
            <p className="text-[16px] text-[#F12626] pb-[14px]">
              <i className="fa fa-circle text-[11px] pr-[10px]"></i> You lost
            </p>
          )}
          <p className="text-[20px] text-[#3A3A3A]">
            Your Bid Amount : ₹ {data.user_amount.toLocaleString('hi-IN')}.00
          </p>
          <p className="text-[16px] text-[#808089] pb-[18px]">
            Current Bid: ₹ {data.bid_amount.toLocaleString('hi-IN')}.00
          </p>
          <Link href={"/details/"+data.products.slug}>
            <a target="_blank" className="text-[20px] text-[#3A3A3A]">
              Go To Detalis Page
            </a>
          </Link>
        </div>
        <div className="w-1/6">
          <p className="text-[19px] text-[#808089]">{dateFormat(data.products.createdAt, "dd-mm-yyyy hh:MM TT")}</p>
        </div>
      </div>
    </div>
  );
}
