// CONTENTFUL MAP → content type: "ApplyForm"
// Fields: eyebrow, headline, body, hubspotFormId (Short text)
// Note: real form comes from HubSpot embed. Placeholder shown below.

export default function ApplyForm() {
  return (
    <section id="apply" className="w-full px-6 py-10">
      <div className="max-w-5xl mx-auto bg-brand-navy text-white rounded-3xl px-8 md:px-16 py-16 md:py-20 text-center">
        <span className="pill pill-on-dark mb-6 inline-block">Ready?</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-3xl mx-auto">
          Apply to become an Arrived partner.
        </h2>
        <p className="mt-6 text-white/70 max-w-xl mx-auto">
          Takes three minutes. Reviewed weekly. You&apos;ll hear from us in five
          days.
        </p>

        <div className="mt-10 max-w-lg mx-auto bg-brand-navy-2 border border-white/10 rounded-2xl p-6 text-left">
          <div className="text-xs uppercase tracking-widest text-white/40 mb-4 text-center">
            HubSpot form embed goes here
          </div>
          <div className="flex flex-col gap-2">
            {[
              "Full name",
              "Email",
              "Portfolio URL",
              "Years designing",
              "Availability (hours/week)",
              "Tell us about a project you're proud of",
            ].map((label) => (
              <div
                key={label}
                className="w-full px-4 py-3 rounded-lg bg-brand-navy border border-white/10 text-white/50 text-sm"
              >
                {label}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/40 text-center mt-4">
            Paste your HubSpot form embed code here. Replaces the whole block.
          </p>
        </div>
      </div>
    </section>
  );
}
