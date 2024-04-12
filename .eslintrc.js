"use strict";

module.exports = {
  extends: [
    require.resolve("./lib/configs/recommended"),
    require.resolve("./lib/configs/+node"),
    require.resolve("./lib/configs/+json"),
    require.resolve("./lib/configs/+prettier"),
    require.resolve("./lib/configs/+package-json"),
    require.resolve("./lib/configs/+typescript"),
  ],
  rules: {
    "n/no-extraneous-require": "off",
    "n/no-unpublished-require": "off",
    "node-dependencies/no-deprecated": "error",
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "require-jsdoc": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/naming-convention": "off",
    complexity: "off",
  },
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: require.resolve("./tsconfig.json"),
      },
    },
  ],
};
