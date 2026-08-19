"use client";

// Motion primitives for the partner page.
// Three behaviours, reused everywhere, all on the same easing token:
//   Reveal      - fade and rise once, on scroll into view, staggered by index
//   RollButton  - label rolls up and its duplicate rolls in, on hover
//   Counter     - number counts to its target once, on scroll into view
// Every one respects prefers-reduced-motion by falling back to the end state.

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const EASE = [0.4, 0, 0.2, 1] as const;
const DURATION = 0.48;
const STAGGER = 0.06;

export function Reveal({
  children,
  index = 0,
  as = "div",
  className,
  distance = 16,
}: {
  children: ReactNode;
  index?: number;
  as?: "div" | "section" | "li" | "span";
  className?: string;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  // Safety net: whileInView depends on IntersectionObserver. If it never
  // reports (observer unavailable, tab never composited, restored from
  // bfcache), the content would sit at opacity 0 forever. After 900ms we
  // reveal regardless. When the observer does fire, this animates to the same
  // end state, so nothing changes visually.
  const [forced, setForced] = useState(false);
  const Component = motion[as];

  useEffect(() => {
    const timer = window.setTimeout(() => setForced(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Component
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      animate={forced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: DURATION,
        ease: EASE,
        delay: reduced ? 0 : index * STAGGER,
      }}
    >
      {children}
    </Component>
  );
}

export function RollButton({
  children,
  href,
  external = false,
  variant = "primary",
  className = "",
  type,
  disabled,
}: {
  children: string;
  href?: string;
  /** Opens href in a new tab, for links off the page (e.g. a hosted form). */
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  // The stack is two lines tall, so one line of travel is -50%, not -100%.
  const shift = reduced || !hovered ? "0%" : "-50%";

  const inner = (
    // Mask height and label line-height are pinned to the same value. If they
    // drift apart, descenders clip and the roll lands off by the difference.
    <span className="relative block h-[1.5em] overflow-hidden leading-[1.5]">
      <motion.span
        className="block"
        animate={{ y: shift }}
        transition={{ duration: 0.34, ease: EASE }}
      >
        <span className="block leading-[1.5]">{children}</span>
        <span className="block leading-[1.5]" aria-hidden="true">
          {children}
        </span>
      </motion.span>
    </span>
  );

  const classes = `p-btn ${
    variant === "primary" ? "p-btn-primary" : "p-btn-secondary"
  } ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={classes}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {inner}
    </button>
  );
}

export function Counter({
  to,
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) {
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
