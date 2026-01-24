import myPlugin from "./lib/index.js";

export default [
  {
    ignores: ["tests/fixtures/", "lib"],
  },
  ...myPlugin.config({
    node: true,
    json: true,
    prettier: true,
    packageJson: true,
    ts: true,
  }),
  {
    languageOptions: {
      sourceType: "script",
    },
    rules: {
      "n/no-extraneous-require": "off",
      "n/no-unpublished-require": "off",
      "node-dependencies/no-deprecated": "error",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "jsdoc/require-jsdoc": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/naming-convention": "off",
      complexity: "off",
    },
  },
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        project: true,
      },
    },
    rules: {
      "n/file-extension-in-import": [
        "error",
        "always",
        { ".js": "always", ".ts": "always", ".tsx": "never" },
      ],
    },
  },
];
