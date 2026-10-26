# Barak Inbal — portfolio site

Single-page portfolio for recruiters in Israel and Europe. Design: "Terminal" (dark console look).

## Stack
Astro 5, TypeScript strict, plain CSS with custom properties. No CSS framework. Static output.
Interactive code only as small islands. Client JS budget: 15 KB gzipped.

## Design rules
- Pixel source of truth: design/terminal-reference.html. Match it at 1440px and 390px; Playwright + pixelmatch diff under 0.5%.
- Every color, font size, radius and spacing value comes from src/styles/tokens.css. Never hard-code hex.
- Fonts: Inter (UI), JetBrains Mono (prompts, nav, stats, tags, code). Self-hosted WOFF2.
- Accent #F2B84B on background #0D1014. Container 1200px, gutter 24px.
- Each section starts with a mono shell prompt in the accent color (e.g. "$ ls ./featured").
- Project cards look like terminal windows (three dots + file path title bar).
- Experience renders as a git log with a left rule; current role marked "HEAD →".
- Mobile first; no horizontal scroll at 360px; touch targets ≥ 48px.
- All motion off under prefers-reduced-motion.

## Content
All copy lives in src/content/*.ts. Never invent facts: unknown values stay as "[PLACEHOLDER]".

## Quality
WCAG 2.2 AA, Lighthouse ≥ 95 in all categories, zero lint warnings.
Run `npm run check && npm run build` before saying a task is done.
