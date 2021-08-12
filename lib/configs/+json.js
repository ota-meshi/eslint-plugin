"use strict"

module.exports = require("../utils/module").requireOf(
    ["eslint-plugin-jsonc", "eslint-plugin-node-dependencies"],
    () => ({
        overrides: [
            {
                files: ["*.json", "*.json5"],
                extends: [
                    "plugin:jsonc/recommended-with-jsonc",
                    "plugin:node-dependencies/recommended",
                    require.resolve("./json-schema/config"),
                ],
                rules: {
                    "jsonc/auto": "error",
                },
            },
        ],
    }),
)
