import type { Linter } from "eslint";
import { extInMdFiles } from "./+md.js";

export const prettierOffFiles = extInMdFiles;

export const prettierExtendRules: Linter.RulesRecord = {
  "prettier/prettier": "error",

  "jsonc/array-bracket-newline": "off",
  "jsonc/array-bracket-spacing": "off",
  "jsonc/array-element-newline": "off",
  "jsonc/comma-dangle": "off",
  "jsonc/comma-style": "off",
  "jsonc/indent": "off",
  "jsonc/key-spacing": "off",
  "jsonc/no-floating-decimal": "off",
  "jsonc/object-curly-newline": "off",
  "jsonc/object-curly-spacing": "off",
  "jsonc/object-property-newline": "off",
  "jsonc/quote-props": "off",
  "jsonc/quotes": "off",
  "jsonc/space-unary-ops": "off",

  "yml/block-mapping-colon-indicator-newline": "off",
  "yml/block-mapping-question-indicator-newline": "off",
  "yml/block-sequence-hyphen-indicator-newline": "off",
  "yml/flow-mapping-curly-newline": "off",
  "yml/flow-mapping-curly-spacing": "off",
  "yml/flow-sequence-bracket-newline": "off",
  "yml/flow-sequence-bracket-spacing": "off",
  "yml/indent": "off",
  "yml/key-spacing": "off",
  "yml/no-multiple-empty-lines": "off",
  "yml/quotes": "off",

  "svelte/first-attribute-linebreak": "off",
  "svelte/html-closing-bracket-spacing": "off",
  "svelte/html-quotes": "off",
  "svelte/html-self-closing": "off",
  "svelte/indent": "off",
  "svelte/max-attributes-per-line": "off",
  "svelte/mustache-spacing": "off",
  "svelte/no-spaces-around-equal-signs-in-attribute": "off",
  "svelte/no-trailing-spaces": "off",
  "svelte/shorthand-attribute": "off",
  "svelte/shorthand-directive": "off",
};
