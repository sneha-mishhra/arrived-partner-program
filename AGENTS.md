<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design standards (standing, do not wait to be asked)

Design system first. Every spacing value, color, radius, weight, and animation
references the tokens in `app/globals.css`. Inconsistency signals vibe-coding
more than any single element.

- **Color/visual:** no default purple gradients unless brand-appropriate, no sparkles or emojis in hero headings, no generic glowing hover effects.
- **Typography:** consistent weight hierarchy (no oversized headings over ultra-thin body), uniform line-height and paragraph spacing, defined type scale, stuck to.
- **Layout/components:** identical component placement across pages, 2-3 border radius values max, hover states subtle (2-4px lift max), icons sized proportionally to text, no non-functional social icons.
- **Animation:** cubic-bezier easing, intentional stagger timing, every animation serves a purpose.
- **UX behavior:** loading states on all async actions, progress indicators on buttons, toggles/carousels/interactions that actually work, skeleton screens for data-heavy sections.
- **Copy:** no em dashes, no vague phrases ("Launch faster", "Build your dreams", "Create without limits"), no fake testimonials, no generic AI faces or "Sarah Chen" placeholder names.

Source of truth: `context/design-standards.md` in the Appily AI workspace.
