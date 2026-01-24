import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import {
  eslintPluginExtendRules,
  eslintPluginFiles,
} from "../config-helpers/+eslint-plugin.js";
import { buildFallback } from "./fallback.js";
import { buildNode } from "./+node.js";

export function buildESLintPlugin(withTs: boolean | undefined) {
  return requireOf(
    ["eslint-plugin-eslint-plugin@5.5.1"],
    (): Linter.FlatConfig[] => {
      const eslintPlugin = requireFromCwd("eslint-plugin-eslint-plugin");
      return [
        {
          ...(eslintPlugin.configs["flat/recommended"] ||
            eslintPlugin.configs.recommended),
          files: eslintPluginFiles,
        },
        ...buildNode(withTs),
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
