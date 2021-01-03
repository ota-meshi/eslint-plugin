"use strict"

module.exports = require("../utils/module").requireOf([], () => ({
    extends: ["plugin:markdown/recommended"],
    rules: {},
}))
