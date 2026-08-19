"use client";

// Sticky nav: wordmark left, links centred, single dark CTA right.
// Border appears only once the page has scrolled, so the hero reads as one
// uninterrupted surface at rest.

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { RollButton } from "./motion";

const LINKS = [
  { label: "Benefits", href: "#benefits" },
  { label: "How it works", href: "#how" },
  { label: "Design Jams", href: "#jams" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-[var(--p-space-1)] isolate z-50 w-full px-[var(--p-space-2)] pt-[var(--p-space-1)]">
      <nav
        // translate-z-0 forces this into its own GPU compositing layer.
        // Without it, backdrop-blur on a position:sticky element can corrupt
        // the paint of unrelated content elsewhere on the page as it scrolls
        // past — a known Chromium/WebKit compositing bug, not a CSS mistake
        // in the affected content itself.
        className="mx-auto flex max-w-[1120px] translate-z-0 items-center justify-between rounded-[var(--p-radius-pill)] px-[var(--p-space-2)] py-[var(--p-space-1)] backdrop-blur-md transition-colors duration-[var(--p-duration-slow)] ease-(--p-ease)"
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--p-bg) 86%, transparent)"
            : "color-mix(in srgb, var(--p-bg) 62%, transparent)",
          border: `1px solid ${scrolled ? "var(--p-line)" : "rgba(255,255,255,0.6)"}`,
        }}
      >
        <a href="#top" className="flex items-center">
          <Image
            src="/arrived-logo.png"
            alt="Happily Arrived"
            width={962}
            height={135}
            priority
            className="h-[18px] w-auto sm:h-[22px]"
          />
        </a>

        <div className="hidden items-center gap-[var(--p-space-4)] md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[length:var(--p-text-sm)] text-(--p-muted) transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease) hover:text-(--p-ink)"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-[var(--p-space-1)]">
          <RollButton href="#apply">Apply</RollButton>

          {/* Below md the links are hidden, so without this the page has no
              navigation at all on a phone. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-[38px] items-center justify-center rounded-[var(--p-radius-pill)] border border-(--p-line-strong) text-(--p-ink) transition-colors duration-[var(--p-duration-fast)] ease-(--p-ease) md:hidden"
          >
            <span className="relative block h-[10px] w-[16px]">
              <motion.span
                className="absolute inset-x-0 top-0 block h-[2px] bg-current"
                animate={{ y: open ? 4 : 0, rotate: open ? 45 : 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute inset-x-0 bottom-0 block h-[2px] bg-current"
                animate={{ y: open ? -4 : 0, rotate: open ? -45 : 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto mt-[var(--p-space-1)] max-w-[1120px] overflow-hidden rounded-[var(--p-radius-lg)] border border-(--p-line) bg-(--p-bg)/95 backdrop-blur-md md:hidden"
          >
            <ul className="divide-y divide-(--p-line)">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-[var(--p-space-3)] py-[var(--p-space-2)] text-[length:var(--p-text-sm)] text-(--p-ink)"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
