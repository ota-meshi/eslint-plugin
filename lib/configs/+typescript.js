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

                    "@mysticatea/ts/adjacent-overload-signatures": "error",
                    "@mysticatea/ts/array-type": "error",
                    "@mysticatea/ts/await-thenable": "error",
                    "@mysticatea/ts/ban-ts-ignore": "error",
                    "@mysticatea/ts/class-name-casing": "error",
                    "@mysticatea/ts/consistent-type-assertions": "error",
                    "@mysticatea/ts/explicit-member-accessibility": "error",
                    "@mysticatea/ts/interface-name-prefix": "error",
                    "@mysticatea/ts/member-naming": "error",
                    "@mysticatea/ts/no-array-constructor": "error",
                    "@mysticatea/ts/no-empty-interface": "error",
                    "@mysticatea/ts/no-extraneous-class": "error",
                    "@mysticatea/ts/no-floating-promises": "error",
                    "@mysticatea/ts/no-for-in-array": "error",
                    "@mysticatea/ts/no-inferrable-types": "error",
                    "@mysticatea/ts/no-misused-new": "error",
                    "@mysticatea/ts/no-misused-promises": "error",
                    "@mysticatea/ts/no-parameter-properties": "error",
                    "@mysticatea/ts/no-require-imports": "error",
                    "@mysticatea/ts/no-this-alias": [
                        "error",
                        { allowDestructuring: true },
                    ],
                    "@mysticatea/ts/no-unnecessary-qualifier": "error",
                    "@mysticatea/ts/no-unnecessary-type-arguments": "error",
                    "@mysticatea/ts/no-unnecessary-type-assertion": "error",
                    "@mysticatea/ts/no-var-requires": "error",
                    "@mysticatea/ts/prefer-function-type": "error",
                    "@mysticatea/ts/prefer-includes": "error",
                    "@mysticatea/ts/prefer-namespace-keyword": "error",
                    "@mysticatea/ts/prefer-readonly": "error",
                    "@mysticatea/ts/prefer-regexp-exec": "error",
                    "@mysticatea/ts/prefer-string-starts-ends-with": "error",
                    "@mysticatea/ts/restrict-plus-operands": "error",
                    "@mysticatea/ts/require-array-sort-compare": "error",
                    "@mysticatea/ts/triple-slash-reference": "error",
                    "@mysticatea/ts/unbound-method": [
                        "error",
                        { ignoreStatic: true },
                    ],
                    "@mysticatea/ts/unified-signatures": "error",
                    "@mysticatea/prettier": [
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
                    "@mysticatea/ts/camelcase": "error",
                    "no-empty-function": "off",
                    "@mysticatea/ts/no-empty-function": "error",
                    "no-useless-constructor": "off",
                    "@mysticatea/ts/no-useless-constructor": "error",
                    "require-await": "off",
                    "@mysticatea/ts/require-await": "error",
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
