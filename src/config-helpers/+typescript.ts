import type { Linter } from "eslint";

export const tsFiles = [`*.ts`, `*.mts`, `*.cts`].flatMap((p) => [
  p,
  `**/${p}`,
]);
export const tsTestFiles = [
  "test/**/*.ts",
  "tests/**/*.ts",
  "test/**/*.mts",
  "tests/**/*.mts",
  "test/**/*.cts",
  "tests/**/*.cts",
];
export const tsTestExtendRules: Linter.RulesRecord = {
  "@typescript-eslint/no-explicit-any": "off",
};
