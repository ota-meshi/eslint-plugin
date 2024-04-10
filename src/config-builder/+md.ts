import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import { jsInMdFiles, jsInMdRules, mdFiles } from "../config-helpers/+md";
import { buildFallback } from "./fallback";
import * as anyParser from "../parsers/any-parser";

export function buildMd() {
  return requireOf(
    ["eslint-plugin-markdown@4.0.0"],
    (): Linter.FlatConfig[] => {
      const markdown = require("eslint-plugin-markdown");

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
            parserOptions: {
              project: null,
            },
          },
        },
      ];
    },
    (missingList) => [
      {
        files: mdFiles,
        languageOptions: {
          parser: anyParser,
        },
        ...buildFallback(missingList),
      },
    ],
  );
}
