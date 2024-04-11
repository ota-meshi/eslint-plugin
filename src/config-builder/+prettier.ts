import type { Linter } from "eslint";
import { requireOf } from "../utils/module.js";
import {
  prettierExtendRules,
  prettierOffFiles,
} from "../config-helpers/+prettier.js";
import { buildFallback } from "./fallback.js";

export function buildPrettier() {
  return requireOf(
    ["eslint-plugin-prettier", "eslint-config-prettier", "prettier"],
    (): Linter.FlatConfig[] => {
      const eslintConfigPrettier = require("eslint-config-prettier");
      const prettier = require("eslint-plugin-prettier");
      return [
        eslintConfigPrettier,
        {
          plugins: { prettier },
          rules: {
            ...prettierExtendRules,
          },
        },
        {
          files: prettierOffFiles,
          rules: {
            "prettier/prettier": "off",
          },
        },
      ];
    },
    buildFallback,
  );
}
