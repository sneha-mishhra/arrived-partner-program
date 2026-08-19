"use client";

// Clouds that fall out of the section they are placed in and land in the one
// below, so the seam between the two reads as sky rather than as a boundary.
//
// Same construction as the hero field: one scroll driver, scaled per layer, so
// the bank separates on the way down instead of moving as a sheet. The layer
// overhangs the bottom of its section by `overhang`, and the section below has
// to be transparent for the clouds to be visible once they arrive.

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { CLOUD_ART, type CloudArt } from "./cloud-art";

type FallLayer = {
  art: CloudArt;
  /** % of the layer's width */
  left: number;
  /** % of the layer's height */
  top: number;
  /** px at 1280 wide */
  width: number;
  opacity: number;
  /** travel multiplier: higher falls further */
  rate: number;
  /** seconds for one float cycle */
  drift: number;
};

const LAYERS: FallLayer[] = [
  { art: "light", left: -12, top: 4, width: 620, opacity: 0.75, rate: 1, drift: 23 },
  { art: "light", left: 58, top: 12, width: 680, opacity: 0.6, rate: 1.4, drift: 27 },
  { art: "dark", left: 24, top: 26, width: 460, opacity: 0.4, rate: 0.7, drift: 20 },
  { art: "light", left: 74, top: 40, width: 520, opacity: 0.5, rate: 1.2, drift: 31 },
];

function FallingCloud({
  layer,
  index,
  progress,
  reduced,
}: {
  layer: FallLayer;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, 620 * layer.rate]);
  // Fade in on the way down, hold, then dissolve rather than clip.
  const fade = useTransform(progress, [0, 0.15, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${layer.left}%`,
        top: `${layer.top}%`,
        width: `calc(${layer.width}px * var(--p-cloud-scale))`,
        opacity: reduced ? layer.opacity : fade,
        y: reduced ? 0 : y,
      }}
    >
      <div
        className={reduced ? undefined : "p-cloud-float"}
        style={
          reduced
            ? undefined
            : ({
                ["--p-cloud-duration" as string]: `${layer.drift}s`,
                ["--p-cloud-delay" as string]: `-${index * 6}s`,
                opacity: layer.opacity,
              } as React.CSSProperties)
        }
      >
        <Image
          src={CLOUD_ART[layer.art].src}
          alt=""
          width={CLOUD_ART[layer.art].w}
          height={CLOUD_ART[layer.art].h}
          className="h-auto w-full select-none"
        />
      </div>
    </motion.div>
  );
}

export default function CloudFall({
  overhang = 520,
  art,
  startTop = 0,
}: {
  /** px the field extends past the bottom of its section. */
  overhang?: number;
  /** Force every layer onto one art. Omit to use each layer's own. */
  art?: CloudArt;
  /** Percentage points added to each layer's resting top, for bridging a seam
   *  from low in the section rather than drifting through all of it. */
  startTop?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ bottom: -overhang }}
    >
      {LAYERS.map((layer, i) => (
        <FallingCloud
          key={`${layer.art}-${i}`}
          layer={{
            ...layer,
            art: art ?? layer.art,
            top: layer.top + startTop,
          }}
          index={i}
          progress={scrollYProgress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
