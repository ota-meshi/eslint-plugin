import {
  tsParserOptions,
  tsExtendRules,
} from "../../config-helpers/plugins/ts/index.js";

const extendsArray = ["plugin:@typescript-eslint/recommended"];
export { extendsArray as extends };

export const parserOptions = {
  sourceType: "module" as const,
  ...tsParserOptions,
};
export const rules = {
  ...tsExtendRules,
};
