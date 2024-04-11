import type { Linter } from "eslint";
import { requireOf } from "../utils/module.js";
import {
  eslintPluginExtendRules,
  eslintPluginFiles,
} from "../config-helpers/+eslint-plugin.js";
import { buildFallback } from "./fallback.js";
import { buildNode } from "./+node.js";

export function buildESLintPlugin() {
  return requireOf(
    ["eslint-plugin-eslint-plugin@5.5.1"],
    (): Linter.FlatConfig[] => {
      const eslintPlugin = require("eslint-plugin-eslint-plugin");
      return [
        {
          ...eslintPlugin.configs["flat/recommended"],
          files: eslintPluginFiles,
        },
        ...buildNode(),
        {
          files: eslintPluginFiles,
          rules: {
            ...eslintPluginExtendRules,
          },
        },
      ];
    },
    buildFallback,
  );
}
