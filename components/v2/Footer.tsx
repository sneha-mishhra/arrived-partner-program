// Footer: social links, dark by default, each lighting up in that
// platform's real brand color on hover — then the copyright line.

import { Reveal } from "./motion";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/teamhappily",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/teamhappily/",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M15 3h-2a5 5 0 0 0-5 5v3H6v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/c/TeamHappily",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="6" width="19" height="12" rx="4" />
        <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/happily/",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.5" y1="10.5" x2="7.5" y2="16.5" />
        <circle cx="7.5" cy="7.2" r="0.2" fill="currentColor" />
        <path d="M11 16.5v-3.7c0-1.5 1-2.3 2.2-2.3 1.2 0 1.8.8 1.8 2.3v3.7" />
        <line x1="11" y1="10.5" x2="11" y2="16.5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-(--p-line) bg-(--p-bg) px-[var(--p-space-3)] py-[var(--p-space-4)]">
      <Reveal>
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-[var(--p-space-3)]">
          <div className="flex items-center gap-[var(--p-space-2)]">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                style={{ ["--social-color" as string]: social.color }}
                className="flex size-[38px] items-center justify-center rounded-[var(--p-radius-lg)] bg-(--p-ink) text-(--p-bg) transition-all duration-[var(--p-duration-fast)] ease-(--p-ease) hover:-translate-y-[3px] hover:bg-(--social-color)"
              >
                <span className="size-[16px]">{social.icon}</span>
              </a>
            ))}
          </div>

          <p className="text-center text-[length:var(--p-text-xs)] text-(--p-faint)">
            © 2026 Happily. All rights reserved.
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
