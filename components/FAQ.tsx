// CONTENTFUL MAP → content type: "FAQ"
// Fields: eyebrow, headline, items (List of {question, answer (Long text)}) - repeatable

"use client";
import { useState } from "react";

const ITEMS = [
  {
    q: "Is there a fee to join the program?",
    a: "No, joining is completely free. If selected, we'll pair you with Arrived's customers so you can design event pages for them and earn on every project.",
  },
  {
    q: "I'm a vibe coder, can I join?",
    a: "Yes, absolutely. We have an API you can plug into your AI workflow to generate beautiful event pages using Arrived.",
  },
  {
    q: "How long is the onboarding process?",
    a: "Usually about a week. You register, work through our modules, and apply for Pro access. Most partners are live and taking briefs within 7 days.",
  },
  {
    q: "Is there a deadline for building my custom page?",
    a: "Yes. We get a lot of applications and review designers on a rolling basis. You'll need to finish your custom page in a day. Pick the day that works for you and ask our team for access before that.",
  },
  {
    q: "Can I build a custom page on the free plan?",
    a: "No. Custom pages are only for Pro users. Designers need to email our team for access, and we'll grant you a one-day Pro window to build.",
  },
  {
    q: "Who do I contact for questions?",
    a: "Email our team at partners@teamhappily.com.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <span className="pill mb-6 inline-block">FAQ</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto">
          The stuff designers actually ask.
        </h2>
      </div>

      <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-2">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <button
              key={item.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="text-left bg-brand-lavender rounded-xl px-5 py-4 hover:bg-brand-lavender-2 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-brand-navy">{item.q}</span>
                <span className="text-brand-purple text-xl leading-none">
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              {isOpen && (
                <p className="mt-3 text-sm text-brand-muted leading-relaxed">
                  {item.a}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
