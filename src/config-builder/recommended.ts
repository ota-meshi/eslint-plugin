// @ts-check

import js from "@eslint/js";
import type { Linter } from "eslint";
import { buildESLintComments } from "./base-plugins/eslint-comments";
import { buildRegexp } from "./base-plugins/regexp";
import {
  recommendedRules,
  recommendedTestFiles,
  recommendedTestGlobals,
  recommendedTestRules,
} from "../config-helpers/recommended";

/**
 * Build recommended config
 */
export function buildRecommended(): Linter.FlatConfig[] {
  return [
    js.configs.recommended,
    ...buildESLintComments(),
    ...buildRegexp(),
    {
      rules: {
        ...recommendedRules,
      },
    },
    {
      files: recommendedTestFiles,
      languageOptions: {
        globals: {
          ...recommendedTestGlobals,
        },
      },
      rules: {
        ...recommendedTestRules,
      },
    },
  ];
}
