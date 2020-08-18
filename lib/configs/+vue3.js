"use strict"

module.exports = require("../utils/module").requireOf(
    ["vue-eslint-parser"],
    () => ({
        extends: ["plugin:vue/vue3-recommended"],
        parser: "espree",
        overrides: [
            {
                files: ["*.vue"],
                parser: require.resolve("vue-eslint-parser"),
            },
        ],
    }),
    () => ({
        overrides: [
            {
                files: ["*.vue"],
                processor: "@ota-meshi/missing-parser",
            },
        ],
    }),
)
