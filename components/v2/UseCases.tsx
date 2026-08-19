"use client";

// Numbered accordion, Verseo's "use cases" pattern: 001 / 002 / 003 down the
// left, the open one expands with its body copy. Height animates on the shared
// easing token; the panel is a real disclosure, not a decorative toggle.

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import CloudFall from "./CloudFall";
import Section from "./Section";
import Sky, { DARK_BAND } from "./Sky";
import { Reveal } from "./motion";

const CASES = [
  {
    id: "001",
    label: "Designers",
    body: "Whether you work in web design or graphic design, you are welcome to register. You will help our clients build event pages on Arrived that match the vibe of the event.",
  },
  {
    id: "002",
    label: "Vibe coders",
    body: "Arrived connects to any LLM through our API, so you can vibe code your way to event pages that look genuinely good. Bring your own stack and your own taste; the event data and registration handle themselves.",
  },
  {
    id: "003",
    label: "Freelancers",
    body: "If you have real taste in design and you are always looking for the next project, this is worth a look. Anyone open to learning can register, and our team will walk you through onboarding.",
  },
];

export default function UseCases() {
  const [open, setOpen] = useState("");
  const reduced = useReducedMotion();

  return (
    <Section
      heading="Who can register"
      tone="transparent"
      backdrop={
        <>
          <Sky wash band={DARK_BAND} />
          {/* Same falling clouds as the hero and Benefits above, entering
              from the top of this section rather than partway down, so the
              cascade reads as one continuous drop through all three
              sections instead of restarting partway through this one. */}
          <CloudFall overhang={460} />
        </>
      }
    >
      <div className="mx-auto max-w-[820px] divide-y divide-(--p-line) border-y border-(--p-line)">
        {CASES.map((item, i) => {
          const isOpen = open === item.id;

          return (
            <Reveal key={item.id} index={i}>
              <div>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`case-${item.id}`}
                  className="flex w-full items-center gap-[var(--p-space-3)] py-[var(--p-space-3)] text-left"
                >
                  <span
                    className="rounded-[var(--p-radius-sm)] px-[var(--p-space-1)] py-[2px] text-[length:var(--p-text-xs)] font-[var(--p-weight-strong)] tabular-nums transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease)"
                    style={{
                      background: isOpen
                        ? "var(--p-accent-soft)"
                        : "var(--p-surface-alt)",
                      color: isOpen ? "var(--p-accent-ink)" : "var(--p-faint)",
                    }}
                  >
                    {item.id}
                  </span>
                  <span className="flex-1 text-[length:var(--p-text-lg)] font-[var(--p-weight-medium)] text-(--p-ink)">
                    {item.label}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen && !reduced ? 45 : 0 }}
                    transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                    className="flex size-[34px] shrink-0 items-center justify-center rounded-[var(--p-radius-sm)] border border-(--p-line-strong) text-[length:var(--p-text-lg)] leading-none text-(--p-muted)"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`case-${item.id}`}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="p-lead max-w-[620px] pb-[var(--p-space-3)] pl-[calc(var(--p-space-3)+2.5rem)]">
                        {item.body}
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
