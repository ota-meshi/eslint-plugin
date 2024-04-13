import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { buildJson } from "./+json.js";
import { packageJsonFiles } from "../config-helpers/+package-json.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";

export function buildPackageJson() {
  return requireOf(
    ["eslint-plugin-node-dependencies@0.12.0"],
    (): Linter.FlatConfig[] => {
      const nodeDependenciesPlugin = requireFromCwd(
        "eslint-plugin-node-dependencies",
      );
      return [
        ...buildJson().map((config) => ({
          ...config,
          files: packageJsonFiles,
        })),
        ...nodeDependenciesPlugin.configs["flat/recommended"],
      ];
    },
    (missingList) => [
      ...buildFallback(missingList, {
        files: packageJsonFiles,
        languageOptions: {
          parser: anyParser,
        },
      }),
    ],
  );
}
