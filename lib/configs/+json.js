"use strict"

module.exports = require("../utils/module").requireOf(
    ["eslint-plugin-jsonc"],
    () => ({
        extends: ["plugin:jsonc/recommended-with-jsonc"],
        rules: {
            "jsonc/auto": "error",
        },
        overrides: [
            {
                files: ["*.json", "*.json5"],
                extends: [require.resolve("./json-schema/config")],
            },
        ],
    }),
)
