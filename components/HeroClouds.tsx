"use client";

// CONTENTFUL MAP → nested inside "Hero" content type
// Dense puffy cloud layer at the bottom of the hero (Sneako-style).
// Fades up into the hero's pastel background and blends seamlessly with the white section below.

import { useEffect, useState } from "react";

export default function HeroClouds() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const opacity = Math.max(0, 1 - y / 500);
      setScrollOpacity(opacity);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
      style={{
        opacity: scrollOpacity,
        transition: "opacity 0.15s linear",
        height: "380px",
      }}
    >
      {/* Solid white base at the very bottom — creates the "resting" cloud floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-white"
        style={{ transform: "translateY(50%)" }}
      />

      {/* Cloud puffs — dense at bottom, sparse upward */}
      {[
        // Bottom row — big, dense, opaque
        { left: "-10%", bottom: "-5%",  size: 480, delay: "0s",   duration: "80s", opacity: 1 },
        { left: "10%",  bottom: "-10%", size: 560, delay: "-12s", duration: "88s", opacity: 1 },
        { left: "32%",  bottom: "-8%",  size: 620, delay: "-24s", duration: "95s", opacity: 1 },
        { left: "55%",  bottom: "-12%", size: 580, delay: "-36s", duration: "82s", opacity: 1 },
        { left: "76%",  bottom: "-5%",  size: 540, delay: "-48s", duration: "90s", opacity: 1 },
        { left: "92%",  bottom: "-10%", size: 500, delay: "-60s", duration: "85s", opacity: 1 },
        // Upper row — smaller, softer, fewer
        { left: "5%",   bottom: "30%",  size: 380, delay: "-20s", duration: "100s", opacity: 0.75 },
        { left: "35%",  bottom: "40%",  size: 420, delay: "-45s", duration: "110s", opacity: 0.7  },
        { left: "62%",  bottom: "35%",  size: 400, delay: "-30s", duration: "105s", opacity: 0.75 },
        { left: "85%",  bottom: "42%",  size: 360, delay: "-55s", duration: "95s",  opacity: 0.65 },
        // Top wisps — very soft
        { left: "18%",  bottom: "62%",  size: 300, delay: "-10s", duration: "120s", opacity: 0.4  },
        { left: "50%",  bottom: "70%",  size: 340, delay: "-40s", duration: "115s", opacity: 0.35 },
        { left: "78%",  bottom: "65%",  size: 280, delay: "-70s", duration: "125s", opacity: 0.45 },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: c.left,
            bottom: c.bottom,
            width: c.size,
            height: c.size * 0.55,
            opacity: c.opacity,
            filter: `blur(${i < 6 ? 50 : i < 10 ? 70 : 90}px)`,
            animation: `cloud-drift-${i % 6} ${c.duration} ease-in-out ${c.delay} infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes cloud-drift-0 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,-8px) scale(1.06); } }
        @keyframes cloud-drift-1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,10px) scale(1.08); } }
        @keyframes cloud-drift-2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(45px,-12px) scale(1.1); } }
        @keyframes cloud-drift-3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-70px,6px) scale(1.05); } }
        @keyframes cloud-drift-4 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(55px,-10px) scale(1.07); } }
        @keyframes cloud-drift-5 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-40px,12px) scale(1.09); } }
      `}</style>
    </div>
  );
}
