"use strict"

module.exports = require("../../utils/module").requireOf([], () => ({
    extends: ["plugin:eslint-comments/recommended"],
    rules: {
        "eslint-comments/require-description": "error",
        "eslint-comments/no-unused-disable": "error",
    },
}))
