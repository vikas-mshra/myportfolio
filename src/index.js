import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";

/**
 * Purpose: Mount the app, hydrating when build-time prerender filled #root.
 * Special Conditions: Development always uses createRoot (empty root).
 * Context: react-snap (postbuild) injects static HTML for crawlers.
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
