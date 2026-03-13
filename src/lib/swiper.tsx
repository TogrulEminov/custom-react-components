"use client";
import React, { forwardRef } from "react";
import "swiper/swiper-bundle.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/thumbs";
import {
  Swiper,
  SwiperSlide,
  type SwiperProps,
  type SwiperRef,
} from "swiper/react";

interface MySwiperProps<T> extends SwiperProps {
  items?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  slideClassName?: string;
}

function MySwiperInner<T>(
  { children, items, renderItem, slideClassName, ...props }: MySwiperProps<T>,
  ref: React.ForwardedRef<SwiperRef>,
) {
  return (
    <Swiper ref={ref} {...props}>
      {items && renderItem
        ? items.map((item, index) => (
            <SwiperSlide key={index} className={slideClassName}>
              {renderItem(item, index)}
            </SwiperSlide>
          ))
        : children}
    </Swiper>
  );
}

const MySwiper = forwardRef(MySwiperInner) as <T>(
  props: MySwiperProps<T> & { ref?: React.ForwardedRef<SwiperRef> },
) => React.ReactElement;

export default MySwiper;
