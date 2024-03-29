"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-node-dependencies"],
  () => ({
    overrides: [
      {
        files: ["package.json"],
        extends: [
          "plugin:node-dependencies/recommended",
          require.resolve("./+json"),
        ],
      },
    ],
  }),
  {
    files: ["package.json"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: require.resolve("espree"),
    }),
  },
);
