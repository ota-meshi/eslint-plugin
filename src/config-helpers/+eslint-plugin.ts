import type { Linter } from "eslint";

const fs = require("fs");
const path = require("path");

export const eslintPluginFiles = [
  "**/rules/**",
  "**/internal-rules/**",
].flatMap((p) => [
  `${p}/*.js`,
  `${p}/*.mjs`,
  `${p}/*.cjs`,
  `${p}/*.ts`,
  `${p}/*.mts`,
  `${p}/*.cts`,
]);
export const eslintPluginExtendRules = {
  "eslint-plugin/consistent-output": "error",
  "eslint-plugin/meta-property-ordering": [
    "error",
    [
      "deprecated",
      "docs",
      "fixable",
      "messages",
      "replacedBy",
      "schema",
      "type",
    ],
  ],
  "eslint-plugin/no-deprecated-context-methods": "error",
  "eslint-plugin/prefer-output-null": "error",
  "eslint-plugin/prefer-placeholders": "error",
  "eslint-plugin/prefer-replace-text": "error",
  "eslint-plugin/report-message-format": ["error", "[^a-z'\"{].*\\.$"],
  "eslint-plugin/require-meta-docs-description": "error",
  "eslint-plugin/require-meta-docs-url": [
    "error",
    { pattern: rulesDocumentUrl() },
  ],
  "eslint-plugin/require-meta-fixable": "error",
  "eslint-plugin/require-meta-schema": "error",
  "eslint-plugin/require-meta-type": "error",
  "eslint-plugin/test-case-property-ordering": [
    "error",
    [
      "filename",
      "code",
      "output",
      "options",
      "parser",
      "parserOptions",
      "globals",
      "env",
      "errors",
    ],
  ],
  "eslint-plugin/test-case-shorthand-strings": "error",
} as Linter.RulesRecord;

/**
 * The URL of rule's documentation for the `+eslint-plugin` config.
 * @type {string}
 */
function rulesDocumentUrl() {
  try {
    const { version, repository } = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
    );
    const baseUrl = getBaseUrl(repository);
    if (baseUrl) {
      return `${baseUrl}/blob/v${version}/docs/rules/{{name}}.md`;
    }
  } catch (_error) {
    // ignore
  }
  return undefined;
}

/**
 * Get the base URL from a given repository information.
 * @param {string|{type:string,url:string}} repository The repository information.
 * @returns {string|null} The base URL.
 */
function getBaseUrl(repository: string | { type: string; url: string }) {
  if (typeof repository === "string") {
    if (/^https?:\/\//u.test(repository)) {
      return repository.replace(/\.git$/u, "");
    }
    if (repository.startsWith("git+")) {
      return repository.slice(4).replace(/\.git$/u, "");
    }
    if (/^[\w-]+\/[\w-]+$/iu.test(repository)) {
      return `https://github.com/${repository}`;
    }
    return null;
  }
  if (repository && typeof repository.url === "string") {
    return getBaseUrl(repository.url);
  }

  return null;
}
