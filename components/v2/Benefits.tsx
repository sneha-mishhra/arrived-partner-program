// Partner benefits, in the reference's feature-card layout: a pixel mark at the
// top of the card, then title and body pinned to the foot. Content is
// bottom-aligned so every card's title sits on the same line regardless of
// how long its body runs.

import CloudFall from "./CloudFall";
import Section from "./Section";
import { Reveal } from "./motion";

// 5x5 pixel marks, one per card. Drawn as a grid of cells rather than shipped
// as icon files: four marks at a few bytes each, and they take colour from the
// chip tokens.
const MARKS: Record<string, string[]> = {
  block: ["11111", "11111", "11111", "11111", "11111"],
  scatter: ["10110", "11011", "01110", "11011", "01101"],
  cross: ["00100", "00100", "11111", "00100", "00100"],
  step: ["11000", "01100", "00110", "00011", "00001"],
};

function PixelMark({ mark, color }: { mark: string; color: string }) {
  return (
    <span
      aria-hidden="true"
      className="grid gap-[2px]"
      style={{ gridTemplateColumns: "repeat(5, 5px)" }}
    >
      {MARKS[mark].flatMap((row, y) =>
        row.split("").map((cell, x) => (
          <span
            key={`${x}-${y}`}
            className="block size-[5px]"
            style={{ background: cell === "1" ? color : "transparent" }}
          />
        )),
      )}
    </span>
  );
}

const BENEFITS = [
  {
    title: "Revenue share",
    body: "Get paid on every brief. Rising partners earn a set share. Trusted and Signature earn more per project.",
    mark: "block",
    color: "var(--p-ink)",
  },
  {
    title: "Priority support",
    body: "Direct line to our engineering and design team. Slack channel, monthly office hours, fast issue resolution.",
    mark: "scatter",
    color: "var(--p-chip-green)",
  },
  {
    title: "Directory listing",
    body: "A specialist profile in the Happily database, so clients browsing for a designer can find and hire you directly.",
    mark: "cross",
    color: "var(--p-chip-amber)",
  },
  {
    title: "Marketing",
    body: "Featured in case studies, social spotlights, and our partner newsletter. We help your work get seen.",
    mark: "step",
    color: "var(--p-chip-violet)",
  },
];

export default function Benefits() {
  return (
    <Section
      id="benefits"
      label="Partner benefits"
      labelDot="var(--p-accent)"
      heading="What you get as an Arrived partner"
      lead="Real revenue, real support, and a network that helps you win better work."
      tone="transparent"
      backdrop={<CloudFall />}
    >
      <div className="grid gap-[var(--p-space-2)] sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit, i) => (
          <Reveal key={benefit.title} index={i}>
            <div className="p-card flex h-full min-h-[180px] flex-col bg-(--p-bg) p-[var(--p-space-3)]">
              <PixelMark mark={benefit.mark} color={benefit.color} />

              {/* Pushes the copy to the foot of the card, so titles line up.
                  The min-height keeps a little breathing room even when the
                  card is barely taller than its content. */}
              <div className="min-h-[var(--p-space-4)] flex-1" />

              <h3 className="text-[length:var(--p-text-xl)] font-[var(--p-weight-medium)] leading-[var(--p-leading-snug)] tracking-[-0.01em] text-(--p-ink)">
                {benefit.title}
              </h3>
              <p className="mt-[var(--p-space-1)] text-[length:var(--p-text-sm)] text-(--p-muted)">
                {benefit.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
