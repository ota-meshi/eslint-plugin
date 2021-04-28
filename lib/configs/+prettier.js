"use strict"

/** @param {string} config */
function getConfigArrayIfHasConfig(config) {
    try {
        const configPath = require.resolve(`eslint-config-${config}`)
        require(configPath)
    } catch (_e) {
        return []
    }
    return [config]
}

module.exports = require("../utils/module").requireOf(
    ["eslint-plugin-prettier", "eslint-config-prettier", "prettier"],
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
            "jsonc/comma-style": "off",
            "jsonc/indent": "off",
            "jsonc/key-spacing": "off",
            "jsonc/object-curly-spacing": "off",
            "jsonc/object-curly-newline": "off",
            "jsonc/object-property-newline": "off",
            "jsonc/quote-props": "off",
            "jsonc/quotes": "off",
            "jsonc/space-unary-ops": "off",

            "yml/block-mapping-question-indicator-newline": "off",
            "yml/block-sequence-hyphen-indicator-newline": "off",
            "yml/indent": "off",
            "yml/flow-mapping-curly-newline": "off",
            "yml/flow-mapping-curly-spacing": "off",
            "yml/flow-sequence-bracket-newline": "off",
            "yml/flow-sequence-bracket-spacing": "off",
            "yml/key-spacing": "off",
            "yml/spaced-comment": "off",
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
