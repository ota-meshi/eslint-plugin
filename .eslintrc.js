"use strict";

module.exports = {
  extends: [
    require.resolve("./lib/configs/recommended"),
    require.resolve("./lib/configs/+node"),
    require.resolve("./lib/configs/+json"),
    require.resolve("./lib/configs/+prettier"),
    require.resolve("./lib/configs/+package-json"),
  ],
  rules: {
    "n/no-extraneous-require": "off",
    "n/no-unpublished-require": "off",
    "node-dependencies/no-deprecated": "error",
  },
};
