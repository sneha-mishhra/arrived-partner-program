"use client";

// CONTENTFUL MAP → content type: "DesignJamCard"
// Fields: eyebrow, headline, body (Long text), trailImages (List of Media), ctaLabel, ctaLink

import ImageTrail from "./ImageTrail";

const TRAIL_IMAGES = [
  "/jam/jam-1.jpg",
  "/jam/jam-2.jpg",
  "/jam/jam-3.jpg",
  "/jam/jam-4.jpg",
];

export default function DesignJamCard() {
  return (
    <section id="jams" className="w-full px-6 py-10">
      <div
        className="relative max-w-5xl mx-auto rounded-3xl px-8 md:px-16 py-16 md:py-20 text-center text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-purple), var(--brand-purple-2))",
        }}
      >
        {/* Interactive image trail — follows mouse across the section */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <ImageTrail items={TRAIL_IMAGES as never[]} variant={1} />
        </div>

        <div className="relative z-10 pointer-events-none">
          <span className="pill pill-on-dark mb-6 inline-block pointer-events-auto">
            Design jams
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Where designers worldwide come together to learn, share, and win.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/85 max-w-2xl mx-auto">
            Hosted regularly for our global network. Get face-time with our team,
            ask anything live, and put your best work in front of hosts hunting
            for talent.
          </p>

          <a
            href="#apply"
            className="pointer-events-auto mt-10 inline-block bg-white text-brand-purple text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-lavender transition"
          >
            Join the next jam
          </a>
        </div>
      </div>
    </section>
  );
}
