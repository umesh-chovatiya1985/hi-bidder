import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay } from "swiper";
import ItemCard from "../Reusable/ItemCard";
import ItemShopCard from "../Reusable/ItemShopCard";
import PartnerCard from "../Reusable/PartnerCard";
import ItemShopCardList from "../Reusable/ItemShopCardList";

export default function CardSlider({ viewtype, sliderProps, sliderImages, myClassName, sliderFor, breakPoints }: any) {
    breakPoints = breakPoints ??
    {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        980: {
            slidesPerView: 4,
        },
        1120: {
            slidesPerView: 5,
        }
    };

    return (
        <>
            <Swiper
                spaceBetween={sliderProps.spaceBetween}
                // slidesPerView=
                autoplay={sliderProps.autoplay}
                pagination={{
                    clickable: true,
                }}
                navigation={sliderProps.navigation}
                modules={[Autoplay, Pagination, Navigation]}
                className={myClassName}
                breakpoints={breakPoints}
            >
                {sliderImages.map((image: any) => (
                    <SwiperSlide key={image._id}>
                        {sliderFor == "ItemCard" && <ItemCard cardItem={image}></ItemCard>}
                        {sliderFor == "ItemShopCard" && viewtype == 'grid' && <ItemShopCard cardItem={image}></ItemShopCard>}
                        {sliderFor == "ItemShopCard" && viewtype == 'list' && <ItemShopCardList cardItem={image}></ItemShopCardList>}
                        {sliderFor == "PartnerCard" && <PartnerCard partnerItem={image}></PartnerCard>}
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}