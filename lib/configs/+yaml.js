"use strict"

module.exports = require("../utils/module").requireOf([], () => ({
    extends: ["plugin:yml/recommended"],
    rules: {
        "yml/block-mapping": "error",
        "yml/block-sequence": "error",
        "yml/indent": "error",
        "yml/spaced-comment": "error",
        "yml/flow-mapping-curly-newline": "error",
        "yml/flow-mapping-curly-spacing": "error",
        "yml/flow-sequence-bracket-newline": "error",
        "yml/flow-sequence-bracket-spacing": "error",

        "yml/quotes": "error",
        "yml/plain-scalar": "error",
        "yml/key-spacing": "error",
        "yml/require-string-key": "error",

        "yml/block-mapping-question-indicator-newline": "error",
        "yml/block-sequence-hyphen-indicator-newline": "error",
    },
}))
