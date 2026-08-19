"use client";

// Sky hero, built on the reference site's construction:
//   - a blue-to-white vertical sky filling the hero
//   - seven cloud layers cut from two supplied PNGs, each with its own size,
//     position, and opacity
//   - one scroll driver, scaled per layer, so the clouds separate as you scroll
//   - a float cycle so the sky is alive before anyone touches the wheel
//   - pointer parallax, depth-scaled and springed, on fine pointers only
//
// The reference's opacity ladder (1, 0.4, 0.6, 0.24, 0.25, 0.25, 1) and its
// per-layer rate ladder (1.0, 0.8, 1.6, -1.0) are both reproduced.
//
// One deliberate departure: the reference lifts its clouds as you scroll. Here
// they rest in the middle band, settle into place on load, and fall downward
// on scroll, carrying on past the hero and into the section below. Rates stay
// scaled per layer so they separate on the way down instead of moving as a
// sheet.
// Under prefers-reduced-motion every layer holds still.

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

import Image from "next/image";

import { Reveal, RollButton } from "./motion";

import { CLOUD_ART, type CloudArt } from "./cloud-art";

type Layer = {
  art: CloudArt;
  /** % of hero width */
  left: number;
  /** % of hero height */
  top: number;
  /** px at 1280 wide */
  width: number;
  opacity: number;
  /** scroll parallax rate, higher falls faster */
  rate: number;
  /** seconds for one float cycle */
  drift: number;
  /** pointer parallax depth in px. Near clouds move more than far ones. */
  depth: number;
};

// Resting positions run from 4% to 36% of the hero, the band where the sky is
// still blue enough for a white cloud to read. Rates are all positive: the
// bank falls, each layer at its own speed.
const LAYERS: Layer[] = [
  { art: "light", left: -8, top: 26, width: 720, opacity: 1, rate: 1, drift: 19, depth: 34 },
  { art: "light", left: 44, top: 22, width: 780, opacity: 0.95, rate: 0.8, drift: 24, depth: 28 },
  { art: "dark", left: 12, top: 11, width: 520, opacity: 0.7, rate: 1.6, drift: 16, depth: 20 },
  { art: "dark", left: 66, top: 5, width: 420, opacity: 0.5, rate: 1.4, drift: 27, depth: 14 },
  { art: "light", left: 74, top: 31, width: 380, opacity: 0.85, rate: 1.2, drift: 21, depth: 24 },
  { art: "light", left: 28, top: 36, width: 340, opacity: 0.6, rate: 0.7, drift: 25, depth: 12 },
  // High and faint, breaking up the deep blue at the very top.
  { art: "dark", left: -22, top: 3, width: 700, opacity: 0.4, rate: 0.5, drift: 29, depth: 8 },
  // Below the CTA row: the bank continues under the buttons rather than
  // stopping at them, so the sky carries on to the bottom of the hero.
  { art: "light", left: -14, top: 62, width: 760, opacity: 0.9, rate: 1.1, drift: 23, depth: 30 },
  { art: "light", left: 48, top: 68, width: 700, opacity: 0.8, rate: 0.9, drift: 26, depth: 22 },
  { art: "light", left: 20, top: 78, width: 620, opacity: 0.65, rate: 1.3, drift: 18, depth: 16 },
];

function CloudLayer({
  layer,
  index,
  progress,
  pointerX,
  pointerY,
  reduced,
}: {
  layer: Layer;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  pointerX: ReturnType<typeof useSpring>;
  pointerY: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  // One driver, scaled per layer. Positive travel: the bank falls through the
  // hero and on into the next section, fastest layers first.
  const y = useTransform(progress, [0, 1], [0, 780 * layer.rate]);
  // Hold full strength through the hero and well past the next section's
  // heading, then dissolve while that section scrolls by, so the bank is gone
  // before the opaque section below would have covered it. These are fractions
  // of the field's own scroll, so they hold at any viewport height.
  const fade = useTransform(progress, [0, 0.6, 0.92], [1, 1, 0]);
  // Pointer parallax: -0.5..0.5 in, pixels out, scaled by the layer's depth.
  const px = useTransform(pointerX, (v: number) => v * layer.depth);
  const py = useTransform(pointerY, (v: number) => v * layer.depth * 0.5);

  return (
    // Outer element owns the scroll fall. Nothing else writes to its transform.
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: `${layer.left}%`,
        top: `${layer.top}%`,
        width: `calc(${layer.width}px * var(--p-cloud-scale))`,
        y: reduced ? 0 : y,
        opacity: reduced ? 1 : fade,
      }}
    >
      {/* Inner element owns the entrance: clouds settle into the middle band
          on load rather than being there from the first frame. */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -32 }}
        animate={{ opacity: layer.opacity, y: 0 }}
        transition={{
          duration: 1.1,
          ease: [0.4, 0, 0.2, 1],
          delay: reduced ? 0 : index * 0.09,
        }}
        style={{ opacity: layer.opacity }}
      >
        <motion.div style={reduced ? undefined : { x: px, y: py }}>
          <div
            className={reduced ? undefined : "p-cloud-float"}
            style={
              reduced
                ? undefined
                : ({
                    ["--p-cloud-duration" as string]: `${layer.drift}s`,
                    ["--p-cloud-delay" as string]: `-${index * 7}s`,
                  } as React.CSSProperties)
            }
          >
            <Image
              src={CLOUD_ART[layer.art].src}
              alt=""
              width={CLOUD_ART[layer.art].w}
              height={CLOUD_ART[layer.art].h}
              priority={index < 3}
              className="h-auto w-full select-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function SkyHero() {
  const ref = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  // Progress runs until the bottom of the cloud field clears the top of the
  // viewport, which is well into the next section, so the clouds are still
  // travelling after the hero itself has gone.
  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start start", "end start"],
  });

  // Pointer parallax. Raw values are -0.5..0.5 across the hero; springs give
  // the clouds weight so they lag the cursor instead of snapping to it.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 40, damping: 18, mass: 1.1 });
  const pointerY = useSpring(rawY, { stiffness: 40, damping: 18, mass: 1.1 });

  useEffect(() => {
    // Touch screens have no hover, and firing this on every touch move would
    // fight the scroll. Fine pointers only.
    if (reduced || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const bounds = ref.current?.getBoundingClientRect();

      if (!bounds) {
        return;
      }

      rawX.set((event.clientX - bounds.left) / bounds.width - 0.5);
      rawY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, rawX, rawY]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative z-10 w-full px-[var(--p-space-3)] pb-[var(--p-space-8)] pt-[var(--p-space-7)]"
      style={{
        background:
          "linear-gradient(var(--p-sky-top) 0%, var(--p-sky-mid) 26%, var(--p-sky-low) 74%, var(--p-bg) 100%)",
      }}
    >
      {/* The cloud field runs 900px past the hero, so the bank keeps falling
          into the section below instead of being cut off at the hero edge.
          The section below is transparent, so the clouds read through it. */}
      <div
        ref={fieldRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[calc(100%+900px)] overflow-hidden"
      >
        {LAYERS.map((layer, i) => (
          <CloudLayer
            key={`${layer.art}-${i}`}
            layer={layer}
            index={i}
            progress={scrollYProgress}
            pointerX={pointerX}
            pointerY={pointerY}
            reduced={reduced}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[900px] text-center">
        <Reveal>
          <span className="inline-flex items-center gap-[var(--p-space-1)] rounded-[var(--p-radius-pill)] border border-white/60 bg-white/70 px-[var(--p-space-2)] py-[6px] text-[length:var(--p-text-xs)] font-[var(--p-weight-strong)] tracking-[0.06em] text-(--p-ink) backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-[8px] rounded-full bg-(--p-accent)"
            />
            Arrived Partner Program
          </span>
        </Reveal>

        <Reveal index={1}>
          <h1
            className="mt-[var(--p-space-3)] text-(--p-ink)"
            style={{
              fontSize: "clamp(2.75rem, 5.7vw, var(--p-text-5xl))",
              fontWeight: "var(--p-weight-bold)",
              lineHeight: "1",
              letterSpacing: "-0.04em",
            }}
          >
            Design. Build. Earn.
          </h1>
        </Reveal>

        <Reveal index={2}>
          <p
            className="p-lead mx-auto mt-[var(--p-space-3)] max-w-[600px]"
            style={{ color: "var(--p-ink-soft)" }}
          >
            The event site is the first taste of the vibe. Get paid to design
            it. Get matched to briefs that value taste. Get listed with the
            sharpest event designers around.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-[var(--p-space-4)] flex flex-wrap items-center justify-center gap-[var(--p-space-1)]">
            <RollButton href="#jams" variant="secondary">
              Join the next design jam
            </RollButton>
            <RollButton href="#apply">Apply to become a partner</RollButton>
          </div>
        </Reveal>
      </div>

    </section>
  );
}
