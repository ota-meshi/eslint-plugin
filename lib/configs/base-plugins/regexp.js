"use strict"

module.exports = require("../../utils/module").requireOf([], () => ({
    extends: ["plugin:regexp/recommended"],
    rules: {
        "regexp/prefer-quantifier": "error",
        "regexp/prefer-regexp-exec": "error",
        "regexp/prefer-regexp-test": "error",
        "regexp/letter-case": "error",
        "regexp/no-useless-range": "error",

        "regexp/no-useless-character-class": "error",
        "regexp/no-useless-non-greedy": "error",
        "regexp/prefer-unicode-codepoint-escapes": "error",
    },
}))
