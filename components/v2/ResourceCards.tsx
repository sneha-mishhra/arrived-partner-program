// Floating document panel over a contained cloud band, styled after the
// "how it works" floating card on verseo.framer.website: stacked cards with
// small caption chips over a cloudy blue backdrop, instead of a bare list
// of links.

import Image from "next/image";

import Sky, { DARK_BAND } from "./Sky";

export type Resource = {
  label: string;
  href: string;
  image: string;
};

export default function ResourceCards({
  resources,
}: {
  resources: Resource[];
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-[var(--p-radius-lg)] border border-(--p-line) px-[var(--p-space-3)] py-[var(--p-space-5)]">
      <Sky wash band={DARK_BAND} insetTop={20} insetBottom={20} />

      <div className="relative z-10 mx-auto flex max-w-[280px] flex-col gap-[var(--p-space-4)]">
        {resources.map((resource, i) => (
          <a
            key={resource.href}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative block transition-transform duration-[var(--p-duration-slow)] ease-(--p-ease) hover:-translate-y-[4px] ${
              i % 2 === 0 ? "-rotate-2 self-start" : "rotate-2 self-end"
            }`}
          >
            <div className="relative aspect-[10/6.5] w-[240px] overflow-hidden rounded-[var(--p-radius-sm)] border border-(--p-line-strong) bg-(--p-bg) shadow-[0_20px_40px_-16px_rgba(0,0,0,0.4)]">
              <Image
                src={resource.image}
                alt={resource.label}
                fill
                sizes="240px"
                className="object-cover object-top"
              />
            </div>
            <span
              className={`absolute -bottom-[10px] rounded-[var(--p-radius-pill)] border border-(--p-line-strong) bg-(--p-bg) px-[var(--p-space-2)] py-[4px] text-[length:var(--p-text-xs)] font-[var(--p-weight-medium)] text-(--p-ink) shadow-[0_6px_16px_-6px_rgba(0,0,0,0.3)] group-hover:underline ${
                i % 2 === 0 ? "-right-[10px]" : "-left-[10px]"
              }`}
            >
              {resource.label} ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
