/**
 * Purpose: Grouped capabilities for a compact skills section.
 * Special Conditions: No percentage bars or logo grids.
 * Context: Rendered by CapabilityGroup components.
 */

export const CAPABILITY_GROUPS = [
  {
    id: "product-frontend",
    title: "Product and frontend",
    items: ["React", "TypeScript", "Next.js", "TanStack Query", "Tailwind CSS"],
  },
  {
    id: "backend-integrations",
    title: "Backend and integrations",
    items: ["Java", "Spring Boot", "Python", "FastAPI", "REST APIs", "RabbitMQ"],
  },
  {
    id: "data",
    title: "Data",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Pandas",
      "ETL and synchronization workflows",
    ],
  },
  {
    id: "infra-quality",
    title: "Infrastructure and quality",
    items: [
      "Docker",
      "Nginx",
      "CI/CD",
      "Bitbucket Pipelines",
      "Jenkins",
      "Playwright",
    ],
  },
];
