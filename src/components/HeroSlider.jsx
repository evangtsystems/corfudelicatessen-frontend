"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const images = [
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl1-latteria-sorrentina.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl2-divella.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl3-rummo.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl4-dececco.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl5-barilla.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl6-caputto.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl7-le5stagioni.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl8-divellafarina.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl9-bunge.webp",
  "https://corfudelicatessen.com/wp-content/uploads/2022/03/sl10-sellas.webp",
];

export default function HeroSlider() {
  return (
    <div style={{ width: "100%", background: "#fff" }}>
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
              }}
            >
              <img
                src={src}
                alt={`Brand slide ${i + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
