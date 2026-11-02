import type { Linter } from "eslint";
import { pathToFileURL } from "url";
import {
  has,
  requireFromCwd,
  requireOf,
  resolveFromCwd,
} from "../utils/module.js";
import { jsInMdFiles, jsInMdRules, mdFiles } from "../config-helpers/+md.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";
import { flattenConfig } from "./flatten.js";

export function buildMd() {
  const moduleName =
    !has("@eslint/markdown") && has("eslint-plugin-markdown@4.0.0")
      ? "eslint-plugin-markdown"
      : "@eslint/markdown";
  return requireOf(
    [moduleName],
    (): Linter.FlatConfig[] => {
      const pluginConfigs =
        moduleName === "@eslint/markdown"
          ? flattenConfig(
              import(pathToFileURL(resolveFromCwd(moduleName)).href).then(
                ({ default: markdown }) => [{ plugins: { markdown } }],
              ),
            )
          : [{ plugins: { markdown: requireFromCwd(moduleName) } }];

      return [
        ...pluginConfigs,
        {
          files: mdFiles,
          processor: "markdown/markdown",
        },
        {
          files: jsInMdFiles,
          rules: {
            ...jsInMdRules,
          },
          languageOptions: {
            sourceType: "module",
            parserOptions: {
              project: null,
            },
          },
        },
      ];
    },
    (missingList) => [
      ...buildFallback(missingList, {
        files: mdFiles,
        languageOptions: {
          parser: anyParser,
        },
      }),
    ],
  );
}
