import type { Linter } from "eslint";
import { eslintCommentsExtendRules } from "../../config-helpers/base-plugins/eslint-comments.js";
import { requireOf } from "../../utils/module.js";
import { buildFallback } from "../fallback.js";

export function buildESLintComments() {
  return requireOf(
    ["@eslint-community/eslint-plugin-eslint-comments@4.3.0"],
    (): Linter.FlatConfig[] => {
      const comments = require("@eslint-community/eslint-plugin-eslint-comments/configs");
      return [
        comments.recommended,
        {
          rules: {
            ...eslintCommentsExtendRules,
          },
        },
      ];
    },
    buildFallback,
  );
}
