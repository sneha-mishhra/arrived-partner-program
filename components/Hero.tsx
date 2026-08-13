// CONTENTFUL MAP → content type: "Hero"
// Fields: eyebrow, headlineLine1, headlineLine2, headlineLine3 (accent color),
// subheadline (Long text), primaryCtaLabel, primaryCtaLink, secondaryCtaLabel, secondaryCtaLink,
// backgroundImage (Media), stickers (List of {image, rotate, width, top, left, right})

import StickerStack from "./StickerStack";

export default function Hero() {
  return (
    <section
      className="relative w-full py-24 md:py-32 px-6"
      style={{
        backgroundImage: "url('/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Stickers layer - absolutely positioned floating over hero */}
      <StickerStack />

      {/* Text layer */}
      <div className="relative z-40 max-w-4xl mx-auto text-left pl-20 md:pl-24">
        <span className="pill mb-6 inline-block">For designers</span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
          Design.
          <br />
          Build.
          <br />
          <span className="text-brand-purple-2">Earn.</span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-brand-muted max-w-xl">
          The event site is the first taste of the vibe. Get paid to design it.
          Get matched to briefs that value taste. Get listed with the sharpest
          event designers around.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
          <a
            href="#apply"
            className="bg-brand-navy text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-navy-2 transition"
          >
            Apply to become a partner
          </a>
          <a
            href="#jams"
            className="bg-transparent border border-brand-navy text-brand-navy text-sm font-semibold px-6 py-3 rounded-full hover:bg-white transition"
          >
            Join the next design jam
          </a>
        </div>
      </div>
    </section>
  );
}
