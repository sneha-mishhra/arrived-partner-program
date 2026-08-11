// CONTENTFUL MAP → content type: "FAQ"
// Fields: eyebrow, headline, items (List of {question, answer (Long text)}) - repeatable

"use client";
import { useState } from "react";

const ITEMS = [
  {
    q: "Do I need to know how to code?",
    a: "No. Arrived's designer platform is fully visual. Drag, drop, and design. If you can use Figma, you can use Arrived.",
  },
  {
    q: "How much can I earn?",
    a: "Typical projects run $800–$4,500. Top partners bring in $10k+/month. You set your rate; we surface you to the right hosts.",
  },
  {
    q: "How long does certification take?",
    a: "Most designers finish the six modules and prove build in 5–7 days. You move at your own pace.",
  },
  {
    q: "Can I keep freelancing outside Arrived?",
    a: "Yes. There's no exclusivity. Partner briefs are extra flow on top of your existing work.",
  },
  {
    q: "What if I don't get in?",
    a: "We give feedback and open reapplications every 90 days. Design jams are also a way to prove yourself and skip the queue.",
  },
  {
    q: "What kind of designers are you looking for?",
    a: "Brand designers, graphic designers, and visual identity specialists with a portfolio that shows systems, not just one-off assets.",
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
