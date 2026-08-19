// Sky band: a drift of clouds behind a section further down the page, cut from
// the same two PNGs the hero uses. No parallax here, so the band travels with
// the page and reads as sky passing behind the content. Sections layered over
// it carry transparent backgrounds.
//
// This sits on the pale part of the page, so it is mostly light-cloud: the
// shaded one is the only one that reads against white. Both ends of the panel
// fade into the page background so the band has no visible seam.

import Image from "next/image";

import { CLOUD_ART, type CloudArt } from "./cloud-art";

type BandCloud = {
  art: CloudArt;
  /** % of band width */
  left: number;
  /** % of band height */
  top: number;
  /** px at 1280 wide */
  width: number;
  opacity: number;
  drift: number;
};

const BAND: BandCloud[] = [
  { art: "light", left: -10, top: 8, width: 720, opacity: 0.85, drift: 34 },
  { art: "light", left: 52, top: 26, width: 640, opacity: 0.7, drift: 28 },
  { art: "dark", left: 18, top: 52, width: 560, opacity: 0.5, drift: 38 },
  { art: "light", left: 68, top: 66, width: 600, opacity: 0.6, drift: 31 },
];

export const DARK_BAND: BandCloud[] = [
  { art: "dark", left: -10, top: 10, width: 540, opacity: 0.55, drift: 30 },
  { art: "dark", left: 60, top: 38, width: 470, opacity: 0.42, drift: 36 },
  { art: "dark", left: 18, top: 68, width: 580, opacity: 0.5, drift: 25 },
];

export default function Sky({
  priority = false,
  wash = false,
  band = BAND,
  fadeTop = 140,
  fadeBottom = 180,
  insetTop = 64,
  insetBottom = 64,
}: {
  priority?: boolean;
  /** Cloud set to render. Defaults to the mixed band. */
  band?: BandCloud[];
  /** Paint the hero's sky blue behind the clouds, fading to page background at
   *  both ends so the band has no hard edge. */
  wash?: boolean;
  /** Seam fade heights, px. Shrink these for short sections, where the
   *  default heights are tall enough to wash out content near the edges. */
  fadeTop?: number;
  fadeBottom?: number;
  /** How far past the section's own edges the container bleeds, px. The fade
   *  divs are anchored to this container, not to the section, so on a short
   *  or tightly-padded section the default 64px bleed can reach past a
   *  neighboring section's edge and wash out its content — shrink this to
   *  match the available padding. */
  insetTop?: number;
  insetBottom?: number;
}) {
  return (
    // Anchored to the section it is rendered in, bleeding a little past both
    // edges. It used to be positioned with page-level pixel offsets, which
    // silently broke every time a section was added, removed, or reflowed, and
    // was simply wrong at any viewport it was not measured at.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 z-0 overflow-hidden"
      style={{ top: -insetTop, bottom: -insetBottom }}
    >
      {wash ? (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--p-bg) 0%, var(--p-sky-mid) 38%, var(--p-sky-mid) 62%, var(--p-bg) 100%)",
          }}
        />
      ) : null}

      {band.map((cloud, i) => (
        <div
          key={`${cloud.art}-${i}`}
          className="p-cloud-float absolute"
          style={
            {
              left: `${cloud.left}%`,
              top: `${cloud.top}%`,
              width: `calc(${cloud.width}px * var(--p-cloud-scale))`,
              opacity: cloud.opacity,
              ["--p-cloud-duration" as string]: `${cloud.drift}s`,
              ["--p-cloud-delay" as string]: `-${i * 13}s`,
            } as React.CSSProperties
          }
        >
          <Image
            src={CLOUD_ART[cloud.art].src}
            alt=""
            width={CLOUD_ART[cloud.art].w}
            height={CLOUD_ART[cloud.art].h}
            priority={priority && i < 2}
            className="h-auto w-full select-none"
          />
        </div>
      ))}

      {/* Seam fades, top and bottom. Redundant under the wash, which already
          resolves to the page background at both ends. */}
      {wash ? null : (
        <>
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: fadeTop,
          background: "linear-gradient(to bottom, var(--p-bg), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: fadeBottom,
          background: "linear-gradient(to top, var(--p-bg), transparent)",
        }}
      />
        </>
      )}
    </div>
  );
}
