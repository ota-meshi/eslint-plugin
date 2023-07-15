"use strict";

module.exports = require("../utils/module").requireOf(
  ["eslint-plugin-n"],
  () => ({
    overrides: [
      {
        files: ["*.js", "*.mjs", "*.cjs"],
        extends: ["plugin:n/recommended"],
        parserOptions: {
          ecmaFeatures: { globalReturn: true },
          ecmaVersion: 2020,
          sourceType: "script",
        },
        rules: {
          "n/exports-style": ["error", "module.exports"],
          "n/file-extension-in-import": [
            "error",
            "always",
            { ".js": "never", ".ts": "never", ".tsx": "never" },
          ],
          "n/prefer-global/buffer": "error",
          "n/prefer-global/console": "error",
          "n/prefer-global/process": "error",
        },
        globals: {
          URL: "readonly",
        },
      },
    ],
  }),
  { files: ["*.js", "*.mjs", "*.cjs"] }
);
