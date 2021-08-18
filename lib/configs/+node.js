"use strict"

module.exports = require("../utils/module").requireOf(
    ["eslint-plugin-node"],
    () => ({
        overrides: [
            {
                files: ["*.js"],
                extends: ["plugin:node/recommended"],
                parserOptions: {
                    ecmaFeatures: { globalReturn: true },
                    ecmaVersion: 2020,
                    sourceType: "script",
                },
                rules: {
                    "node/exports-style": ["error", "module.exports"],
                    "node/file-extension-in-import": [
                        "error",
                        "always",
                        { ".js": "never", ".ts": "never", ".tsx": "never" },
                    ],
                    "node/prefer-global/buffer": "error",
                    "node/prefer-global/console": "error",
                    "node/prefer-global/process": "error",
                },
            },
        ],
    }),
    { files: ["*.js"] },
)
