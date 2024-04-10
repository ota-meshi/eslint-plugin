import type { Linter } from "eslint";
import { eslintCommentsExtendRules } from "../../config-helpers/base-plugins/eslint-comments";
import { requireOf } from "../../utils/module";
import { buildFallback } from "../fallback";

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
