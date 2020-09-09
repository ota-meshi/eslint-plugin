"use strict"

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
                    "@typescript-eslint/array-type": "error",
                    "@typescript-eslint/explicit-module-boundary-types": [
                        "error",
                        { allowArgumentsExplicitlyTypedAsAny: true },
                    ],
                    "@typescript-eslint/consistent-type-imports": "error",

                    "@typescript-eslint/adjacent-overload-signatures": "error",
                    "@typescript-eslint/await-thenable": "error",
                    "@typescript-eslint/ban-ts-comment": "error",
                    "@typescript-eslint/naming-convention": "error",
                    "@typescript-eslint/consistent-type-assertions": "error",
                    "@typescript-eslint/explicit-member-accessibility": "error",
                    "@typescript-eslint/no-array-constructor": "error",
                    "@typescript-eslint/no-empty-interface": "error",
                    "@typescript-eslint/no-extraneous-class": "error",
                    "@typescript-eslint/no-floating-promises": "error",
                    "@typescript-eslint/no-for-in-array": "error",
                    "@typescript-eslint/no-inferrable-types": "error",
                    "@typescript-eslint/no-misused-new": "error",
                    "@typescript-eslint/no-misused-promises": "error",
                    "@typescript-eslint/no-parameter-properties": "error",
                    "@typescript-eslint/no-require-imports": "error",
                    "@typescript-eslint/no-this-alias": [
                        "error",
                        { allowDestructuring: true },
                    ],
                    "@typescript-eslint/no-unnecessary-qualifier": "error",
                    "@typescript-eslint/no-unnecessary-type-arguments": "error",
                    "@typescript-eslint/no-unnecessary-type-assertion": "error",
                    "@typescript-eslint/no-var-requires": "error",
                    "@typescript-eslint/prefer-function-type": "error",
                    "@typescript-eslint/prefer-includes": "error",
                    "@typescript-eslint/prefer-namespace-keyword": "error",
                    "@typescript-eslint/prefer-readonly": "error",
                    "@typescript-eslint/prefer-regexp-exec": "error",
                    "@typescript-eslint/prefer-string-starts-ends-with":
                        "error",
                    "@typescript-eslint/restrict-plus-operands": "error",
                    "@typescript-eslint/require-array-sort-compare": "error",
                    "@typescript-eslint/triple-slash-reference": "error",
                    "@typescript-eslint/unbound-method": [
                        "error",
                        { ignoreStatic: true },
                    ],
                    "@typescript-eslint/unified-signatures": "error",
                    "prettier/prettier": [
                        "error",
                        {
                            tabWidth: 4,
                            semi: false,
                            trailingComma: "all",
                            parser: "typescript",
                        },
                        {
                            usePrettierrc: false,
                        },
                    ],

                    // Replacements
                    camelcase: "off",
                    // "@typescript-eslint/camelcase": "error",
                    "no-empty-function": "off",
                    "@typescript-eslint/no-empty-function": "error",
                    "no-useless-constructor": "off",
                    "@typescript-eslint/no-useless-constructor": "error",
                    "require-await": "off",
                    "@typescript-eslint/require-await": "error",
                    "no-use-before-define": "off",
                    "@typescript-eslint/no-use-before-define": [
                        "error",
                        {
                            functions: false,
                            classes: true,
                            variables: true,
                            ignoreTypeReferences: true,
                        },
                    ],
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
