"use strict"

module.exports = require("../utils/module").requireOf([], () => ({
    extends: [
        "plugin:jsonc/recommended-with-jsonc",
        "plugin:jsonc/auto-config",
    ],
}))
