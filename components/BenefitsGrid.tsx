// CONTENTFUL MAP → content type: "BenefitsGrid"
// Fields: eyebrow, headline, subheadline, benefits (List of {icon, title, body, pointerColor}) — repeatable

import { Pointer } from "./ui/pointer";

const BENEFITS = [
  {
    icon: "$",
    title: "Revenue share",
    body: "Get paid on every brief. Rising partners earn a set share. Trusted and Signature earn more per project.",
    color: "#22c55e", // green — money
  },
  {
    icon: "★",
    title: "Priority support",
    body: "Direct line to our engineering and design team. Slack channel, monthly office hours, fast issue resolution.",
    color: "#f59e0b", // amber — star
  },
  {
    icon: "→",
    title: "Early access",
    body: "Test new features before customers see them. Private beta, roadmap input, first look at what's next.",
    color: "#6D5AE6", // brand purple
  },
  {
    icon: "◎",
    title: "Directory listing",
    body: "Public profile on happilyarrive.com. Clients browsing for a designer can find and hire you directly.",
    color: "#ec4899", // pink
  },
  {
    icon: "+",
    title: "Marketing support",
    body: "Featured in case studies, social spotlights, and our partner newsletter. We help your work get seen.",
    color: "#0ea5e9", // sky blue
  },
  {
    icon: "✓",
    title: "Verified certification",
    body: "Digital badge for your LinkedIn and portfolio site. Signals real skill, not just a course completion.",
    color: "#8b5cf6", // violet
  },
];

export default function BenefitsGrid() {
  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <span className="pill mb-6 inline-block">Partner benefits</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
          What you get as an Arrived partner.
        </h2>
        <p className="mt-4 text-base text-brand-muted max-w-xl mx-auto">
          Real revenue, real support, and a network that helps you win better
          work.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="relative bg-brand-lavender rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg transition"
            >
              {/* Per-card custom cursor — appears when hovering this specific card */}
              <Pointer>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg"
                  style={{ backgroundColor: b.color }}
                >
                  {b.icon}
                </div>
              </Pointer>

              <div
                className="w-10 h-10 rounded-lg text-white flex items-center justify-center font-black text-lg"
                style={{ backgroundColor: b.color }}
              >
                {b.icon}
              </div>
              <div>
                <div className="font-bold text-brand-navy">{b.title}</div>
                <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                  {b.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
