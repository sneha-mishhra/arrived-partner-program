// CONTENTFUL MAP → content type: "ProcessSteps"
// Fields: eyebrow, headline, subheadline, ctaLabel, ctaLink,
//         steps (List of {number, title, body}) - repeatable
// Layout: 2-column, left intro + CTA, right stack of numbered cards (always visible)

const STEPS = [
  {
    number: 1,
    title: "Register",
    body: "Create your Arrived account. Takes under a minute.",
  },
  {
    number: 2,
    title: "Check your inbox",
    body: "You'll get a welcome email with everything you need: modules, docs, and next steps.",
  },
  {
    number: 3,
    title: "Complete your modules & request Pro",
    body: "Work through the training modules at your own pace. Once done, email partners@teamhappily.com to unlock Pro access.",
  },
  {
    number: 4,
    title: "Build a live event",
    body: "Use Pro (and our API) to build a real event page, publish it live, and share the link with our team.",
  },
  {
    number: 5,
    title: "Get reviewed & get matched",
    body: "Our team reviews your work and adds you to our designer database. Clients get assigned to you based on your style and strengths.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* LEFT - intro */}
        <div>
          <span className="text-xs md:text-sm font-mono uppercase tracking-widest text-brand-purple mb-4 inline-block">
            Onboarding is easy. And we can help.
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-brand-navy">
            Your path to your first brief.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brand-muted max-w-md">
            Five steps between signing up and getting paid to design. Move at
            your own pace. Most partners finish onboarding in under a week.
          </p>
        </div>

        {/* RIGHT - numbered step cards, always visible */}
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => (
            <div
              key={s.number}
              className="bg-white border border-brand-lavender-2 rounded-2xl p-6 md:p-7 hover:border-brand-purple/40 transition"
            >
              <div className="text-2xl md:text-3xl font-black text-brand-purple mb-3">
                {String(s.number).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-lg md:text-xl text-brand-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-brand-muted leading-relaxed">
                {s.body}
              </p>
              {i === 0 && (
                <a
                  href="#apply"
                  className="mt-5 inline-flex items-center gap-2 bg-brand-navy text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand-navy-2 transition"
                >
                  Get started
                  <span>→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
