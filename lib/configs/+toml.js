"use strict";

module.exports = require("../utils/module").requireOf(
  [],
  () => ({
    extends: ["plugin:toml/standard"],
    rules: {},
    overrides: [
      {
        files: ["*.toml"],
        extends: [require.resolve("./json-schema/config")],
      },
    ],
  }),
  {
    files: ["*.toml"],
    fallback: () => ({
      processor: "@ota-meshi/missing-parser",
      parser: require.resolve("espree"),
    }),
  },
);
