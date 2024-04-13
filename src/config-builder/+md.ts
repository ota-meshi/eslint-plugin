import type { Linter } from "eslint";
import { requireFromCwd, requireOf } from "../utils/module.js";
import { jsInMdFiles, jsInMdRules, mdFiles } from "../config-helpers/+md.js";
import { buildFallback } from "./fallback.js";
import { anyParser } from "../parsers/any-parser.js";

export function buildMd() {
  return requireOf(
    ["eslint-plugin-markdown@4.0.0"],
    (): Linter.FlatConfig[] => {
      const markdown = requireFromCwd("eslint-plugin-markdown");

      return [
        {
          plugins: {
            markdown,
          },
        },
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
