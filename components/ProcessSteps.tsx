// CONTENTFUL MAP → content type: "ProcessSteps"
// Fields: eyebrow, headline, steps (List of {number, title, body}) — repeatable

const STEPS = [
  {
    number: 1,
    title: "Apply",
    body: "Portfolio, style, availability. Reviewed weekly.",
  },
  {
    number: 2,
    title: "Learn",
    body: "Six short modules. A sandbox to play in. Move at your pace.",
  },
  {
    number: 3,
    title: "Prove",
    body: "Build a real event site. Reviewed by our design lead.",
  },
  {
    number: 4,
    title: "Earn",
    body: "Certified, listed, matched to briefs. Paid on time.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-5xl mx-auto bg-brand-lavender rounded-3xl px-8 md:px-14 py-14">
        <div className="text-center">
          <span className="pill mb-6 inline-block">How it works</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
            Four steps. One goal. Get you doing paid work.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div
              key={s.number}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-brand-purple-2 text-white flex items-center justify-center font-black text-sm">
                {s.number}
              </div>
              <div>
                <div className="font-bold text-brand-navy">{s.title}</div>
                <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
