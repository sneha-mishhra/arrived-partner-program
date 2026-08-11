// CONTENTFUL MAP → content type: "DesignJamCard"
// Fields: eyebrow, headline, body (Long text), ctaLabel, ctaLink

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
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          Free to join. Real briefs. A shortcut in.
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
          Live event briefs every quarter. Standout work gets fast-tracked to
          certification, to queue.
        </p>
        <a
          href="#apply"
          className="mt-8 inline-block bg-white text-brand-purple text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-lavender transition"
        >
          See the next jam
        </a>
      </div>
    </section>
  );
}
