"use client";

// FAQ accordion. Same disclosure mechanics and easing as the use-case list, so
// the two read as one component family. Content is your existing six answers.

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import Section from "./Section";
import Sky from "./Sky";
import { Reveal } from "./motion";

const ITEMS = [
  {
    q: "Is there a fee to join the program?",
    a: "No, joining is completely free. If selected, we pair you with Arrived's customers so you can design event pages for them and earn on every project.",
  },
  {
    q: "I'm a vibe coder, can I join?",
    a: "Yes. We have an API you can plug into your workflow to generate event pages using Arrived, so you can build the way you already build.",
  },
  {
    q: "How long is the onboarding process?",
    a: "Usually about a week. You register, work through the modules, and apply for Pro access. Most partners are live and taking briefs within seven days.",
  },
  {
    q: "Is there a deadline for building my custom page?",
    a: "Yes. We get a lot of applications and review designers on a rolling basis, so your custom page needs to be finished about 2/3 days. Pick the day that works for you and ask our team for access before it.",
  },
  {
    q: "Can I build a custom page on the free plan?",
    a: "No. Custom pages are a Pro feature, so ask our team to unlock Pro access once you feel familiar with Arrived.",
  },
  {
    q: "Who do I contact for questions?",
    a: "Email designpartners@teamhappily.com. Partners also get a shared Slack channel and monthly office hours once they are onboarded.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <Section
      id="faq"
      label="FAQ"
      labelDot="var(--p-chip-amber)"
      heading="Everything you need to know"
      lead="If your question is not here, email us and we will answer it directly."
      tone="transparent"
      backdrop={<Sky fadeTop={16} fadeBottom={28} insetTop={16} />}
      padTop="sm"
      padBottom="sm"
    >
      <div className="mx-auto max-w-[760px] divide-y divide-(--p-line) border-y border-(--p-line)">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;

          return (
            <Reveal key={item.q} index={i}>
              <div>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-[var(--p-space-3)] py-[var(--p-space-3)] text-left"
                >
                  <span className="text-[length:var(--p-text-base)] font-[var(--p-weight-medium)] text-(--p-ink)">
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen && !reduced ? 45 : 0 }}
                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                    className="shrink-0 text-[length:var(--p-text-lg)] text-(--p-muted)"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="p-lead max-w-[640px] pb-[var(--p-space-3)]">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
