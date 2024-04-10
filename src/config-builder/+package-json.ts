import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { buildJson } from "./+json";
import { packageJsonFiles } from "../config-helpers/+package-json";
import * as anyParser from "../parsers/any-parser";
import { buildFallback } from "./fallback";

export function buildPackageJson() {
  return requireOf(
    ["eslint-plugin-node-dependencies@0.12.0"],
    (): Linter.FlatConfig[] => {
      const nodeDependenciesPlugin = require("eslint-plugin-node-dependencies");
      return [
        ...buildJson().map((config) => ({
          ...config,
          files: packageJsonFiles,
        })),
        ...nodeDependenciesPlugin.configs["flat/recommended"],
      ];
    },
    (missingList) => [
      {
        files: packageJsonFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
