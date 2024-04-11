import type { Linter } from "eslint";

export const mdFiles = [`*.md`].flatMap((p) => [p, `**/${p}`]);
export const jsInMdFiles = mdFiles.flatMap((p) => [
  `${p}/*.js`,
  `${p}/*.cjs`,
  `${p}/*.mjs`,
  `${p}/*.ts`,
  `${p}/*.cts`,
  `${p}/*.mts`,
]);
export const extInMdFiles = [
  ...jsInMdFiles,
  ...mdFiles.flatMap((p) => [
    `${p}/*.json`,
    `${p}/*.json5`,
    `${p}/*.jsonc`,
    `${p}/*.toml`,
    `${p}/*.yml`,
    `${p}/*.yaml`,
    `${p}/*.vue`,
    `${p}/*.svelte`,
    `${p}/*.astro`,
  ]),
];

export const jsInMdRules = {
  // The Markdown parser automatically trims trailing
  // newlines from code blocks.
  "eol-last": "off",

  // In code snippets and examples, these rules are often
  // counterproductive to clarity and brevity.
  "no-undef": "off",
  "no-unused-expressions": "off",
  "no-unused-vars": "off",
  "padded-blocks": "off",

  // Adding a "use strict" directive at the top of every
  // code block is tedious and distracting. The config
  // opts into strict mode parsing without the directive.
  strict: "off",

  // The processor will not receive a Unicode Byte Order
  // Mark from the Markdown parser.
  "unicode-bom": "off",
} as Linter.RulesRecord;
