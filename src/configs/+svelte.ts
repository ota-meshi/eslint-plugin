import type { Linter } from "eslint";
import { svelteFiles, svelteExtendRules } from "../config-helpers/+svelte.js";
import { requireOf } from "../utils/module.js";
import { buildFallbackForLegacy } from "./fallback.js";

export = requireOf(
  ["eslint-plugin-svelte@2.9.0"],
  (): Linter.Config => ({
    overrides: [
      {
        files: svelteFiles,
        extends: ["plugin:svelte/recommended"],
        parserOptions: {
          parser: {
            ts: "@typescript-eslint/parser",
          },
        },
        rules: {
          ...svelteExtendRules,
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
