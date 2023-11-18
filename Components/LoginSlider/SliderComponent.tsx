import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import Homeslider from "../Items/Homeslider";

export default function SliderComponent({sliderProps, sliderImages, myClassName} : any) {
    return (
        <>
            <Swiper
                spaceBetween={sliderProps.spaceBetween}
                slidesPerView={sliderProps.slidesPerView}
                initialSlide={sliderProps.initialSlide}
                centeredSlides={true}
                autoplay={sliderProps.autoplay}
                pagination={{
                    clickable: true,
                }}
                navigation={sliderProps.navigation}
                effect="fade"
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                className={myClassName}
            >
                {sliderImages.map((image: any) => (
                    <SwiperSlide key={image._id}>
                        <Homeslider image={image}></Homeslider>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}