
"use client";

import { useEffect } from "react";

export default function CinematicIntro({ onFinish }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const els = document.querySelectorAll("[data-focus]");
    if (!els.length) {
      onFinish?.();
      return;
    }

    // HARD RESET
    els.forEach((el) => {
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = "scale(0.94)";
      el.style.filter = "blur(6px)";
    });

    // HEADLINE
    setTimeout(() => {
      const h = document.querySelector('[data-focus="headline"]');
      if (!h) return;
      h.style.transition = "all 1.2s cubic-bezier(0.22,1,0.36,1)";
      h.style.opacity = "1";
      h.style.transform = "scale(1)";
      h.style.filter = "none";
    }, 400);

    // PARAGRAPH
    setTimeout(() => {
      const p = document.querySelector('[data-focus="paragraph"]');
      if (!p) return;
      p.style.transition = "all 1.1s cubic-bezier(0.22,1,0.36,1)";
      p.style.opacity = "1";
      p.style.transform = "scale(1)";
      p.style.filter = "none";
    }, 1400);

    // LOGISTICS
    setTimeout(() => {
      const l = document.querySelector('[data-focus="logistics"]');
      if (!l) return;
      l.style.transition = "all 1.1s cubic-bezier(0.22,1,0.36,1)";
      l.style.opacity = "1";
      l.style.transform = "scale(1)";
      l.style.filter = "none";
    }, 2600);

    // FINISH
    setTimeout(() => {
      document.body.style.overflow = "";
      onFinish?.();
    }, 4200);

    return () => {
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return null;
}
