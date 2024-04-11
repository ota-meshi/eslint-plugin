import type { Linter } from "eslint";

export const yamlFiles = [`*.yaml`, "*.yml"].flatMap((p) => [p, `**/${p}`]);
export const yamlExtendRules: Linter.RulesRecord = {
  "yml/require-string-key": "error",
};
