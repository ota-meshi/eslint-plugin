import type { Linter } from "eslint";
import {
  tsFiles,
  tsTestExtendRules,
  tsTestFiles,
} from "../config-helpers/+typescript.js";
import { buildTS as buildTsBase } from "./plugins/ts/index.js";

export function buildTs(): Linter.FlatConfig[] {
  return [
    ...buildTsBase(tsFiles),
    {
      files: tsTestFiles,
      rules: {
        ...tsTestExtendRules,
      },
    },
  ];
}
