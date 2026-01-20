export const TECHNOLOGY_OPTIONS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Firebase",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Stripe",
  "Framer Motion",
  "Google Analytics",
  "Meta Ads",
  "WordPress",
] as const;

export type TechnologyOption = (typeof TECHNOLOGY_OPTIONS)[number];

export const PROJECT_TYPE_OPTIONS = [
  "Sistema",
  "Site",
  "Landing Page",
  "Site com CMS",
] as const;

export type ProjectTypeOption = (typeof PROJECT_TYPE_OPTIONS)[number];
