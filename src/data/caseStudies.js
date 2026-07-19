/**
 * Purpose: Selected impact / work case studies shown on the portfolio.
 * Special Conditions: Keep claims limited to documented résumé results.
 * Context: Rendered by SelectedWork via CaseStudy components.
 */

export const CASE_STUDIES = [
  {
    id: "stacksync",
    title: "Stacksync — Integration and Agentic Workflows",
    context:
      "At Stacksync, a Y Combinator–backed startup (2024), customers needed reliable sync between ERP, CRM, and warehouse systems, plus natural-language workflows across many connectors.",
    owned:
      "Customer integrations from discovery through production, including connector pipelines and agentic workflow features.",
    decision:
      "Combined initial backfills with webhook- and polling-based updates, plus retry logic, exponential backoff, pagination, batching, and error recovery for near-real-time consistency.",
    result:
      "Delivered production integrations across Acumatica ERP, monday CRM, and Extensiv, and natural-language workflows spanning more than 30 connectors.",
    technologies: [
      "Connector pipelines",
      "Webhooks",
      "Polling",
      "Retry / backoff",
      "Agentic workflows",
    ],
  },
  {
    id: "owp",
    title: "Office of Water Programs — Stormwater Analytics Platform",
    context:
      "A public-sector analytics product needed faster load times, clearer environmental-data visualization, and a maintainable delivery pipeline.",
    owned:
      "Frontend architecture and platform performance work across React, TypeScript, FastAPI, and Pandas.",
    decision:
      "Migrated to Vite, introduced route-level code splitting and lazy loading, and built a reusable TanStack Query data layer behind Docker and Nginx.",
    result:
      "Reduced the initial bundle by approximately 50–60%, with Playwright coverage and Bitbucket Pipelines supporting reliable releases.",
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "Pandas",
      "Vite",
      "TanStack Query",
      "Docker",
      "Nginx",
      "Playwright",
      "Bitbucket Pipelines",
    ],
  },
  {
    id: "data-sql",
    title: "Data and SQL Performance",
    context:
      "Operational teams were blocked by slow ingestion and long-running SQL reports on large datasets.",
    owned:
      "Performance work on ingestion workflows and SQL reporting against datasets with more than 100,000 records.",
    decision:
      "Focused on query and pipeline efficiency rather than adding more manual steps or heavier tooling.",
    result:
      "Cut a manual 30-minute ingestion process to under 40 seconds, and reduced SQL-report execution from about 80 minutes to under 5 seconds.",
    technologies: ["SQL", "ETL", "Data pipelines", "Performance tuning"],
  },
  {
    id: "tcs",
    title: "Tata Consultancy Services — Enterprise Backend Systems",
    context:
      "Enterprise systems needed dependable ingestion and APIs for high-volume SAP traffic.",
    owned:
      "Java and Spring Boot services for event-driven ingestion, API performance, and a self-healing rules engine.",
    decision:
      "Used RabbitMQ for event-driven ingestion and Spring Cloud Gateway with Eureka for service routing and discovery.",
    result:
      "Supported more than 10,000 SAP IDocs per day, with API and database performance improvements of approximately 60–75%.",
    technologies: [
      "Java",
      "Spring Boot",
      "RabbitMQ",
      "SAP IDocs",
      "Spring Cloud Gateway",
      "Eureka",
    ],
  },
];
