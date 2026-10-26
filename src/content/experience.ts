import type { Education, Role } from './types';

export const roles: Role[] = [
  {
    company: 'Keyzar Jewelry',
    title: 'Lead Frontend Developer',
    start: '2025',
    impact: [
      'Co-launched a Shopify-integrated luxury storefront within a year, in a three-engineer team: React 19, TypeScript, React Router 7 and Shopify GraphQL, with ring and diamond configuration, wishlists and cart/checkout state.',
      'Designed a staged-history approach to iOS/WebKit Back/Forward navigation and expanded Playwright coverage for critical shopping flows.',
    ],
  },
  {
    company: 'Solitics',
    title: 'Lead Frontend Developer (Angular/React + Node.js)',
    start: '2022',
    end: '2025',
    impact: [
      'Cut a report-generation workflow from 5 steps to 3 (40% fewer user steps) with direct report selection and integrated date filtering.',
      'Built Angular and React apps in a Node.js stack; added automated tests and CI/CD quality checks.',
    ],
  },
  {
    company: 'Varonis',
    title: 'Senior Frontend Developer (Angular + React / C#)',
    start: '2020',
    end: '2022',
    impact: [
      'Reduced loading time of a key screen by 30% and added 50 automated tests; built reusable Angular and React components.',
    ],
  },
  {
    company: 'mPrest Systems',
    title: 'Mid-Frontend Developer (Angular + React / C#)',
    start: '2016',
    end: '2020',
    impact: [
      'Built 20 reusable UI components adopted across 3 modules, real-time orchestration interfaces on .NET services, and mentored 2 developers.',
    ],
  },
  {
    company: 'Kerensen Consulting (acquired by Salesforce)',
    title: 'Junior Full Stack Developer (AngularJS + Java)',
    start: '2014',
    end: '2016',
    impact: ['Built responsive web interfaces in an AngularJS and Java stack.'],
  },
];

export const education: Education[] = [
  { title: 'B.Sc. Computer Science', institution: 'Ben-Gurion University of the Negev', year: '2010–2014' },
];
