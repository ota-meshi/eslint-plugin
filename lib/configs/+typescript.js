module.exports = require("../utils/module").requireOf(
    ["@typescript-eslint/parser", "typescript"],
    () => ({
        overrides: [
            {
                files: ["*.ts"],
                extends: ["plugin:@typescript-eslint/recommended"],
                parser: require.resolve("@typescript-eslint/parser"),
                parserOptions: {
                    sourceType: "module",
                },
                rules: {
                    "@typescript-eslint/explicit-module-boundary-types": [
                        "error",
                        { allowArgumentsExplicitlyTypedAsAny: true },
                    ],
                    "@typescript-eslint/consistent-type-imports": "error",
                },
            },
            {
                files: ["test/**/*.ts", "tests/**/*.ts"],
                rules: {
                    "@typescript-eslint/no-explicit-any": "off",
                },
            },
        ],
    }),
    () => ({
        overrides: [
            {
                files: ["*.ts"],
                processor: "@ota-meshi/missing-parser",
            },
        ],
    }),
)
