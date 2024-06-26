// @ts-check

import js from "@eslint/js";
import type { Linter } from "eslint";
import { buildESLintComments } from "./base-plugins/eslint-comments.js";
import { buildRegexp } from "./base-plugins/regexp.js";
import {
  recommendedRules,
  recommendedTestFiles,
  recommendedTestGlobals,
  recommendedTestRules,
} from "../config-helpers/recommended.js";
import { buildJsdoc } from "./base-plugins/jsdoc.js";

/**
 * Build recommended config
 */
export function buildRecommended(): Linter.FlatConfig[] {
  return [
    js.configs.recommended,
    ...buildESLintComments(),
    ...buildRegexp(),
    ...buildJsdoc(),
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
