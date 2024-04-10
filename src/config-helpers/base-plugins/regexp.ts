import type { Linter } from "eslint";

export const regexpExtendRules = {
  "regexp/letter-case": ["error"],
  "regexp/prefer-quantifier": "error",
  "regexp/prefer-regexp-exec": "error",
  "regexp/prefer-regexp-test": "error",
  "regexp/sort-character-class-elements": ["error"],
} as Linter.RulesRecord;
