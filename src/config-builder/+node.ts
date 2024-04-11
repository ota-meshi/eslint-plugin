import type { Linter } from "eslint";
import { requireOf } from "../utils/module.js";
import { buildFallback } from "./fallback.js";
import {
  nodeExtendRules,
  nodeFiles,
  nodeSettings,
} from "../config-helpers/+node.js";

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
        {
          settings: {
            ...nodeSettings,
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
