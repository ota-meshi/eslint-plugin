import {
  recommendedRules,
  recommendedTestFiles,
  recommendedTestGlobals,
  recommendedTestRules,
} from "../config-helpers/recommended.js";

export = {
  extends: [
    "eslint:recommended",
    require.resolve("./base-plugins/eslint-comments"),
    require.resolve("./base-plugins/regexp"),
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    ...recommendedRules,
  },
  overrides: [
    {
      files: ["*.js", "*.mjs", "*.cjs"],
      extends: [require.resolve("./json-schema/config")],
    },
    {
      files: recommendedTestFiles,
      globals: {
        ...recommendedTestGlobals,
      },
      rules: {
        ...recommendedTestRules,
      },
    },
  ],
};
