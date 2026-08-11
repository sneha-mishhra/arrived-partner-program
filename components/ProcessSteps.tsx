"use client";

// CONTENTFUL MAP → content type: "ProcessSteps"
// Fields: eyebrow, headline, subheadline, ctaLabel, ctaLink,
//         steps (List of {number, title, body}) — repeatable
// Interaction: 2-column layout, left intro + CTA, right accordion of steps

import { useState } from "react";

const STEPS = [
  {
    number: 1,
    title: "Register",
    body: "Create your Arrived account. Takes under a minute.",
  },
  {
    number: 2,
    title: "Check your inbox",
    body: "You'll get a welcome email with everything you need — modules, docs, and next steps.",
  },
  {
    number: 3,
    title: "Complete your modules & request Pro",
    body: "Work through the training modules at your own pace. Once done, email sneha@teamhappily.com to unlock Pro access.",
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
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="w-full px-6 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* LEFT — intro */}
        <div>
          <span className="pill mb-6 inline-block">How it works</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Your path to your first brief.
          </h2>
          <p className="mt-6 text-base md:text-lg text-brand-muted max-w-md">
            Five steps between signing up and getting paid to design. Move at
            your own pace — most partners finish onboarding in under a week.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex items-center gap-2 bg-brand-navy text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-brand-navy-2 transition"
          >
            Get started
            <span>→</span>
          </a>
        </div>

        {/* RIGHT — accordion */}
        <div className="flex flex-col gap-2">
          {STEPS.map((s, i) => {
            const isOpen = open === i;
            return (
              <button
                key={s.number}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`
                  text-left rounded-2xl p-5 transition-all duration-300
                  ${
                    isOpen
                      ? "bg-brand-navy text-white shadow-lg"
                      : "bg-brand-lavender text-brand-navy hover:bg-brand-lavender-2"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                      font-black text-base transition-all duration-300
                      ${
                        isOpen
                          ? "bg-brand-purple-2 text-white"
                          : "bg-brand-purple text-white"
                      }
                    `}
                  >
                    {s.number}
                  </div>
                  <h3 className="font-bold text-lg md:text-xl flex-1">
                    {s.title}
                  </h3>
                  <span
                    className={`text-2xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-out
                    ${isOpen ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p
                    className={`text-sm md:text-base leading-relaxed pl-14 ${
                      isOpen ? "text-white/80" : "text-brand-muted"
                    }`}
                  >
                    {s.body}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
