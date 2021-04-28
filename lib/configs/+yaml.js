"use strict"

module.exports = require("../utils/module").requireOf(['eslint-plugin-yml'], () => ({
    extends: ["plugin:yml/standard"],
    rules: {
        "yml/require-string-key": "error",
    },
    overrides: [
        {
            files: ["*.yaml", "*.yml"],
            extends: [require.resolve("./json-schema/config")],
        },
    ],
}))
