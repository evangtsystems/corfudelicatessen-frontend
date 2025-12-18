"use client";

import { useEffect, useState } from "react";

export default function LogoIntroStrip({ onFinish }) {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  // 🎬 Delayed cinematic fade-in

  

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // ✨ Glow pulse AFTER logo settles
  useEffect(() => {
    if (!visible) return;

    const startPulse = setTimeout(() => {
      const interval = setInterval(() => {
        setPulse((p) => !p);
      }, 3200);

      return () => clearInterval(interval);
    }, 1800);

    return () => clearTimeout(startPulse);
  }, [visible]);

  // ✅ SIGNAL INTRO FINISH (THIS WAS MISSING)
  useEffect(() => {
    // total cinematic time ≈ 4.8s
    const done = setTimeout(() => {
      onFinish?.();
    }, 1000);

    return () => clearTimeout(done);
  }, [onFinish]);

  return (
    <section
      style={{
        position: "fixed",          // 🔑 important
        inset: 0,                   // full screen
        background: "#070815",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* VIGNETTE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.05), rgba(0,0,0,0.95))",
          zIndex: 1,
        }}
      />

      {/* LOGO */}
      <img
        src="/assets/logo.webp"
        alt="Corfu Delicatessen"
        draggable={false}
        style={{
          height: 98,
          zIndex: 2,
          opacity: visible ? 0.96 : 0,
          transform: visible
            ? pulse
              ? "translateY(-4px)"
              : "translateY(0px)"
            : "translateY(26px)",
          transition:
            "opacity 3.2s cubic-bezier(0.22, 1, 0.36, 1), transform 3.6s cubic-bezier(0.22, 1, 0.36, 1), filter 2.6s ease-in-out",
          filter: pulse
            ? "drop-shadow(0 0 20px rgba(209,183,110,0.55))"
            : "drop-shadow(0 0 6px rgba(209,183,110,0.18))",
        }}
      />

      {/* MICRO COPY */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 12,
          letterSpacing: 0.9,
          color: "rgba(209,183,110,0.65)",
          zIndex: 3,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition:
            "opacity 3.8s ease, transform 3.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        Από το 2002 · Χονδρική τροφοδοσία HORECA
      </div>
    </section>
  );
}
