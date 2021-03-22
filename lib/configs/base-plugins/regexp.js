"use strict"

module.exports = require("../../utils/module").requireOf(
    ["eslint-plugin-regexp@0.6.0"],
    () => ({
        extends: ["plugin:regexp/recommended"],
        rules: {
            // https://github.com/ota-meshi/eslint-plugin-regexp/pull/49
            "no-empty-character-class": "error",
            "regexp/negation": "error",
            "regexp/no-legacy-features": "error",
            "regexp/no-dupe-disjunctions": "error",
            "regexp/no-unused-capturing-group": "error",
            "regexp/no-useless-character-class": "error",
            "regexp/no-useless-dollar-replacements": "error",
            "regexp/no-useless-escape": "error",
            "regexp/no-useless-non-capturing-group": "error",
            "regexp/no-useless-non-greedy": "error",
            "regexp/no-useless-range": "error",
            "regexp/prefer-character-class": "error",
            "regexp/prefer-escape-replacement-dollar-char": "error",
            "regexp/prefer-range": "error",
            "regexp/prefer-unicode-codepoint-escapes": "error",

            // others
            "regexp/letter-case": [
                "error",
                { hexadecimalEscape: "lowercase", controlEscape: "uppercase" },
            ],
            "regexp/order-in-character-class": "error",
            "regexp/prefer-quantifier": "error",
            "regexp/prefer-regexp-exec": "error",
            "regexp/prefer-regexp-test": "error",
        },
    }),
)
