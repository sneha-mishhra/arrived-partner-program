// Footer: social links in each platform's real brand color, then the
// copyright line. A small lift on hover is the only added motion — the
// color itself is already the personality.

import { Reveal } from "./motion";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/teamhappily",
    icon: (
      <svg viewBox="0 0 32 32">
        <defs>
          <radialGradient
            id="ig-grad"
            cx="30%"
            cy="107%"
            r="150%"
          >
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="5%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#ig-grad)" />
        <rect
          x="9"
          y="9"
          width="14"
          height="14"
          rx="4.5"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
        />
        <circle cx="16" cy="16" r="4" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="20.6" cy="11.4" r="1" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/teamhappily/",
    icon: (
      <svg viewBox="0 0 32 32">
        <rect width="32" height="32" rx="9" fill="#1877F2" />
        <path
          d="M20 11.5h-2.2c-.5 0-1 .5-1 1.3v2h3.1l-.4 3h-2.7v7.5h-3.1V17.8h-2v-3h2v-2.4c0-2 1.3-3.9 4-3.9h2.3v2.6z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/c/TeamHappily",
    icon: (
      <svg viewBox="0 0 32 32">
        <rect width="32" height="32" rx="9" fill="#FF0000" />
        <path d="M13.5 11.8v8.4l7.5-4.2-7.5-4.2z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/happily/",
    icon: (
      <svg viewBox="0 0 32 32">
        <rect width="32" height="32" rx="9" fill="#0A66C2" />
        <circle cx="10.8" cy="11" r="1.6" fill="#fff" />
        <rect x="9.4" y="14" width="2.8" height="9" fill="#fff" />
        <path
          d="M15 14h2.7v1.3h.04c.38-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.3V23h-2.8v-4.4c0-1.1 0-2.4-1.5-2.4-1.5 0-1.7 1.1-1.7 2.3V23H15V14z"
          fill="#fff"
        />
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
                className="block size-[36px] overflow-hidden rounded-[var(--p-radius-lg)] transition-transform duration-[var(--p-duration-fast)] ease-(--p-ease) hover:-translate-y-[3px]"
              >
                {social.icon}
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
