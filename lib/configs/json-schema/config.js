"use strict"

module.exports = require("../../utils/module").requireOf([], () => ({
    extends: ["plugin:json-schema-validator/recommended"],
    rules: {
        "json-schema-validator/no-invalid": [
            "error",
            {
                schemas: [
                    {
                        fileMatch: [".eslintrc.js"],
                        schema: "https://json.schemastore.org/eslintrc",
                    },
                    {
                        fileMatch: [".prettierrc.toml"],
                        schema: "https://json.schemastore.org/prettierrc",
                    },
                ],
                useSchemastoreCatalog: true,
            },
        ],
    },
}))
