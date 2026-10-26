export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  path: string;
  summary: string;
  snippet: string;
  tags: string[];
  links: Link[];
  featured: boolean;
};

export type Role = {
  company: string;
  title: string;
  start: string;
  end?: string;
  impact: string[];
};

export type Education = { title: string; institution: string; year: string };
