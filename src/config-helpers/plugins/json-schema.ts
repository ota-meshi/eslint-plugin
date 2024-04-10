import type { Linter } from "eslint";

export const jsonSchemaExtendRules = {
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
        {
          fileMatch: [
            "stylelint.config.js",
            "stylelint.config.cjs",
            ".stylelintrc.js",
            ".stylelintrc.yaml",
            ".stylelintrc.yml",
          ],
          schema: "https://json.schemastore.org/stylelintrc",
        },
      ],
      useSchemastoreCatalog: true,
    },
  ],
} as Linter.RulesRecord;
