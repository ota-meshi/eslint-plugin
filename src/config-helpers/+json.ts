import type { Linter } from "eslint";

export const jsonFiles = [`*.json`, `*.jsonc`, `*.json5`].flatMap((p) => [
  p,
  `**/${p}`,
]);
export const jsonExtendRules = {
  "jsonc/auto": "error",
} as Linter.RulesRecord;
