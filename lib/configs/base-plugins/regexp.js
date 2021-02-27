"use strict"

module.exports = require("../../utils/module").requireOf([], () => ({
    extends: ["plugin:regexp/recommended"],
    rules: {
        "regexp/prefer-quantifier": "error",
    },
}))
