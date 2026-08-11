"use client";

// CONTENTFUL MAP → content type: "DesignJamCard"
// Fields: eyebrow, headline, body (Long text), galleryImages (List of Media), ctaLabel, ctaLink

import CircularGallery from "./CircularGallery";

const JAM_IMAGES = [
  { image: "/jam/jam-1.jpg", text: "" },
  { image: "/jam/jam-2.jpg", text: "" },
  { image: "/jam/jam-3.jpg", text: "" },
  { image: "/jam/jam-4.jpg", text: "" },
];

export default function DesignJamCard() {
  return (
    <section id="jams" className="w-full px-6 py-10">
      <div
        className="max-w-5xl mx-auto rounded-3xl px-8 md:px-16 py-16 md:py-20 text-center text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-purple), var(--brand-purple-2))",
        }}
      >
        <span className="pill pill-on-dark mb-6 inline-block">Design jams</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
          Where designers worldwide come together to learn, share, and win.
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl mx-auto">
          Hosted regularly for our global network. Get face-time with our team,
          ask anything live, and put your best work in front of hosts hunting
          for talent.
        </p>

        {/* Circular gallery of past jam photos */}
        <div className="mt-4 h-[400px] md:h-[500px] w-full">
          <CircularGallery
            items={JAM_IMAGES}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>

        <a
          href="#apply"
          className="mt-10 inline-block bg-white text-brand-purple text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-lavender transition"
        >
          Join the next jam
        </a>
      </div>
    </section>
  );
}
