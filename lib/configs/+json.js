"use strict"

module.exports = require("../utils/module").requireOf([], () => ({
    extends: ["plugin:jsonc/recommended-with-jsonc"],
    rules: {
        "jsonc/auto": "error",
    },
}))
