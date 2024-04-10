import type { Linter } from "eslint";
import { requireOf } from "../../utils/module";
import { eslintCommentsExtendRules } from "../../config-helpers/base-plugins/eslint-comments";
import { buildFallbackForLegacy } from "../fallback";

export = requireOf(
  ["@eslint-community/eslint-plugin-eslint-comments"],
  (): Linter.Config => ({
    extends: ["plugin:@eslint-community/eslint-comments/recommended"],
    rules: {
      ...eslintCommentsExtendRules,
    },
  }),
  buildFallbackForLegacy,
);
