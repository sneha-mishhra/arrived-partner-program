"use client";

// Plain horizontal scroll-snap carousel for the jam photos. Replaces an
// earlier GSAP fan-card effect that was fragile across viewport widths
// (clipped on some desktop sizes, whited out by an unrelated seam-fade bug)
// — this is deliberately simple: native scroll-snap, two arrow buttons, no
// animation library.

import Image from "next/image";
import { useRef } from "react";

export type CarouselImage = {
  src: string;
  alt: string;
};

const ARROW_CLASSES =
  "flex size-[40px] shrink-0 items-center justify-center rounded-full border border-(--p-line-strong) bg-(--p-bg) text-(--p-ink) transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease) hover:bg-(--p-surface) disabled:pointer-events-none disabled:opacity-30";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <polyline
        points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}
      />
    </svg>
  );
}

export default function JamCarousel({ images }: { images: CarouselImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center gap-[var(--p-space-2)]">
      <button
        type="button"
        onClick={() => scrollByCard("left")}
        className={`${ARROW_CLASSES} hidden sm:flex`}
        aria-label="Previous photo"
      >
        <Arrow direction="left" />
      </button>

      <div
        ref={trackRef}
        className="flex flex-1 snap-x snap-mandatory gap-[var(--p-space-2)] overflow-x-auto scroll-smooth pb-[var(--p-space-1)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image) => (
          <div
            key={image.src}
            data-card
            className="relative aspect-square w-[220px] shrink-0 snap-center overflow-hidden rounded-[var(--p-radius-lg)] sm:w-[280px] lg:w-[320px]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 280px, 220px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard("right")}
        className={`${ARROW_CLASSES} hidden sm:flex`}
        aria-label="Next photo"
      >
        <Arrow direction="right" />
      </button>
    </div>
  );
}
