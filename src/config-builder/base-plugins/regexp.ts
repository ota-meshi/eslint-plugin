import type { Linter } from "eslint";
import { requireOf } from "../../utils/module";
import { buildFallback } from "../fallback";
import { regexpExtendRules } from "../../config-helpers/base-plugins/regexp";

export function buildRegexp() {
  return requireOf(
    ["eslint-plugin-regexp@2.5.0"],
    (): Linter.FlatConfig[] => {
      const regexpPlugin = require("eslint-plugin-regexp");
      return [
        regexpPlugin.configs["flat/recommended"],
        {
          rules: {
            ...regexpExtendRules,
          },
        },
      ];
    },
    buildFallback,
  );
}
