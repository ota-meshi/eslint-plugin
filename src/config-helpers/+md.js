"use strict";

const semver = require("semver");

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-markdown"],
  () => {
    const version = require("eslint-plugin-markdown/package.json").version;
    return {
      extends: [
        semver.satisfies(version, ">=4.0.0")
          ? "plugin:markdown/recommended-legacy"
          : "plugin:markdown/recommended",
      ],
      rules: {},
      overrides: [
        {
          files: ["**/*.md/*.js"],
          rules: {
            strict: "off",
          },
        },
      ],
    };
  },
  {
    files: ["*.md"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: require.resolve("espree"),
    }),
  },
);
