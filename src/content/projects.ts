import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'ngx-spinners',
    name: 'ngx-spinners',
    path: 'ngx-spinners/README.md',
    summary:
      'An open‑source Angular library of 22 drop‑in loading components, published on npm under MIT. One module import, then a single tag per loader.',
    snippet: 'npm i ngx-spinners\n<ngx-pulse-loader></ngx-pulse-loader>',
    tags: ['TypeScript', 'Angular', 'npm'],
    links: [
      { label: 'Source', href: 'https://github.com/BrkCoder/ngx-spinners' },
      { label: 'Live demo', href: 'https://stackblitz.com/edit/ngx-spinners-example' },
      { label: 'npm', href: 'https://www.npmjs.com/package/ngx-spinners' },
    ],
    featured: true,
  },
  {
    slug: 'open-government-data',
    name: 'Open Government Data',
    path: 'open-government-data/',
    summary:
      'A full‑stack app that turns Israeli public datasets into explorable visualizations — React front end, Python server, CI on CircleCI, code quality tracked with Codacy.',
    snippet: 'src/      → React UI\nserver/   → Python API\n.circleci → CI pipeline',
    tags: ['React', 'Python', 'Data viz', 'CI/CD'],
    links: [
      { label: 'Source', href: 'https://github.com/BrkCoder/Open-Goverment-Data' },
      { label: 'Case study [add]', href: '#case-study' },
    ],
    featured: true,
  },,
  {
    slug: 'solitics-report-flow',
    name: 'Solitics report flow',
    path: 'solitics/report-flow.md',
    summary:
      'Reworked report generation in the Solitics dashboard: direct report selection and integrated date filtering took the workflow from five steps to three.',
    snippet: 'steps:        5 → 3\nuser actions: −40%',
    tags: ['Angular', 'React', 'Node.js', 'UX'],
    links: [],
    featured: true,
  },
];
