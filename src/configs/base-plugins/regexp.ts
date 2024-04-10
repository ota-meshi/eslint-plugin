import type { Linter } from "eslint";
import { requireOf } from "../../utils/module";
import { regexpExtendRules } from "../../config-helpers/base-plugins/regexp";
import { buildFallbackForLegacy } from "../fallback";

export = requireOf(
  ["eslint-plugin-regexp@1.0.0"],
  (): Linter.Config => ({
    extends: ["plugin:regexp/recommended"],
    rules: {
      ...regexpExtendRules,
    },
  }),
  buildFallbackForLegacy,
);
