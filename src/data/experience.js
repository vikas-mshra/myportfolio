/**
 * Purpose: Compact professional experience entries for the timeline.
 * Special Conditions: Two or three high-value points per role only.
 * Context: Rendered by the Experience section.
 */

export const EXPERIENCE = [
  {
    id: "stacksync",
    company: "Stacksync",
    subtitle: "Y Combinator, 2024",
    title: "Full-Stack Engineer",
    dates: "May 2026 – Present",
    dateTime: "2026-05",
    points: [
      "Own customer integrations from technical discovery through production deployment, translating ERP, CRM, and warehouse requirements into scalable synchronization workflows.",
      "Engineer connector pipelines with large-scale backfills, webhooks, polling, pagination, batching, retries, and error recovery to maintain reliable near-real-time consistency across business systems.",
      "Expand agentic workflows across 30+ connectors, enabling natural-language requests to execute multi-step operations against platforms including PostgreSQL, Salesforce, and NetSuite.",
    ],
  },
  {
    id: "owp",
    company: "Office of Water Programs",
    title: "Full-Stack Developer",
    dates: "May 2024 – May 2026",
    dateTime: "2024-05",
    points: [
      "Led development of a stormwater analytics platform using React, TypeScript, FastAPI, and Pandas, turning complex environmental datasets into interactive visualizations for research engineers.",
      "Reduced the initial frontend bundle by approximately 50–60% by migrating to Vite, implementing route-level code splitting, and introducing lazy loading.",
      "Automated data ingestion and SQL report generation, reducing a 30-minute manual workflow to under 40 seconds and cutting query execution from 80 minutes to under 5 seconds on datasets exceeding 100,000 records.",
    ],
  },
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    title: "Backend Developer",
    dates: "June 2019 – October 2022",
    dateTime: "2019-06",
    points: [
      "Designed Java and Spring Boot services with RabbitMQ to process more than 10,000 SAP IDocs daily, supporting reliable enterprise-scale data ingestion.",
      "Built a configurable self-healing rules engine that detected recurring failures and automatically triggered recovery scripts, eliminating manual intervention for known error patterns.",
      "Improved API and database performance by approximately 60–75% by resolving Hibernate N+1 queries, introducing JPA batch processing, and optimizing database indexes.",
    ],
  },
];
