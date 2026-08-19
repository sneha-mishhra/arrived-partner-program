// Section shell: pill eyebrow, heading, lead. Every section on the page uses
// this, so vertical rhythm and heading placement never drift between them.

import type { ReactNode } from "react";

import { Reveal } from "./motion";

const PAD = {
  lg: "var(--p-space-7)",
  sm: "var(--p-space-4)",
};

// Same pill shape as the hero's "Arrived Partner Program" badge, so every
// section eyebrow reads as one family. Each caller picks its own dot color.
export function Eyebrow({ label, dot = "var(--p-accent)" }: { label: string; dot?: string }) {
  return (
    <span className="inline-flex items-center gap-[var(--p-space-1)] rounded-[var(--p-radius-pill)] border border-(--p-line) bg-(--p-surface) px-[var(--p-space-2)] py-[6px] text-[length:var(--p-text-xs)] font-[var(--p-weight-strong)] tracking-[0.06em] text-(--p-ink)">
      <span aria-hidden="true" className="size-[8px] rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}

export default function Section({
  id,
  label,
  labelDot,
  heading,
  lead,
  children,
  backdrop,
  tone = "default",
  align = "center",
  padTop = "lg",
  padBottom = "lg",
}: {
  id?: string;
  /** Optional pill eyebrow above the heading. */
  label?: string;
  /** Dot color for the eyebrow pill. */
  labelDot?: string;
  heading: string;
  lead?: string;
  children: ReactNode;
  /** Full-bleed layer rendered behind the section content. */
  backdrop?: ReactNode;
  tone?: "default" | "surface" | "transparent";
  align?: "center" | "left";
  /** Tightens the gap at a section boundary without affecting the rest of the page's rhythm. */
  padTop?: "lg" | "sm";
  padBottom?: "lg" | "sm";
}) {
  return (
    <section
      id={id}
      style={{ paddingTop: PAD[padTop], paddingBottom: PAD[padBottom] }}
      className={`relative z-10 w-full scroll-mt-[var(--p-space-6)] px-[var(--p-space-3)] ${
        tone === "surface"
          ? "border-y border-(--p-line) bg-(--p-surface)"
          : tone === "transparent"
            ? "bg-transparent"
            : "bg-(--p-bg)"
      }`}
    >
      {backdrop}

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div
          className={
            align === "center"
              ? "mx-auto max-w-[640px] text-center"
              : "max-w-[640px]"
          }
        >
          {label ? (
            <Reveal>
              <Eyebrow label={label} dot={labelDot} />
            </Reveal>
          ) : null}
          <Reveal index={1}>
            <h2 className="p-h2 mt-[var(--p-space-2)]">{heading}</h2>
          </Reveal>
          {lead ? (
            <Reveal index={2}>
              <p className="p-lead mt-[var(--p-space-2)]">{lead}</p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-[var(--p-space-5)]">{children}</div>
      </div>
    </section>
  );
}
