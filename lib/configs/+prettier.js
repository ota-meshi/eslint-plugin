"use strict"

/** @param {string} config */
function getConfigArrayIfHasConfig(config) {
    try {
        require.resolve(`eslint-config-${config}`)
    } catch (_e) {
        return []
    }
    return [config]
}

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
            ...getConfigArrayIfHasConfig("prettier/@typescript-eslint"),
            ...getConfigArrayIfHasConfig("prettier/react"),
            ...getConfigArrayIfHasConfig("prettier/vue"),
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
            "jsonc/array-bracket-spacing": "off",
            "jsonc/array-bracket-newline": "off",
            "jsonc/array-element-newline": "off",
            "jsonc/object-curly-spacing": "off",
            "jsonc/object-curly-newline": "off",
            "jsonc/object-property-newline": "off",

            "yml/indent": "off",
        },
        overrides: [
            {
                files: ["**/*.md/*.*"],
                rules: {
                    "prettier/prettier": "off",
                },
            },
            {
                files: ["**/*.toml"],
                rules: {
                    "prettier/prettier": "off",
                },
            },
        ],
    }),
)
