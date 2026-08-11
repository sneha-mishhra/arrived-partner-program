// CONTENTFUL MAP → content type: "FeatureCard"
// Fields: eyebrow, headline, body (Long text)

export default function FeatureCard() {
  return (
    <section className="w-full px-6 py-10">
      <div className="max-w-5xl mx-auto bg-brand-navy text-white rounded-3xl px-8 md:px-16 py-16 md:py-20 text-center">
        <span className="pill pill-on-dark mb-6 inline-block">Magic design upgrade</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          Real briefs. Real budgets. Your design.
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/70 max-w-2xl mx-auto">
          When a client wants their event site to look like it cost thousands,
          we send it to you. You design in our platform. We handle registration,
          hosting, and everything else. You get paid.
        </p>
      </div>
    </section>
  );
}
