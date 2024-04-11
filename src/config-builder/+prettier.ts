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
      return [
        ...eslintConfigPrettier,
        {
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
