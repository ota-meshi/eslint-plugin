import type { Linter } from "eslint";
import { requireOf } from "../utils/module";
import semver from "semver";
import { jsInMdFiles, jsInMdRules, mdFiles } from "../config-helpers/+md";
import { buildFallbackForLegacy } from "./fallback";

export = requireOf(
  ["eslint-plugin-markdown"],
  (): Linter.Config => {
    const version = require("eslint-plugin-markdown/package.json").version;
    return {
      extends: [
        semver.satisfies(version, ">=4.0.0")
          ? "plugin:markdown/recommended-legacy"
          : "plugin:markdown/recommended",
      ],
      overrides: [
        {
          files: jsInMdFiles,
          rules: {
            ...jsInMdRules,
          },
        },
      ],
    };
  },
  (missingList) => ({
    overrides: [
      {
        files: mdFiles,
        parser: require.resolve("../parsers/any-parser"),
        ...buildFallbackForLegacy(missingList),
      },
    ],
  }),
);
