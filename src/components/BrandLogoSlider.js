"use client";
import { useEffect, useRef } from "react";

const logos = [
  "99-villani.webp",
  "68-omega.webp",
  "8g-barilla.webp",
  "101-vogiatzi.webp",
  "32g-bunge.webp",
  "34-giotis.webp",
  "27-divella.webp",
  "25-der-kasemeister.webp",
  "14-caputo.webp",
  "20-coati.webp",
  "23-dececco.webp",
  "24-debic.webp",
  "31-fairy.webp",
  "44-kanaki.webp",
  "42-ifantis.webp",
  "50g-le-5-stagioni.webp",
  "49g-latteria-sorrentina.webp",
  "62g-mutti.webp",
  "65-nounou.webp",
  "66-nutella.webp",
  "83-rodoula.webp",
  "80-riso-pasini.webp",
  "72g-pites-xasioti.webp",
  "84-rummo.webp",
  "87-sanitas.webp",
  "91g-sellas.webp",
  "96-viakal.webp",
];
const LOGO_BASE =
  "https://delicatessenimages.blob.core.windows.net/brands";


export default function BrandLogoSlider() {
  const trackRef = useRef(null);

  useEffect(() => {
  let x = 0;
  let rafId;

  const speed = window.innerWidth < 768 ? 0.25 : 0.35;

  const animate = () => {
    if (!trackRef.current) {
      rafId = requestAnimationFrame(animate);
      return;
    }

    x -= speed;

    const width = trackRef.current.scrollWidth;
    if (width && Math.abs(x) >= width / 2) {
      x = 0;
    }

    trackRef.current.style.transform = `translateX(${x}px)`;
    rafId = requestAnimationFrame(animate);
  };

  rafId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(rafId);
}, []);


  return (
    <section
      style={{
        position: "relative",
        zIndex: 2,
        background: "transparent",
        padding: "60px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: 30,
              whiteSpace: "nowrap",
              willChange: "transform",
            }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                style={{
                 minWidth: 180,
height: 100,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  /* ✅ LIGHT SURFACE FOR LOGOS */
                  background: "#ffffff",
                  borderRadius: 16,
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <img
  src={`${LOGO_BASE}/${logo}`}
  alt=""
  style={{
    maxHeight: 60,
    maxWidth: "80%",
    objectFit: "contain",
    opacity: 1,
  }}
/>

              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
    
  );
}
