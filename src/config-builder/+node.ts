import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { buildFallback } from "./fallback";
import { nodeExtendRules, nodeFiles } from "../config-helpers/+node";

export function buildNode() {
  return requireOf(
    ["eslint-plugin-n@16.1.0"],
    (): Linter.FlatConfig[] => {
      const nodePlugin = require("eslint-plugin-n");
      return [
        ...nodePlugin.configs["flat/mixed-esm-and-cjs"],
        {
          files: nodeFiles,
          rules: {
            ...nodeExtendRules,
          },
        },
      ];
    },
    (missingList) =>
      buildFallback(missingList).map((config) => ({
        ...config,
        files: nodeFiles,
      })),
  );
}
