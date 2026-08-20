// Resource links, styled as simple icon cards rather than stock document
// photography — keeps the success screen on the same design system as the
// rest of the page instead of reaching for browser-window mockups.

import type { ReactNode } from "react";

export type Resource = {
  label: string;
  tag: string;
  body: string;
  href: string;
  icon: ReactNode;
  color: string;
};

export default function ResourceCards({
  resources,
}: {
  resources: Resource[];
}) {
  return (
    <div className="grid gap-[var(--p-space-2)] text-left sm:grid-cols-2">
      {resources.map((resource) => (
        <a
          key={resource.href}
          href={resource.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-card group flex flex-col gap-[var(--p-space-2)] p-[var(--p-space-3)]"
        >
          <div className="flex items-center justify-between">
            <span
              className="flex size-[36px] items-center justify-center rounded-[var(--p-radius-sm)]"
              style={{ background: `color-mix(in srgb, ${resource.color} 18%, transparent)`, color: resource.color }}
            >
              <span className="size-[18px]">{resource.icon}</span>
            </span>
            <span className="p-label text-(--p-faint)">{resource.tag}</span>
          </div>

          <div>
            <h4 className="text-[length:var(--p-text-base)] font-[var(--p-weight-medium)] text-(--p-ink)">
              {resource.label}
            </h4>
            <p className="mt-[2px] text-[length:var(--p-text-sm)] text-(--p-muted)">
              {resource.body}
            </p>
          </div>

          <span className="mt-auto inline-flex items-center gap-[6px] text-[length:var(--p-text-sm)] font-[var(--p-weight-medium)] text-(--p-ink)">
            View
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="size-[13px] transition-transform duration-[var(--p-duration-fast)] ease-(--p-ease) group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            >
              <path d="M4 12 12 4M6 4h6v6" />
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}
