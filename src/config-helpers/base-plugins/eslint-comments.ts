import type { Linter } from "eslint";

export const eslintCommentsExtendRules = {
  "@eslint-community/eslint-comments/require-description": "error",
  "@eslint-community/eslint-comments/no-unused-disable": "error",
} as Linter.RulesRecord;
