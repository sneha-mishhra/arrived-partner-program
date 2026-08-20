// Five steps in Verseo's STEP 1 / STEP 2 language. Desktop lays them on a
// connecting horizontal rule (icon above copy, five columns); mobile switches
// to a vertical timeline (icon beside copy, a line running down between
// them) instead of reusing the desktop card stack, which read as a plain
// disconnected list at that width.

import type { ReactNode } from "react";

import Section from "./Section";
import { Reveal } from "./motion";

const linkClass =
  "underline decoration-(--p-line-strong) underline-offset-2 hover:text-(--p-ink)";

const STEPS: { step: string; title: string; body: ReactNode }[] = [
  {
    step: "step 1",
    title: "Register",
    body: "Fill out the application below to get started.",
  },
  {
    step: "step 2",
    title: "Build your sample pages",
    body: (
      <>
        Build 3 sample pages using{" "}
        <a
          href="https://teamhappily.com/arrived?utm_source=partner-page&utm_medium=web&utm_campaign=partner-page"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          our Arrived page
        </a>
        , so we can see what you can do.
      </>
    ),
  },
  {
    step: "step 3",
    title: "Submit your pages",
    body: (
      <>
        Whenever you feel good about your 3 pages,{" "}
        <a
          href="https://59wvs.share-na2.hsforms.com/2I-pIvmj2Sd-1We0551sv8g"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          submit them
        </a>{" "}
        for review.
      </>
    ),
  },
];

export default function HowItWorks() {
  const last = STEPS.length - 1;

  return (
    <Section
      id="how"
      label="How it works"
      labelDot="var(--p-chip-blue)"
      heading="Your path to your first brief."
      tone="transparent"
      padBottom="sm"
    >
      <ol className="relative grid gap-0 md:grid-cols-3 md:gap-[var(--p-space-2)]">
        {/* Connecting rule, desktop only. */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-[18px] hidden h-px bg-(--p-line) md:block"
        />

        {STEPS.map((item, i) => (
          <Reveal key={item.step} index={i} as="li">
            <div className="flex gap-[var(--p-space-2)] md:block md:h-full">
              {/* Icon + connecting line, mobile only. */}
              <div className="flex shrink-0 flex-col items-center md:hidden">
                <span
                  aria-hidden="true"
                  className="flex size-[36px] shrink-0 items-center justify-center rounded-full border border-(--p-line-strong) bg-(--p-bg) text-[length:var(--p-text-xs)] font-[var(--p-weight-strong)] tabular-nums text-(--p-ink)"
                >
                  {i + 1}
                </span>
                {i < last ? (
                  <span
                    aria-hidden="true"
                    className="mt-[var(--p-space-1)] w-px flex-1 bg-(--p-line)"
                  />
                ) : null}
              </div>

              {/* Icon, desktop only. */}
              <span
                aria-hidden="true"
                className="relative z-10 hidden size-[36px] items-center justify-center rounded-full border border-(--p-line-strong) bg-(--p-bg) text-[length:var(--p-text-xs)] font-[var(--p-weight-strong)] tabular-nums text-(--p-ink) md:flex"
              >
                {i + 1}
              </span>

              <div className={i < last ? "pb-[var(--p-space-3)] md:pb-0" : ""}>
                <p className="p-label md:mt-[var(--p-space-2)]">{item.step}</p>
                <h3 className="mt-[var(--p-space-1)] text-[length:var(--p-text-base)] font-[var(--p-weight-medium)] leading-[var(--p-leading-snug)] text-(--p-ink)">
                  {item.title}
                </h3>
                <p className="mt-[var(--p-space-1)] break-words text-[length:var(--p-text-sm)] text-(--p-muted)">
                  {item.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
