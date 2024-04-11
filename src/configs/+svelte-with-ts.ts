import type { Linter } from "eslint";
import { requireOf } from "../utils/module.js";
import * as base from "./ts/base-config.js";
import { svelteFiles } from "../config-helpers/+svelte.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  [
    "@typescript-eslint/parser",
    "typescript",
    "@typescript-eslint/eslint-plugin",
    "svelte-eslint-parser",
  ],
  (): Linter.Config => ({
    overrides: [
      {
        files: svelteFiles,
        ...base,
        extends: [require.resolve("./+svelte"), ...base.extends],
        parser: require.resolve("svelte-eslint-parser"),
        parserOptions: {
          ...base.parserOptions,
          parser: { ts: require.resolve("@typescript-eslint/parser") },
        },
      },
    ],
  }),
  (missingList) => ({
    overrides: [
      {
        files: svelteFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
