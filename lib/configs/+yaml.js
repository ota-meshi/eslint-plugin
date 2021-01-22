"use strict"

module.exports = require("../utils/module").requireOf([], () => ({
    extends: ["plugin:yml/standard"],
    rules: {
        "yml/require-string-key": "error",
    },
}))
