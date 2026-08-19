// Footer: the copyright line and nothing else.

import { Reveal } from "./motion";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-(--p-line) bg-(--p-bg) px-[var(--p-space-3)] py-[var(--p-space-4)]">
      <Reveal>
        <p className="mx-auto max-w-[1120px] text-center text-[length:var(--p-text-xs)] text-(--p-faint)">
          © 2026 Happily. All rights reserved.
        </p>
      </Reveal>
    </footer>
  );
}
