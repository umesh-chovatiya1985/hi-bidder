import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ThumbSlider({ photoList } : any) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 bg-gray-200 rounded"
      >
        {photoList && (
          photoList.map((photo: any) => (
            <SwiperSlide key={photo.photo_url} className="text-center">
              <img src={photo.photo_url} className="h-96" alt={photo.photo_alt} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-3"
        breakpoints={{
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          980: {
             slidesPerView: 4,
          },
          1120: {
             slidesPerView: 5,
          }
        }}
      >
        {photoList && (
          photoList.map((photo: any) => (
            <SwiperSlide key={photo.photo_url} className="cursor-pointer">
              <img src={photo.photo_url} className="border-1 shadow-xl rounded-xl" alt={photo.photo_alt} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
}
