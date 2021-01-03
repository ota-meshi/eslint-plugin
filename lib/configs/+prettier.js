"use strict"

module.exports = require("../utils/module").requireOf(
    [
        // "eslint-plugin-prettier",
        "eslint-config-prettier",
        "prettier",
    ],
    () => ({
        plugins: ["prettier"],
        extends: [
            "prettier",
            "prettier/@typescript-eslint",
            "prettier/react",
            "prettier/vue",
        ],
        rules: {
            "prettier/prettier": [
                "error",
                {
                    tabWidth: 4,
                    semi: false,
                    trailingComma: "all",
                    // parser: "typescript",
                },
                {
                    usePrettierrc: false,
                },
            ],
            "jsonc/array-bracket-newline": "off",
        },
    }),
)
