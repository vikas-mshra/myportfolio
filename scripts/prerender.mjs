/**
 * Purpose: Build-time prerender of the homepage into build/index.html.
 * Special Conditions:
 *   - Bundles the React tree with esbuild (styles stubbed — CSS still loads from CRA assets).
 *   - Injects renderToString markup into #root so crawlers see real content.
 * Context: Runs as npm postbuild after react-scripts build. No headless browser required.
 */

import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import * as esbuild from "esbuild";
import React from "react";
import { renderToString } from "react-dom/server";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const indexPath = path.join(buildDir, "index.html");
const bundlePath = path.join(buildDir, "ssr-bundle.cjs");

if (!fs.existsSync(indexPath)) {
  console.error("prerender: build/index.html not found. Run react-scripts build first.");
  process.exit(1);
}

await esbuild.build({
  absWorkingDir: rootDir,
  entryPoints: [path.join(rootDir, "src/ssr-entry.jsx")],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: bundlePath,
  jsx: "automatic",
  // Keep a single React instance (the one used by renderToString below).
  external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".scss": "empty",
    ".css": "empty",
    ".svg": "dataurl",
    ".png": "dataurl",
    ".jpg": "dataurl",
    ".jpeg": "dataurl",
    ".webp": "dataurl",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.PUBLIC_URL": '""',
  },
  logLevel: "silent",
});

const require = createRequire(import.meta.url);
const { default: App } = require(bundlePath);

const markup = renderToString(
  React.createElement(React.StrictMode, null, React.createElement(App))
);

if (!markup.includes("Vikas Mishra") || !markup.includes("Stacksync")) {
  console.error("prerender: rendered markup is missing expected portfolio content");
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, "utf8");
const rootPattern = /<div id="root"><\/div>|<div id="root">\s*<\/div>/;

if (!rootPattern.test(indexHtml)) {
  console.error('prerender: could not find empty <div id="root"> in build/index.html');
  process.exit(1);
}

const nextHtml = indexHtml.replace(
  rootPattern,
  `<div id="root">${markup}</div>`
);

fs.writeFileSync(indexPath, nextHtml, "utf8");
fs.unlinkSync(bundlePath);

console.log(`prerender: injected static markup into ${indexPath}`);
console.log(`prerender: markup length ${markup.length} chars`);
