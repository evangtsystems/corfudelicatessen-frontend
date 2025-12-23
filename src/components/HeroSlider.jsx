"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const images = Array.from({ length: 10 }, (_, i) =>
  `https://delicatessenimages.blob.core.windows.net/hero/hero-${String(i + 1).padStart(2, "0")}.webp`
);



export default function HeroSlider() {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        style={{ width: "100%" }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div
              style={{
                width: "100%",
                height: "420px",
              }}
            >
              <img
                src={src}
                alt={`Brand slide ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",   // 🔥 KEY CHANGE
                  display: "block",     // 🔥 removes inline gaps
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
