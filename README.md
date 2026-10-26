<div align="center">

```
barak@il:~$ whoami
Barak Inbal▍
```

# ~/brkcoder_

**A fast, single-page developer portfolio with a dark terminal look.**
Built with Astro, strict TypeScript and plain CSS, and almost no JavaScript.

[![Astro](https://img.shields.io/badge/Astro-5-F2B84B?style=flat-square&logo=astro&logoColor=0D1014&labelColor=12161C)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-F2B84B?style=flat-square&logo=typescript&logoColor=F2B84B&labelColor=12161C)](https://www.typescriptlang.org)
[![Client JS](https://img.shields.io/badge/client%20JS-%3C%201%20KB%20gzip-5FD38D?style=flat-square&labelColor=12161C)](#performance-and-quality)
[![Hosting](https://img.shields.io/badge/deploy-Cloudflare%20Pages-F2B84B?style=flat-square&logo=cloudflare&logoColor=F2B84B&labelColor=12161C)](#deploy)

</div>

---

## Why this exists

Recruiters and engineering managers should get from landing to **GitHub**, **CV** or **contact** in under a minute. The site is also a work sample: people open DevTools, so the code is meant to be read.

| First screen | Second scroll |
| --- | --- |
| Name, role, current company, location, work eligibility, GitHub and CV buttons | Shipped work: `ngx-spinners` on npm, Open Government Data, a Solitics product story with a number |

## The look

One dark theme, one warm amber accent, two typefaces. The character comes from restraint and a few terminal motifs, which are all kept:

- Every section opens with a mono shell prompt in amber: `$ ls ./featured`, `$ cat package.json | jq .skills`, `$ git log --career`, `$ ./contact --now`
- The hero starts with `barak@il:~$ whoami` and a blinking block cursor
- Project cards are terminal windows: three grey dots and a file path in the title bar
- Experience renders as a **git log**, with `HEAD →` on the current role
- The stack is shown as JSON keys: `"frontend":`, `"backend":`, `"tooling":`

Motion is limited to the cursor blink and a typewriter reveal for the hero and section prompts. All of it is switched off under `prefers-reduced-motion`.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Astro 5](https://astro.build), static output |
| Language | TypeScript (strict) |
| Styling | Plain CSS with custom properties, no framework |
| Fonts | Inter and JetBrains Mono, self-hosted as WOFF2 subsets |
| Content | Typed data files in `src/content/` |
| Visual QA | Playwright + pixelmatch against the design reference |
| Hosting | Cloudflare Pages |

## Getting started

Requires Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check Astro and TypeScript files |
| `npm run diff` | Screenshot the design reference and the built page, then diff them with pixelmatch (needs `npm run build` first, and `npx playwright install chromium` once) |

## Project structure

```
brkcoder/
├─ CLAUDE.md                  # rules for working on the site with Claude Code
├─ astro.config.mjs
├─ design/
│  └─ terminal-reference.html # pixel source of truth for the design
├─ public/fonts/              # Inter + JetBrains Mono WOFF2 subsets
├─ scripts/
│  └─ visual-diff.mjs         # Playwright + pixelmatch comparison
└─ src/
   ├─ styles/
   │  ├─ tokens.css           # every color, size, radius and spacing value
   │  └─ global.css           # reset, focus ring, skip link, reduced motion
   ├─ content/                # all copy lives here
   │  ├─ profile.ts  projects.ts  experience.ts  stack.ts  types.ts
   ├─ components/
   │  ├─ Nav  Hero  StatsBand  Work  StackGrid  GitLog  Contact
   │  └─ Prompt  TerminalCard  ProjectCard
   ├─ scripts/motion.ts       # typewriter reveals (reduced-motion aware)
   └─ pages/index.astro
```

## Editing the content

Update a job, project or link by editing the typed files in `src/content/`. Components never contain copy.

```ts
// src/content/projects.ts
export const projects: Project[] = [
  {
    slug: 'ngx-spinners',
    name: 'ngx-spinners',
    path: 'ngx-spinners/README.md',
    summary: 'An open-source Angular library of 22 drop-in loading components…',
    snippet: 'npm i ngx-spinners\n<ngx-pulse-loader></ngx-pulse-loader>',
    tags: ['TypeScript', 'Angular', 'npm'],
    links: [{ label: 'Source', href: 'https://github.com/BrkCoder/ngx-spinners' }],
    featured: true,
  },
];
```

Anything not yet known stays as a bracketed placeholder, such as `[databases]` or `[cloud]`. Facts are never invented.

## Design system

All values come from `src/styles/tokens.css`. Hex colors never appear anywhere else.

| Token | Hex | Use |
| --- | --- | --- |
| `--bg` | `#0D1014` | Page background |
| `--surface` | `#12161C` | Cards, status pill |
| `--code-bg` | `#0B0E12` | Code blocks |
| `--text-strong` | `#F4F6F8` | Headings |
| `--text` | `#D7DCE2` | Body |
| `--accent` | `#F2B84B` | Primary button, prompts, cursor, links |
| `--ok` | `#5FD38D` | "Online" status dot |

Layout: 1200px container, 24px gutters, spacing scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 80 · 112, radii 8 / 12 / 99px, 48px minimum touch targets.

## Performance and quality

- Static HTML and CSS; the only client JavaScript is a ~0.4 KB gzipped typewriter script
- Fonts are self-hosted with `font-display: swap`, and both are preloaded
- Semantic landmarks, a skip link and a visible amber focus ring
- Every animation is disabled under `prefers-reduced-motion`
- The built page matched the design reference at 1440px and 390px (0.13% and 0.02% of pixels differing) before the real content replaced the placeholder text

## Deploy

The site is a static build, so any static host works. The recommended setup is **Cloudflare Pages** connected to this repo:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `NODE_VERSION=22` |

Set `site` in `astro.config.mjs` to the real domain before shipping.

## Roadmap

- [x] Scaffold, design tokens, self-hosted fonts
- [x] Typed content files and all seven sections
- [x] Typewriter motion with reduced-motion support
- [x] Visual diff against the design reference
- [ ] Re-baseline the reference to the real content
- [ ] Live `ngx-spinners` demo and accent switcher
- [ ] GitHub data fetched at build time, with a static fallback
- [ ] SEO, Open Graph card, JSON-LD and cookieless analytics
- [ ] CI with Lighthouse, link check and type-check
- [ ] Open Government Data case study, `/cv.pdf` and a 404 page

## License

The code is open for reference. The personal content (copy, name, links) belongs to Barak Inbal.
