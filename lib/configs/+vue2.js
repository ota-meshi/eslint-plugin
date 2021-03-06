"use strict"

module.exports = require("../utils/module").requireOf(
    ["eslint-plugin-vue", "vue-eslint-parser"],
    () => ({
        extends: ["plugin:vue/recommended"],
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
